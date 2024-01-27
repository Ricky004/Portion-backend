import { Router } from "express";
import { createDocument } from "../controllers/document.controller.js";
import { verifyJWT } from "../middleware/auth.js";

const router = Router()

router.route("/create-document").post(verifyJWT, createDocument)

export default router