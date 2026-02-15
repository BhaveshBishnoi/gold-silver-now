'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ImageExtension from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CloudinaryUpload from '@/components/admin/CloudinaryUpload';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
    Bold,
    Italic,
    Code,
    Pilcrow,
    Heading1,
    Heading2,
    List,
    ListOrdered,
    Image as ImageIcon,
    Loader2,
    Table as TableIcon,
    Plus,
    Minus
} from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";


const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) {
        return null;
    }

    // ToggleGroup works for exclusive options, but here we have multiple separate commands.
    // So we'll use individual Buttons or separate groups.
    // Let's use simple icon buttons.

    const TextButton = ({ onClick, disabled, isActive, children, title }: any) => (
        <Button
            type="button"
            variant={isActive ? "secondary" : "ghost"}
            size="sm"
            onClick={onClick}
            disabled={disabled}
            className="h-8 w-8 p-0"
            title={title}
        >
            {children}
        </Button>
    )

    return (
        <div className="flex flex-wrap gap-1 p-2 border-b bg-muted/20">
            <TextButton
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                isActive={editor.isActive('bold')}
                title="Bold"
            >
                <Bold className="h-4 w-4" />
            </TextButton>
            <TextButton
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                isActive={editor.isActive('italic')}
                title="Italic"
            >
                <Italic className="h-4 w-4" />
            </TextButton>
            <TextButton
                onClick={() => editor.chain().focus().toggleCode().run()}
                disabled={!editor.can().chain().focus().toggleCode().run()}
                isActive={editor.isActive('code')}
                title="Code"
            >
                <Code className="h-4 w-4" />
            </TextButton>
            <Separator orientation="vertical" className="h-8 mx-1" />
            <TextButton
                onClick={() => editor.chain().focus().setParagraph().run()}
                isActive={editor.isActive('paragraph')}
                title="Paragraph"
            >
                <Pilcrow className="h-4 w-4" />
            </TextButton>
            <TextButton
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                isActive={editor.isActive('heading', { level: 1 })}
                title="Heading 1"
            >
                <Heading1 className="h-4 w-4" />
            </TextButton>
            <TextButton
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                isActive={editor.isActive('heading', { level: 2 })}
                title="Heading 2"
            >
                <Heading2 className="h-4 w-4" />
            </TextButton>
            <Separator orientation="vertical" className="h-8 mx-1" />
            <TextButton
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                isActive={editor.isActive('bulletList')}
                title="Bullet List"
            >
                <List className="h-4 w-4" />
            </TextButton>
            <TextButton
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                isActive={editor.isActive('orderedList')}
                title="Ordered List"
            >
                <ListOrdered className="h-4 w-4" />
            </TextButton>
            <Separator orientation="vertical" className="h-8 mx-1" />
            <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => {
                    const url = window.prompt("Enter image URL");
                    if (url) {
                        editor.chain().focus().setImage({ src: url }).run();
                    }
                }}
                title="Insert Image"
            >
                <ImageIcon className="h-4 w-4" />
            </Button>
            <Separator orientation="vertical" className="h-8 mx-1" />
            <TextButton
                onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
                disabled={!editor.can().insertTable()}
                title="Insert Table"
            >
                <TableIcon className="h-4 w-4" />
            </TextButton>
            {editor.isActive('table') && (
                <>
                    <TextButton
                        onClick={() => editor.chain().focus().addRowAfter().run()}
                        disabled={!editor.can().addRowAfter()}
                        title="Add Row"
                    >
                        <Plus className="h-4 w-4" />
                    </TextButton>
                    <TextButton
                        onClick={() => editor.chain().focus().deleteRow().run()}
                        disabled={!editor.can().deleteRow()}
                        title="Delete Row"
                    >
                        <Minus className="h-4 w-4" />
                    </TextButton>
                    <TextButton
                        onClick={() => editor.chain().focus().addColumnAfter().run()}
                        disabled={!editor.can().addColumnAfter()}
                        title="Add Column"
                    >
                        <Plus className="h-4 w-4" />
                    </TextButton>
                    <TextButton
                        onClick={() => editor.chain().focus().deleteColumn().run()}
                        disabled={!editor.can().deleteColumn()}
                        title="Delete Column"
                    >
                        <Minus className="h-4 w-4" />
                    </TextButton>
                    <TextButton
                        onClick={() => editor.chain().focus().deleteTable().run()}
                        disabled={!editor.can().deleteTable()}
                        title="Delete Table"
                    >
                        <TableIcon className="h-4 w-4" />
                    </TextButton>
                </>
            )}
        </div>
    );
};


export default function BlogForm({ post }: { post?: any }) {
    const router = useRouter();

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
            Table.configure({
                resizable: true,
            }),
            TableRow,
            TableHeader,
            TableCell,
        ],
        content: post?.content || '<p>Start writing your amazing blog post here...</p>',
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none min-h-[300px]',
            },
        },
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
        <div className="mt-6 mb-12">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold tracking-tight">
                    {post ? 'Edit Post' : 'Create New Post'}
                </h1>
                <Button
                    onClick={handleSubmit}
                    size="lg"
                    disabled={loading}
                >
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {loading ? 'Saving...' : (post ? 'Update Post' : 'Create Post')}
                </Button>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardContent className="p-0">
                                <Tabs defaultValue="content" className="w-full">
                                    <div className="border-b px-6 py-2 bg-muted/10">
                                        <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
                                            <TabsTrigger value="content">Content</TabsTrigger>
                                            <TabsTrigger value="seo">SEO Settings</TabsTrigger>
                                        </TabsList>
                                    </div>

                                    <div className="p-6">
                                        <TabsContent value="content" className="mt-0 space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="title">Post Title</Label>
                                                <Input
                                                    id="title"
                                                    value={title}
                                                    onChange={(e) => setTitle(e.target.value)}
                                                    placeholder="Enter an engaging title"
                                                    required
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="slug">Slug (URL)</Label>
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-sm text-muted-foreground whitespace-nowrap">/blogs/</span>
                                                    <Input
                                                        id="slug"
                                                        value={slug}
                                                        onChange={(e) => setSlug(e.target.value)}
                                                        placeholder="my-first-blog-post"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="excerpt">Excerpt / Summary</Label>
                                                <Textarea
                                                    id="excerpt"
                                                    value={excerpt}
                                                    onChange={(e) => setExcerpt(e.target.value)}
                                                    placeholder="Brief summary for list view and social sharing"
                                                    rows={3}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Content Editor</Label>
                                                <div className="border rounded-md shadow-sm bg-background overflow-hidden focus-within:ring-2 focus-within:ring-ring">
                                                    <MenuBar editor={editor} />
                                                    <EditorContent editor={editor} />
                                                </div>
                                            </div>
                                        </TabsContent>

                                        <TabsContent value="seo" className="mt-0 space-y-4">
                                            <div className="mb-4">
                                                <h3 className="text-lg font-medium">Search Engine Optimization</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Optimize your post for search engines. If left empty, title and excerpt will be used.
                                                </p>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="metaTitle">Meta Title</Label>
                                                <Input
                                                    id="metaTitle"
                                                    value={metaTitle}
                                                    onChange={(e) => setMetaTitle(e.target.value)}
                                                    placeholder="Title tag for search engines (50-60 chars)"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="metaDescription">Meta Description</Label>
                                                <Textarea
                                                    id="metaDescription"
                                                    value={metaDescription}
                                                    onChange={(e) => setMetaDescription(e.target.value)}
                                                    placeholder="Description for search results (150-160 chars)"
                                                    rows={3}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="keywords">Keywords</Label>
                                                <Input
                                                    id="keywords"
                                                    value={keywords}
                                                    onChange={(e) => setKeywords(e.target.value)}
                                                    placeholder="Comma separated keywords (e.g. gold, silver, market trends)"
                                                />
                                            </div>
                                        </TabsContent>
                                    </div>
                                </Tabs>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar Area */}
                    <div className="grid gap-6 auto-rows-min">
                        <Card>
                            <CardHeader>
                                <CardTitle>Publishing</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="published"
                                        checked={published}
                                        onCheckedChange={(checked) => setPublished(checked as boolean)}
                                    />
                                    <Label htmlFor="published" className="cursor-pointer">Publish immediately</Label>
                                </div>
                                <div className="grid gap-2">
                                    <Button variant="outline" type="button" disabled={loading}>
                                        Save Draft
                                    </Button>
                                    <Button onClick={handleSubmit} type="button" disabled={loading}>
                                        Publish
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Cover Image</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ? (
                                    <CloudinaryUpload
                                        onUpload={(url) => setCoverImage(url)}
                                        currentImage={coverImage}
                                    />
                                ) : (
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="imageUrl">Image URL</Label>
                                            <Input
                                                id="imageUrl"
                                                value={coverImage}
                                                onChange={(e) => setCoverImage(e.target.value)}
                                                placeholder="https://example.com/image.jpg"
                                            />
                                        </div>
                                        <p className="text-xs text-destructive font-medium">
                                            Configure Cloudinary key in .env to enable uploads
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </form>
        </div>
    );
}
