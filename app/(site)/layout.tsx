import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function SiteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            <main style={{ minHeight: '80vh', paddingBottom: '2rem' }}>
                {children}
            </main>
            <Footer />
        </>
    );
}
