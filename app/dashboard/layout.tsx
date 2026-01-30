import { syncUser } from "@/lib/supabase/sync-user";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/DashboardSidebar";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await syncUser();

    if (!user) {
        redirect("/sign-in");
    }

    return (
        <div className="flex h-screen bg-zinc-50 dark:bg-black pt-16">
            {/* Sidebar */}
            <DashboardSidebar />

            {/* Main Content Area */}
            <div className="flex-1 ml-64">
                <main className="h-full overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
