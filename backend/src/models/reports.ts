import { DataTypes } from "sequelize";
import { sequelize } from "../lib/sequalize";

const Report = sequelize.define("Report", {
   name: DataTypes.STRING,
   imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   lat: {
      type: DataTypes.FLOAT,
      allowNull: false,
   },
   lng: {
      type: DataTypes.FLOAT,
      allowNull: false,
   },
});

export { Report };
