"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Video,
    FileText,
    CreditCard,
    Settings,
    Plus,
    Sparkles,
    BookOpen,
} from "lucide-react";

const sidebarItems = [
    { name: "Series", href: "/dashboard/series", icon: Video },
    { name: "Videos", href: "/dashboard/videos", icon: Video },
    { name: "Guides", href: "/dashboard/guides", icon: BookOpen },
    { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function DashboardSidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
            <div className="flex h-full flex-col">
                {/* Sidebar Header with Logo */}
                <div className="border-b border-zinc-200 p-6 dark:border-zinc-800">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                            <span className="text-white font-bold text-sm">ABO</span>
                        </div>
                        <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                            AI Video
                        </span>
                    </Link>
                </div>

                {/* Create New Series Button */}
                <div className="p-4">
                    <Button className="w-full justify-start gap-2 bg-indigo-600 hover:bg-indigo-700">
                        <Plus className="h-4 w-4" />
                        Create New Series
                    </Button>
                </div>

                {/* Sidebar Navigation */}
                <nav className="flex-1 space-y-1 px-3">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400"
                                        : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
                                )}
                            >
                                <Icon className="h-5 w-5" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Sidebar Footer */}
                <div className="border-t border-zinc-200 p-4 space-y-2 dark:border-zinc-800">
                    <Button
                        variant="outline"
                        className="w-full justify-start gap-2 border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 hover:from-indigo-100 hover:to-purple-100 dark:border-indigo-900 dark:from-indigo-950 dark:to-purple-950 dark:text-indigo-400"
                    >
                        <Sparkles className="h-4 w-4" />
                        Upgrade Plan
                    </Button>
                </div>
            </div>
        </aside>
    );
}
