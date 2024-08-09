import { Sidebar } from "@/components/SideBar/SideBar";
import { NEXT_AUTH } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Board from "@/components/Board/Board";
import { DynamicGreeting } from "@/components/ui/DynamicGreeting";
import FeatureCard from "@/components/Board/FeatureCard";
import { CloudDownload, Share, Tags, Search } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import SearchBar from "@/components/Board/SearchBar";

export default async function Home() {
    const session = await getServerSession(NEXT_AUTH);

    if (!session) {
        redirect('/login')
    }

    return (
        <div className="flex h-screen overflow-hidden  mr-2">
            <Sidebar />
            <ScrollArea className="flex-1">
                <div className="flex flex-col p-4 space-y-4">
                    <DynamicGreeting userName={session.user.name} />

                    <section className=" grid grid-cols-1 md:grid-cols-1 xl:grid-cols-3 gap-2 auto-rows-max w-full">
                        <FeatureCard
                            icon={Tags}
                            title="Introducing tags"
                            description="Easily categorize and find your notes by adding tags."
                        />
                        <FeatureCard
                            icon={Share}
                            title="Share Notes Instantly"
                            description="Effortlessly share your notes with others via email or link."
                        />
                        <FeatureCard
                            icon={CloudDownload}
                            title="Access Anywhere"
                            description="Sync your notes across all devices."
                        />
                    </section>

                    <section className="">
                        <SearchBar />
                    </section>
                    <section>
                        <Board />
                    </section>
                </div>
            </ScrollArea>
        </div >
    );
}