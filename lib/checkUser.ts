import { currentUser } from "@clerk/nextjs/server";
import { db } from "./db";

export const checkUser = async () => {
    try {
        const user = await currentUser();
        
        // Check if a user is logged in
        if (!user) return null;

        // Check if the user already exists in the database
        const loggedUser = await db.user.findUnique({
            where: {
                clerkId: user.id,
            },
        });

        if (loggedUser) return loggedUser;

        // Create a new user if not found
        const newUser = await db.user.create({
            data: {
                clerkId: user.id,
                name: `${user.firstName} ${user.lastName}`,
                imageUrl: user.imageUrl,
                email: user.emailAddresses[0]?.emailAddress || "", // Use optional chaining
            },
        });
        
        return newUser;

    } catch (error : unknown) {
        if (error instanceof Error) {
            console.error("Error in checkUser:", error.message);
        } else {
            console.error("Error in checkUser:", error);
        }
        throw new Error("Failed to fetch or create user.");
    }
};
