import dotenv from "dotenv";
import "express-async-errors";

//security packeges
import helmet from "helmet";
import cors from "cors";

//routes
import authRouter from "./routes/auth.route.js";
import jobsRouter from "./routes/jobs.route.js";

//error handler
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

//
import connectDB from "./db/connect.js";
import authenticateUser from "./middleware/authentication.js";

import express from "express";

dotenv.config();

const app = express();

app.set("trust proxy", 1);

app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

//routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

//
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, () => console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
