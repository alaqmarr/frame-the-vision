'use client'
import { updateAnalytics } from '@/lib/analytics';
import React, { useEffect } from 'react'

const Guide = () => {
  useEffect(() => {
    updateAnalytics();
}, []);
  return (
    <div>Guide</div>
  )
}

export default Guide