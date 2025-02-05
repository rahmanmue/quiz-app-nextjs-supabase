
export const getSupabaseCookies = () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const projectId = supabaseUrl.split('//')[1].split('.')[0];
    return {
        accessToken : `sb-${projectId}-auth-token`,
        refreshToken : `sb-${projectId}-auth-token-code-verifier`
    }

}