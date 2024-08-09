
"use client"
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';
import { toast } from 'sonner';
import { ModeToggle } from './ui/themeToggler';

export default function SignUp() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    const router = useRouter();

    const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {

        const loadId = toast.loading('Signing in...');

        e?.preventDefault();

        try {

            const response = await fetch("/api/auth/register", {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({ name, email, password }),
            });

            toast.dismiss(loadId);

            if (response.ok) {
                router.push('/login');
                toast.success('Account created successfully');
            }
            else {
                toast.error('oops something went wrong..!');
                const data = await response.json();
                setError(data.message || "An error occured")
            }

        } catch (e) {

            toast.dismiss(loadId);
            toast.error('oops something went wrong..!');
            setError("An error occured. Please try again.")

        }

    }

    return (
        <div className='flex h-screen flex-col items-center justify-center'>
            <Card className="w-[350px] flex flex-col justify-center">
                <CardHeader>
                    <CardTitle>Sign Up</CardTitle>
                    <ModeToggle />
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid w-full items-center gap-4 pb-3">
                            <div className="flex flex-col space-y-1.5 my-3">
                                <Label htmlFor="name">Name</Label>
                                <Input onChange={(e) => setName(e.target.value)} id="name" placeholder="Full Name" />
                            </div>
                            <div className="flex flex-col space-y-1.5 my-3">
                                <Label htmlFor="email">Enter your email</Label>
                                <Input onChange={(e) => setEmail(e.target.value)} id="email" placeholder="abc@gmail.com" />
                            </div>
                            <div className="flex flex-col space-y-1.5 my-3">
                                <Label htmlFor="password">Enter Password</Label>
                                <Input onChange={(e) => setPassword(e.target.value)} id="password" type='password' placeholder="password123" />
                            </div>
                            {/* <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="confirmPassword">Confirm password</Label>
                                <Input id="confirmPassword" type='password' placeholder="password123" />
                            </div> */}
                        </div>
                        <Button type='submit' className='w-full'>Create your account</Button>
                    </form>
                </CardContent>
            </Card>
            <div>Already have an account!<Button variant="link" onClick={() => router.push('/login')}>Log In</Button>
            </div>
        </div >
    )
}