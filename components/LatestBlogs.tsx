'use client';
import { Box, Card, CardContent, CardMedia, Typography, Grid, Button, Chip } from '@mui/material';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { format } from 'date-fns';

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    coverImage: string | null;
    createdAt: string;
}

interface LatestBlogsProps {
    blogs: BlogPost[];
}

const LatestBlogs = ({ blogs }: LatestBlogsProps) => {
    if (!blogs || blogs.length === 0) return null;

    return (
        <Box sx={{ py: 8 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" component="h2" fontWeight={800}>
                    Latest Updates
                </Typography>
                <Button
                    component={Link}
                    href="/blogs"
                    endIcon={<ArrowForwardIcon />}
                    sx={{ fontWeight: 600 }}
                >
                    View All
                </Button>
            </Box>

            <Grid container spacing={4}>
                {blogs.map((blog) => (
                    <Grid size={{ xs: 12, md: 4 }} key={blog.id}>
                        <Card sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            borderRadius: 4,
                            overflow: 'hidden',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-5px)',
                                boxShadow: '0 12px 30px rgba(0,0,0,0.1)'
                            }
                        }}>
                            <Box sx={{ position: 'relative', height: 200, bgcolor: 'grey.100' }}>
                                {blog.coverImage ? (
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={blog.coverImage}
                                        alt={blog.title}
                                        sx={{ objectFit: 'cover' }}
                                    />
                                ) : (
                                    <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'text.disabled' }}>
                                        <Typography variant="h3" fontWeight={700} sx={{ opacity: 0.2 }}>GSN</Typography>
                                    </Box>
                                )}
                            </Box>
                            <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                <Typography variant="caption" color="primary.main" fontWeight={700} sx={{ mb: 1, display: 'block' }}>
                                    {format(new Date(blog.createdAt), 'MMMM d, yyyy')}
                                </Typography>
                                <Typography variant="h6" component="h3" fontWeight={700} sx={{ mb: 1, lineHeight: 1.3 }}>
                                    <Link href={`/blogs/${blog.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                        {blog.title}
                                    </Link>
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: 'vertical',
                                }}>
                                    {blog.excerpt || 'Read the full article to learn more...'}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default LatestBlogs;
