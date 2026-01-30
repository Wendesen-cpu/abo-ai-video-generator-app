"use client";

import Link from "next/link";
import { useUser, useClerk } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle } from "lucide-react";

export function Hero() {
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
        <section className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-4 pt-20 pb-16 text-center sm:px-8 sm:pt-32 sm:pb-24">
            {/* Background decoration */}
            <div className="absolute top-0 -z-10 h-full w-full">
                <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[120px]"></div>
                <div className="absolute top-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-purple-500/10 blur-[100px]"></div>
            </div>

            <div className="mx-auto max-w-4xl space-y-8">
                <h1 className="text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-7xl">
                    Generate Stunning AI Videos in{" "}
                    <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        Seconds
                    </span>
                </h1>
                <p className="mx-auto max-w-2xl text-xl text-zinc-600 dark:text-zinc-400 sm:text-2xl">
                    The ultimate AI-powered video generation platform. Turn your ideas into
                    professional videos effortlessly.
                </p>

                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Button
                        asChild={isSignedIn}
                        size="lg"
                        className="h-14 rounded-full bg-indigo-600 px-8 text-lg font-semibold hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 flex items-center gap-2"
                        onClick={!isSignedIn ? handleDashboardClick : undefined}
                    >
                        {isSignedIn ? (
                            <Link href="/dashboard">
                                Go to Dashboard <ArrowRight className="h-5 w-5" />
                            </Link>
                        ) : (
                            <span className="flex items-center gap-2">
                                Get Started <ArrowRight className="h-5 w-5" />
                            </span>
                        )}
                    </Button>

                    <Button
                        variant="ghost"
                        size="lg"
                        className="h-14 rounded-full px-8 text-lg font-semibold flex items-center gap-2 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                    >
                        <PlayCircle className="h-5 w-5" /> Watch Demo
                    </Button>
                </div>
            </div>
        </section>
    );
}
