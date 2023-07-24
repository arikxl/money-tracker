'use client'

import { createContext, useEffect, useState, useContext } from "react";
import { addDoc, collection, getDocs, doc, deleteDoc, updateDoc, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { authContext } from "./auth-context";

export const financeContext = createContext({
    income: [],
    expenses: [],
    addIncomeItem: async () => { },
    removeIncomeItem: async () => { },
    addExpenseItem: async () => { },
    addCategory: async () => { },
    deleteExpenseItem: async () => { },
    deleteExpenseCategory: async () => { },
});

export default function FinanceContextProvider({ children }) {
    const [income, setIncome] = useState([]);
    const [expenses, setExpenses] = useState([]);

    const { user } = useContext(authContext);

    const addCategory = async (category) => {
        try {
            const collectionRef = collection(db, 'expenses');

            const docSnap = await addDoc(collectionRef, {
                uid:user.uid,
                ...category,
                items: [],
            })

            setExpenses((prevExpenses) => {
                return [
                    ...prevExpenses,
                    {
                        id: docSnap.id,
                        uid:user.uid,
                        items: [],
                        ...category
                    }
                ]
            })

        } catch (error) {
            throw error
        }
    }

    const deleteExpenseCategory = async (expenseCategoryId) => {
        try {
            const docRef = doc(db, 'expenses', expenseCategoryId);
            await deleteDoc(docRef)

            setExpenses((prevExpenses) => {
                const updatedExpenses = prevExpenses.filter((ex) => ex.id !== expenseCategoryId)
                return [...updatedExpenses];
            })
        } catch (error) {
            throw error
        }
    }

    const addExpenseItem = async (expenseCategoryId, newExpense) => {
        const docRef = doc(db, 'expenses', expenseCategoryId);
        try {
            await updateDoc(docRef, { ...newExpense });

            setExpenses((prevState) => {
                const updatedExpenses = [...prevState];

                const foundIdx = updatedExpenses.findIndex((ex) => {
                    return ex.id === expenseCategoryId
                })
                updatedExpenses[foundIdx] = {id: expenseCategoryId, ...newExpense}
            
                return updatedExpenses
            })
        } catch (error) {
            throw error
        }
    }

    const deleteExpenseItem = async (updatedExpense, expenseCategoryId) => {

        try {
            const docRef = doc(db, 'expenses', expenseCategoryId);
            await updateDoc(docRef, {
                ...updatedExpense
            });

            setExpenses(prevExpenses => {
                const updatedExpenses = [...prevExpenses];
                const pos = updatedExpenses.findIndex((ex)=> ex.id ===expenseCategoryId)
                updatedExpenses[pos].items = [...updatedExpense.items]
                updatedExpenses[pos].total = updatedExpense.total;

                return updatedExpenses;
            })
        } catch (error) {
            throw error
        }
    }

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

    const values = {
        deleteExpenseItem, addCategory, addExpenseItem,deleteExpenseCategory,
        expenses, income, addIncomeItem, removeIncomeItem
    }

    useEffect(() => {

        if (!user) return;

        const fetchIncome = async () => {
            const collectionRef = collection(db, 'income');
            const q= query(collectionRef, where('uid', '==', user.uid))
            const docsSnap = await getDocs(q)

            const data = docsSnap.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data(),
                    createdAt: new Date(doc.data().createdAt.toMillis())
                }
            })
            setIncome(data)
        };

        const fetchExpenses = async () => {
            const collectionRef = collection(db, 'expenses');
            const q = query(collectionRef, where('uid', '==', user.uid));
            const docsSnap = await getDocs(q)

            const data = docsSnap.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data(),
                }
            })
            setExpenses(data)
        };

        fetchExpenses()
        fetchIncome()
    }, [user])

    return (
        <financeContext.Provider value={values}>
            {children}
        </financeContext.Provider>
    )
}