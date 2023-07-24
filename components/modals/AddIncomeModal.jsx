import { toast } from 'react-toastify';
import { FaRegTrashAlt } from 'react-icons/fa'
import {  useRef, useContext } from "react"

import Modal from "../Modal";
import { authContext } from '@/store/auth-context';
import { financeContext } from '@/store/finance-context';
import { currencyFormatter } from '@/lib/utils';

const AddIncomeModal = ({ show, onClose }) => {

    const descRef = useRef();
    const amountRef = useRef();
    const { user } = useContext(authContext);
    const { income, addIncomeItem, removeIncomeItem } = useContext(financeContext);

    const AddIncomeHandler = async (e) => {
        e.preventDefault();

        const newIncome = {
            amount: +amountRef.current.value,
            desc: descRef.current.value,
            createdAt: new Date(),
            uid: user.uid
        }

        try {
            await addIncomeItem(newIncome);
            descRef.current.value = '';
            amountRef.current.value = '';
            onClose();
            toast.success('Income Added!')
        } catch (error) {
            console.error(error.message);
            toast.error(error.message);
        }

    };

    const deleteIncome = async (id) => {
        try {
            await removeIncomeItem(id);
            toast.success('Income Deleted!')
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
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
                {!income || income.length <1 && (<h2>No income yet.</h2>)}
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