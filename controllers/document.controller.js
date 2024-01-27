import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Document } from "../models/document.model.js";
import { User } from "../models/user.model.js";


const createDocument = asyncHandler(async (req, res) => {

    const { title, parentDocument, } = req.body
     
    const userId = req.user?._id

    const existedUser = await User.findById(userId)

    if (!existedUser) {
        throw new ApiError(404, `User is not authorized to do this,
        pls register first or login`)
    }
    
    const document = await Document.create({
        title,
        userId,
        parentDocument,
        isArchived: false,
        isPublished: false
    })
      
    return res.status(201).json(
        new ApiResponse(200, document, "Document created successfully")
    )
})

export { createDocument }