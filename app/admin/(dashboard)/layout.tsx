
import { auth } from "@/lib/auth";
import { Box } from "@mui/material";
import { redirect } from 'next/navigation';
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    let session;
    try {
        session = await auth();
    } catch (error) {
        console.error("Auth error:", error);
        redirect("/admin/login");
    }

    if (!session?.user) {
        redirect("/admin/login");
    }

    const drawerWidth = 240;

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8fafc' }}>
            <AdminSidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 4, ml: 0 }}>
                {children}
            </Box>
        </Box>
    );
}
