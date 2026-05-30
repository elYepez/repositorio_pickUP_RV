import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./modules/auth/auth.routes";
import usersRoutes from "./modules/users/users.routes";
import driverRoutes from "./modules/drivers/driver.routes";
import routesRoutes from "./modules/routes/routes.routes";
import tripRequestsRoutes from "./modules/tripRequests/tripRequests.routes";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));


app.use(express.json());
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/drivers", driverRoutes);
app.use("/routes", routesRoutes);
app.use("/trip-requests", tripRequestsRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "PickUp API running",
  });
});

export default app;