
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
import { Separator } from "@/components/ui/separator";
import { Save, Lock, User, Shield } from 'lucide-react';

export default async function AdminSettingsPage() {
    const session = await auth();
    if (!session) return <div className="p-8 text-center text-muted-foreground">Access Denied</div>;

    const userInitial = session.user?.name?.[0] || 'A';

    return (
        <div className="container mx-auto py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
                <p className="text-muted-foreground">Manage your profile, security, and application preferences.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Profile Card */}
                <Card className="md:col-span-1 h-fit text-center">
                    <CardHeader>
                        <Avatar className="h-24 w-24 mx-auto mb-2">
                            <AvatarImage src="/avatars/01.png" alt={session.user?.name || ''} />
                            <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                                {userInitial}
                            </AvatarFallback>
                        </Avatar>
                        <CardTitle>{session.user?.name || 'Admin User'}</CardTitle>
                        <CardDescription>{session.user?.email}</CardDescription>
                        <div className="pt-2">
                            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                                <Shield className="h-3 w-3 mr-1" /> Super Admin
                            </Badge>
                        </div>
                    </CardHeader>
                </Card>

                <div className="md:col-span-2 space-y-6">
                    {/* Profile Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Details</CardTitle>
                            <CardDescription>Update your personal information.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="fullName">Full Name</Label>
                                    <Input id="fullName" name="name" defaultValue={session.user?.name || ''} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input id="email" name="email" defaultValue={session.user?.email || ''} disabled />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bio">Bio</Label>
                                <Textarea
                                    id="bio"
                                    name="bio"
                                    placeholder="Tell us a little about yourself..."
                                    className="min-h-[100px]"
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button>
                                <Save className="mr-2 h-4 w-4" /> Save Profile
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Security */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Lock className="h-4 w-4" /> Security
                            </CardTitle>
                            <CardDescription>Update your password and security settings.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="currentPassword">Current Password</Label>
                                    <Input id="currentPassword" name="currentPassword" type="password" />
                                </div>
                                <div className="md:block hidden" /> {/* Spacer */}

                                <div className="space-y-2">
                                    <Label htmlFor="newPassword">New Password</Label>
                                    <Input id="newPassword" name="newPassword" type="password" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                    <Input id="confirmPassword" name="confirmPassword" type="password" />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline">
                                Update Password
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
