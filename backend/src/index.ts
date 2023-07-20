import express, { json } from "express";

const app = express();
const port = process.env.PORT || 3000;
const environment = process.env.ENVIRONMENT;

app.use(json());

app.get("/up", (req, res) => {
   res.send(`Server up and running in ${environment} mode`);
});

app.listen(port, () => {
   console.log(`Server up and running in ${environment} mode in port ${port}`);
});
