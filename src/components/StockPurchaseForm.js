// components/StockPurchaseForm.js
'use client'

import { useState, useEffect } from 'react'
import { useClerk } from '@clerk/nextjs'
import toast from 'react-hot-toast'

export default function StockPurchaseForm() {
  const [ticker, setTicker] = useState('')
  const [quantity, setQuantity] = useState(0)
  const [stockPrice, setStockPrice] = useState(null)
  const [loadingPrice, setLoadingPrice] = useState(false)
  const [purchaseSuccess, setPurchaseSuccess] = useState(null)
  const { session } = useClerk()

  const fetchStockPrice = async (ticker) => {
    setLoadingPrice(true)
    try {
      const token = await session?.getToken()
      const response = await fetch(
        `https://api.levelingfinance.com/api/stock/${ticker}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (!response.ok) {
        throw new Error('Failed to fetch stock price')
      }

      const data = await response.json()
      setStockPrice(data.price)
    } catch (error) {
      console.error('Error fetching stock price:', error)
    } finally {
      setLoadingPrice(false)
    }
  }

  const handlePurchase = async () => {
    try {
      const token = await session?.getToken()
      const response = await fetch(
        `https://api.levelingfinance.com/api/buy/${ticker}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            phone: session?.user?.primaryPhoneNumber?.phoneNumber,
            shares: quantity,
          }),
        },
      )

      if (!response.ok) {
        throw new Error('Failed to purchase stock')
      }

      setPurchaseSuccess(true)
      toast.success('Succesfully purchased a stock!')
    } catch (error) {
      console.error('Error purchasing stock:', error)
      setPurchaseSuccess(false)
    }
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
      <h2 className="mb-4 text-xl font-semibold">Purchase Stocks</h2>
      <div className="mb-4">
        <label
          htmlFor="ticker"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Stock Ticker
        </label>
        <input
          type="text"
          id="ticker"
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          onBlur={() => {
            if (ticker) {
              fetchStockPrice(ticker)
            } else {
              return
            }
          }}
        />
      </div>
      {loadingPrice ? (
        <div>Loading...</div>
      ) : stockPrice !== null ? (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Stock Price
          </label>
          <div className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 px-4 py-2 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white">
            ${stockPrice}
          </div>
        </div>
      ) : null}
      <div className="mb-4">
        <label
          htmlFor="quantity"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Quantity
        </label>
        <input
          type="number"
          id="quantity"
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-zinc-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          disabled={!stockPrice}
        />
      </div>
      <button
        onClick={handlePurchase}
        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Purchase
      </button>
    </div>
  )
}
