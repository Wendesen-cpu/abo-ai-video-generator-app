import { currentUser } from "@clerk/nextjs/server";
import { createAdminClient } from "./server";

export async function syncUser() {
    const user = await currentUser();

    if (!user) {
        return null;
    }

    const supabase = await createAdminClient();

    // Check if user already exists in Supabase
    const { data: existingUser, error: fetchError } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

    if (fetchError && fetchError.code !== "PGRST116") {
        console.error("Error fetching user from Supabase:", fetchError);
        return null;
    }

    if (existingUser) {
        return existingUser;
    }

    // If not, create the user
    const email = user.emailAddresses[0]?.emailAddress;
    const fullName = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();

    const { data: newUser, error: insertError } = await supabase
        .from("users")
        .insert({
            id: user.id, // Store Clerk ID as primary key 'id'
            email: email,
            full_name: fullName || "Anonymous",
        })
        .select()
        .single();

    if (insertError) {
        console.error("Error inserting user into Supabase:", insertError);
        return null;
    }

    return newUser;
}
