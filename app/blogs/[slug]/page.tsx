import { prisma } from '@/lib/prisma';
import { Container, Typography, Box, Button, Alert } from '@mui/material';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await prisma.post.findUnique({
        where: { slug: slug },
        select: { title: true, excerpt: true },
    });
    if (!post) return;
    return {
        title: `${post.title} - Gold Silver Now`,
        description: post.excerpt,
    };
}

export const dynamic = 'force-dynamic';

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    let post = null;
    let error = null;

    try {
        post = await prisma.post.findUnique({
            where: { slug: slug },
        });
    } catch (e) {
        console.error("Failed to fetch post:", e);
        error = "Failed to load blog post.";
    }

    if (error) {
        return (
            <Container maxWidth="md" sx={{ py: 8 }}>
                <Alert severity="error">{error}</Alert>
                <Button component={Link} href="/blogs" sx={{ mt: 2 }}>
                    Back to Blogs
                </Button>
            </Container>
        );
    }

    if (!post || !post.published) {
        notFound();
    }

    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            <Button component={Link} href="/blogs" sx={{ mb: 4 }} variant="text">
                &larr; Back to Blogs
            </Button>

            <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 800 }}>
                {post.title}
            </Typography>

            <Typography variant="subtitle1" color="text.secondary" gutterBottom sx={{ mb: 4 }}>
                Published on {new Date(post.createdAt).toLocaleDateString()}
            </Typography>

            {post.coverImage && (
                <Box component="img" src={post.coverImage} alt={post.title} sx={{ width: '100%', height: 'auto', borderRadius: 2, mb: 4 }} />
            )}

            <Box sx={{ typography: 'body1', lineHeight: 1.8 }}>
                {post.content.split('\n').map((paragraph: any, index: any) => (
                    <Typography key={index} paragraph component="div">
                        {paragraph}
                    </Typography>
                ))}
            </Box>
        </Container>
    );
}
