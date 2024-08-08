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
                        <div className='relative h-12'>
                            <SidebarButton variant={'destructive'} className='absolute top-0 right-0 justify-center' onClick={async () => {
                                const data = await signOut({ redirect: false, callbackUrl: '/' });
                                router.push(data.url);
                            }}>Sign out</SidebarButton>
                        </div>
                        {props.sidebarItems.links.map((link: any, index: any) => (
                            <Link key={index} href={link.href}>
                                <SidebarButton
                                    variant={pathname === link.href ? 'secondary' : 'ghost'}
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
        </aside>
    );
}