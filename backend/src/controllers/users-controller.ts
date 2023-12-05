import { Auth } from "../models/models";
import { User } from "../models/models";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;
//crea un usuario
async function signUp(data: { mail: string; password: string }) {
   console.log(`data que le llega a sigup: ${JSON.stringify(data)}`);

   try {
      //intenta encontrar o crea un nuevo auth
      const [auth, created] = await Auth.findOrCreate({ where: data });

      //checkea si lo tuvo que crear, crea un nuevo user y lo linkea con el auth. Después, devuelve el nuevo id
      if (created) {
         const user = await User.create();
         await auth.update({ UserId: user.dataValues.id });

         return { message: `New User created`, id: auth.dataValues.UserId };
      }
      // si el usuario ya existía, devuelve el id que obtuvo del mismo
      return { message: `User already existed`, id: auth.dataValues.UserId };
   } catch (error) {
      console.log("Entró en el error del try de signup");

      return { message: "Something went wrong", error: JSON.stringify(error) };
   }
}

//busca el registro auth que contenga el mail y pass pasados como parámetros. Si encuentra uno, usa su userId para crear el token y lo devuelve
async function getToken(data: { mail: string; password: string }) {
   console.log(`Data que le llega a getToken: ${(data.mail, data.password)}`);

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

      console.log(`Auth: ${JSON.stringify(auth)}`);

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

async function updateUserPassword(data: {
   id: number;
   password: string;
   newPassword: string;
}) {
   try {
      const auth = await Auth.findOne({
         where: { UserId: data.id },
         rejectOnEmpty: true,
      });
      console.log(`data: ${data}`, `auth: ${auth.dataValues}`);

      if (auth.dataValues.password == data.password) {
         await auth?.update({ password: data.newPassword });
         return { passwordCheck: true };
      } else {
         return { passwordCheck: false };
      }
   } catch (error) {
      return { passwordCheck: true, error: error };
   }
}

export { signUp, getToken, getUserData, updateUserData, updateUserPassword };
