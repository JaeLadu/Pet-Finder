import { Op } from "sequelize";
import { reports as algoliaReports } from "../lib/algolia";
import { Report as sequelizeReports } from "../models/reports";

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
   imageUrl: string;
   lat: number;
   lng: number;
};
async function getReportsInArea(location: Area) {
   const data = await algoliaReports.search<AlgoliaReport>("", {
      aroundLatLng: `${location.lat}, ${location.lng}`,
      aroundRadius: 5000,
   });

   const elephantIDs = data.hits.map((hit) => hit.elephantID);

   const reports = await sequelizeReports.findAll({
      where: {
         id: { [Op.or]: elephantIDs },
      },
   });

   return reports;
}

async function createReport(reportData: SequelizeReport) {
   try {
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
      return `Report ${sequelizeReport.id} creado correctamente`;
   } catch (error) {
      return `Algo salió mal: ${JSON.stringify(error)}`;
   }
}

export { getReportsInArea, createReport, SequelizeReport };
