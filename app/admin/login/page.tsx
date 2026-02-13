'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, Lock } from 'lucide-react';
import { cn } from "@/lib/utils";

export default function AdminLogin() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError('Invalid credentials');
                setLoading(false);
            } else {
                router.push('/admin');
                router.refresh(); // Refresh to update session state
            }
        } catch (err) {
            setError('Something went wrong');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-900 bg-[linear-gradient(135deg,#1e293b_0%,#0f172a_100%)]">
            {/* Background Elements */}
            <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(circle,rgba(217,119,6,0.15)_0%,rgba(0,0,0,0)_70%)] blur-[60px]" />
            <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(circle,rgba(234,88,12,0.15)_0%,rgba(0,0,0,0)_70%)] blur-[60px]" />

            <div className="relative z-10 w-full max-w-sm px-4">
                <Card className="border border-white/10 bg-white/5 backdrop-blur-[20px] text-white shadow-2xl">
                    <CardHeader className="flex flex-col items-center space-y-2 pb-2">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary mb-2 shadow-[0_0_20px_rgba(217,119,6,0.5)]">
                            <Lock className="h-7 w-7 text-primary-foreground" />
                        </div>
                        <CardTitle className="text-2xl font-bold tracking-tight">Admin Access</CardTitle>
                        <CardDescription className="text-slate-400">
                            Sign in to manage your application
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && (
                                <Alert variant="destructive" className="bg-red-900/50 border-red-900 text-red-200">
                                    <AlertTitle>Error</AlertTitle>
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-slate-300">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="admin@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={loading}
                                    required
                                    className="bg-white/5 border-white/20 text-white placeholder:text-slate-500 focus-visible:ring-primary focus-visible:border-primary"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-slate-300">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={loading}
                                    required
                                    className="bg-white/5 border-white/20 text-white focus-visible:ring-primary focus-visible:border-primary"
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full text-base font-bold shadow-[0_4px_14px_0_rgba(217,119,6,0.39)]"
                                size="lg"
                                disabled={loading}
                            >
                                {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : 'Sign In'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
