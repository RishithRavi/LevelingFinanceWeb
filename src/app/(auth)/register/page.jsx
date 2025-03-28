'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { Input } from '@headlessui/react'
import { useSignIn, useSignUp } from '@clerk/clerk-react'
import { useRouter } from 'next/navigation'

export default function SignUp() {
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState(new Array(6).fill(''))
  const [verifying, setVerifying] = useState(false)
  const [role, setRole] = useState('student')
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
    console.log('clicked')
    if (!isSignUpLoaded || !signUp) return

    try {
      // Start the sign-up process using the phone number method
      await signUp.create({
        phoneNumber: phone,
        unsafeMetadata: {
          role: role,
        },
      })

      // Send the OTP code to the user
      await signUp.preparePhoneNumberVerification()

      // Set verifying to true to display second form and capture the OTP code
      setVerifying(true)
    } catch (err) {
      console.error('Error:', JSON.stringify(err, null, 2))
    }
  }

  const handleVerification = async () => {
    if (!isSignUpLoaded || !signUp) return

    try {
      // Use the code provided by the user and attempt verification
      const code = otp.join('')
      const signUpAttempt = await signUp.attemptPhoneNumberVerification({
        code,
      })

      // If verification was completed, set the session to active and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setSignUpActive({ session: signUpAttempt.createdSessionId })
        router.push('/')
      } else {
        console.error(signUpAttempt)
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

      // Auto-blur and verify if the last digit is entered
      if (index === otpRefs.current.length - 1 && value !== '') {
        element.blur()
        handleVerification()
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
      title="Sign up for an account"
      subtitle={
        <>
          Already registered?{' '}
          <Link href="/login" className="text-indigo-600">
            Sign in
          </Link>{' '}
          to your account.
        </>
      }
    >
      {verifying ? (
        <form>
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
          <Button
            type="button"
            color="indigo"
            className="mt-8 w-full"
            onClick={handleVerification}
          >
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
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Role
              </label>
              <select
                id="role"
                name="role"
                value={role}
                onChange={(e) => {
                  setRole(e.target.value)
                }}
                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>
          </div>
          <Button type="submit" color="indigo" className="mt-8 w-full">
            Sign up for account
          </Button>
        </form>
      )}
    </AuthLayout>
  )
}
