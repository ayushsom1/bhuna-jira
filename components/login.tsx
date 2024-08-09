"use client"
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import React, { useRef, useState } from 'react';
import { signIn } from 'next-auth/react';
import { ModeToggle } from './ui/themeToggler';

export default function Login() {

    const router = useRouter();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    const [checkingPassword, setCheckingPassword] = useState(false);
    const [requiredError, setRequiredError] = useState({
        emailReq: false,
        passReq: false,
    });

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();

        if (!email || !password) {
            setRequiredError({
                emailReq: email ? false : true,
                passReq: password ? false : true,
            });
            return;
        }

        // toast.dismiss(loadId);
        const loadId = toast.loading('Signing in...');


        setCheckingPassword(true);

        try {
            const response = await signIn('credentials', {
                redirect: false,
                username: email,
                password
            })

            console.log(response)
            toast.dismiss(loadId);

            if (response?.error) {
                setCheckingPassword(false);
                toast.error('oops something went wrong..!')
                setError(response.error || "An error occured")
            }
            else {
                router.push('/dashboard');
                toast.success('Loged In successfully');
            }

        } catch (e) {
            toast.dismiss(loadId);
            toast.error('oops something went wrong..!');
            setError("An error occured. Please try again.")

        }

    }
    return (
        <div className='flex flex-col h-screen items-center justify-center'>
            <Card className="w-[350px] flex flex-col justify-center">
                <CardHeader>
                    <CardTitle>Log In</CardTitle>
                    <ModeToggle />
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} method='post'>
                        <div className="grid w-full items-center gap-4 pb-3">
                            <div className="flex flex-col space-y-1.5 my-3">
                                <Label htmlFor="email">Enter your email</Label>
                                <Input onChange={(e) => {
                                    setRequiredError((prevState) => ({
                                        ...prevState,
                                        emailReq: false,
                                    }));
                                    setEmail(e.target.value)
                                }} id="email" placeholder="abc@gmail.com" />
                                {requiredError.emailReq && (
                                    <span className="text-red-500">Email is required</span>
                                )}
                            </div>
                            <div className="flex flex-col space-y-1.5 my-3">
                                <Label htmlFor="password">Enter Password</Label>
                                <Input onChange={(e) => {
                                    setRequiredError((prevState) => ({
                                        ...prevState,
                                        passReq: false,
                                    }));
                                    setPassword(e.target.value)
                                }} id="password" type='password' placeholder="password123" />
                                {requiredError.passReq && (
                                    <span className="text-red-500">Password is required</span>
                                )}
                            </div>
                        </div>
                        <Button type='submit' className='w-full' disabled={checkingPassword}>LogIn to your account</Button>
                    </form>
                </CardContent>


            </Card>
            <div>Don&apos;t have an account!<Button variant="link" onClick={() => router.push('/signup')}>Sign Up</Button></div>
        </div>
    )
}