import { Router } from "express";
import scheduleRoutes from "./schedule-routes";
import staffRoutes from "./staff-routes";
import userRoutes from "./user-routes";

const apiRouter = Router();

apiRouter.use("/schedule", scheduleRoutes);
apiRouter.use("/staff", staffRoutes);
apiRouter.use("/user", userRoutes);

export default apiRouter;
