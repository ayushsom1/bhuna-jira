'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarButton } from './Sidebar-button';
import { ProfileCorner } from '../ui/profileCorner';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

interface SidebarDesktopProps {
    sidebarItems: any;
}

export function SidebarDesktop(props: SidebarDesktopProps) {
    const pathname = usePathname();
    const router = useRouter();

    return (
        <aside className='h-screen border-r'>
            <div className='h-full px-3 py-4'>
                <ProfileCorner />
                <div className='mt-5'>
                    <div className='flex flex-col gap-1 w-full'>
                        <SidebarButton variant={'outline'} className='mt-2 justify-center hover:bg-red-600 hover:text-white border-red-500' onClick={async () => {
                            const data = await signOut({ redirect: false, callbackUrl: '/' });
                            router.push(data.url);
                        }}>Sign out</SidebarButton>
                        {props.sidebarItems.links.map((link: any, index: any) => (
                            <Link key={index} href={link.href}>
                                <hr></hr>
                                <SidebarButton
                                    variant='ghost'
                                    icon={link.icon}
                                    className='w-full my-1'
                                >
                                    {link.label}
                                </SidebarButton>
                            </Link>
                        ))}
                        {props.sidebarItems.extras}

                    </div>
                </div>
            </div>
        </aside >
    );
}