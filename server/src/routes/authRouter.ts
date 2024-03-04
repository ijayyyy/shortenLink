import { Router } from "express";
import { handleRefreshToken } from "../middlwares/authToken";

const router = Router();
router.get("/refresh-token", handleRefreshToken);

export default router;
