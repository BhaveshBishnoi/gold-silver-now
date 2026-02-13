import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Privacy Policy - Gold Silver Now",
    description: "Privacy Policy for Gold Silver Now.",
}

export default function PrivacyPolicyPage() {
    return (
        <section className="py-20">
            <div className="container max-w-3xl mx-auto px-4">

                {/* Header */}
                <header className="mb-12">
                    <h1 className="text-4xl font-extrabold tracking-tight mb-2">
                        Privacy Policy
                    </h1>
                    <p className="text-muted-foreground">
                        Last Updated: February 11, 2026
                    </p>
                </header>

                {/* Content Card */}
                <div className="rounded-2xl border bg-card shadow-sm p-8 md:p-10">

                    <div className="prose prose-neutral dark:prose-invert max-w-none">

                        <p>
                            At Gold Silver Now, accessible from our website, protecting the
                            privacy of our visitors is one of our main priorities. This
                            Privacy Policy outlines the types of information we collect and
                            how we use it.
                        </p>

                        <h2>Information We Collect</h2>
                        <p>
                            When you visit our website, we may collect certain information
                            about your device, including your browser type, IP address, time
                            zone, and cookies installed on your device.
                        </p>
                        <p>
                            Additionally, as you browse the Site, we collect information
                            about the web pages you view, referring websites or search terms,
                            and how you interact with the Site.
                        </p>

                        <h2>How We Use Your Information</h2>
                        <p>We use the collected information to:</p>
                        <ul>
                            <li>Provide, operate, and maintain our website</li>
                            <li>Improve, personalize, and expand our services</li>
                            <li>Analyze usage patterns and site performance</li>
                            <li>Develop new products, features, and functionality</li>
                            <li>Communicate with users when necessary</li>
                        </ul>

                        <h2>Cookies</h2>
                        <p>
                            Like most websites, Gold Silver Now uses cookies to enhance user
                            experience. Cookies store visitor preferences and optimize
                            content based on browser type and user behavior.
                        </p>

                        <h2>Log Files</h2>
                        <p>
                            We follow a standard procedure of using log files. These log
                            visitors when they visit websites and may include IP addresses,
                            browser type, Internet Service Provider (ISP), timestamps,
                            referring/exit pages, and number of clicks.
                        </p>

                        <h2>Third-Party Privacy Policies</h2>
                        <p>
                            Our Privacy Policy does not apply to third-party advertisers or
                            external websites. We encourage you to review their respective
                            privacy policies for detailed information about their practices.
                        </p>

                        <h2>Data Protection & Security</h2>
                        <p>
                            We implement reasonable technical and organizational measures to
                            protect your information. However, no method of transmission over
                            the internet is completely secure.
                        </p>

                        <h2>Consent</h2>
                        <p>
                            By using our website, you consent to our Privacy Policy and agree
                            to its terms.
                        </p>

                    </div>
                </div>

            </div>
        </section>
    )
}
