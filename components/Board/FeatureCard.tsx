import { Icon } from "lucide-react";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";

interface FeatureProps {
    title: string;
    description: string;
    icon: any;
}

export default function FeatureCard({ title, description, icon: IconComponent }: FeatureProps) {
    return (
        <div className="transition duration-300 ease-in-out transform hover:-translate-y-1">
            <Card className="pt-2 h-32 flex items-center
                             hover:drop-shadow-lg 
                             dark:border-gray-700
                             dark:hover:shadow-[0_10px_20px_rgba(255,255,255,0.07)]">
                <CardContent className="flex">
                    <div className="mr-3 flex flex-col justify-center">
                        <IconComponent size={40} />
                    </div>
                    <div>
                        <CardTitle className="my-2 text-lg">{title}</CardTitle>
                        <CardDescription>{description}</CardDescription>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}