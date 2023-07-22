'use client'

import { useState } from "react"
import { Doughnut } from "react-chartjs-2";
import {Chart as ChartJS, ArcElement,Tooltip, Legend } from 'chart.js'

import Modal from "@/components/Modal";
import ExpenseItem from "@/components/ExpenseItem";
import { expenses } from "@/data/dummyData";
import { currencyFormatter } from "@/lib/utils";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Modal show={isModalOpen} onClose={ setIsModalOpen} />
    <main className='container max-w-2xl px-6 mx-auto'>
        <section className='py-3'>
          <small className='text-gray-400 text-md'> My Balance</small>
          <h2 className='text-4xl font-bold'>{currencyFormatter(76543) }</h2>
        </section>

        <section className='py-3 flex items-center gap-2'>
          <button className='btn btn-primary' onClick={() => setIsModalOpen(true)}>
            + Expenses
          </button>
          <button class='btn btn-primary-outline' onClick={() => setIsModalOpen(true)}>
            + Income
          </button>
        </section>


        <section className='py-6'>
          <h3 className='text-2xl'>My Expenses</h3>
          {/* list */}
          <div className='flex flex-col gap-4 mt-6'>
            {expenses.map(ex => (
              <ExpenseItem expense={ex} id={ex.id } />
            ))}
          </div>
        </section>


        <section className='py-6'>
          <h3 className='text-2xl'>Stats</h3>
          <div className='w-1/2 mx-auto'>
            <Doughnut data={{
              labels: expenses.map(ex => ex.title),
              datasets: [
                {
                  label: 'Expenses',
                  data: expenses.map(ex => ex.total),
                  backgroundColor: expenses.map(ex=>ex.color),
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
