'use client'

import { useState } from "react"

export default function Home() {

  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <>
      <div style={{ 
        transform: isModalOpen ? 'translateX(0%)' : 'translateX(-200%)',

      }}
        className='absolute top-0 left-0  w-full h-full z-10 transition-all duration-500'>
          <div className='container mx-auto max-w-2xl h-[80vh] bg-slate-800 rounded-3xl py-6 px-4'>
            <button className='w-10 h-10 mb-4 font-bold
           rounded-full bg-slate-600'
           onClick={()=>setIsModalOpen(false)}
           >
            X
          </button>
          <h3>I am a modal </h3>

          </div>
        </div>
    <main className="">
        Arik
        <section>
          <button className='btn btn-primary'
            onClick={() => setIsModalOpen(true)}
          >
            + Expenses
          </button>
        </section>
    </main>
    </>
  )
}
