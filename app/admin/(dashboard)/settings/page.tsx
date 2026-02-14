
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Save, Lock, User, Shield, Bell, Key } from 'lucide-react';

export default async function AdminSettingsPage() {
    const session = await auth();
    if (!session) return <div className="p-8 text-center text-muted-foreground">Access Denied</div>;

    const userInitial = session.user?.name?.[0] || 'A';

    return (
        <div className="container mx-auto py-8 max-w-5xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Settings</h1>
                <p className="text-slate-500 mt-1">Manage your account preferences and security.</p>
            </div>

            <Tabs defaultValue="general" className="w-full">
                <TabsList className="bg-white p-1 rounded-xl shadow-sm border border-slate-100 mb-8 h-auto w-full md:w-auto flex-col md:flex-row justify-start">
                    <TabsTrigger value="general" className="rounded-lg px-6 py-2.5 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 font-medium">
                        <User className="mr-2 h-4 w-4" /> General
                    </TabsTrigger>
                    <TabsTrigger value="security" className="rounded-lg px-6 py-2.5 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 font-medium">
                        <Lock className="mr-2 h-4 w-4" /> Security
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="rounded-lg px-6 py-2.5 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 font-medium">
                        <Bell className="mr-2 h-4 w-4" /> Notifications
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-6 animate-in fade-in-50 duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Profile Card */}
                        <Card className="md:col-span-1 h-fit border-none shadow-sm bg-white rounded-xl overflow-hidden">
                            <div className="h-24 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                            <div className="px-6 pb-6 -mt-12 text-center">
                                <Avatar className="h-24 w-24 mx-auto border-4 border-white shadow-sm">
                                    <AvatarImage src="/avatars/01.png" alt={session.user?.name || ''} />
                                    <AvatarFallback className="text-3xl bg-blue-100 text-blue-600 font-bold">
                                        {userInitial}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="mt-4">
                                    <h3 className="text-xl font-bold text-slate-900">{session.user?.name || 'Admin User'}</h3>
                                    <p className="text-sm text-slate-500">{session.user?.email}</p>
                                </div>
                                <div className="mt-4 flex justify-center">
                                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1 rounded-full border-none">
                                        Super Admin
                                    </Badge>
                                </div>
                            </div>
                        </Card>

                        {/* Profile Form */}
                        <Card className="md:col-span-2 border-none shadow-sm bg-white rounded-xl">
                            <CardHeader>
                                <CardTitle>Profile Information</CardTitle>
                                <CardDescription>Update your personal details here.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="fullName" className="text-slate-600">Full Name</Label>
                                        <Input id="fullName" name="name" defaultValue={session.user?.name || ''} className="bg-slate-50 border-slate-200" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-slate-600">Email Address</Label>
                                        <Input id="email" name="email" defaultValue={session.user?.email || ''} disabled className="bg-slate-100 text-slate-500 border-none" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="bio" className="text-slate-600">Bio</Label>
                                    <Textarea
                                        id="bio"
                                        name="bio"
                                        placeholder="Tell us a little about yourself..."
                                        className="min-h-[120px] bg-slate-50 border-slate-200"
                                    />
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-end border-t border-slate-50 pt-6">
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm rounded-lg">
                                    <Save className="mr-2 h-4 w-4" /> Save Changes
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="security" className="animate-in fade-in-50 duration-300">
                    <Card className="border-none shadow-sm bg-white rounded-xl max-w-2xl">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Key className="h-5 w-5 text-blue-600" /> Password & Security
                            </CardTitle>
                            <CardDescription>Manage your password and security preferences.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="currentPassword">Current Password</Label>
                                <Input id="currentPassword" type="password" className="bg-slate-50 border-slate-200" />
                            </div>
                            <Separator className="my-4" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="newPassword">New Password</Label>
                                    <Input id="newPassword" type="password" className="bg-slate-50 border-slate-200" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                                    <Input id="confirmPassword" type="password" className="bg-slate-50 border-slate-200" />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end border-t border-slate-50 pt-6">
                            <Button variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                                Update Password
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="notifications" className="animate-in fade-in-50 duration-300">
                    <Card className="border-none shadow-sm bg-white rounded-xl max-w-2xl">
                        <CardHeader>
                            <CardTitle>Notifications</CardTitle>
                            <CardDescription>Configure how you receive alerts.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="p-8 text-center text-slate-500">
                                <Bell className="h-12 w-12 mx-auto text-slate-200 mb-4" />
                                <p>Notification settings coming soon.</p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
