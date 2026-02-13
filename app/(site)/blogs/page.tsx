import { prisma } from '@/lib/prisma';
import { Container, Typography, Grid, Card, CardContent, CardMedia, CardActionArea, Box, Alert } from '@mui/material';
import Link from 'next/link';
import { NextLinkCardActionArea } from '@/components/NextLink';

export const metadata = {
    title: 'Blogs - Gold Silver Now',
    description: 'Latest updates and news about Gold and Silver markets.',
};

export const dynamic = 'force-dynamic';

export default async function BlogsPage() {
    let posts: any[] = [];
    let error = null;

    try {
        posts = await prisma.post.findMany({
            where: { published: true },
            orderBy: { createdAt: 'desc' },
        });
    } catch (e) {
        console.error("Failed to fetch posts:", e);
        error = "Unable to connect to the database. Please check your configuration.";
    }

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Typography variant="h2" component="h1" gutterBottom sx={{
                fontWeight: 800,
                letterSpacing: '-0.025em',
                background: 'linear-gradient(90deg, #d97706, #b45309)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 6,
                textAlign: 'center'
            }}>
                Latest Market Insights
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 4 }}>{error}</Alert>
            )}

            {!error && posts.length === 0 ? (
                <Typography variant="h6" align="center" color="text.secondary">
                    No blogs available at the moment. Please check back later.
                </Typography>
            ) : (
                <Grid container spacing={4}>
                    {posts.map((post: any) => (
                        <Grid size={{ xs: 12, md: 4 }} key={post.id}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: '0.3s', '&:hover': { transform: 'translateY(-5px)', boxShadow: 6 }, borderRadius: 3, overflow: 'hidden' }}>
                                <NextLinkCardActionArea href={`/blogs/${post.slug}`} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                                    {post.coverImage && (
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={post.coverImage}
                                            alt={post.title}
                                            sx={{ objectFit: 'cover' }}
                                        />
                                    )}
                                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
                                        <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold', fontSize: '1.25rem', lineHeight: 1.3, mb: 1 }}>
                                            {post.title}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
                                            {new Date(post.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical',
                                            lineHeight: 1.6
                                        }}>
                                            {post.excerpt || (post.content ? post.content.replace(/<[^>]*>?/gm, '').substring(0, 120) + '...' : '')}
                                        </Typography>
                                    </CardContent>
                                </NextLinkCardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
}
