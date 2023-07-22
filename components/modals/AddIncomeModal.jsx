import { FaRegTrashAlt } from 'react-icons/fa'
import { useEffect, useRef, useState, useContext } from "react"
import { addDoc, collection, getDocs, doc, deleteDoc } from "firebase/firestore";


import Modal from "../Modal";
import { currencyFormatter } from '@/lib/utils';
import { financeContext } from '@/store/finance-context';

const AddIncomeModal = ({ show, onClose }) => {

    const amountRef = useRef();
    const descRef = useRef();
    const {income, addIncomeItem, removeIncomeItem} = useContext(financeContext);

    const AddIncomeHandler = async (e) => {
        e.preventDefault();

        const newIncome = {
            amount: +amountRef.current.value,
            desc: descRef.current.value,
            createdAt: new Date()
        }

        try {
            await addIncomeItem(newIncome);
            descRef.current.value = '';
            amountRef.current.value = '';
            onClose()
        } catch (error) {
            console.error(error.message);
        }

    };

    const deleteIncome = async (id) => {
        try {
            await removeIncomeItem(id)
        } catch (error) {
            console.log(error.message)
        }
    }



    return (
      <Modal show={show} onClose={onClose} >
          <form className='gap-5 flex flex-col' onSubmit={AddIncomeHandler}>
              <div className='input-group'>
                  <label htmlFor="amount">Income amount</label>
                  <input type='number' min={1} placeholder='Enter income amount' required
                      className='input' name='amount' ref={amountRef} />
              </div>
              <div className='input-group'>
                  <label htmlFor="desc">Description</label>
                  <input type='text' placeholder='Enter income description' required
                      className='input' name='desc' ref={descRef} />
              </div>
              <button type='submit' className='btn btn-primary'>
                  Add Income
              </button>
          </form>

          <div className=' flex flex-col gap-4 mt-6'>
              <h3 className='text-2xl font-bold'>Income History</h3>
              {
                  income && income.map(item => (
                      <div key={item.id} className='flex items-center justify-between'>
                          <div>
                              <p>{item.desc}</p>
                              <small className='text-xs'>{item.createdAt.toLocaleString()}</small>
                          </div>
                          <p className='flex items-center gap-2'>
                              {currencyFormatter(item.amount)}
                              <button onClick={() => { deleteIncome(item.id) }}>
                                  <FaRegTrashAlt />
                              </button>
                          </p>
                      </div>
                  ))
              }
          </div>
      </Modal >
  )
}

export default AddIncomeModal