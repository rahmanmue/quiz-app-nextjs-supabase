import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseCookies } from "./cookies";

export const createClient = async () => {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              options = {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax", // Untuk keamanan cookies
                path: "/",
                ...options, // Override jika ada opsi lain
              };
              cookieStore.set(name, value, options);
            });
          } catch (error) {
            console.error(error)
          }
        },
      },
    },
  );
};


export const clearAuthCookies = () => {
  const cookieStore = cookies();
  const cookieNames = getSupabaseCookies();

  try {
    // Hapus cookies yang terkait dengan session Supabase
    cookieStore.set({
      name: cookieNames.accessToken,
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0, // Menghapus cookies
    });
    cookieStore.set({
      name: cookieNames.refreshToken,
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge:0, // Menghapus cookies
    });
    
  } catch (error) {
    console.error("Error clearing auth cookies: ", error);
  }
}
