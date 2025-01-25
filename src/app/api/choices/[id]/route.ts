import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function  GET(request: NextRequest, {params}: {params : {id: string}}) {
    const supabase = await createClient();
    try {
        const {data, error} = await supabase
            .from("choices")
            .select("*")
            .eq("id", params.id);

        if (error) {
            console.error("Choices Error:", error);
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json(data, {status:200})    
    } catch (error) {
        console.error("Unexpected Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest, {params}: {params : {id: string}}) {
    const supabase = await createClient();

    try {
        const updatedData = await request.json()

        const { error } = await supabase
            .from('choices')
            .update(updatedData)
            .eq('id', params.id)
         
        if(error){
            console.error("Update choices Error:", error);
            return NextResponse.json({ error: error.message }, { status: 400 });
        }


        return NextResponse.json({ message: "Choices updated successfully!" }, { status: 200 });
        
    } catch (error) {
        console.error("Unexpected Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}


export async function DELETE(request: NextRequest, { params } : {params: {id: string}}) {
    const supabase = await createClient();

    try {
        const id = params.id 
        const { error } = await supabase
            .from('choices')
            .delete()
            .eq('id', id)

        if(error){
            console.error("Delete choices Error:", error);
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ message: "Choices deleted successfully!" }, { status: 200 });
        
    } catch (error) {
        console.error("Unexpected Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
    
}
