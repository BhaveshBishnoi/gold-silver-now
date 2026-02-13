'use client';

import { useState } from 'react';
import { Box, Button, TextField, Typography, Container, Paper, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function PushBlogPage() {
    const router = useRouter();
    const [jsonData, setJsonData] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async () => {
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            // Validate JSON
            let parsedData;
            try {
                parsedData = JSON.parse(jsonData);
            } catch (e) {
                throw new Error("Invalid JSON format");
            }

            // Ensure it's an array for bulk upload or object for single upload
            const payload = Array.isArray(parsedData) ? parsedData : [parsedData];

            // Validate required fields for at least the first item to fail fast
            if (!payload[0]?.title) {
                throw new Error("JSON must contain at least a 'title' field.");
            }

            // We'll process each post one by one to handle success/failures gracefully or just one batch
            // For simplicity, let's just send the first one if it's an object, or loop through array

            let successCount = 0;
            let failCount = 0;

            for (const post of payload) {
                const res = await fetch('/api/posts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(post),
                });

                if (res.ok) {
                    successCount++;
                } else {
                    failCount++;
                    console.error("Failed to push post:", post.title);
                }
            }

            setSuccess(`Successfully pushed ${successCount} post(s). ${failCount > 0 ? `Failed: ${failCount}` : ''}`);
            if (successCount > 0) {
                setJsonData(''); // Clear form on success
            }

        } catch (err: any) {
            setError(err.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const exampleJson = {
        title: "Example Blog Post",
        slug: "example-blog-post",
        content: "<p>This is the HTML content of the blog post.</p>",
        excerpt: "A short summary of the post.",
        coverImage: "https://example.com/image.jpg",
        published: true,
        metaTitle: "SEO Title",
        metaDescription: "SEO Description",
        keywords: "marketing, seo, blog"
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
            <Typography variant="h4" fontWeight={700} gutterBottom>
                Push JSON Data
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
                Directly push blog posts using raw JSON. Useful for bulk imports or programmatic content generation.
            </Typography>

            <Paper sx={{ p: 4, borderRadius: 2 }}>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

                <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" gutterBottom>
                        Paste JSON Payload
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                        Accepts a single object or an array of objects.
                    </Typography>
                    <TextField
                        fullWidth
                        multiline
                        rows={15}
                        variant="outlined"
                        placeholder={JSON.stringify(exampleJson, null, 2)}
                        value={jsonData}
                        onChange={(e) => setJsonData(e.target.value)}
                        sx={{ fontFamily: 'monospace' }}
                        InputProps={{
                            sx: { fontFamily: 'monospace', fontSize: '0.875rem' }
                        }}
                    />
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={handleSubmit}
                        disabled={loading || !jsonData.trim()}
                    >
                        {loading ? 'Pushing...' : 'Push Data'}
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => setJsonData(JSON.stringify(exampleJson, null, 2))}
                    >
                        Load Example
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}
