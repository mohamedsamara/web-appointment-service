import { Router } from "express";

import * as staffController from "../controllers/staff-controller";

const router = Router();

router.get("/", staffController.getStaffMembers);
router.post("/", staffController.createStaffMember);
router.get("/:id", staffController.getStaffMemeber);

export default router;
