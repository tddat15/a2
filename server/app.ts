import express from "express";
import cors from "cors";
import helmet from "helmet";
import fileUpload from "express-fileupload";
import * as _ from "lodash";
import morgan from "morgan";
import compression from "compression";
import * as config from "./config";

export class Application {
  private readonly app = express();

  constructor() {
    morgan.token("user-id", function getUserId(req) {
      return _.get(req, "userId") || "-";
    });

    this.app.use(compression());
    this.app.use(cors(config.CORS_CONFIG));
    this.app.use(helmet());
    this.app.use(fileUpload({ limits: { fileSize: 2 * 1024 * 1024 } }));
    this.app.use(express.json({ limit: "3mb" }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      morgan(
        ':user-id :method :url HTTP/:http-version ":user-agent" :status :res[content-length] - :response-time ms'
      )
    );
  }
}
