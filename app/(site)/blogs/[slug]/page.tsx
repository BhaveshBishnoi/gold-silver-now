import { prisma } from '@/lib/prisma';
import { Container, Typography, Box, Button, Alert } from '@mui/material';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { NextLinkButton } from '@/components/NextLink';

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
                <NextLinkButton href="/blogs" sx={{ mt: 2 }}>
                    Back to Blogs
                </NextLinkButton>
            </Container>
        );
    }

    if (!post || !post.published) {
        notFound();
    }

    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            <NextLinkButton href="/blogs" sx={{ mb: 4 }} variant="text">
                &larr; Back to Blogs
            </NextLinkButton>

            <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 800 }}>
                {post.title}
            </Typography>

            <Typography variant="subtitle1" color="text.secondary" gutterBottom sx={{ mb: 4 }}>
                Published on {new Date(post.createdAt).toLocaleDateString()}
            </Typography>

            {post.coverImage && (
                <Box component="img" src={post.coverImage} alt={post.title} sx={{ width: '100%', height: 'auto', borderRadius: 2, mb: 4 }} />
            )}

            <Box
                sx={{
                    typography: 'body1',
                    lineHeight: 1.8,
                    '& img': {
                        maxWidth: '100%',
                        height: 'auto',
                        borderRadius: 2,
                        my: 2
                    },
                    '& h2': { mt: 4, mb: 2, fontWeight: 700 },
                    '& h3': { mt: 3, mb: 1, fontWeight: 600 },
                    '& p': { mb: 2 },
                    '& ul, & ol': { mb: 2, pl: 4 },
                    '& li': { mb: 1 },
                    '& a': { color: 'primary.main', textDecoration: 'underline' }
                }}
                dangerouslySetInnerHTML={{ __html: post.content }}
            />
        </Container>
    );
}
