'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { createUser, updateUser, deleteUser } from "./actions";
import { Plus, Edit, Trash2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface User {
    id: string;
    name: string | null;
    email: string | null;
    role: string;
}

export function CreateUserDialog() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData(e.currentTarget);
            await createUser(formData);
            toast.success("User created successfully");
            setOpen(false);
            e.currentTarget.reset();
        } catch (error: any) {
            toast.error(error.message || "Failed to create user");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Add User
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-white border-gray-200 shadow-xl">
                <form onSubmit={handleSubmit}>
                    <DialogHeader className="border-b border-gray-100 pb-4">
                        <DialogTitle className="text-xl font-bold text-[#050505]">Create New User</DialogTitle>
                        <DialogDescription className="text-[#65676B]">
                            Add a new user to the system. All fields are required.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-5 py-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name" className="text-sm font-semibold text-[#050505]">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="John Doe"
                                required
                                className="bg-[#f7f8fa] border-gray-200 focus:border-primary focus:ring-primary"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email" className="text-sm font-semibold text-[#050505]">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="john@example.com"
                                required
                                className="bg-[#f7f8fa] border-gray-200 focus:border-primary focus:ring-primary"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password" className="text-sm font-semibold text-[#050505]">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                required
                                className="bg-[#f7f8fa] border-gray-200 focus:border-primary focus:ring-primary"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="role" className="text-sm font-semibold text-[#050505]">Role</Label>
                            <Select name="role" defaultValue="admin">
                                <SelectTrigger className="bg-[#f7f8fa] border-gray-200 focus:border-primary focus:ring-primary">
                                    <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent className="bg-white border-gray-200">
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="editor">Editor</SelectItem>
                                    <SelectItem value="viewer">Viewer</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter className="border-t border-gray-100 pt-4">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)} className="border-gray-200">
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading} className="bg-primary hover:bg-primary/90">
                            {loading ? "Creating..." : "Create User"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export function EditUserDialog({ user }: { user: User }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData(e.currentTarget);
            await updateUser(user.id, formData);
            toast.success("User updated successfully");
            setOpen(false);
        } catch (error: any) {
            toast.error(error.message || "Failed to update user");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-white border-gray-200 shadow-xl">
                <form onSubmit={handleSubmit}>
                    <DialogHeader className="border-b border-gray-100 pb-4">
                        <DialogTitle className="text-xl font-bold text-[#050505]">Edit User</DialogTitle>
                        <DialogDescription className="text-[#65676B]">
                            Update user information. Leave password blank to keep current password.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-5 py-6">
                        <div className="grid gap-2">
                            <Label htmlFor="edit-name" className="text-sm font-semibold text-[#050505]">Name</Label>
                            <Input
                                id="edit-name"
                                name="name"
                                defaultValue={user.name || ""}
                                required
                                className="bg-[#f7f8fa] border-gray-200 focus:border-primary focus:ring-primary"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-email" className="text-sm font-semibold text-[#050505]">Email</Label>
                            <Input
                                id="edit-email"
                                name="email"
                                type="email"
                                defaultValue={user.email || ""}
                                required
                                className="bg-[#f7f8fa] border-gray-200 focus:border-primary focus:ring-primary"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-password" className="text-sm font-semibold text-[#050505]">Password (optional)</Label>
                            <Input
                                id="edit-password"
                                name="password"
                                type="password"
                                placeholder="Leave blank to keep current"
                                className="bg-[#f7f8fa] border-gray-200 focus:border-primary focus:ring-primary"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-role" className="text-sm font-semibold text-[#050505]">Role</Label>
                            <Select name="role" defaultValue={user.role}>
                                <SelectTrigger className="bg-[#f7f8fa] border-gray-200 focus:border-primary focus:ring-primary">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-white border-gray-200">
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="editor">Editor</SelectItem>
                                    <SelectItem value="viewer">Viewer</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter className="border-t border-gray-100 pt-4">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)} className="border-gray-200">
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading} className="bg-primary hover:bg-primary/90">
                            {loading ? "Updating..." : "Update User"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export function DeleteUserDialog({ userId }: { userId: string }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleDelete() {
        setLoading(true);
        try {
            await deleteUser(userId);
            toast.success("User deleted successfully");
            setOpen(false);
        } catch (error: any) {
            toast.error(error.message || "Failed to delete user");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[450px] bg-white border-gray-200 shadow-xl">
                <DialogHeader className="border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-red-50 flex items-center justify-center">
                            <AlertTriangle className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                            <DialogTitle className="text-xl font-bold text-[#050505]">Delete User</DialogTitle>
                            <DialogDescription className="text-[#65676B] mt-1">
                                This action cannot be undone
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>
                <div className="py-6">
                    <p className="text-[#050505] leading-relaxed">
                        Are you sure you want to delete this user? All of their data will be permanently removed from the system.
                    </p>
                </div>
                <DialogFooter className="border-t border-gray-100 pt-4">
                    <Button variant="outline" onClick={() => setOpen(false)} className="border-gray-200">
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={loading}
                        className="bg-red-600 hover:bg-red-700"
                    >
                        {loading ? "Deleting..." : "Delete User"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
