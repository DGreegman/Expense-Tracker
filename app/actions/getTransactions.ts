'use server'
import { db } from "@/lib/db"
import { Transaction } from "@/types/Transaction";
import { auth } from "@clerk/nextjs/server"

async function getTransactions(): Promise<{ transactions?: Transaction[]; error?:string}> {
    const {userId} = auth()
    if (!userId) {
        return {error: "User not found"}
    }

    try {
        const transactions = await db.trasaction.findMany({
            where: { userId},
            orderBy: { created_at: 'desc'} 
        })

        
        return {transactions}
    } catch (error) {
        return {error: 'Database Error'}
    }
}

export default getTransactions;