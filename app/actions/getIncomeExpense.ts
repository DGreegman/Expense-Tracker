'use server'
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"

async function getIncomeExpense(): Promise<{ income?: number; expense?:number; error?:string}> {
    const {userId} = auth()
    if (!userId) {
        return {error: "User not found"}
    }

    try {
        const transactions = await db.trasaction.findMany({
            where: { userId}  
        })

        const amounts = transactions.map((transaction)=>transaction.amount)
        const income = amounts
        .filter((amount) => amount > 0)
        .reduce((acc, amount) => acc + amount, 0)
        const expense = amounts
        .filter((amount) => amount < 0)
        .reduce((acc, amount) => acc + amount, 0)

        return {income, expense}

    } catch (error) {
        return {error: 'Database Error'}
    }
}

export default getIncomeExpense;