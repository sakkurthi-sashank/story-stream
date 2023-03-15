import express from "express";
import router from "./api";
import cors from "cors";

const app: express.Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1", router);

app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).send("App is Working");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`listening at port ${PORT}`);
});
