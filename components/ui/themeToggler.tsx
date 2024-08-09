"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { useEffect, useState } from 'react'

export function ModeToggle() {
    const { setTheme, theme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <div className="w-14 h-8" /> // Placeholder with same dimensions
    }

    return (
        <motion.button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className=" relative inline-flex h-8 w-14 items-center rounded-full bg-slate-200 dark:bg-slate-700"
            animate={{
                backgroundColor: theme === 'light' ? '#e2e8f0' : '#334155'
            }}
            transition={{
                duration: 0.3
            }}
        >
            <motion.span
                className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-lg"
                animate={{
                    x: theme === "light" ? 0 : 24,
                    rotate: theme === "light" ? 0 : 360,
                    scale: theme === "light" ? 1 : 1.1,
                }}
                transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    duration: 0.3
                }}
            >
                {theme === "light" ? (
                    <Sun className="h-5 w-5 text-yellow-500" />
                ) : (
                    <Moon className="h-5 w-5 text-slate-700" />
                )}
            </motion.span>
        </motion.button>
    )
}
