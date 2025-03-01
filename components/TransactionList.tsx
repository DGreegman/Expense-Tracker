import { Transaction } from "@/types/Transaction"
import getTransactions from "@/app/actions/getTransactions"
import TransactionItems from "./TransactionItems"

const TransactionList = async() => {
    const {transactions, error} = await getTransactions()

    if(error) {
        return <p className="error">{error}</p>
    }
  return (
    <>
        <h3>History</h3> 
        <ul className="list">
            {
                transactions && transactions.map((transaction: Transaction) => (
                    <TransactionItems key={transaction.id} transaction={transaction} />
                ) )
            }
        </ul>
    </>
  )
}

export default TransactionList