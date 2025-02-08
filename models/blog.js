import { Schema, model, models } from "mongoose";

const BlogSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        bannerImg: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const Blog = models.Blog || model("Blog", BlogSchema);

export default Blog;
