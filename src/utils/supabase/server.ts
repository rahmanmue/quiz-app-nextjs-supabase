import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

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
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
};


export const clearAuthCookies = () => {
  const cookieStore = cookies();

  try {
    // Hapus cookies yang terkait dengan session Supabase
    cookieStore.set("supabase-auth-token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: -1, // Menghapus cookies
    });
    cookieStore.set("supabase-refresh-token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: -1, // Menghapus cookies
    });
    
  } catch (error) {
    console.error("Error clearing auth cookies: ", error);
  }
}
