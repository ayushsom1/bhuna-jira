'use client'

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

interface SidebarMobileProps {
    sidebarItems: any;
}

export function SidebarMobile(props: SidebarMobileProps) {
    const pathname = usePathname();
    const router = useRouter();
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size='icon' variant='ghost' className='fixed top-3 left-3'>
                    <Menu size={20} />
                </Button>
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
                <div className='h-full'>
                    <div className='mt-5 flex flex-col w-full gap-1'>
                        <div className='relative h-12'>
                            <SidebarButton variant={'destructive'} className='absolute top-0 right-0 justify-center' onClick={async () => {
                                const data = await signOut({ redirect: false, callbackUrl: '/' });
                                router.push(data.url);
                            }}>Sign out</SidebarButton>
                        </div>
                        {props.sidebarItems.links.map((link: any, idx: any) => (
                            <Link key={idx} href={link.href}>
                                <SidebarButton
                                    // variant={pathname === link.href ? 'secondary' : 'ghost'}
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
            </SheetContent>
        </Sheet >
    );
}