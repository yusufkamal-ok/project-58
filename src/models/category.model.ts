import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Category_schema = new Schema(
    {
      nameCategory: {
      type: String,
      required: true,
    }
  },
    {
      timestamps: true,
  });

const CategoryModel = mongoose.model("Categories",Category_schema);
export default CategoryModel;
