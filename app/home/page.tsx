import React from 'react'
import QuickNavigateBtn from '../components/QuickNavigateBtn'
import { Plus, User, CreditCard, Users, BarChart2, Table } from 'react-feather'

const page = () => {
  return (
    <div>
      <QuickNavigateBtn img={<Plus />} title='New Journal Entry' url="newEntry" />
      <QuickNavigateBtn img={<User />} title='New Creditor' url="newCreditor" />
      <QuickNavigateBtn img={<CreditCard />} title='New Debtor' url="newDebtor" />
      <QuickNavigateBtn img={<Table />} title='Journal Ledger' url="journalLedger" />
      <QuickNavigateBtn img={<Users />} title='General Ledger Of Accounts' url="generalLedger" />
      <QuickNavigateBtn img={<BarChart2 />} title='Chart of Accounts' url="chartOfAccounts" />
    </div>
  )
}

export default page
