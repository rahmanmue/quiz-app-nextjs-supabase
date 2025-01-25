"use client"

import { SignIn } from "@/types";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { AlertDestructive } from "@/components/alert-error";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from "@/utils/api";

interface SignInFormProps {
    initialState: { email: string; password: string };
    onSuccess: () => void;
  }

export function SignInForm({initialState, onSuccess} : SignInFormProps ){

    const [dataUser, setDataUser] = useState<SignIn>(initialState);
    const [errMsg, setErrMsg] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrMsg('')
        setLoading(true)

        try {
            const response = await signIn(dataUser);
           
            if (!response.ok) {
                throw new Error(response.error || "Login failed. Please try again.");
            }

            setDataUser(initialState)
            onSuccess()
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
            setErrMsg(errorMessage);
        } finally{
            setLoading(false)
        }
    };

    return (
        <div className="flex flex-col gap-6 md:w-1/3">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <p className="text-sm text-foreground">
                        Dont have an account?{" "}
                        Please{" "}
                        <Link className="text-foreground font-medium underline" href="/sign-up">
                            Sign up
                        </Link>
                    </p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                        {errMsg && <AlertDestructive message={errMsg} />}
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    onChange={(e) => setDataUser({ ...dataUser, [e.target.name]: e.target.value })}
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input
                                    id="password"
                                    name="password"
                                    onChange={(e) => setDataUser({ ...dataUser, [e.target.name]: e.target.value })}
                                    type="password"
                                    required
                                />
                            </div>
                           
                            <Button type="submit" className="w-full">
                                {loading ? 'Login ...' : 'Login'}
                            </Button>
                        </div>
                    </form>   
                </CardContent>
            </Card>
        </div>
    );
}