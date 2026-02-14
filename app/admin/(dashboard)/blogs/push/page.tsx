'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Upload, Code, CheckCircle2, AlertCircle } from 'lucide-react';

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
        <div className="container max-w-5xl mx-auto py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#050505] mb-2">Push JSON Data</h1>
                <p className="text-[#65676B] text-lg">
                    Directly push blog posts using raw JSON. Useful for bulk imports or programmatic content generation.
                </p>
            </div>

            <Card className="bg-white border border-gray-100 shadow-sm">
                <CardHeader className="border-b border-gray-100 bg-[#f7f8fa]">
                    <div className="flex items-center gap-2">
                        <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <Code className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <CardTitle className="text-[#050505]">Paste JSON Payload</CardTitle>
                            <CardDescription className="text-[#65676B]">Accepts a single object or an array of objects.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                    {error && (
                        <Alert variant="destructive" className="border-red-200 bg-red-50">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    {success && (
                        <Alert className="bg-green-50 text-green-700 border-green-200">
                            <CheckCircle2 className="h-4 w-4" />
                            <AlertTitle>Success</AlertTitle>
                            <AlertDescription>{success}</AlertDescription>
                        </Alert>
                    )}

                    <Textarea
                        className="font-mono text-sm min-h-[400px] bg-[#f7f8fa] border-gray-200 focus:border-primary focus:ring-primary"
                        placeholder={JSON.stringify(exampleJson, null, 2)}
                        value={jsonData}
                        onChange={(e) => setJsonData(e.target.value)}
                    />

                    <div className="flex gap-4">
                        <Button
                            size="lg"
                            onClick={handleSubmit}
                            disabled={loading || !jsonData.trim()}
                            className="bg-primary hover:bg-primary/90"
                        >
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {loading ? 'Pushing...' : (
                                <>
                                    <Upload className="mr-2 h-4 w-4" />
                                    Push Data
                                </>
                            )}
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => setJsonData(JSON.stringify(exampleJson, null, 2))}
                            className="border-gray-200"
                        >
                            Load Example
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
