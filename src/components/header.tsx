"use client"

import Link from "next/link";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/utils/api";
import { createClient } from "@/utils/supabase/client";

const navbarList = [
    {href: "/quizzers", label: "Quizzers"},
    {href: "/my-quiz", label: "My Quiz"},

]

export default function Header(){
  const [open, setOpen] = useState<boolean>(false)
  const [session, setSession] = useState<unknown>(null);

  const router = useRouter();

  const handleLogout = async () => {
      const {data, error} = await logout();
     
      if (error) {
          console.error("Logout failed with status:", error);
          return
      } 

      router.push(data.redirect)
  };

  // const fetchSession = async () => {
  //   try {
  //     const res = await fetch("/api/session");
  //     if (res.status === 200) {
  //       const data = await res.json();
  //       setSession(data.session);
  //     } else {
  //       setSession(null);
  //     }
  //   } catch (error) {
  //     console.error("Failed to fetch session:", error);
  //     setSession(null);
  //   }
  // }

  useEffect(() => {
    const supabase = createClient();

    // Real-time session updates
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Fetch initial session
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };
    fetchSession();

    return () => subscription.unsubscribe();
  }, []);


  

    return(
        <header className="sticky border-b-[1px] top-0 z-50 w-full bg-white dark:border-b-slate-700 dark:bg-background">
        <NavigationMenu className="mx-auto">
          <NavigationMenuList className="px-4 h-14 w-[100vw] box-border flex md:justify-center justify-between items-center relative">
            <NavigationMenuItem className="font-bold md:absolute left-6">
              <Link href="/" className="font-bold text-xl flex">
                Quiz App
              </Link>
            </NavigationMenuItem>
            <nav className="hidden md:flex gap-1">
              {navbarList.map((route, i) => (
                <Link
                  href={route.href}
                  key={i}
                  className={`text-[17px] ${buttonVariants({
                    variant: "ghost",
                  })}`}
                >
                  {route.label}
                </Link>
              ))}
            </nav>

              <div className="flex gap-4 items-end absolute md:right-6 right-14">
                <div className="flex gap-2">
                  {session ? (
                    <Button size="sm" variant={"default"} aria-label="Logout" onClick={handleLogout}>
                      Logout
                    </Button>
                  ): (
                    <div className="hidden md:flex gap-2">
                      <Button asChild size="sm" variant={"outline"}>
                        <Link href="/sign-in">Sign in</Link>
                      </Button>
                      <Button asChild size="sm" variant={"default"}>
                        <Link href="/sign-up">Sign up</Link>
                      </Button>
                    </div>
                  )}
                </div> 
               
                 
              </div>
  
            {/* mobile */}
  
            <span className="flex md:hidden">
              {/* <ModeToggle /> */}
              <Sheet open={open} onOpenChange={(value) => setOpen(value)}>
                <SheetTrigger className="px-2" onClick={()=> setOpen(!open)}>
                  <Menu className="flex md:hidden h-5 w-5"/>
                </SheetTrigger>
  
                <SheetContent side={"left"}>
                  <SheetHeader>
                    <SheetTitle className="font-bold text-xl text-left">
                      Quiz App
                    </SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col items-start gap-2 mt-4">
                    {navbarList.map((route, i) => (
                      <Link
                        href={route.href}
                        key={i}
                        className={`text-[17px] ${buttonVariants({
                          variant: "ghost",
                        })}`}
                      >
                        {route.label}
                      </Link>
                    ))}
                     <div className="flex flex-col gap-2 w-full">
                      <Button asChild size="sm" variant={"outline"}>
                        <Link href="/sign-in">Sign in</Link>
                      </Button>
                      <Button asChild size="sm" variant={"default"}>
                        <Link href="/sign-up">Sign up</Link>
                      </Button>
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </span>

          
          </NavigationMenuList>
        </NavigationMenu>
      </header>
    )
}