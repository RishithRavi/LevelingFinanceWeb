'use client'
import React, { useEffect } from 'react'

const AdsComponent = (props: any) => {
  const { dataAdSlot } = props

  useEffect(() => {
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (e) {}
  }, [])

  return (
    <>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-3578270982337601"
        data-ad-slot="3701359980"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </>
  )
}

export default AdsComponent
