
'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { Box, Button, TextField, FormControlLabel, Checkbox, Container, Typography } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

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

export default function BlogForm({ post }: { post?: any }) {
    const router = useRouter();
    const [title, setTitle] = useState(post?.title || '');
    const [slug, setSlug] = useState(post?.slug || '');
    const [excerpt, setExcerpt] = useState(post?.excerpt || '');
    const [coverImage, setCoverImage] = useState(post?.coverImage || '');
    const [published, setPublished] = useState(post?.published || false);
    const [loading, setLoading] = useState(false);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Image,
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
                content
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
        <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
            <Typography variant="h4" gutterBottom>
                {post ? 'Edit Post' : 'Create New Post'}
            </Typography>
            <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <TextField
                        label="Title"
                        variant="outlined"
                        fullWidth
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <TextField
                        label="Slug (URL Friendly)"
                        variant="outlined"
                        fullWidth
                        required
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        helperText="Example: my-first-blog-post"
                    />

                    <TextField
                        label="Excerpt"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={3}
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                    />

                    <TextField
                        label="Cover Image URL"
                        variant="outlined"
                        fullWidth
                        value={coverImage}
                        onChange={(e) => setCoverImage(e.target.value)}
                        helperText="Paste a direct link to an image"
                    />

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

                    <Box sx={{ border: '1px solid #ccc', borderRadius: 1, p: 2, minHeight: '300px' }}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                            Body Content
                        </Typography>
                        <MenuBar editor={editor} />
                        <EditorContent editor={editor} style={{ minHeight: '250px', outline: 'none' }} />
                    </Box>

                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={loading}
                        sx={{ alignSelf: 'flex-start' }}
                    >
                        {loading ? 'Saving...' : (post ? 'Update Post' : 'Create Post')}
                    </Button>
                </Box>
            </form>
        </Container>
    );
}
