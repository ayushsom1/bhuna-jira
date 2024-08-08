"use client"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { Button } from "./button";


export function ProfileCorner() {
    const { data: session, status } = useSession();
    const initials = session?.user?.name
        ?.split(" ")
        .map((n) => n[0])
        .join('')
        .toUpperCase();
    return (
        <div className="flex flex-row items-center">
            {status === 'authenticated' ? (
                <div className="flex mx-3 items-center ">
                    <Avatar className="mx-2">
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <div className="text-lg font-semibold">{session?.user?.name}</div>
                </div>) : (
                <Button className="mx-2" variant="outline" >Hello Stranger!</Button>)
            }
        </div>
    )
}