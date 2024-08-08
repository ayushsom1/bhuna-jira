import HomeSec from "@/components/homesection";
import { NEXT_AUTH } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getServerSession(NEXT_AUTH);

  if (session) {
    redirect('/dashboard')
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <HomeSec />
    </div>
  );
}
