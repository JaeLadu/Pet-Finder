import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
   "postgres://jgjzltiu:rkbyZKdJd5NbwaK_IPNkVBwAdpAt5rPv@silly.db.elephantsql.com/jgjzltiu"
);

export { sequelize };
