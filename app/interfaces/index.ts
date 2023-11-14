export interface Entry {
  creditor: string
  debtor: string
  amount: number
  date: Date
}

export interface Account {
  id: string
  name: string
  isCreditor: boolean
  entries: Array<Entry>
  debitTotal: number
  creditTotal: number
}

export interface JournalLedger {
  entries: Array<Entry>
  debitTotals: number
  creditTotals: number
}

export interface GeneralLedger {
  creditors: Array<Account>
  debtors: Array<Account>
}

export interface ChartOfAccounts {
  creditorProperty: number
  creditors: Array<{account: string, total: number}>
  debtorEquity: number
  debtors: Array<{account: string, total: number}>
}
