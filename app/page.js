'use client'

import { Doughnut } from "react-chartjs-2";
import { useEffect, useContext, useState } from "react"
import {Chart as ChartJS, ArcElement,Tooltip, Legend } from 'chart.js'

import ExpenseItem from "@/components/ExpenseItem";
import AddIncomeModal from "@/components/modals/AddIncomeModal";
import AddExpensesModal from "@/components/modals/AddExpensesModal";
import { financeContext } from "@/store/finance-context";
import { currencyFormatter } from "@/lib/utils";
import { authContext } from "@/store/auth-context";
import SignIn from "@/components/signIn";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {

  const [showAddIncomeModel, setShowAddIncomeModel] = useState(false);
  const [showAddExpensesModel, setShowAddExpensesModel] = useState(false);
  const [balance, setBalance] = useState(0);
  const { expenses, income } = useContext(financeContext);
  const { user, loading  } = useContext(authContext);


  useEffect(() => {

    const newBalance = 
      income.reduce((total, i) => {
        return total + i.amount;
      }, 0) - 
      expenses.reduce((total, e) => {
        return total + e.total;
      }, 0)

      setBalance(newBalance)
  },[expenses, income])
  
  if(!user) return <SignIn />
  
  return (
    <>
      <AddIncomeModal  show={showAddIncomeModel} onClose={setShowAddIncomeModel } />
      <AddExpensesModal  show={showAddExpensesModel} onClose={setShowAddExpensesModel } />
    <main className='container max-w-2xl px-6 mx-auto'>
        <section className='py-3'>
          <small className='text-gray-400 text-md'> My Balance</small>
          <h2 className='text-4xl font-bold'>{currencyFormatter(balance) }</h2>
        </section>

        <section className='py-3 flex items-center gap-2'>
          <button className='btn btn-primary'
             onClick={() => setShowAddExpensesModel(true)}
          >
            + Expenses
          </button>
          <button className='btn btn-primary-outline'
            onClick={() => setShowAddIncomeModel(true)}
          >
            + Income
          </button>
        </section>


        <section className='py-6'>
          <h3 className='text-2xl'>My Expenses</h3>
          {/* list */}
          <div className='flex flex-col gap-4 mt-6'>
            {expenses?.map(ex => (
              <ExpenseItem expense={ex} key={ex.id} />
            ))}
          </div>
        </section>


        <section className='py-6'>
          <h3 className='text-2xl'>Stats</h3>
          <div className='w-1/2 mx-auto'>
            <Doughnut data={{
              labels: expenses?.map(ex => ex.title),
              datasets: [
                {
                  label: 'Expenses',
                  data: expenses?.map(ex => ex.total),
                  backgroundColor: expenses?.map(ex=>ex.color),
                  borderColor: ['#18181b'],
                  borderWidth: 5,
                }
              ]}}
            />
          </div>
        </section>
        
    </main>
    </>
  )
}
