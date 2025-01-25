import { NextResponse } from "next/server";

const statusMessage : Record<number, string> = {
    400: "Bad Request. Please check your input.",
    401: "Unauthorized. Please log in.",
    403: "Forbidden. You do not have access to this resource.",
    404: "Not Found. The resource could not be found.",
    500: "Internal Server Error. Please try again later.",
}


export class ApiError extends Error {
    status : number;

    constructor(message: string, status: number = 500){
        super(message || statusMessage[status] ||  "An unexpected error occurred");
        this.status = status;
    }
}

export function handleApiError(error: unknown){
    if(error instanceof ApiError){
        return NextResponse.json(
            { error : error.message || statusMessage[error.status]},
            { status: error.status }
        )
    }

    console.error("Unexpected Error", error )
    return NextResponse.json(
        { error : statusMessage[500]},
        { status: 500}
    )
}