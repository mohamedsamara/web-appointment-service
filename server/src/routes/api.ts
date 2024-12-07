import { Router } from "express";
import staffRoutes from "./staff-routes";
import userRoutes from "./user-routes";

const apiRouter = Router();

apiRouter.use("/staff", staffRoutes);
apiRouter.use("/user", userRoutes);

export default apiRouter;
