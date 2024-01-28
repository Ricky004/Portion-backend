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
        pls register or login first`)
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

const getDocuments = asyncHandler(async (req, res) => {
    
    const userId = req.user?._id
    const document = await Document.find({ userId })
       
    if (!document) {    
      throw new ApiError(500, err?.message || "Internal server error")
    }

    
    return res.status(200).json(
        new ApiResponse(200, document, "Successfuly retrive all the documents")
    )
})

export { createDocument, getDocuments }