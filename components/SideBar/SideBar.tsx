'use client'

import { ChartArea, Home, Plus, PlusIcon, Settings, SquareKanban, Users } from 'lucide-react'
import { useMediaQuery } from 'usehooks-ts'
import { SidebarDesktop } from './Sidebar-desktop'
import { SidebarMobile } from './Sidebar-mobile'
import AddTaskButton from '../Board/AddTaskButton'

const sidebarItems = {
    links: [
        { label: 'Home', href: '/dashboard', icon: Home },
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

    if (desktop) {
        return (
            <div className="w-80 mt-2">
                < SidebarDesktop sidebarItems={sidebarItems} />
            </div>
        )
    }
    return (
        <div className='mt-2'>
            <SidebarMobile sidebarItems={sidebarItems} />
        </div>
    )
}