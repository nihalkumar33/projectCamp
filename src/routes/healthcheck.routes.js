import { Router } from "express";
import { get } from "mongoose";
import { healthCheck } from "../controller/healthcheck.controllers";

const router = Router();

router.route("/").get(healthCheck)

export default router