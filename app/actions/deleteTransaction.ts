'use server'
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache";

async function deleteTransaction(transactionId: string): Promise<{ message?: string; error?:string}> {
    const {userId} = auth()
    if (!userId) {
        return {error: "User not found"}
    }

    try {
       await db.trasaction.delete({
        where: {
            id: transactionId,
            userId
        }
       }) 
       revalidatePath('/')
       return {message: 'Transaction deleted successfully'}
    } catch (error) {
        return {error: 'Database Error'}
    }
}

export default deleteTransaction;