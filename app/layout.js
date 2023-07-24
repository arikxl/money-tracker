'use client'

// import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './globals.css'
import AppHeader from '@/components/AppHeader'
import AuthContextProvider from '@/store/auth-context'
import FinanceContextProvider from '@/store/finance-context'

// const inter = Inter({ subsets: ['latin'] })

const metadata = {
  title: 'Finance Tracker',
  description: 'Arik Alexandrov ',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <AuthContextProvider>
          <FinanceContextProvider>
            <ToastContainer/>
            <AppHeader />
            {children}
          </FinanceContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  )
}
