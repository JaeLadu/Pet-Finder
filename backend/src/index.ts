import express, { NextFunction, Request, Response, json } from "express";
import {
   createReport,
   getReportsInArea,
} from "./controllers/reports-controller";
import crypto from "crypto";
import { getToken, signUp } from "./controllers/users-controller";
import jwt from "jsonwebtoken";

const app = express();
const port = process.env.PORT || 3000;
const environment = process.env.ENVIRONMENT;
const SECRET = process.env.JWT_SECRET;

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
      res.send("Information missing: Password").status(400);
   }
}

//Checkea que el token enviado sea válido
function checkToken(req: Request, res: Response, next: NextFunction) {
   //extrae el token del req
   const auth = req.get("Authorization");
   const token = auth?.split(" ")[1];

   if (token && SECRET) {
      try {
         //intenta verificarlo y si sale todo bien, agrega el ID del usuario al req(el cual debe ser parte del token)
         const decoded = jwt.verify(token, SECRET);
         req.body.id = JSON.parse(JSON.stringify(decoded));
         next();
      } catch (error) {
         console.log(JSON.stringify(error));
         return res.status(401).send("Invalid token");
      }
   } else {
      return res
         .status(400)
         .send(
            "Request must have Authorization header containing bearer token"
         );
   }
}

//TERMINAR endpoints:

//endpoint básico para poder checkear que el server esté activo desde el cliente
app.get("/up", (req, res) => {
   res.send(`Server up and running in ${environment} mode`);
});

//-------------------------------------------------------------------------------------------------------------------------------------------

//Reportar mascota
app.post("/report", checkToken, async (req, res) => {
   //checkea la info del input
   const { id, imageUrl, lat, lng } = req.body;

   if (!imageUrl || !lat || !lng)
      return res
         .status(400)
         .send("information missing. Body must have imageUrl, lat and lng");

   req.body.UserId = id;
   delete req.body.id;
   //crea el reporte y lo devuelve
   const response = await createReport(req.body);
   res.send(response);
});

//-------------------------------------------------------------------------------------------------------------------------------------------

//obtener las mascotas cerca de un punto
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

//-------------------------------------------------------------------------------------------------------------------------------------------

//Registrar usuario
app.post("/auth", encrypPassword, async (req, res) => {
   //checkea la info del input
   const { mail, password } = req.body;

   if (!mail || !password)
      return res
         .status(400)
         .send("information missing. Body must have imageUrl, lat and lng");

   //crea el usuario
   delete req.body.id;
   await signUp(req.body);

   //intenta crear el token
   const tokenObject = await getToken(req.body);

   //si todo sale ok y existe el token, lo devuelve
   if (tokenObject.token) return res.send(tokenObject.token);
   //Si no se encuentra el usuario en la DB
   if (!tokenObject.auth)
      return res.status(400).send({ message: "User not found" });
   //Si hay otro error, devuelve el objeto con toda la info
   return res.send(tokenObject);
});

//-------------------------------------------------------------------------------------------------------------------------------------------

//Login / ingresar
app.get("/auth", encrypPassword, async (req, res) => {
   //checkea la info del input
   const { mail, password } = req.body;

   if (!mail || !password)
      return res
         .status(400)
         .send("information missing. Body must have imageUrl, lat and lng");

   //intenta crear el token
   const tokenObject = await getToken(req.body);

   //si todo sale ok y existe el token, lo devuelve
   if (tokenObject.token) return res.send(tokenObject.token);
   //Si no se encuentra el usuario en la DB
   if (!tokenObject.auth)
      return res.status(400).send({ message: "User not found" });
   //Si hay otro error, devuelve el objeto con toda la info
   else return tokenObject;
});

//-------------------------------------------------------------------------------------------------------------------------------------------

//Editar data del usuario

//-------------------------------------------------------------------------------------------------------------------------------------------

//Editar contraseña

//-------------------------------------------------------------------------------------------------------------------------------------------

//Editar reporte

//-------------------------------------------------------------------------------------------------------------------------------------------

//Obtener todas mis mascotas

//-------------------------------------------------------------------------------------------------------------------------------------------

//reportar una mascota. Debería sólo avisar por mail al dueño que alguien lo vió y donde. Envía los datos de contacto por mail. Usa sendgrid o Resend

app.listen(port, () => {
   console.log(`Server up and running in ${environment} mode in port ${port}`);
});
