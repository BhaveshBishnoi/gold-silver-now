
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Save, Info, Activity, Clock, Database } from 'lucide-react';

export default async function AdminPricingPage() {
    const session = await auth();
    if (!session) return <div className="p-8 text-center text-muted-foreground">Access Denied</div>;

    // In a real app, you would fetch these from a database or config
    const defaultSettings = {
        goldMargin: 2.5,
        silverMargin: 3.0,
        currency: 'INR',
        autoUpdate: true,
        updateInterval: 60
    };

    return (
        <div className="container mx-auto py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Price Configuration</h1>
                <p className="text-muted-foreground">Manage margins, currency settings, and API update frequency.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Margin Settings</CardTitle>
                            <CardDescription>Configure price margins and currency.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Alert className="mb-6 bg-blue-50 text-blue-800 border-blue-200">
                                <Info className="h-4 w-4 text-blue-800" />
                                <AlertTitle>Note</AlertTitle>
                                <AlertDescription>
                                    Margins are added on top of the live API market rates.
                                </AlertDescription>
                            </Alert>

                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="goldMargin">Gold Margin (%)</Label>
                                        <div className="relative">
                                            <Input
                                                id="goldMargin"
                                                type="number"
                                                defaultValue={defaultSettings.goldMargin}
                                                className="pr-8"
                                            />
                                            <span className="absolute right-3 top-2.5 text-sm text-muted-foreground">%</span>
                                        </div>
                                        <p className="text-[0.8rem] text-muted-foreground">Percentage added to Gold spot price</p>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="silverMargin">Silver Margin (%)</Label>
                                        <div className="relative">
                                            <Input
                                                id="silverMargin"
                                                type="number"
                                                defaultValue={defaultSettings.silverMargin}
                                                className="pr-8"
                                            />
                                            <span className="absolute right-3 top-2.5 text-sm text-muted-foreground">%</span>
                                        </div>
                                        <p className="text-[0.8rem] text-muted-foreground">Percentage added to Silver spot price</p>
                                    </div>
                                </div>

                                <Separator />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="currency">Base Currency</Label>
                                        <Select name="currency" defaultValue={defaultSettings.currency}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select currency" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="INR">INR (₹)</SelectItem>
                                                <SelectItem value="USD">USD ($)</SelectItem>
                                                <SelectItem value="EUR">EUR (€)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="updateInterval">Update Interval</Label>
                                        <div className="relative">
                                            <Input
                                                id="updateInterval"
                                                name="updateInterval"
                                                type="number"
                                                defaultValue={defaultSettings.updateInterval}
                                                className="pr-12"
                                            />
                                            <span className="absolute right-3 top-2.5 text-sm text-muted-foreground">sec</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Checkbox id="autoUpdate" name="autoUpdate" defaultChecked={defaultSettings.autoUpdate} />
                                    <Label htmlFor="autoUpdate">Auto-update prices from API</Label>
                                </div>

                                <div className="flex justify-end pt-4">
                                    <Button size="lg">
                                        <Save className="mr-2 h-4 w-4" /> Save Changes
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card className="bg-primary text-primary-foreground border-primary">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Activity className="h-5 w-5" /> Live Status
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-primary-foreground/80 text-sm">API Status</span>
                                <div className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                                    <span className="font-semibold text-sm">Connected</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-primary-foreground/80 text-sm">Last Update</span>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-3 w-3" />
                                    <span className="font-semibold text-sm">Just now</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base">
                                <Database className="h-4 w-4" /> API Usage
                            </CardTitle>
                            <CardDescription>Monthly quota usage for Metals-API.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-2 w-full bg-muted rounded-full overflow-hidden mb-2">
                                <div className="h-full bg-amber-500 w-[45%]" />
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>450 Requests</span>
                                <span>1000 Limit</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
