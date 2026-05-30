import express from "express";
import apiRoutes from "../api-routes";

const app = express();

app.use(express.json());
app.use("/api", apiRoutes);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default app;
