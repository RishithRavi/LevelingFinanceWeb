'use client'
import React, { useEffect, useState } from 'react'

const debtValues = {
  'Instate Public': 108584,
  'Out-of-state Public': 182832,
  Private: 230280,
  'Community college': 37500, // Average between 35k and 40k
}

export default function DebtPopup({ collegeTier, onClose, onFinish }) {
  const [debt, setDebt] = useState(0)

  useEffect(() => {
    setDebt(debtValues[collegeTier])
    const timer = setTimeout(() => {
      onClose()
      onFinish()
    }, 3000)

    return () => clearTimeout(timer)
  }, [collegeTier, onClose])

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-lg bg-white p-8 text-center shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">
          Congratulations on Graduating!
        </h2>
        <p className="text-xl">You are down:</p>
        <p className="text-3xl font-bold text-red-600">
          ${debt.toLocaleString()}
        </p>
      </div>
    </div>
  )
}
