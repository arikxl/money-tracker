import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid'
import { useContext, useRef, useState } from 'react';

import Modal from '../Modal'
import { financeContext } from '@/store/finance-context';

const AddExpensesModal = ({ show, onClose }) => {

    const [expenseAmount, setExpenseAmount] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showAddExpense, setShowAddExpense] = useState(false);

    const { expenses, addExpenseItem, addCategory } = useContext(financeContext);

    const titleRef = useRef();
    const colorRef = useRef();

    const addExpenseHandler = async () => {

        const expense = expenses.find(e => {
            return e.id === selectedCategory
        });

        const newExpense = {
            color: expense.color,
            title: expense.title,
            total: expense.total + +expenseAmount,
            items: [
                ...expense.items,
                {
                    amount: +expenseAmount,
                    createdAt: new Date(),
                    id: uuidv4()
                }
            ]
        };

        try {
            await addExpenseItem(selectedCategory, newExpense)
            setExpenseAmount('');
            setSelectedCategory(null);
            onClose();
            toast.success('Expense Added!')
        } catch (error) {
            console.error(error.message);
            toast.error(error.message);
        }

    }

    const handleCreateCategory = async () => {
        const title = titleRef.current.value;
        const color = colorRef.current.value;
        if(!title|| title==='') return
        try {
            await addCategory({ title, color, total: 0 })
            setShowAddExpense(false);
            toast.success('Category Created!')
        } catch (error) {
            console.error(error.message);
            toast.error(error.message);
        }
    }

    return (
        <Modal show={show} onClose={onClose}>

            <div className='input-group'>
                <label>Enter an amount</label>
                <input type='number' required min={1}
                    placeholder='Enter Expense Amount'
                    value={expenseAmount}
                    onChange={(e) => setExpenseAmount(e.target.value)}
                />
            </div>
            {expenseAmount > 0 && (

                <div className='flex flex-col gap-4 mt-6'>
                    <div className='flex items-center justify-between'>
                        <h3 className='text-2xl capitalize'>Select expense category</h3>
                        <button className='text-lime-400'
                            onClick={() => setShowAddExpense(true)}>
                            + New Category
                        </button>
                    </div>

                    {
                        showAddExpense && (
                            <div className='flex items-center justify-between'>
                                <input type="text" placeholder="Enter Title"
                                    ref={titleRef}
                                />
                                <label>Pick Color</label>
                                <input type='color' ref={colorRef} className='w-24 h-10 p-1' />
                                <button className='btn btn-primary-outline'
                                onClick={handleCreateCategory}>
                                    Create
                                </button>
                                <button className='btn btn-danger'
                                    onClick={() => setShowAddExpense(false)}
                                >Cancel</button>
                            </div>
                        )
                    }
           
                    {expenses.map((ex) => (
                        <button key={ex.id}
                            onClick={() => setSelectedCategory(ex.id)}
                        >
                            <div style={{
                                boxShadow: ex.id === selectedCategory ? '1px 1px 4px' : 'none'
                            }}
                                className='flex items-center justify-between px-4 py-4
                                 bg-slate-700 rounded-3xl'>
                                <div className='flex items-center gap-2'>

                                    <div className='rounded-full w-[25px] h-[25px]'
                                        style={{ backgroundColor: ex.color }}
                                    />
                                    <h4 className='capitalize'>{ex.title}</h4>
                                </div>

                            </div>
                        </button>
                    ))}
                </div>
            )}

            {
                expenseAmount > 0 && selectedCategory && (
                    <div className='mt-6'>

                        <button className='btn btn-primary'
                            onClick={() => addExpenseHandler()}
                        >
                            Add Expense
                        </button>
                    </div>
                )
            }
        </Modal>
    )
}

export default AddExpensesModal