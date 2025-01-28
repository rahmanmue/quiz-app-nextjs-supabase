import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";


export async function GET(request: Request) {
  
  const {searchParams} = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as string;
  const next = searchParams.get("next")?? '/';

  if (token_hash && type) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({ token_hash, type: "email" })

    if (!error) {
        redirect(next)
    }
  }

 // URL to redirect to after sign up process completes
  redirect(`/auth/auth-code-error`);
}
