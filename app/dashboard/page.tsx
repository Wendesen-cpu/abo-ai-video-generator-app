import { syncUser } from "@/lib/supabase/sync-user";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const user = await syncUser();

    if (!user) {
        redirect("/sign-in");
    }

    return (
        <div className="p-8">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                    Welcome back, {user.full_name}!
                </h2>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                    Here's what's happening with your AI video projects today.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
                <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
                    <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                        Total Series
                    </h3>
                    <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                        0
                    </p>
                </div>
                <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
                    <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                        Total Videos
                    </h3>
                    <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                        0
                    </p>
                </div>
                <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
                    <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                        Storage Used
                    </h3>
                    <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                        0 GB
                    </p>
                </div>
            </div>

            {/* User Info */}
            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                    Account Information
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                            Email
                        </p>
                        <p className="mt-1 text-zinc-900 dark:text-zinc-50">{user.email}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                            Account ID
                        </p>
                        <p className="mt-1 font-mono text-sm text-zinc-900 dark:text-zinc-50 truncate">
                            {user.id}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
