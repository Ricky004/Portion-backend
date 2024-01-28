import { Router } from "express";
import { createDocument, getDocuments } from "../controllers/document.controller.js";
import { verifyJWT } from "../middleware/auth.js";

const router = Router()

// secured routes
router.route("/create-document").post(verifyJWT, createDocument)
router.route("/get-doc").get(verifyJWT, getDocuments)

export default router