'use client'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SelectMajor from '../../../components/SelectMajor'
// const SelectMajor = dynamic(() => import('../../../components/SelectMajor'))
import SelectCollegeTier from '../../../components/SelectCollegeTier'
import GPAClickerGame from '../../../components/GPAClickerGame'
import DebtPopup from '../../../components/DebtPopup'
import JobOffer from '../../../components/JobOffer'
import LifestylePicker from '../../../components/LifestylePicker'
import FallingBallsGame from '../../../components/FallingBallsGame'
import Confetti from 'react-confetti'
import BreakDown from '../../../components/BreakDown'
import Curve from '../../../components/Curve'

// const variants = {
//   initial: { opacity: 0, x: -100 },
//   enter: { opacity: 1, x: 0, transition: { duration: 0.5 } },
//   exit: { opacity: 0, x: 100, transition: { duration: 0.5 } },
// }

export default function Home() {
  const [step, setStep] = useState(1)
  const [major, setMajor] = useState('')
  const [tier, setTier] = useState('')
  const [gpa, setGpa] = useState(0)
  const [experience, setExperience] = useState(0)
  const [showDebtPopup, setShowDebtPopup] = useState(false)

  const handleNextStep = (tier) => {
    setStep(step + 1)
    setTier(tier)
  }
  const handleGPAClickerFinish = (clicks) => {
    const gpa = Math.min(clicks, 4.0)
    setGpa(gpa)
    setStep(step + 1)
  }

  const handleFallingBallsFinish = (score) => {
    setExperience(score)
    setStep(step + 1)
  }
  const handleDebtPopupClose = () => {
    setShowDebtPopup(false)
  }

  return (
    <div className="min-h-screen items-center justify-center">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <Curve>
            <motion.div
              key="step-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full bg-blue-100"
            >
              <SelectMajor
                meta={{ setMajor: setMajor, step: step, setStep: setStep }}
              />
            </motion.div>
          </Curve>
        )}
        {step === 2 && <SelectCollegeTier onNext={handleNextStep} />}
        {step === 3 && <GPAClickerGame onFinish={handleGPAClickerFinish} />}
        {step === 4 && (
          <motion.div
            key="step-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-blue-100"
          >
            <Curve>
              <div className="w-3/4 justify-center self-center px-24">
                <FallingBallsGame onFinish={handleFallingBallsFinish} />
              </div>
            </Curve>
          </motion.div>
        )}
        {step === 5 && (
          <div
            key="step-5"
            className="flex min-h-screen flex-col items-center justify-center bg-blue-100"
          >
            <Confetti width={window.innerWidth} />
            <h1 className="mb-4 animate-slidein text-center text-4xl font-extrabold text-indigo-600 opacity-0 [--slidein-delay:200ms] md:text-7xl">
              Congratulations on Graduating!
            </h1>
            <div className="mb-2 animate-slidein text-lg opacity-0 [--slidein-delay:200ms] md:text-2xl">
              Major: {major}
            </div>
            <div className="mb-2 animate-slidein text-lg opacity-0 [--slidein-delay:200ms] md:text-2xl">
              GPA: {gpa}
            </div>
            <div className="mb-2 animate-slidein text-lg opacity-0 [--slidein-delay:200ms] md:text-2xl">
              Experience: {experience}
            </div>
            <button
              onClick={() => setShowDebtPopup(true)}
              className="mt-4 rounded-full bg-indigo-500 px-4 py-2 text-white"
            >
              See Debt
            </button>
            {showDebtPopup && tier && (
              <DebtPopup
                onFinish={() => setStep(step + 1)}
                collegeTier={tier}
                onClose={handleDebtPopupClose}
              />
            )}
          </div>
        )}
        {step === 6 && (
          <JobOffer startingSalary={57430} onFinish={() => setStep(step + 1)} />
        )}
        {step === 7 && (
          <LifestylePicker
            onSelect={(z) => {
              console.log('hi')
            }}
          />
        )}
        {step === 8 && (
          <motion.div key="step-8">
            <Curve>
              <BreakDown />
            </Curve>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
