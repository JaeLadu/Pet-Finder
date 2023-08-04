import { Auth } from "../models/models";
import { User } from "../models/models";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;
//crea un usuario
async function signUp(data: { mail: string; password: string }) {
   try {
      const auth = (await Auth.findOrCreate({ where: data }))[0];

      if (auth.dataValues.UserId == null) {
         const userId = (await User.create({})).dataValues.id;
         await auth.update({ UserId: userId });
         return `New User created id: ${userId}`;
      }
      return `User already existed id: ${auth.dataValues.UserId}`;
   } catch (error) {
      return JSON.stringify(error);
   }
}

//busca el registro auth que contenga el mail y pass pasados como parámetros. Si encuentra uno, usa su userId para crear el token y lo devuelve
async function getToken(data: { mail: string; password: string }) {
   const response = {
      message: "Something went wrong",
      secret: false,
      auth: false,
      token: "",
   };

   if (!SECRET) {
      response.message = "Secret missing";
      return response;
   }

   try {
      const auth = await Auth.findOne({
         where: { ...data },
         rejectOnEmpty: true,
      });

      if (auth == null) {
         response.secret = true;
         response.message = "Auth missing";
      }

      if (auth?.dataValues.UserId && SECRET) {
         response.secret = true;
         response.auth = true;
         response.token = jwt.sign(auth.dataValues.UserId, SECRET);
         response.message = "Ok";
      } else {
         response.secret = true;
         response.auth = true;
      }
   } catch (error) {
      response.auth == false;
      response.message += ` error: ${JSON.stringify(error)}`;
   }
   return response;
}

async function getUserData(id: number) {
   try {
      const user = await User.findByPk(id, { rejectOnEmpty: true });
      return user?.dataValues;
   } catch (error) {
      return error;
   }
}

async function updateUserData(data: {
   id: number;
   name?: string;
   city?: string;
}) {
   try {
      const user = await User.findByPk(data.id, { rejectOnEmpty: true });
      await user?.update(data);
      return;
   } catch (error) {
      return { error: error };
   }
}

async function updateUserPassword(data: { id: number; password: string }) {
   try {
      const auth = await Auth.findOne({
         where: { UserId: data.id },
         rejectOnEmpty: true,
      });
      await auth?.update({ password: data.password });
      return;
   } catch (error) {
      return { error: error };
   }
}

export { signUp, getToken, getUserData, updateUserData, updateUserPassword };
