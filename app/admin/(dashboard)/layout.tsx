
import { auth } from "@/lib/auth";
import { redirect } from 'next/navigation';
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminMobileNav from "@/components/admin/AdminMobileNav";

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

    return (
        <div className="flex min-h-screen bg-[#F0F2F5] text-foreground flex-col md:flex-row">
            <AdminMobileNav />
            <AdminSidebar />
            <main className="flex-1 p-4 md:p-6 ml-0 md:ml-0 overflow-y-auto w-full">
                {children}
            </main>
        </div>
    );
}
