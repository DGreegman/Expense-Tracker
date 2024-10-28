'use server'
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

interface TransactionData {
    text: string;
    amount: number;
}

interface TransactionResult {
    data?: TransactionData;
    error?: string;
}

async function addTransaction(formData:FormData): Promise<TransactionResult> {
    const textValue = formData.get('text')
    const amountValue = formData.get('amount')

    // check for input
    if(!textValue || textValue === '' || !amountValue){
        return {error: 'Text or amount is missing.'}
    }

    const text:string = textValue.toString() // ensuring that text is a string
    const amount:number = parseFloat(amountValue.toString()) // ensure that amount is a number or parse as a number

    // Get Logged in user information
    const {userId} = auth()
    // console.log(userId);
    // check for user 
    if(!userId) {
        return {error: "User not found"}
    }
    

   try {
    const transactionData: TransactionData  = await db.trasaction.create({
        data: {
                text,
                amount,
                userId
            }
    })
    revalidatePath('/')
    return {data: transactionData}
   } catch (error) {
        return {error: 'Transaction Not Added...'}
   }

}

export default addTransaction