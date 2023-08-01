import { Auth } from "./auth";
import { Report } from "./reports";
import { User } from "./users";

User.hasOne(Auth);
User.hasMany(Report);

Auth.belongsTo(User);

Report.belongsTo(User);

export { Auth, Report, User };
