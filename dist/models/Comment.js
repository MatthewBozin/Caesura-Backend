"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CommentSchema = new mongoose_1.Schema({
    lines: {
        type: Array,
        required: true,
    },
    authors: {
        type: Array,
        required: true,
    },
    userId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    snaps: {
        type: Array,
        required: true
    },
    poem: {
        type: String,
        required: true,
    },
});
module.exports = mongoose.model("Comment", CommentSchema);
//# sourceMappingURL=Comment.js.map