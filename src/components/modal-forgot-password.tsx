import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { forgetPassword } from "@/utils/api"
import { useToast } from "@/hooks/use-toast"

export function ModalForgotPassword() {
  const {toast} = useToast();
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false)

  const onSubmit = async () => {
    try {
      if(!email){
        setError("Email Required")
        return
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          setError("Please enter a valid email address.");
          return;
      }

      await forgetPassword({email: email})

      setEmail('')
      setError('')
      setOpen(false);

      toast({
        title: "Success",
        description: "Please check your email",
        duration: 1000
     })
   
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      setError(errorMessage);
      console.error("error", error);
    }

   
  }

  return (
    <Dialog onOpenChange={() => setOpen(!open)} open={open}>
      <DialogTrigger asChild >
        <small className="cursor-pointer">Forget Password?</small>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Forget Password</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Label htmlFor="email" >
                Enter your email
            </Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              className="col-span-3"
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && <small className="text-red-700 col-span-3">{error}</small>}
          </div>
          
        </div>
        <DialogFooter>
          <Button type="submit" onClick={onSubmit}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
