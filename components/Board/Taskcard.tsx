import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardTitle,
} from "@/components/ui/card"
import { Delete, Edit, Icon, Trash2 } from "lucide-react"

export function TaskCard() {
    return (
        <Card className="w-[350px] m-10">
            <CardContent className="p-4">
                <CardTitle className="mb-2">Create project</CardTitle>
                <CardDescription>Deploy your new project in one-click.</CardDescription>
                <Button variant="outline" className="my-3">Cancel</Button>
                <p className="text-sm text-muted-foreground">
                    {new Date().toISOString()}
                </p>
            </CardContent>
            <CardFooter className="flex justify-end p-2">
                <Button size="sm" variant="ghost"> <Edit className="w-5" /></Button>
                <Button size="sm" variant="ghost" > <Trash2 className="w-5" /></Button>
            </CardFooter>
        </Card>
    )
}
