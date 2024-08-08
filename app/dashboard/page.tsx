import { Sidebar } from "@/components/SideBar/SideBar";
import { NEXT_AUTH } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Board from "@/components/Board/Board";

export default async function Home() {
    const session = await getServerSession(NEXT_AUTH);

    if (!session) {
        redirect('/login')
    }

    return (
        <div className="flex h-screen">

            <Sidebar />

            <div className="flex-1 flex flex-col p-4 space-y-4">
                <section className="bg-gray-800 p-4 h-10 rounded-lg">
                </section>

                <section className="flex flex-row w-full gap-4">
                    <div className="bg-gray-800 p-4 flex-1 rounded-lg">
                        <h2 className="text-center">"Features"</h2>
                    </div>
                    <div className="bg-gray-800 p-4 flex-1 rounded-lg">
                        <h2 className="text-center">"Features"</h2>
                    </div>
                    <div className="bg-gray-800 p-4 flex-1 rounded-lg">
                        <h2 className="text-center">"Features"</h2>
                    </div>
                </section>

                <section className="flex justify-between items-center bg-gray-800 rounded-lg p-2">
                    <input
                        type="text"
                        placeholder="Search bar"
                        className="flex mx- bg-transparent outline outline-2 outline-slate-400 p-1 rounded-sm"
                    />
                    <div className="flex mx-1">
                        <div className="w-8 h-8 bg-gray-700 rounded ml-2"></div>
                        <div className="w-8 h-8 bg-gray-700 rounded ml-2"></div>
                        <div className="w-8 h-8 bg-gray-700 rounded ml-2"></div>
                    </div>
                </section>

                <section className="flex-1 overflow-hidden">
                    <Board />
                </section>
            </div>
        </div>
    );
}