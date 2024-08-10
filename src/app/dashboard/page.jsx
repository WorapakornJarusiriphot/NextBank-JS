"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Snackbar, Alert } from "@mui/material";

export default function Dashboard() {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [recipientId, setRecipientId] = useState("");
  const [message, setMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      setMessage('Please log in first');
      setSnackbarOpen(true);
      setTimeout(() => router.push('/login'), 3000); 
      return;
    }

    const fetchBalance = async () => {
      try {
        const response = await axios.get(
          "https://localhost:32769/api/transactions/balance",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setBalance(response.data.Balance);
      } catch (error) {
        console.error("Error fetching balance:", error);
        setMessage("Failed to fetch balance");
        setSnackbarOpen(true);
      }
    };
    fetchBalance();
  }, []);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false); 
  };

  const handleDeposit = async () => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      setMessage("Please log in first");
      setSnackbarOpen(true);
      router.push("/login");
      return;
    }

    try {
      await axios.post(
        "https://localhost:32769/api/transactions/deposit",
        { amount: parseFloat(amount) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Deposit successful");
      setSnackbarOpen(true);
      setAmount("");
    } catch (error) {
      console.error("Error depositing money:", error);
      setMessage("Failed to deposit money");
      setSnackbarOpen(true);
    }
  };

  const handleWithdraw = async () => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      setMessage("Please log in first");
      setSnackbarOpen(true);
      router.push("/login");
      return;
    }

    try {
      await axios.post(
        "https://localhost:32769/api/transactions/withdraw",
        { amount: parseFloat(amount) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Withdrawal successful");
      setSnackbarOpen(true);
      setAmount("");
    } catch (error) {
      console.error("Error withdrawing money:", error);
      setMessage("Failed to withdraw money");
      setSnackbarOpen(true);
    }
  };

  const handleTransfer = async () => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      setMessage("Please log in first");
      setSnackbarOpen(true);
      router.push("/login");
      return;
    }

    try {
      await axios.post(
        "https://localhost:32769/api/transactions/transfer",
        { amount: parseFloat(amount), recipientId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Transfer successful");
      setSnackbarOpen(true);
      setAmount("");
      setRecipientId("");
    } catch (error) {
      console.error("Error transferring money:", error);
      setMessage("Failed to transfer money");
      setSnackbarOpen(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 space-y-4 bg-white rounded shadow">
        <h1 className="text-2xl font-bold text-center">Dashboard</h1>
        <p className="text-lg">Current Balance: ${balance}</p>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Recipient ID"
          value={recipientId}
          onChange={(e) => setRecipientId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <div className="flex justify-between">
          <button
            onClick={handleDeposit}
            className="p-2 bg-green-500 rounded hover:bg-green-600 text-white"
          >
            Deposit
          </button>
          <button
            onClick={handleWithdraw}
            className="p-2 bg-red-500 rounded hover:bg-red-600 text-white"
          >
            Withdraw
          </button>
          <button
            onClick={handleTransfer}
            className="p-2 bg-blue-500 rounded hover:bg-blue-600 text-white"
          >
            Transfer
          </button>
        </div>
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={10000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity="info">
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
