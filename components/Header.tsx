"use client";

import Link from "next/link";
import { useUser, useClerk } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export function Header() {
    const { isSignedIn } = useUser();
    const { openSignIn } = useClerk();

    const handleDashboardClick = (e: React.MouseEvent) => {
        if (!isSignedIn) {
            e.preventDefault();
            openSignIn({
                fallbackRedirectUrl: "/dashboard",
            });
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-black/80">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
                <Link href="/" className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                        <span className="text-white font-bold">ABO</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                        AI Video
                    </span>
                </Link>

                <nav className="flex items-center gap-4">
                    <Button
                        asChild={isSignedIn}
                        variant="outline"
                        className="rounded-full px-6 transition-all hover:border-indigo-500"
                        onClick={!isSignedIn ? handleDashboardClick : undefined}
                    >
                        {isSignedIn ? (
                            <Link href="/dashboard">Dashboard</Link>
                        ) : (
                            <span>Dashboard</span>
                        )}
                    </Button>
                </nav>
            </div>
        </header>
    );
}
