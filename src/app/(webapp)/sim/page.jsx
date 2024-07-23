'use client'
import React, { useState } from 'react'
import SelectMajor from '../../../components/SelectMajor'
import SelectCollegeTier from '../../../components/SelectCollegeTier'

export default function Home() {
  const [step, setStep] = useState(1)
  const [major, setMajor] = useState('')
  const [tier, setTier] = useState('')
  const handleNextStep = (tier) => {
    setStep(step + 1)
    setTier(tier)
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-100">
      {step === 1 && (
        <SelectMajor
          meta={{ setMajor: setMajor, step: step, setStep: setStep }}
        />
      )}
      {step === 2 && <SelectCollegeTier onNext={handleNextStep} />}
    </div>
  )
}
