"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { gsap } from "gsap"

interface DrawTextProps {
  text: string
  className?: string
  duration?: number
  delay?: number
  stagger?: number
}

export function DrawText({ text, className = "", duration = 0.08, delay = 0.5, stagger = 0.08 }: DrawTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [displayChars, setDisplayChars] = useState<string[]>(text.split("").map(() => ""))
  const [activeIndices, setActiveIndices] = useState<boolean[]>(text.split("").map(() => false))
  const [flippingIndices, setFlippingIndices] = useState<boolean[]>(text.split("").map(() => false))
  const [hasAnimated, setHasAnimated] = useState(false)
  const intervalsRef = useRef<NodeJS.Timeout[]>([])

  const characters = text.split("")
  const flipChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-+#@$%"

  const runTickerAnimation = useCallback(
    (animationDelay = 0) => {
      // Clear any existing intervals
      intervalsRef.current.forEach(clearInterval)
      intervalsRef.current = []

      // Reset states
      setDisplayChars(text.split("").map(() => ""))
      setActiveIndices(text.split("").map(() => false))
      setFlippingIndices(text.split("").map(() => false))

      characters.forEach((targetChar, index) => {
        const letterDelay = animationDelay + index * stagger

        gsap.delayedCall(letterDelay, () => {
          setFlippingIndices((prev) => {
            const next = [...prev]
            next[index] = true
            return next
          })

          let flipCount = 0
          const maxFlips = 8 + Math.floor(Math.random() * 6)

          const flipInterval = setInterval(() => {
            flipCount++

            if (flipCount >= maxFlips) {
              clearInterval(flipInterval)
              setDisplayChars((prev) => {
                const next = [...prev]
                next[index] = targetChar
                return next
              })
              setActiveIndices((prev) => {
                const next = [...prev]
                next[index] = true
                return next
              })
              setFlippingIndices((prev) => {
                const next = [...prev]
                next[index] = false
                return next
              })
            } else {
              setDisplayChars((prev) => {
                const next = [...prev]
                next[index] = flipChars[Math.floor(Math.random() * flipChars.length)]
                return next
              })
            }
          }, duration * 1000)

          intervalsRef.current.push(flipInterval)
        })
      })
    },
    [text, duration, stagger, characters],
  )

  useEffect(() => {
    if (!containerRef.current || hasAnimated) return

    const ctx = gsap.context(() => {
      runTickerAnimation(delay)
      setHasAnimated(true)
    }, containerRef)

    return () => {
      ctx.revert()
      intervalsRef.current.forEach(clearInterval)
    }
  }, [delay, hasAnimated, runTickerAnimation])

  const handleMouseEnter = () => {
    if (hasAnimated) {
      runTickerAnimation(0)
    }
  }

  return (
    <h1
      ref={containerRef}
      className={className}
      onMouseEnter={handleMouseEnter}
      style={{
        fontSize: "clamp(5rem, 18vw, 18rem)",
        lineHeight: 0.9,
        letterSpacing: "0.02em",
        fontFamily: "'Bebas Neue', sans-serif",
        display: "flex",
        cursor: "pointer",
      }}
    >
      {characters.map((char, index) => (
        <span
          key={index}
          className="relative inline-block transition-colors duration-100"
          style={{
            backgroundColor: activeIndices[index] ? "#facc15" : "transparent",
            color: activeIndices[index] ? "#000000" : flippingIndices[index] ? "#facc15" : "transparent",
            padding: "0.08em 0.05em",
            marginRight: "0.06em",
            minWidth: char === " " ? "0.3em" : undefined,
          }}
        >
          {displayChars[index] || (char === " " ? "\u00A0" : "")}
        </span>
      ))}
    </h1>
  )
}
