'use client'
import React from 'react'
import { motion } from 'framer-motion'

const lifestyles = [
  { name: 'Lavish', percentage: '90%' },
  { name: 'Moderate', percentage: '60%' },
  { name: 'Stingy', percentage: '40%' },
]

export default function LifestylePicker({ onSelect }) {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-blue-100">
      <div className="z-10 animate-fall bg-gradient-to-br from-indigo-500 to-indigo-700 bg-clip-text py-4 text-center text-4xl font-medium tracking-tight text-transparent opacity-0 md:text-7xl">
        Pick your lifestyle
      </div>
      <div className="z-10 mt-8 flex justify-center">
        {lifestyles.map((lifestyle, index) => (
          <div
            key={lifestyle.name}
            onClick={() => onSelect(lifestyle.name)}
            className={`m-4 transform cursor-pointer rounded-lg bg-indigo-500 px-6 py-4 text-center text-white transition hover:scale-110 ${
              index === 0 ? 'size-64' : index === 1 ? 'size-48' : 'size-36'
            }`}
          >
            <p className="text-center text-3xl font-bold">{lifestyle.name}</p>
            <p className="mt-2 text-xl">{lifestyle.percentage} spending</p>
          </div>
        ))}
      </div>
    </div>
  )
}
