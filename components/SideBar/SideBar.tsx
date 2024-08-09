'use client'

import { ChartArea, Home, Plus, PlusIcon, Settings, SquareKanban, Users } from 'lucide-react'
import { useMediaQuery } from 'usehooks-ts'
import { SidebarDesktop } from './Sidebar-desktop'
import { SidebarMobile } from './Sidebar-mobile'
import AddTaskButton from '../Board/AddTaskButton'
import { ModeToggle } from '../ui/themeToggler'

const sidebarItems = {
    links: [
        { label: 'Home', href: '/', icon: Home },
        { label: 'Boards', href: '/dashboard', icon: SquareKanban },
        { label: 'Settings', href: '/dashboard', icon: Settings },
        { label: 'Teams', href: '/dashboard', icon: Users },
        { label: 'Analytics', href: '/dashboard', icon: ChartArea }
    ],
    extras: (
        <AddTaskButton />
    )
}

export function Sidebar() {
    const desktop = useMediaQuery('(min-width: 1000px)', {
        initializeWithValue: false
    })

    // we are using initializeWithValue because by default it is true and this cause hydration error in the code
    // becuase desktop sidebar id rendering on client side becuase of hook and mobile sidebar is rendering on server

    return (
        <>
            <div className={`w-80 mt-2 ${desktop ? 'block' : 'hidden'}`}>
                <SidebarDesktop sidebarItems={sidebarItems} />
            </div>
            <div className={`mt-2 ${desktop ? 'hidden' : 'block'}`}>
                <SidebarMobile sidebarItems={sidebarItems} />
            </div>
        </>
    )
}