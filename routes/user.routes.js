import { Router } from "express";
import { 
    checkUser,
loginUser, logoutUser, 
refreshAccessToken, registerUser
} from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.js"
import { verifyJWT } from "../middleware/auth.js";

const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }
    ]),
    registerUser
)

router.route("/login").post(loginUser)

// secured routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/user-registered").get(verifyJWT, checkUser)

export default router