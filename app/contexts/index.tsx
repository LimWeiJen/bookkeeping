'use client'

import { createContext, useEffect, useState } from "react"
import { Account, ChartOfAccounts, Entry, GeneralLedger, JournalLedger } from "../interfaces";

interface ContextInterface {
  isBusy: boolean
  addEntry: (entries: Array<Entry>) => void
  addAccount: (account: Account) => void
  journalLedger: JournalLedger | null
  generalLedger: GeneralLedger | null
  chartOfAccounts : ChartOfAccounts | null
}

export const context = createContext<ContextInterface | null>(null);

export const ContextProvider = ({children}: any) => {
  const [isBusy, setisBusy] = useState(true);
  const [journalLedger, setjournalLedger] = useState<JournalLedger | null>(null);
  const [generalLedger, setgeneralLedger] = useState<GeneralLedger | null>(null);
  const [chartOfAccounts, setchartOfAccounts] = useState<ChartOfAccounts | null>(null);

  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      _fetchData().then(res => {
        if (res) setisBusy(false);
      })
    }
  })

  const _fetchData = async () => {
    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${window.localStorage.getItem("token")}`
        }
      });

      if (response.ok) {
        const result = await response.json();
        _modifyData(result.user.entries, result.user.accounts);
        return true;
      } else console.error('Failed to fetch data', response.statusText);
    } catch (error: any) {
      console.error('Error fetching user data:', error.message)
    }
    return false;
  }

  const _modifyData = async (entries: Array<Entry>, accounts: Array<Account>) => {
    let jLedger: JournalLedger = {entries: [], creditTotals: 0, debitTotals: 0}
    let gLedger: GeneralLedger = {creditors: [], debtors: []}
    let cAccounts: ChartOfAccounts = {creditors: [], creditorProperty: 0, debtors: [], debtorEquity: 0}

    entries.map(entry => {
      jLedger.entries.push(entry);
      jLedger.creditTotals += entry.amount;
      jLedger.debitTotals += entry.amount;
    })

    accounts.map(account => {
      if (account.isCreditor) {
        gLedger.creditors.push(account);
        cAccounts.creditorProperty += account.creditTotal;
        cAccounts.creditors.push({account: account.name, total: account.creditTotal})
      }
      else {
        gLedger.debtors.push(account);
        cAccounts.debtorEquity += account.debitTotal;
        cAccounts.debtors.push({account: account.name, total: account.debitTotal})
      }
    })

    setjournalLedger(jLedger);
    setgeneralLedger(gLedger);
    setchartOfAccounts(cAccounts);
  }

  const signIn = async (username: string, password: string) => {

  }

  const addEntry = async (entries: Array<Entry>) => {
    // TODO: call the server API and add the entries
  }

  const addAccount = async (account: Account) => {
    // TODO: call the server API and add a new account
  }

  return (
    <context.Provider value = {{
      isBusy,
      addEntry,
      addAccount,
      journalLedger,
      generalLedger,
      chartOfAccounts
    }}>
      {children}
    </context.Provider>
  )
}
