import * as cors from "cors";

export const CORS_CONFIG: cors.CorsOptions = {
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  origin: (_origin, callback) => callback(null, true),
};
