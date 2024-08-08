'use client'

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

export default function HomeSec() {
    const router = useRouter();

    return (
        <>
            <Button variant={'outline'} className='w-1/5 h- mx-1 hover:border-red-500' onClick={() => router.push('/login')}>Sign in</Button>
        </>
    );
}


