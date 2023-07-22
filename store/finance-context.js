'use client'

import { createContext, useEffect, useState } from "react";
import { addDoc, collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";


export const financeContext = createContext({
    income: [],
    addIncomeItem: async () => { },
    removeIncomeItem: async () => { },
});

export default function FinanceContextProvider({ children }) {
    const [income, setIncome] = useState([]);

    const addIncomeItem = async (newIncome) => {
      
         const collectionRef = collection(db, 'income');
        
        try {
            const docSnap = await addDoc(collectionRef, newIncome);
            setIncome((prevState) => {
                return [
                    ...prevState,
                    {
                        id: docSnap.id,
                        ...newIncome
                    }
                ]
            })


        } catch (error) {
            console.log(error.message)
            throw error
        }
    };


    const removeIncomeItem = async (id) => {
        const docRef = doc(db, 'income', id);
        try {
            await deleteDoc(docRef);

            setIncome(prevState => {
                return prevState.filter((i) => i.id !== id);
            })
        } catch (error) {
            console.log(error.message)
            throw error;
        }

    }

    const values = {income, addIncomeItem, removeIncomeItem}

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
            setIncome(data)
        }
        fetchIncome()
    }, [])

    return (
        <financeContext.Provider value={values}>
            {children}
        </financeContext.Provider>
    )
}