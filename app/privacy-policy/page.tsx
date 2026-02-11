import { Container, Typography, Box, Paper } from '@mui/material';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy - Gold Silver Now',
    description: 'Privacy Policy for Gold Silver Now.',
};

export default function PrivacyPolicyPage() {
    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            <Box sx={{ mb: 6 }}>
                <Typography variant="h3" component="h1" gutterBottom fontWeight={800}>
                    Privacy Policy
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Last Updated: Feb 11, 2026
                </Typography>
            </Box>

            <Paper elevation={0} sx={{ p: 5, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
                <Box sx={{ '& > h2': { mt: 4, mb: 2, fontWeight: 700, fontSize: '1.25rem' }, '& > p': { mb: 2, lineHeight: 1.7, color: 'text.secondary' } }}>
                    <Typography paragraph>
                        At Gold Silver Now, accessible from our website, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Gold Silver Now and how we use it.
                    </Typography>

                    <Typography variant="h6" component="h2">Information We Collect</Typography>
                    <Typography paragraph>
                        When you visit our website, we may collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site.
                    </Typography>

                    <Typography variant="h6" component="h2">How We Use Your Information</Typography>
                    <Typography paragraph>
                        We use the information we collect in various ways, including to:
                    </Typography>
                    <Box component="ul" sx={{ pl: 4, mb: 2, color: 'text.secondary', lineHeight: 1.7 }}>
                        <li>Provide, operate, and maintain our website</li>
                        <li>Improve, personalize, and expand our website</li>
                        <li>Understand and analyze how you use our website</li>
                        <li>Develop new products, services, features, and functionality</li>
                        <li>Communicate with you, either directly or through one of our partners</li>
                    </Box>

                    <Typography variant="h6" component="h2">Cookies</Typography>
                    <Typography paragraph>
                        Like any other website, Gold Silver Now uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
                    </Typography>

                    <Typography variant="h6" component="h2">Log Files</Typography>
                    <Typography paragraph>
                        Gold Silver Now follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks.
                    </Typography>

                    <Typography variant="h6" component="h2">Third Party Privacy Policies</Typography>
                    <Typography paragraph>
                        Gold Silver Now's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
                    </Typography>

                    <Typography variant="h6" component="h2">Consent</Typography>
                    <Typography paragraph>
                        By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
}
