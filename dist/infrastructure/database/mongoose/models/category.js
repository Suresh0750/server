"use strict";
// import {Schema,model,Document} from 'mongoose'
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModel = void 0;
// // * types
// import { AddCategory } from '../../../../domain/entities/admin';
// // * Schema
// const categorySchema = new Schema({
//     categoryName : String,
//     categoryDescription : String,
//     categoryImage : String,
//     isListed :{
//         type :Boolean,
//         default : true
//     }
// },{ timestamps: true })
// export const CategoryModel = model<AddCategory & Document>("CategoryCollection",categorySchema) ;
const mongoose_1 = require("mongoose");
// * Schema
const categorySchema = new mongoose_1.Schema({
    categoryName: { type: String, required: true, trim: true, maxlength: 100 },
    categoryDescription: { type: String, required: true, trim: true },
    categoryImage: { type: String, required: true, trim: true },
    isListed: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });
exports.CategoryModel = (0, mongoose_1.model)("Category", categorySchema, "categories");
