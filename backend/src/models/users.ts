import { DataTypes } from "sequelize";
import { sequelize } from "../lib/sequalize";

const User = sequelize.define("User", {
   name: DataTypes.STRING,
   city: DataTypes.STRING,
});

export { User };
