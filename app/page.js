'use client'

import { Doughnut } from "react-chartjs-2";
import {FaRegTrashAlt } from 'react-icons/fa'
import { useEffect, useRef, useState } from "react"
import { addDoc, collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import {Chart as ChartJS, ArcElement,Tooltip, Legend } from 'chart.js'

import Modal from "@/components/Modal";
import ExpenseItem from "@/components/ExpenseItem";
import { db } from "@/lib/firebase";
import { expenses } from "@/data/dummyData";
import { currencyFormatter } from "@/lib/utils";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {

  const [incomes, setIncomes] = useState([])
  const [showAddIncomeModel, setShowAddIncomeModel] = useState(false);
  const amountRef = useRef();
  const descRef = useRef();

  const AddIncomeHandler = async (e) => {
    e.preventDefault();

    const newIncome = {
      amount: amountRef.current.value,
      desc: descRef.current.value,
      createdAt: new Date()
    }

    const collectionRef = collection(db, 'income');
    try {
      const docSnap = await addDoc(collectionRef, newIncome);
      setIncomes((prevState) => {
        return[
          ...prevState,
          {
            id: docSnap.id,
            ...newIncome
          }
        ]
      })

      descRef.current.value = '';
      amountRef.current.value = '';

    } catch (error) {
      console.log( error.message)
    }
  }
  
  const deleteIncome = async (id) => {
    const docRef = doc(db, 'income', id);
    try {
      await deleteDoc(docRef);

      setIncomes(prevState => {
        return prevState.filter((i) => i.id !== id);
      })
    } catch (error) {
      console.log( error.message)
    }

  }

  useEffect(() => {
    const fetchIncome = async () => {
      const collectionRef = collection(db, 'income');
      const docsSnap = await getDocs(collectionRef)

      const data = docsSnap.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis())
        }
      })
      setIncomes(data)
    }
    fetchIncome()
  },[])
  
  
  return (
    <>
      <Modal show={showAddIncomeModel} onClose={setShowAddIncomeModel} >
        <form className='gap-5 flex flex-col' onSubmit={AddIncomeHandler}>
          <div className='input-group'>
          <label htmlFor="amount">Income amount</label>
            <input type='number' min={1} placeholder='Enter income amount' required
              className='input' name='amount' ref={ amountRef} />
          </div>
          <div className='input-group'>
          <label htmlFor="desc">Description</label>
          <input type='text' placeholder='Enter income description' required
             className='input'  name='desc' ref={descRef}/>
          </div>
          <button type='submit' className='btn btn-primary'>
            Add Income
          </button>
        </form>

        <div className=' flex flex-col gap-4 mt-6'>
          <h3 className='text-2xl font-bold'>Income History</h3>
          {
            incomes && incomes.map(item => (
              <div key={item.id } className='flex items-center justify-between'>
                <div>
                  <p>{item.desc}</p>
                  <small className='text-xs'>{ item.createdAt.toLocaleString()}</small>
                </div>
                <p className='flex items-center gap-2'>
                  {currencyFormatter(item.amount)}
                  <button onClick={()=> {deleteIncome(item.id)}}>
                    <FaRegTrashAlt />
                  </button>
                </p>
              </div>
            ))
          }
        </div>
      </Modal >
    <main className='container max-w-2xl px-6 mx-auto'>
        <section className='py-3'>
          <small className='text-gray-400 text-md'> My Balance</small>
          <h2 className='text-4xl font-bold'>{currencyFormatter(76543) }</h2>
        </section>

        <section className='py-3 flex items-center gap-2'>
          <button className='btn btn-primary' onClick={() => setIsModalOpen(true)}>
            + Expenses
          </button>
          <button class='btn btn-primary-outline'
            onClick={() => setShowAddIncomeModel(true)}
          >
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
