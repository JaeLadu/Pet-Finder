import { Op } from "sequelize";
import { reports as algoliaReports } from "../lib/algolia";
import { Auth, Report as sequelizeReports } from "../models/models";
import { sgMail } from "../lib/sendgrid";
import { cloudinary } from "../lib/cloudinary";

type Area = {
   lat: number;
   lng: number;
};
type AlgoliaReport = {
   name: string;
   elephantID: number;
   _geoloc: Area;
};
type SequelizeReport = {
   name: string;
   dataURL?: string;
   imageUrl?: string;
   lat: number;
   lng: number;
   UserId: number;
};
// Habla con algolia para obtener los IDs de todas las mascotas cerca del area y con esos IDs las trae desde elephant
async function getReportsInArea(location: Area) {
   const data = await algoliaReports.search<AlgoliaReport>("", {
      aroundLatLng: `${location.lat}, ${location.lng}`,
      aroundRadius: 5000,
   });

   console.log(location);
   console.log(data);

   const elephantIDs = data.hits.map((hit) => hit.elephantID);

   const reports = await sequelizeReports.findAll({
      where: {
         id: elephantIDs,
      },
   });

   return reports;
}

async function createReport(reportData: SequelizeReport) {
   try {
      //guarda la imágen en cloudinary, obtiene el url de la imágen y edita el objeto
      if (reportData.dataURL) {
         const imageUrl = (await cloudinary.uploader.upload(reportData.dataURL))
            .url;
         reportData.imageUrl = imageUrl;
         delete reportData.dataURL;
      } else {
         throw new Error("Falta dataURL");
      }

      if (reportData.imageUrl) {
         //crea el reporte en elephant y recupera el ID con el que se guardó
         const sequelizeReport = (await sequelizeReports.create(reportData))
            .dataValues;

         //usa el ID de elephant para crear un objeto y guardarlo en Algolia
         const algoliaObject = {
            name: sequelizeReport.name,
            elephantID: sequelizeReport.id,
            _geoloc: {
               lat: sequelizeReport.lat,
               lng: sequelizeReport.lng,
            },
         };
         await algoliaReports.saveObject(algoliaObject, {
            autoGenerateObjectIDIfNotExist: true,
         });

         return {
            message: `Report ${sequelizeReport.id} creado correctamente`,
            reportId: sequelizeReport.id,
         };
      } else {
         throw new Error("Error en sequelize o algolia");
      }
   } catch (error) {
      return {
         message: `Algo salió mal: ${JSON.stringify(error)}`,
         error: JSON.stringify(error),
      };
   }
}

async function updateReport(reportId: number, report: SequelizeReport) {
   const response = {
      owner: false,
      updated: false,
      error: "",
   };
   try {
      //primero checkea si el usuario es realmente dueño del report
      const oldReport = await sequelizeReports.findByPk(reportId, {
         rejectOnEmpty: true,
      });
      response.owner = oldReport?.dataValues.UserId == report.UserId;
      if (!response.owner) return response;

      //guarda la imágen en cloudinary, obtiene el url de la imágen y edita el objeto
      if (report.dataURL) {
         const imageUrl = (await cloudinary.uploader.upload(report.dataURL))
            .url;
         report.imageUrl = imageUrl;
         delete report.dataURL;
      } else {
         throw new Error("Falta dataURL");
      }

      //después actualiza el report
      const updated = await oldReport?.update(report);
      if (updated) response.updated = true;
   } catch (error) {
      response.error = JSON.stringify(error);
   }
   return response;
}

async function getUserReports(userId: number) {
   return await sequelizeReports.findAll({ where: { UserId: userId } });
}

//Arma y envía un mail a un dueño de mascota cuando alguien reporta haberla visto
async function reportPet(data: {
   reportId: number;
   name: string;
   phone: number;
   message: string;
}) {
   try {
      //busca el report en la base de datos y
      //usa su UserId para buscar el auth del usuario al que ambos le corresponden
      const report = (await sequelizeReports.findByPk(data.reportId))
         ?.dataValues;
      const auth = (await Auth.findOne({ where: { UserId: report.UserId } }))
         ?.dataValues;

      //Si algo sale mal, cancela todo y devuelve false
      //Esta linea aprece innecesaria, ya que está todo dentro de un try
      if (!auth.mail || auth.mail == null) return false;

      //para mejorar legibilidad, defino subject y html fuera del objeto mail
      const subject = data.name != null ? data.name : "";
      const html = /*html*/ `
         <p>Mensaje: ${data.message}</p>
         ${
            data.name != null
               ? "<p>Nombre de quien lo vió: " + data.name + "</p>"
               : ""
         }
         ${data.phone != null ? "<p>Contacto: " + data.phone + "</p>" : ""}
         
      `;
      //objeto que define todos los datos que se usan para enviar el mail
      const mail = {
         to: auth.mail,
         from: "jaeladu1@gmail.com",
         subject: subject,
         html: html,
      };

      await sgMail.send(mail);
      console.log("mail sent");
      return true;
   } catch (e) {
      console.log(`error: ${e}`);
      return false;
   }
}
async function getReport(reportId: number) {
   try {
      const report = await sequelizeReports.findByPk(reportId, {
         rejectOnEmpty: true,
      });
      return { report: report.dataValues };
   } catch (error) {
      return { message: "Something failed", error };
   }
}

export {
   getReportsInArea,
   createReport,
   updateReport,
   getUserReports,
   reportPet,
   getReport,
};
