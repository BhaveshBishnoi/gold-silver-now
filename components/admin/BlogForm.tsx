'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ImageExtension from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { Box, Button, TextField, FormControlLabel, Checkbox, Container, Typography, Tabs, Tab, Paper, Grid, Divider } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
// import CloudinaryUpload from './CloudinaryUpload'; // Component doesn't exist yet in file system, so I will define it inline or assume it exists. Actually I just created it.
import CloudinaryUpload from '@/components/admin/CloudinaryUpload';

const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) {
        return null;
    }

    return (
        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap', borderBottom: '1px solid #ddd', pb: 1 }}>
            <Button
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                variant={editor.isActive('bold') ? 'contained' : 'outlined'}
                size="small"
            >
                Bold
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                variant={editor.isActive('italic') ? 'contained' : 'outlined'}
                size="small"
            >
                Italic
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleCode().run()}
                disabled={!editor.can().chain().focus().toggleCode().run()}
                variant={editor.isActive('code') ? 'contained' : 'outlined'}
                size="small"
            >
                Code
            </Button>
            <Button
                onClick={() => editor.chain().focus().setParagraph().run()}
                variant={editor.isActive('paragraph') ? 'contained' : 'outlined'}
                size="small"
            >
                P
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                variant={editor.isActive('heading', { level: 1 }) ? 'contained' : 'outlined'}
                size="small"
            >
                H1
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                variant={editor.isActive('heading', { level: 2 }) ? 'contained' : 'outlined'}
                size="small"
            >
                H2
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                variant={editor.isActive('bulletList') ? 'contained' : 'outlined'}
                size="small"
            >
                Bullet List
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                variant={editor.isActive('orderedList') ? 'contained' : 'outlined'}
                size="small"
            >
                Numbered List
            </Button>
            <Button
                onClick={() => {
                    const url = window.prompt("Enter image URL");
                    if (url) {
                        editor.chain().focus().setImage({ src: url }).run();
                    }
                }}
                variant="outlined"
                size="small"
            >
                Image
            </Button>
        </Box>
    );
};

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ py: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

export default function BlogForm({ post }: { post?: any }) {
    const router = useRouter();
    const [tabValue, setTabValue] = useState(0);

    // Content Fields
    const [title, setTitle] = useState(post?.title || '');
    const [slug, setSlug] = useState(post?.slug || '');
    const [excerpt, setExcerpt] = useState(post?.excerpt || '');
    const [coverImage, setCoverImage] = useState(post?.coverImage || '');
    const [published, setPublished] = useState(post?.published || false);

    // SEO Fields
    const [metaTitle, setMetaTitle] = useState(post?.metaTitle || '');
    const [metaDescription, setMetaDescription] = useState(post?.metaDescription || '');
    const [keywords, setKeywords] = useState(post?.keywords || ''); // comma separated

    const [loading, setLoading] = useState(false);

    const editor = useEditor({
        extensions: [
            StarterKit,
            ImageExtension,
            Link.configure({
                openOnClick: false,
            }),
        ],
        content: post?.content || '<p>Start writing your amazing blog post here...</p>',
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            // Handle content update if needed for auto-save, etc.
        }
    });

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const content = editor?.getHTML();

        // Simple validation
        if (!content || content === '<p></p>') {
            alert("Content cannot be empty");
            setLoading(false);
            return;
        }

        try {
            const payload = {
                title,
                slug,
                excerpt,
                coverImage,
                published,
                content,
                metaTitle,
                metaDescription,
                keywords
            };

            const url = post ? `/api/posts/${post.id}` : '/api/posts';
            const method = post ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                router.push('/admin/blogs');
                router.refresh();
            } else {
                const errorData = await res.json();
                alert(`Error: ${errorData.message || 'Something went wrong'}`);
            }
        } catch (error) {
            console.error("Failed to save post", error);
            alert("Failed to save post");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" fontWeight={700}>
                    {post ? 'Edit Post' : 'Create New Post'}
                </Typography>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    size="large"
                    disabled={loading}
                >
                    {loading ? 'Saving...' : (post ? 'Update Post' : 'Create Post')}
                </Button>
            </Box>

            <form onSubmit={handleSubmit}>
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Paper sx={{ p: 0, borderRadius: 2, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.default' }}>
                                <Tabs value={tabValue} onChange={handleTabChange} aria-label="blog form tabs">
                                    <Tab label="Content" />
                                    <Tab label="SEO Settings" />
                                </Tabs>
                            </Box>

                            <Box sx={{ p: 4 }}>
                                <CustomTabPanel value={tabValue} index={0}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                        <TextField
                                            label="Post Title"
                                            variant="outlined"
                                            fullWidth
                                            required
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder="Enter an engaging title"
                                        />

                                        <TextField
                                            label="Slug (URL)"
                                            variant="outlined"
                                            fullWidth
                                            required
                                            value={slug}
                                            onChange={(e) => setSlug(e.target.value)}
                                            helperText="Example: my-first-blog-post (Clean URL)"
                                            InputProps={{
                                                startAdornment: <Typography color="text.secondary" sx={{ mr: 1, fontSize: '0.9rem' }}>/blogs/</Typography>
                                            }}
                                        />

                                        <TextField
                                            label="Excerpt / Summary"
                                            variant="outlined"
                                            fullWidth
                                            multiline
                                            rows={3}
                                            value={excerpt}
                                            onChange={(e) => setExcerpt(e.target.value)}
                                            placeholder="Brief summary for list view and social sharing"
                                        />

                                        <Box sx={{ border: '1px solid #ddd', borderRadius: 2, overflow: 'hidden' }}>
                                            <Box sx={{ p: 2, bgcolor: 'background.default', borderBottom: '1px solid #ddd' }}>
                                                <Typography variant="subtitle2" fontWeight={600}>
                                                    Editor
                                                </Typography>
                                            </Box>
                                            <Box sx={{ p: 2 }}>
                                                <MenuBar editor={editor} />
                                                <EditorContent editor={editor} style={{ minHeight: '400px', outline: 'none' }} className="prose max-w-none" />
                                            </Box>
                                        </Box>
                                    </Box>
                                </CustomTabPanel>

                                <CustomTabPanel value={tabValue} index={1}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                        <Typography variant="h6" gutterBottom>
                                            Search Engine Optimization
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" paragraph>
                                            Optimize your post for search engines. If left empty, title and excerpt will be used.
                                        </Typography>

                                        <TextField
                                            label="Meta Title"
                                            fullWidth
                                            value={metaTitle}
                                            onChange={(e) => setMetaTitle(e.target.value)}
                                            helperText="Title tag for search engines (50-60 chars recommended)"
                                        />

                                        <TextField
                                            label="Meta Description"
                                            fullWidth
                                            multiline
                                            rows={3}
                                            value={metaDescription}
                                            onChange={(e) => setMetaDescription(e.target.value)}
                                            helperText="Description for search results (150-160 chars recommended)"
                                        />

                                        <TextField
                                            label="Keywords"
                                            fullWidth
                                            value={keywords}
                                            onChange={(e) => setKeywords(e.target.value)}
                                            helperText="Comma separated keywords (e.g. gold, silver, market trends)"
                                        />
                                    </Box>
                                </CustomTabPanel>
                            </Box>
                        </Paper>
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <Paper sx={{ p: 3, borderRadius: 2 }}>
                                <Typography variant="h6" gutterBottom fontWeight={600}>
                                    Publishing
                                </Typography>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={published}
                                            onChange={(e) => setPublished(e.target.checked)}
                                            color="primary"
                                        />
                                    }
                                    label="Publish immediately"
                                />
                                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                                    <Button fullWidth variant="outlined" disabled={loading}>
                                        Save Draft
                                    </Button>
                                    <Button fullWidth variant="contained" onClick={handleSubmit} disabled={loading}>
                                        Publish
                                    </Button>
                                </Box>
                            </Paper>

                            <Paper sx={{ p: 3, borderRadius: 2 }}>
                                <Typography variant="h6" gutterBottom fontWeight={600}>
                                    Cover Image
                                </Typography>
                                {process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ? (
                                    /* @ts-ignore */
                                    <CloudinaryUpload
                                        onUpload={(url) => setCoverImage(url)}
                                        currentImage={coverImage}
                                    />
                                ) : (
                                    <Box>
                                        <TextField
                                            label="Image URL"
                                            fullWidth
                                            size="small"
                                            value={coverImage}
                                            onChange={(e) => setCoverImage(e.target.value)}
                                            sx={{ mb: 2 }}
                                        />
                                        <Typography variant="caption" color="error">
                                            Configure Cloudinary in .env to enable uploads
                                        </Typography>
                                    </Box>
                                )}
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}
