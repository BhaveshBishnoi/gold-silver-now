
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { Container, Grid, Paper, Typography, Box } from "@mui/material";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    const session = await auth();
    if (!session) return <Typography>Access Denied</Typography>;

    const totalPosts = await prisma.post.count();
    const publishedPosts = await prisma.post.count({ where: { published: true } });
    const draftPosts = totalPosts - publishedPosts;

    const stats = [
        { title: "Total Posts", value: totalPosts, color: "#1976d2" },
        { title: "Published", value: publishedPosts, color: "#2e7d32" },
        { title: "Drafts", value: draftPosts, color: "#ed6c02" },
    ];

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>
            <Grid container spacing={3}>
                {stats.map((stat) => (
                    <Grid size={{ xs: 12, md: 4 }} key={stat.title}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 140,
                                bgcolor: stat.color,
                                color: 'white'
                            }}
                        >
                            <Typography component="h2" variant="h6" gutterBottom>
                                {stat.title}
                            </Typography>
                            <Typography component="p" variant="h3">
                                {stat.value}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}
