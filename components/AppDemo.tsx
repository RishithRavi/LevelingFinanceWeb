'use client'

import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { AppScreen } from '@/components/AppScreen';
import onboarding from '../images/onboarding.png'
export function AppDemo() {
  // const router = useRouter();

  return (
      <Image src={onboarding} alt="onboarding" />
  );
}
