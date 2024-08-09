'use client'
import React, { useState } from 'react';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTrigger,
} from '../ui/sheet';
import { Button } from '../ui/button';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { SidebarButtonSheet as SidebarButton } from './Sidebar-button';
import { usePathname } from 'next/navigation';
import { ProfileCorner } from '../ui/profileCorner';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarMobileProps {
    sidebarItems: any;
}

function MenuButton({ onClick }: { onClick: () => void }) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onClick}
                        className="relative z-50 p-2 rounded-full mb-5 ml-2 transition-all duration-300 ease-in-out hover:shadow-md"
                    >
                        <Menu className="h-5 w-5 transition-transform duration-300 ease-in-out group-hover:rotate-90" />
                        <span className="sr-only">Open menu</span>
                    </motion.button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Menu</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export function SidebarMobile(props: SidebarMobileProps) {
    const pathname = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='flex flex-col'>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <MenuButton onClick={() => setIsOpen(true)} />
                </SheetTrigger>
                <SheetContent side='left' className='w-65 px-3 py-4' hideClose>
                    <SheetHeader className='flex flex-row justify-between items-center space-y-0'>
                        <ProfileCorner />
                        <SheetClose asChild>
                            <Button className='h-7 w-7 p-0' variant='ghost'>
                                <X size={15} />
                            </Button>
                        </SheetClose>
                    </SheetHeader>
                    <motion.div
                        className='h-full'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className='mt-5 flex flex-col w-full gap-1'>
                            <div className='relative h-12'>
                                <SidebarButton variant={'destructive'} className='absolute top-0 right-0 justify-center' onClick={async () => {
                                    const data = await signOut({ redirect: false, callbackUrl: '/' });
                                    router.push(data.url);
                                }}>Sign out</SidebarButton>
                            </div>
                            {props.sidebarItems.links.map((link: any, idx: any) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                                >
                                    <Link href={link.href}>
                                        <SidebarButton
                                            icon={link.icon}
                                            className='w-full my-1'
                                        >
                                            {link.label}
                                        </SidebarButton>
                                    </Link>
                                </motion.div>
                            ))}
                            {props.sidebarItems.extras}
                        </div>
                    </motion.div>
                </SheetContent>
            </Sheet>
            <AnimatePresence>
                {!isOpen && (
                    <motion.div
                        className="flex flex-col items-center space-y-4 ml-2 mt-20"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.6 }}
                    >
                        {props.sidebarItems.links.map((link: any, idx: any) => (
                            <motion.div
                                key={idx}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Link href={link.href}>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="rounded-full"
                                    >
                                        <link.icon className="h-5 w-5" />
                                    </Button>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}