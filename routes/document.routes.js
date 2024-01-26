import { Router } from "express";
import { createDocument } from "../controllers/document.controller.js";

const router = Router()

router.route("/create-document").post(createDocument)

export default router