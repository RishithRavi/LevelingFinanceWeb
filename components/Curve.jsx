// components/Curve.js
'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { text, curve, translate } from './animations'

const routes = {
  '/': 'Home',
  '/about': 'About',
  '/contact': 'Contact',
}

const anim = (variants) => {
  return {
    variants,
    initial: 'initial',
    animate: 'enter',
    exit: 'exit',
  }
}

export default function Curve({ children, backgroundColor, textt }) {
  const router = useRouter()
  const [dimensions, setDimensions] = useState({
    width: null,
    height: null,
  })

  useEffect(() => {
    function resize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    resize()
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div
      className={`relative z-20 flex min-h-screen flex-col items-center justify-center`}
      style={{ backgroundColor }}
    >
      <div
        className={`fixed inset-0 ${dimensions.width == null ? 'opacity-100' : 'opacity-0'} bg-indigo-500 transition-opacity delay-100 duration-0`}
      />
      <motion.p
        className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 transform text-center text-4xl text-white"
        {...anim(text)}
      >
        {textt}
      </motion.p>
      {dimensions.width != null && <SVG {...dimensions} />}
      {children}
    </div>
  )
}

const SVG = ({ height, width }) => {
  const initialPath = `
        M0 300 
        Q${width / 2} 0 ${width} 300
        L${width} ${height + 300}
        Q${width / 2} ${height + 600} 0 ${height + 300}
        L0 0
    `

  const targetPath = `
        M0 300
        Q${width / 2} 0 ${width} 300
        L${width} ${height}
        Q${width / 2} ${height} 0 ${height}
        L0 0
    `

  return (
    <motion.svg
      className="pointer-events-none fixed inset-0 left-0 top-0 h-[calc(100vh+600px)] w-full fill-indigo-500"
      {...anim(translate)}
    >
      <motion.path {...anim(curve(initialPath, targetPath))} />
    </motion.svg>
  )
}
