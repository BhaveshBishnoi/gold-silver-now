
import { prisma } from "@/lib/prisma";
import { type Post } from "@prisma/client";
import { auth } from "@/lib/auth";
import {
    Container,
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    IconButton
} from "@mui/material";
import { NextLinkButton, NextLinkIconButton } from '@/components/NextLink';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import { revalidatePath } from 'next/cache';

export default async function AdminBlogsPage() {
    const session = await auth();
    if (!session) return <Typography>Access Denied</Typography>;

    const posts = await prisma.post.findMany({
        orderBy: { createdAt: 'desc' },
    });

    async function deletePost(id: string) {
        'use server'
        await prisma.post.delete({ where: { id } });
        revalidatePath('/admin/blogs');
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                <Typography variant="h4" gutterBottom>
                    All Blogs
                </Typography>
                <NextLinkButton
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    href="/admin/blogs/create"
                >
                    Create New
                </NextLinkButton>
            </Box>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell align="right">Slug</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {posts.map((post: Post) => (
                            <TableRow
                                key={post.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {post.title}
                                </TableCell>
                                <TableCell align="right">{post.slug}</TableCell>
                                <TableCell align="right">
                                    <Chip
                                        label={post.published ? "Published" : "Draft"}
                                        color={post.published ? "success" : "default"}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <NextLinkIconButton href={`/admin/blogs/${post.id}/edit`} color="primary">
                                        <EditIcon />
                                    </NextLinkIconButton>
                                    <NextLinkIconButton href={`/blogs/${post.slug}`} target="_blank" color="default">
                                        <VisibilityIcon />
                                    </NextLinkIconButton>
                                    <form action={deletePost.bind(null, post.id)} style={{ display: 'inline' }}>
                                        <IconButton type="submit" color="error">
                                            <DeleteIcon />
                                        </IconButton>
                                    </form>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}
