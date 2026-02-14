import type { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, MapPin } from "lucide-react"

export const metadata: Metadata = {
    title: "Contact Us - Gold Silver Now",
    description: "Get in touch with the Gold Silver Now team.",
}

export default function ContactPage() {
    return (
        <section className="py-20">
            <div className="container max-w-6xl mx-auto px-4">

                {/* Header */}
                <header className="mb-16 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight mb-4">
                        Contact Us
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Have questions, feedback, or partnership ideas?
                        We’d love to hear from you.
                    </p>
                </header>

                {/* Content */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10">

                    {/* Contact Info */}
                    <div className="md:col-span-5 space-y-6">

                        <Card className="rounded-2xl border shadow-sm">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-4 mb-3">
                                    <Mail className="text-primary" />
                                    <h3 className="text-lg font-semibold">
                                        Email Us
                                    </h3>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">
                                    For support and general inquiries:
                                </p>
                                <a
                                    href="mailto:support@goldsilvernow.in"
                                    className="font-medium text-primary hover:underline"
                                >
                                    support@goldsilvernow.in
                                </a>
                            </CardContent>
                        </Card>

                        <Card className="rounded-2xl border shadow-sm">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-4 mb-3">
                                    <MapPin className="text-primary" />
                                    <h3 className="text-lg font-semibold">
                                        Office
                                    </h3>
                                </div>
                                <p className="text-sm text-muted-foreground leading-7">
                                    Gold Silver Now HQ<br />
                                    123 Financial District,<br />
                                    Mumbai, Maharashtra 400001
                                </p>
                            </CardContent>
                        </Card>

                        {/* Trust Note */}
                        <p className="text-sm text-muted-foreground leading-6">
                            We typically respond within <strong>24–48 hours</strong>.
                            Your information is kept private and never shared.
                        </p>
                    </div>

                    {/* Contact Form */}
                    <div className="md:col-span-7">
                        <Card className="rounded-2xl border shadow-md">
                            <CardContent className="p-8">
                                <h2 className="text-2xl font-bold mb-6">
                                    Send Us a Message
                                </h2>

                                <form className="space-y-6">

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">First Name</Label>
                                            <Input id="firstName" placeholder="John" />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="lastName">Last Name</Label>
                                            <Input id="lastName" placeholder="Doe" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="you@example.com"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="subject">Subject</Label>
                                        <Input
                                            id="subject"
                                            placeholder="How can we help you?"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="message">Message</Label>
                                        <Textarea
                                            id="message"
                                            rows={5}
                                            placeholder="Write your message here..."
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="w-full font-semibold"
                                    >
                                        Send Message
                                    </Button>

                                </form>
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </div>
        </section>
    )
}
