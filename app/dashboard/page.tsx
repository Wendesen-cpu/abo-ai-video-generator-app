import { syncUser } from "@/lib/supabase/sync-user";
import { redirect } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default async function DashboardPage() {
    const user = await syncUser();

    if (!user) {
        redirect("/sign-in");
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 p-8 dark:bg-black">
            <div className="w-full max-w-4xl rounded-2xl bg-white p-8 shadow-sm border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Dashboard</h1>
                    <SignOutButton>
                        <Button variant="outline" className="flex items-center gap-2">
                            <LogOut className="h-4 w-4" />
                            Logout
                        </Button>
                    </SignOutButton>
                </div>
                <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                    Welcome back, <span className="font-medium text-zinc-900 dark:text-zinc-50">{user.full_name}</span>!
                </p>
                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="rounded-xl border border-dashed border-zinc-300 p-6 dark:border-zinc-700">
                        <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">Email</h2>
                        <p className="text-zinc-500 dark:text-zinc-400">{user.email}</p>
                    </div>
                    <div className="rounded-xl border border-dashed border-zinc-300 p-6 dark:border-zinc-700">
                        <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">Account ID</h2>
                        <p className="text-zinc-500 dark:text-zinc-400 font-mono text-sm truncate">{user.id}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
