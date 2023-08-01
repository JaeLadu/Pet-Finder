import { DataTypes } from "sequelize";
import { sequelize } from "../lib/sequalize";

const Auth = sequelize.define("Auth", {
   mail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
   },
   password: {
      type: DataTypes.STRING,
      allowNull: false,
   },
});
export { Auth };
