import express, { Router } from "express";
const router = express.Router();
import {
 applyLeave,
 getUserLeaves,
 getLeavesDetails,
 cancelLeaves,
 approveOrRejectLeaves
} from "../controllers/leaveController.js";



router.post("/apply-leave", applyLeave);
router.get("/:id", getUserLeaves);
router.get("/:id/:leaveId", getLeavesDetails);

router.put("/:leaveId",cancelLeaves)
router.put("/:leaveId/status",approveOrRejectLeaves);


export default router;
