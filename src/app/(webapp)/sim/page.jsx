'use client'
import React, { useState } from 'react'
import SelectMajor from '../../../components/SelectMajor'
import SelectCollegeTier from '../../../components/SelectCollegeTier'
import GPAClickerGame from '../../../components/GPAClickerGame'
import FallingBallsGame from '../../../components/FallingBallsGame'
import Confetti from 'react-confetti'

export default function Home() {
  const [step, setStep] = useState(1)
  const [major, setMajor] = useState('')
  const [tier, setTier] = useState('')
  const [gpa, setGpa] = useState(0)
  const [experience, setExperience] = useState(0)

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

  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-100">
      {step === 1 && (
        <SelectMajor
          meta={{ setMajor: setMajor, step: step, setStep: setStep }}
        />
      )}
      {step === 2 && <SelectCollegeTier onNext={handleNextStep} />}
      {step === 3 && <GPAClickerGame onFinish={handleGPAClickerFinish} />}
      {step === 4 && <FallingBallsGame onFinish={handleFallingBallsFinish} />}
      {step === 5 && (
        <div className="flex min-h-screen flex-col items-center justify-center bg-blue-100">
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
        </div>
      )}
    </div>
  )
}
