'use client';

import { useEffect } from "react";
import Swal from "sweetalert2";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("jwt");
      if (!token) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please log in first!",
        }).then(() => {
          router.push("/login");
        });
      }
    };

    const buttons = document.querySelectorAll(".require-auth");
    buttons.forEach(button =>
      button.addEventListener("click", (e) => {
        e.preventDefault();
        checkToken();
      })
    );

    return () => {
      buttons.forEach(button =>
        button.removeEventListener("click", checkToken)
      );
    };
  }, [router]);

  return (
    <main className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 dark:from-gray-800 dark:to-gray-900">
      <section className="container mx-auto py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-bold mb-4">Register</h2>
            <p>Create a new account to start using our services.</p>
            <Link href="/register" legacyBehavior>
              <a className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-500">
                Register Now
              </a>
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-bold mb-4">Login</h2>
            <p>Access your account by logging in.</p>
            <Link href="/login" legacyBehavior>
              <a className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-500">
                Go to Login
              </a>
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-bold mb-4">View Balance</h2>
            <p>Check your current balance anytime.</p>
            <Link href="/dashboard" legacyBehavior>
              <a className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-500 require-auth">
                View Balance
              </a>
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-bold mb-4">Transactions</h2>
            <p>View your transaction history.</p>
            <Link href="/transactionHistory" legacyBehavior>
              <a className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-500 require-auth">
                View Transactions
              </a>
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-bold mb-4">Deposit Money</h2>
            <p>Deposit money into your account easily.</p>
            <Link href="/dashboard" legacyBehavior>
              <a className="inline-block mt-4 px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-400 require-auth">
                Deposit Now
              </a>
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-bold mb-4">Withdraw Money</h2>
            <p>Withdraw money from your account safely.</p>
            <Link href="/dashboard" legacyBehavior>
              <a className="inline-block mt-4 px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-400 require-auth">
                Withdraw Now
              </a>
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-bold mb-4">Transfer Money</h2>
            <p>Transfer money to other users with ease.</p>
            <Link href="/dashboard" legacyBehavior>
              <a className="inline-block mt-4 px-4 py-2 bg-purple-500 text-white font-semibold rounded hover:bg-purple-400 require-auth">
                Transfer Now
              </a>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
