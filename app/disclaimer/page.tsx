import { Container, Typography, Box, Paper } from '@mui/material';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Disclaimer - Gold Silver Now',
    description: 'Financial disclaimer for Gold Silver Now.',
};

export default function DisclaimerPage() {
    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            <Box sx={{ mb: 6 }}>
                <Typography variant="h3" component="h1" gutterBottom fontWeight={800}>
                    Disclaimer
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Last Updated: Feb 11, 2026
                </Typography>
            </Box>

            <Paper elevation={0} sx={{ p: 5, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
                <Box sx={{ '& > h2': { mt: 4, mb: 2, fontWeight: 700, fontSize: '1.25rem' }, '& > p': { mb: 2, lineHeight: 1.7, color: 'text.secondary' } }}>
                    <Typography variant="h6" component="h2">General Information</Typography>
                    <Typography paragraph>
                        The information provided by Gold Silver Now ("we," "us," or "our") on this website is for general informational purposes only. All information on the Site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.
                    </Typography>

                    <Typography variant="h6" component="h2">Not Financial Advice</Typography>
                    <Typography paragraph>
                        The content on this website does not constitute financial, investment, legal, or other professional advice. You should not rely on any information on this website as a substitute for professional advice from a qualified professional. We strongly recommend that you consult with a qualified financial advisor before making any investment decisions involving precious metals or other financial assets.
                    </Typography>

                    <Typography variant="h6" component="h2">Market Data</Typography>
                    <Typography paragraph>
                        While we strive to provide accurate and real-time market data, prices for Gold, Silver, and currency exchange rates can fluctuate rapidly. The data displayed on this website may be delayed or contain errors. We are not responsible for any financial losses or damages incurred as a result of relying on the data provided on this website.
                    </Typography>

                    <Typography variant="h6" component="h2">External Links</Typography>
                    <Typography paragraph>
                        The Site may contain (or you may be sent through the Site) links to other websites or content belonging to or originating from third parties. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.
                    </Typography>

                    <Typography variant="h6" component="h2">Limitation of Liability</Typography>
                    <Typography paragraph>
                        In no event shall we be liable for any special, direct, indirect, consequential, or incidental damages or any damages whatsoever, whether in an action of contract, negligence or other tort, arising out of or in connection with the use of the Service or the contents of the Service. We reserve the right to make additions, deletions, or modifications to the contents on the Service at any time without prior notice.
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
}
