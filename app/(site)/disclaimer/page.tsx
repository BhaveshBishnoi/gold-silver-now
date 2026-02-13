import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Disclaimer - Gold Silver Now",
    description: "Financial disclaimer for Gold Silver Now.",
}

export default function DisclaimerPage() {
    return (
        <section className="py-20">
            <div className="container max-w-3xl mx-auto px-4">

                {/* Header */}
                <header className="mb-12">
                    <h1 className="text-4xl font-extrabold tracking-tight mb-2">
                        Disclaimer
                    </h1>
                    <p className="text-muted-foreground">
                        Last Updated: February 11, 2026
                    </p>
                </header>

                {/* Content Card */}
                <div className="rounded-2xl border bg-card shadow-sm p-8 md:p-10">

                    <div className="prose prose-neutral dark:prose-invert max-w-none">

                        <h2>General Information</h2>
                        <p>
                            The information provided by Gold Silver Now ("we," "us," or "our")
                            on this website is for general informational purposes only. All
                            information on the Site is provided in good faith; however, we
                            make no representation or warranty of any kind, express or
                            implied, regarding the accuracy, adequacy, validity, reliability,
                            availability, or completeness of any information on the Site.
                        </p>

                        <h2>Not Financial Advice</h2>
                        <p>
                            The content on this website does not constitute financial,
                            investment, legal, or other professional advice. You should not
                            rely on any information on this website as a substitute for
                            professional advice from a qualified advisor.
                        </p>
                        <p>
                            We strongly recommend consulting with a certified financial
                            advisor before making any investment decisions involving precious
                            metals or other financial assets.
                        </p>

                        <h2>Market Data Accuracy</h2>
                        <p>
                            While we strive to provide accurate and real-time market data,
                            prices for Gold, Silver, and currency exchange rates fluctuate
                            rapidly. Data displayed on this website may be delayed or contain
                            inaccuracies.
                        </p>
                        <p>
                            We are not responsible for financial losses or damages incurred
                            as a result of reliance on information provided on this website.
                        </p>

                        <h2>External Links</h2>
                        <p>
                            The Site may contain links to third-party websites or content.
                            Such links are not investigated, monitored, or verified by us
                            for accuracy or reliability. We do not guarantee or assume
                            responsibility for third-party information.
                        </p>

                        <h2>Limitation of Liability</h2>
                        <p>
                            In no event shall we be liable for any special, direct, indirect,
                            consequential, or incidental damages arising from the use of this
                            website or its contents.
                        </p>
                        <p>
                            We reserve the right to modify, update, or remove content at any
                            time without prior notice.
                        </p>

                    </div>
                </div>

            </div>
        </section>
    )
}
