"use client"

import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ui/themeToggler";

export const Providers = ({ children }: {
    children: React.ReactNode;
}) => {
    return (
        <SessionProvider>
            <RecoilRoot>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div className="fixed right-5 top-5">
                        <ModeToggle />
                    </div>
                    <div>
                        {children}
                    </div>
                </ThemeProvider>
            </RecoilRoot>
        </SessionProvider>
    )
}