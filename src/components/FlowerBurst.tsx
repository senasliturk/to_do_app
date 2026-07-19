import { useState } from 'react'
import type { CSSProperties } from 'react'

const FLOWERS = ['🌸', '🌼', '✨', '🌷', '🌻', '✨']

interface Particle {
  flower: string
  style: CSSProperties
}

function createParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => {
    const angle = (360 / count) * i + Math.random() * 24
    const distance = 24 + Math.random() * 16
    const tx = Math.cos((angle * Math.PI) / 180) * distance
    const ty = Math.sin((angle * Math.PI) / 180) * distance - 8
    const rot = Math.random() * 140 - 70

    return {
      flower: FLOWERS[i % FLOWERS.length],
      style: {
        '--tx': `${tx}px`,
        '--ty': `${ty}px`,
        '--rot': `${rot}deg`,
        animationDelay: `${i * 25}ms`,
      } as CSSProperties,
    }
  })
}

interface FlowerBurstProps {
  count?: number
}

export function FlowerBurst({ count = 6 }: FlowerBurstProps) {
  const [particles] = useState(() => createParticles(count))

  return (
    <span aria-hidden className="pointer-events-none absolute inset-0">
      {particles.map((particle, i) => (
        <span key={i} className="flower-particle" style={particle.style}>
          {particle.flower}
        </span>
      ))}
    </span>
  )
}
