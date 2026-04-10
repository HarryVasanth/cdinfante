import { m, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import React, { useEffect, useState } from 'react'

export const Spotlight = () => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [opacity, setOpacity] = useState(0)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  // Detect if the device is a touch device
  useEffect(() => {
    const checkTouch = window.matchMedia(
      '(hover: none) and (pointer: coarse)',
    ).matches
    setIsTouchDevice(checkTouch)
  }, [])

  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  const background = useMotionTemplate`
    radial-gradient(
      800px circle at ${smoothX}px ${smoothY}px,
      rgba(182, 23, 30, 0.08) 0%,
      rgba(0, 30, 64, 0.03) 40%,
      transparent 80%
    )
  `

  useEffect(() => {
    if (isTouchDevice) return // Do not attach listeners on mobile

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    const handleMouseEnter = () => setOpacity(1)
    const handleMouseLeave = () => setOpacity(0)

    window.addEventListener('mousemove', handleMouseMove)
    document.body.addEventListener('mouseenter', handleMouseEnter)
    document.body.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.body.removeEventListener('mouseenter', handleMouseEnter)
      document.body.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [mouseX, mouseY, isTouchDevice])

  // Completely bypass rendering on touch devices
  if (isTouchDevice) return null

  return (
    <m.div
      className="pointer-events-none fixed inset-0 z-50"
      style={{ background }}
      animate={{ opacity }}
      transition={{ duration: 0.3 }}
    />
  )
}
