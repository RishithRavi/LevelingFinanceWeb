'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { Input } from '@headlessui/react'
import { useSignIn, useSignUp } from '@clerk/clerk-react'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState(new Array(6).fill(''))
  const [verifying, setVerifying] = useState(false)
  const {
    isLoaded: isSignInLoaded,
    signIn,
    setActive: setSignInActive,
  } = useSignIn()
  const {
    isLoaded: isSignUpLoaded,
    signUp,
    setActive: setSignUpActive,
  } = useSignUp()
  const router = useRouter()
  const otpRefs = useRef([])

  const handlePhoneChange = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value)
    setPhone(formattedPhoneNumber)
  }

  const formatPhoneNumber = (value) => {
    const phoneNumber = value.replace(/[^\d]/g, '') // Remove all non-numeric characters
    const phoneNumberLength = phoneNumber.length

    if (phoneNumberLength < 4) return phoneNumber
    if (phoneNumberLength < 7)
      return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3)}`
    return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3, 6)} ${phoneNumber.slice(6, 10)}`
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!isSignInLoaded || !signIn) return

    try {
      // Start the sign-in process using the phone number method
      const { supportedFirstFactors } = await signIn.create({
        identifier: phone,
      })

      // Filter the returned array to find the 'phone_code' entry
      const isPhoneCodeFactor = (factor) => factor.strategy === 'phone_code'
      const phoneCodeFactor = supportedFirstFactors?.find(isPhoneCodeFactor)

      if (phoneCodeFactor) {
        // Grab the phoneNumberId
        const { phoneNumberId } = phoneCodeFactor

        // Send the OTP code to the user
        await signIn.prepareFirstFactor({
          strategy: 'phone_code',
          phoneNumberId,
        })

        // Set verifying to true to display second form and capture the OTP code
        setVerifying(true)
      }
    } catch (err) {
      console.error('Error:', JSON.stringify(err, null, 2))
    }
  }

  const handleVerification = async (e) => {
    e.preventDefault()

    if (!isSignInLoaded || !signIn) return

    try {
      // Use the code provided by the user and attempt verification
      const code = otp.join('')
      const signInAttempt = await signIn.attemptFirstFactor({
        strategy: 'phone_code',
        code,
      })

      // If verification was completed, set the session to active and redirect the user
      if (signInAttempt.status === 'complete') {
        await setSignInActive({ session: signInAttempt.createdSessionId })
        router.push('/')
      } else {
        console.error(signInAttempt)
      }
    } catch (err) {
      console.error('Error:', JSON.stringify(err, null, 2))
    }
  }

  const handleOtpChange = (element, index) => {
    const value = element.value
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)

      // Move focus to next input field if the current field is not empty
      if (value !== '' && index < otpRefs.current.length - 1) {
        otpRefs.current[index + 1].focus()
      }
    }
  }

  const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1].focus()
    }
  }

  return (
    <AuthLayout
      title="Sign in to account"
      subtitle={
        <>
          Don’t have an account?{' '}
          <Link href="/register" className="text-indigo-600">
            Sign up
          </Link>{' '}
          for free.
        </>
      }
    >
      {verifying ? (
        <form onSubmit={handleVerification}>
          <div className="space-y-6">
            <label htmlFor="code">Enter your verification code</label>
            <div className="flex justify-center space-x-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (otpRefs.current[index] = el)}
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target, index)}
                  onKeyDown={(e) => handleOtpKeyDown(e, index)}
                  maxLength={1}
                  className={
                    'h-12 w-12 rounded-md border border-gray-300 text-center text-2xl focus:ring-2 focus:ring-indigo-600'
                  }
                />
              ))}
            </div>
          </div>
          <Button type="submit" color="indigo" className="mt-8 w-full">
            Verify
          </Button>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <Input
              onChange={handlePhoneChange}
              value={phone}
              type="tel"
              placeholder="Enter your phone number"
              className={
                'block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              }
            />
          </div>
          <Button type="submit" color="indigo" className="mt-8 w-full">
            Sign in to your account
          </Button>
        </form>
      )}
    </AuthLayout>
  )
}
