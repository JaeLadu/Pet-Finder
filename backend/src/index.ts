import express, { NextFunction, Request, Response, json } from "express";
import {
   createReport,
   getReportsInArea,
} from "./controllers/reports-controller";
import crypto from "crypto";

const app = express();
const port = process.env.PORT || 3000;
const environment = process.env.ENVIRONMENT;

//Middleware
app.use(json());

//Convierte la contraseña que se envía en el body en un hash
function encrypPassword(req: Request, res: Response, next: NextFunction) {
   const { password } = req.body;
   try {
      const hashed = crypto
         .createHash("sha256")
         .update(JSON.stringify(password))
         .digest("hex");

      req.body.password = hashed;
      next();
   } catch (error) {
      res.send(error).status(401);
   }
}

//TERMINAR endpoints:

//endpoint básico para poder checkear que el server esté activo
app.get("/up", (req, res) => {
   res.send(`Server up and running in ${environment} mode`);
});

//Reportar mascota
app.post("/report", async (req, res) => {
   const { imageUrl, lat, lng } = req.body;

   if (!imageUrl || !lat || !lng)
      return res
         .status(400)
         .send("information missing. Body must have imageUrl, lat and lng");

   const response = await createReport(req.body);
   res.send(response);
});

//obtener las mascotas cerca de un punto. Habla con algolia para obtener los IDs de todas y con esos IDs las trae desde elephant
app.get("/reports/location", async (req, res) => {
   const { lat, lng } = req.query;
   if (!lat || !lng) {
      return res
         .status(400)
         .send("information missing. Request must have lat and lng");
   }

   const reports = await getReportsInArea({
      lat: Number(lat),
      lng: Number(lng),
   });

   return res.json(reports);
});

//Registrar usuario
app.post("/auth", encrypPassword, async (req, res) => {
   res.send(req.body);
});

//Login / ingresar

//Editar data del usuario

//Editar contraseña

//Editar reporte

//Obtener todas mis mascotas

//reportar una mascota. Debería sólo avisar por mail al dueño que alguien lo vió y donde. Envía los datos de contacto por mail. Usa sendgrid o Resend
app.listen(port, () => {
   console.log(`Server up and running in ${environment} mode in port ${port}`);
});
