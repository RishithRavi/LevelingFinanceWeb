'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { LampContainer } from './Lamp'
import { FaArrowRight } from 'react-icons/fa'

export default function JobOffer({ startingSalary, onFinish }) {
  const [salary, setSalary] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      const salaryInterval = setInterval(() => {
        setSalary((prev) => {
          const increment = Math.min(startingSalary - prev, 1000)
          return prev + increment
        })
      }, 75)

      if (salary >= startingSalary) {
        clearInterval(salaryInterval)
      }

      return () => clearInterval(salaryInterval)
    }, 1000)
  }, [startingSalary, salary])

  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.1, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: 'easeInOut',
        }}
        className="mt-8 bg-gradient-to-br from-fuchsia-500 to-cyan-600 bg-clip-text py-4 text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        You found a job!
      </motion.h1>
      <motion.p
        initial={{ opacity: 0.05, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.5,
          duration: 0.8,
          ease: 'easeInOut',
        }}
        className="mt-8 bg-gradient-to-br from-fuchsia-500 to-cyan-600 bg-clip-text py-4 text-center text-3xl font-light tracking-tight text-transparent md:text-5xl"
      >
        Starting Salary
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.7,
          duration: 0.8,
          ease: 'easeInOut',
        }}
        className="mb-5 mt-8 bg-gradient-to-br from-fuchsia-500 to-cyan-600 bg-clip-text py-4 pt-5 text-center text-5xl font-bold tracking-tight text-transparent md:text-7xl"
      >
        ${salary.toLocaleString()}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.9,
          duration: 0.8,
          ease: 'easeInOut',
        }}
        className="hover:animate-spin"
      >
        <button
          onClick={onFinish}
          className="animate-shimmer inline-flex size-16 items-center justify-center rounded-full border border-indigo-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] font-medium text-slate-400 opacity-85 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-indigo-50"
        >
          <FaArrowRight size={24} />
        </button>
      </motion.div>
    </LampContainer>
  )
}
