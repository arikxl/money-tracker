'use client'

import ExpenseItem from "@/components/ExpenseItem";
import Modal from "@/components/Modal";
import { expenses } from "@/data/dummyData";
import { currencyFormatter } from "@/lib/utils";
import { useState } from "react"

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
    </main>
    </>
  )
}
