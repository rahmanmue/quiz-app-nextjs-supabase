export interface SignIn {
    email: string;
    password: string;
}

export interface SignUp {
    email: string;
    password: string;
    confirm_password?: string;
}