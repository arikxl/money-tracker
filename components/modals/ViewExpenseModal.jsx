import { currencyFormatter } from '@/lib/utils';
import { FaRegTrashAlt } from 'react-icons/fa'

import Modal from '../Modal'
import { expenses } from '@/data/dummyData';
import { useContext } from 'react';
import { financeContext } from '@/store/finance-context';
import { toast } from 'react-toastify';

const ViewExpenseModal = ({ show, onClose, expense }) => {
    if (!expense) onClose();
    const { color, total, title } = expense;

    const { deleteExpenseItem, deleteExpenseCategory } = useContext(financeContext);

    const deleteExpenseItemHandler = async (item) => {
        try {
            const updatedItems = expense.items.filter((i) => i.id !== item.id);

            const updatedExpense = {
                items: [...updatedItems],
                total: expense.total - item.amount
            }

            await deleteExpenseItem(updatedExpense, expense.id);
            onClose();
            toast.success('Expense Deleted!');

        } catch (error) {
            console.error(error.message);
            toast.error(error.message);
        }
    }

    const handleDeleteCategory = async () => {
        try {
            await deleteExpenseCategory(expense.id)
            onClose();
            toast.success('Expense Category deleted!');
        } catch (error) {
            console.error(error.message);
            toast.error(error.message);
        }
    }

    return (
        <Modal show={show} onClose={onClose}>
            <div className='flex items-center justify-between'>
                <h2 className='capitalize text-4xl border-b-2' style={{ borderColor: color }}>{title}</h2>
                <button className='btn btn-danger'
                    onClick={handleDeleteCategory}>
                    Delete
                </button>
            </div>

            <div>
                <h3 className='my-4 text-2xl '>Expense History</h3>
                {expense.items.map((item) => (
                    <div key={item.id} className='flex items-center justify-between'>
                        <small>
                            {item.createdAt.toMillis
                                ? new Date(item.createdAt.toMillis()).toLocaleString()
                                : item.createdAt.toLocaleString()
                            }
                        </small>
                        <p className='flex items-center gap-2'>
                            {currencyFormatter(item.amount)}
                            <button onClick={() => deleteExpenseItemHandler(item)}>
                                <FaRegTrashAlt />
                            </button>
                        </p>
                    </div>
                ))}
            </div>
        </Modal>
    )
}

export default ViewExpenseModal