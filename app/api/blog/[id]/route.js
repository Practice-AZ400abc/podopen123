import verifyToken from '@/utils/verifyToken';
import Blog from '@/models/blog';
import { connectToDB } from '@utils/database';
import extractPublicIdFromUrl from '@/utils/extractPublicIdFromUrl';
import deleteFromCloudinary from '@/utils/deleteFromCloudinary';

export const DELETE = async (req, { params }) => {
    const user = verifyToken(req);
    const id = await params;

    if (!user || !user.role === "Admin") {
        return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    }

    await connectToDB();

    try {
        const blog = await Blog.findByIdAndDelete(id);

        if (!blog) {
            return new Response(JSON.stringify({ message: 'Blog not found' }), { status: 404 });
        }

        const publicId = extractPublicIdFromUrl(blog.bannerImg);
        await deleteFromCloudinary(publicId);

        return new Response(JSON.stringify({ message: 'Blog deleted' }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: error.message }), { status: 500 });
    }
}

export const PUT = async (req, { params }) => {
    const user = verifyToken(req);
    const id = await params;
    const body = await req.json();

    if (!user || !user.role === "Admin") {
        return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    }

    await connectToDB();

    try {
        const blog = await Blog.findById(id);

        if (body.bannerImg !== blog.bannerImg) {
            const publicId = extractPublicIdFromUrl(blog.bannerImg);
            await deleteFromCloudinary(publicId);
        }

        if (!blog) {
            return new Response(JSON.stringify({ message: 'Blog not found' }), { status: 404 });
        }

        blog.title = body.title;
        blog.body = body.body;
        blog.bannerImg = body.bannerImg;

        await blog.save();

        return new Response(JSON.stringify(blog), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: error.message }), { status: 500 });
    }
}

export const GET = async (req, { params }) => {
    const id = await params;
    await connectToDB();

    try {
        const blog = await Blog.findById(id);

        if (!blog) {
            return new Response(JSON.stringify({ message: 'Blog not found' }), { status: 404 });
        }

        return new Response(JSON.stringify(blog), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: error.message }), { status: 500 });
    }
}