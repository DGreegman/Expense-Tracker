'use client'
import { Transaction } from "@/types/Transaction";
import { addCommas } from "@/lib/utils";
import { toast } from "react-toastify";
import React from 'react'
import deleteTransaction from "@/app/actions/deleteTransaction";

const TransactionItems = ({transaction}:{transaction:Transaction}) => {
    const sign = transaction.amount < 0 ? '-' : '+'
    const handleDeleteTransaction = async (transactionId:string) => {
        const confired = window.confirm('Are you sure you want to delete this transaction')
        if (!confired) return 
        const {message, error} = await deleteTransaction(transactionId)
        if(error) {
            return toast.error(error)
        }

        toast.success(message)
    }
  return (
    <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
        {transaction.text}
        <span>
            {sign}${addCommas(Math.abs(transaction.amount))}
        </span>
        <button onClick={() => handleDeleteTransaction(transaction.id)} className="delete-btn">x</button>
    </li>
  )
}

export default TransactionItems