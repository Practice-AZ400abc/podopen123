import verifyToken from '@/utils/verifyToken';
import Blog from '@/models/blog';
import { connectToDB } from '@/utils/database';

export const GET = async (req) => {
    await connectToDB();

    try {
        const blogs = await Blog.find();

        if (!blogs) {
            return new Response(JSON.stringify({ message: 'No blogs found' }), { status: 404 });
        }

        return new Response(JSON.stringify(blogs), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: error.message }), { status: 500 });
    }
}

export const POST = async (req) => {
    const user = verifyToken(req);
    const body = await req.json();

    if (!user || !user.role === "Admin") {
        return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    }

    await connectToDB();

    try {
        const blog = await Blog.create({
            ...body,
        });

        if (!blog) {
            return new Response(JSON.stringify({ message: 'Blog could not be created' }), { status: 400 });
        }

        return new Response(JSON.stringify(blog), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ message: error.message }), { status: 500 });
    }
}