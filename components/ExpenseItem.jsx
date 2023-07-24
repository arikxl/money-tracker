import { useState } from 'react'

import ViewExpenseModal from './modals/ViewExpenseModal';
import { currencyFormatter } from '@/lib/utils'

const ExpenseItem = ({ expense }) => {

    const { color, total, title } = expense;
    const [showExpensesModel, setShowExpensesModel] = useState(false);

    return (
        <>
            <ViewExpenseModal expense={ expense} show={showExpensesModel} onClose={setShowExpensesModel } />
            <button onClick={()=>setShowExpensesModel(true) }>

                <div className='flex w-full items-center justify-between px-4 py-4 bg-slate-700 rounded-3xl'>

                    <div className='flex items-center gap-2'>
                        <div className='w-[25px] h-[25px] rounded-full '
                            style={{
                                backgroundColor: color

                            }} />
                        <h4 className='capitalize'>{title}</h4>
                    </div>
                    <p>{currencyFormatter(total)}</p>
                </div>
            </button>
        </>
    )
}

export default ExpenseItem