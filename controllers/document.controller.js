import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Document } from "../models/document.model.js";
import { User } from "../models/user.model.js";


const createDocument = asyncHandler(async (req, res) => {
    
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (!existedUser) {
        throw new ApiError(404, "User is not authorized to do this, pls register first or login")
    }
    
    // const userId = await User.findById(existedUser._id)

    const document = await Document.create({
        title,
        userId: existedUser._id,
        parentDocument,
        isArchived: false,
        isPublished: false
    })
      
    return res.status(201).json(
        new ApiResponse(200, document, "Document created successfully")
    )
})

export { createDocument }