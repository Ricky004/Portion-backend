import mongoose, { Schema } from "mongoose"

const documentSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true,
        index: true
    },
    isArchived: {
        type: Boolean,
        required: true
    },
    parentDocument: {
        type: Schema.Types.ObjectId,
        ref: "Document",
        index: true
    },
    content: {
        type: String,
    },
    coverImage: {
        type: String,
    },
    icon: {
        type: String,
    },
    isPublished: {
        type: Boolean,
    },    
}, 
{ timestamps: true })

export const Document = mongoose.model("Document", documentSchema)