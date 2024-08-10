'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchTransactions = async () => {
      const response = await axios.get('https://localhost:32769/api/transactions/history', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(response.data);
    };
    fetchTransactions();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-8 space-y-4 bg-white rounded shadow">
        <h1 className="text-2xl font-bold text-center">Transaction History</h1>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="p-2 border border-gray-300">Date</th>
              <th className="p-2 border border-gray-300">Type</th>
              <th className="p-2 border border-gray-300">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td className="p-2 border border-gray-300">{new Date(transaction.TransactionDate).toLocaleString()}</td>
                <td className="p-2 border border-gray-300">{transaction.Type}</td>
                <td className="p-2 border border-gray-300">${transaction.Amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
