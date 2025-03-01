import React from 'react'
import getUserBalance from '@/app/actions/getUserBalance'
import { addCommas } from '@/lib/utils'

const Balance = async() => {
    const {balance} = await getUserBalance()
  return (
    <>
        <h1>Your Balance</h1>
        <h4>$ {addCommas(Number(balance?.toFixed(2)) ?? 0)}</h4>
    </>
  )
}

export default Balance