"use client"

import { SignUp } from "@/types";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { AlertDestructive } from "@/components/alert-error";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signUp } from "@/utils/api";
import { useToast } from "@/hooks/use-toast";

interface SignUpFormProps {
    initialState: { email: string; password: string, confirm_password?: string };
    onSuccess?: () => void;
  }

export function SignUpForm({initialState} : SignUpFormProps ){
    const {toast} = useToast();

    const [dataUser, setDataUser] = useState<SignUp>(initialState);
    const [errMsg, setErrMsg] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false)
    const [pwVisible, setPwVisibele] = useState<boolean>(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrMsg('')
        setLoading(true)

        try {
            if(dataUser.password !== dataUser.confirm_password){
                throw new Error("Password & Confirm Password doesnt Match");
            }

            const {email, password} = dataUser;

            const response = await signUp({email, password});
           
            if (!response.ok) {
                throw new Error(response.error || "Register failed. Please try again." );
            }
            
            setDataUser(initialState)

            console.log(response);
           
            toast({
                title : "Register Success",
                description: response.data?.message,
                duration:10000
            })
           
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
            setErrMsg(errorMessage);
            console.error("error", error);
        } finally{
            setLoading(false)
        }
    };

    return (
        <div className="flex flex-col gap-6 md:w-1/3">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Sign Up</CardTitle>
                    <p className="text-sm text-foreground">
                        Have an account?{" "}
                        Please{" "}
                        <Link className="text-foreground font-medium underline" href="/sign-in">
                            Login
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
                                    type={pwVisible ? "text" : "password"}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Confirm Password</Label>
                                </div>
                                <Input
                                    id="password"
                                    name="confirm_password"
                                    onChange={(e) => setDataUser({ ...dataUser, [e.target.name]: e.target.value })}
                                    type={pwVisible ? "text" : "password"}
                                    required
                                />
                            </div>
                            <p onClick={()=> setPwVisibele(!pwVisible)} className="ml-auto inline-block text-sm font-medium underline cursor-pointer">
                                {pwVisible ? 'hidden' : 'show'} password
                            </p>
                           
                            <Button type="submit" className="w-full">
                                {loading ? 'Sign Up ...' : 'Sign Up'}
                            </Button>
                        </div>
                    </form>   
                </CardContent>
            </Card>
        </div>
    );
}