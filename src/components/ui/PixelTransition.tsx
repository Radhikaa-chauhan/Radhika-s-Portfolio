'use client'

import { useEffect, useRef, useCallback } from 'react'

// Section IDs in order, matching page.tsx layout
const SECTION_IDS = [
  'hero',
  'about',
  'projects',
  'experience',
  'skills',
  'opensource',
  'contact',
]

export default function PixelTransition() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const isTransitioning = useRef(false)
  const cooldownRef = useRef(false)
  const lastSectionRef = useRef<string>('')
  const scrollLockedRef = useRef(false)

  // The core canvas animation — fills screen with pixels, calls onMidpoint, then reveals
  const runTransition = useCallback(
    (targetSelector?: string) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')!

      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      const W = canvas.width
      const H = canvas.height
      const pixelSize = 20
      const cols = Math.ceil(W / pixelSize)
      const rows = Math.ceil(H / pixelSize)
      const total = cols * rows

      // Create all pixel cells and shuffle them for random fill pattern
      const cells: [number, number][] = []
      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++) cells.push([c, r])

      // Fisher-Yates shuffle
      for (let i = cells.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[cells[i], cells[j]] = [cells[j], cells[i]]
      }

      const accentColor = '#3FB950' // matches --accent
      const PHASE_DURATION = 500
      const startTime = performance.now()
      let midpointFired = false

      // Lock scrolling during transition
      scrollLockedRef.current = true
      document.body.style.overflow = 'hidden'

      function draw(now: number) {
        const elapsed = now - startTime
        ctx.clearRect(0, 0, W, H)

        if (elapsed <= PHASE_DURATION) {
          // PHASE 1: pixels fill in (cover the screen)
          const progress = Math.min(elapsed / PHASE_DURATION, 1)
          // Ease-in-out curve for smoother feel
          const easedProgress =
            progress < 0.5
              ? 2 * progress * progress
              : 1 - Math.pow(-2 * progress + 2, 2) / 2
          const filled = Math.floor(easedProgress * total)

          for (let i = 0; i < filled; i++) {
            const [c, r] = cells[i]
            const isFlashing = i > filled - 5
            ctx.fillStyle = isFlashing ? '#ffffff' : accentColor
            ctx.globalAlpha = isFlashing ? 0.95 : 0.85
            ctx.fillRect(
              c * pixelSize,
              r * pixelSize,
              pixelSize - 1,
              pixelSize - 1
            )
          }

          ctx.globalAlpha = 1
          rafRef.current = requestAnimationFrame(draw)
        } else {
          // PHASE 2: pixels disappear (reveal the new section)
          if (!midpointFired) {
            midpointFired = true
            // Scroll to target at midpoint when screen is fully covered
            if (targetSelector) {
              const el = document.querySelector(targetSelector)
              if (el) {
                el.scrollIntoView({ behavior: 'instant' as ScrollBehavior })
              }
            }
          }

          const progress2 = Math.min(
            (elapsed - PHASE_DURATION) / PHASE_DURATION,
            1
          )
          const easedProgress2 =
            progress2 < 0.5
              ? 2 * progress2 * progress2
              : 1 - Math.pow(-2 * progress2 + 2, 2) / 2
          const remaining = Math.floor((1 - easedProgress2) * total)

          for (let i = 0; i < remaining; i++) {
            const [c, r] = cells[i]
            const isFlashing = i < 5
            ctx.fillStyle = isFlashing ? '#ffffff' : accentColor
            ctx.globalAlpha = isFlashing ? 0.95 : 0.85
            ctx.fillRect(
              c * pixelSize,
              r * pixelSize,
              pixelSize - 1,
              pixelSize - 1
            )
          }

          ctx.globalAlpha = 1

          if (progress2 < 1) {
            rafRef.current = requestAnimationFrame(draw)
          } else {
            ctx.clearRect(0, 0, W, H)
            isTransitioning.current = false
            // Unlock scrolling
            scrollLockedRef.current = false
            document.body.style.overflow = ''
            // Start cooldown to prevent immediate re-trigger
            cooldownRef.current = true
            // Update last section to current position
            const currentSection = getCurrentSection()
            if (currentSection) {
              lastSectionRef.current = currentSection
            }
            setTimeout(() => {
              cooldownRef.current = false
            }, 800)
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw)
    },
    []
  )

  // Get the section currently most visible in viewport
  const getCurrentSection = useCallback(() => {
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id)
      if (!el) continue
      const rect = el.getBoundingClientRect()
      // Section is considered "current" if its top is within the viewport's upper half
      if (rect.top <= window.innerHeight / 2 && rect.bottom > window.innerHeight / 4) {
        return id
      }
    }
    return SECTION_IDS[0]
  }, [])

  // Trigger the transition
  const triggerTransition = useCallback(
    (targetId: string) => {
      if (
        isTransitioning.current ||
        cooldownRef.current ||
        scrollLockedRef.current
      )
        return

      isTransitioning.current = true
      runTransition(`#${targetId}`)
    },
    [runTransition]
  )

  useEffect(() => {
    // Initialize last known section
    lastSectionRef.current = getCurrentSection() || SECTION_IDS[0]

    // ---- SCROLL-BASED SECTION DETECTION via IntersectionObserver ----
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          isTransitioning.current ||
          cooldownRef.current ||
          scrollLockedRef.current
        )
          return

        for (const entry of entries) {
          if (entry.isIntersecting) {
            const newSection = entry.target.id
            const prevSection = lastSectionRef.current

            if (newSection && prevSection && newSection !== prevSection) {
              // A new section has entered the viewport — trigger the transition
              lastSectionRef.current = newSection
              triggerTransition(newSection)
              break
            }
          }
        }
      },
      {
        // Trigger when a section's top edge crosses 40% from the top of viewport
        rootMargin: '-40% 0px -55% 0px',
        threshold: 0,
      }
    )

    // Observe all sections
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    // ---- CUSTOM EVENT HANDLER (from Navbar / Hero buttons) ----
    const handleCustomEvent = (e: Event) => {
      const detail = (e as CustomEvent).detail as string
      if (!detail) return

      const targetId = detail.replace('#', '')
      if (targetId === lastSectionRef.current) {
        // Already on this section, just scroll smoothly
        const el = document.getElementById(targetId)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
        return
      }

      lastSectionRef.current = targetId
      triggerTransition(targetId)
    }

    window.addEventListener('trigger-pixel-transition', handleCustomEvent)

    // ---- WHEEL EVENT HANDLER — hijack wheel scroll for section snapping ----
    let accumulatedDelta = 0
    let wheelTimeout: ReturnType<typeof setTimeout> | null = null

    const handleWheel = (e: WheelEvent) => {
      if (
        isTransitioning.current ||
        cooldownRef.current ||
        scrollLockedRef.current
      )  {
        e.preventDefault()
        return
      }

      e.preventDefault()
      accumulatedDelta += e.deltaY

      if (wheelTimeout) clearTimeout(wheelTimeout)
      wheelTimeout = setTimeout(() => {
        accumulatedDelta = 0
      }, 150)

      // Need enough scroll intent to trigger (prevents accidental micro-scrolls)
      const threshold = 80
      if (Math.abs(accumulatedDelta) < threshold) return

      const direction = accumulatedDelta > 0 ? 1 : -1
      accumulatedDelta = 0
      if (wheelTimeout) {
        clearTimeout(wheelTimeout)
        wheelTimeout = null
      }

      const currentSection = getCurrentSection() || SECTION_IDS[0]
      const currentIndex = SECTION_IDS.indexOf(currentSection)
      const nextIndex = currentIndex + direction

      if (nextIndex < 0 || nextIndex >= SECTION_IDS.length) return

      const targetId = SECTION_IDS[nextIndex]
      lastSectionRef.current = targetId
      triggerTransition(targetId)
    }

    window.addEventListener('wheel', handleWheel, { passive: false })

    // ---- TOUCH EVENT HANDLER — for mobile swipe navigation ----
    let touchStartY = 0

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (
        isTransitioning.current ||
        cooldownRef.current ||
        scrollLockedRef.current
      )
        return

      const touchEndY = e.changedTouches[0].clientY
      const diff = touchStartY - touchEndY
      const swipeThreshold = 60

      if (Math.abs(diff) < swipeThreshold) return

      const direction = diff > 0 ? 1 : -1
      const currentSection = getCurrentSection() || SECTION_IDS[0]
      const currentIndex = SECTION_IDS.indexOf(currentSection)
      const nextIndex = currentIndex + direction

      if (nextIndex < 0 || nextIndex >= SECTION_IDS.length) return

      const targetId = SECTION_IDS[nextIndex]
      lastSectionRef.current = targetId
      triggerTransition(targetId)
    }

    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      cancelAnimationFrame(rafRef.current)
      observer.disconnect()
      window.removeEventListener('trigger-pixel-transition', handleCustomEvent)
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
      document.body.style.overflow = ''
    }
  }, [triggerTransition, getCurrentSection])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9998, // just below cursor, above everything else
        pointerEvents: 'none',
      }}
    />
  )
}