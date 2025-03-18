import { useEffect } from 'react'

function useSmoothScroll(speed = 15, enabled = true) {
    useEffect(() => {
        if (!enabled) return

        let animationFrameId = null
        let targetY = window.scrollY
        let currentY = window.scrollY
        let isScrolling = false

        const smoothScroll = () => {
            // this calculated the distance to move
            const diff = targetY - currentY

            // If we're close enough to the target, just jump to it
            if (Math.abs(diff) < 0.5) {
                currentY = targetY
                window.scrollTo(0, currentY)
                isScrolling = false
                return
            }

            // Incrementally move towards the target
            currentY += diff / speed
            window.scrollTo(0, currentY)

            animationFrameId = requestAnimationFrame(smoothScroll)
        }

        const handleScroll = () => {
            if (!isScrolling) {
                targetY = window.scrollY
                currentY = window.scrollY
            }
        }

        const handleWheel = (e) => {
            e.preventDefault()

            isScrolling = true
            targetY += e.deltaY

            targetY = Math.max(
                0,
                Math.min(
                    targetY,
                    document.body.scrollHeight - window.innerHeight
                )
            )

            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId)
            }

            animationFrameId = requestAnimationFrame(smoothScroll)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        window.addEventListener('wheel', handleWheel, { passive: false })

        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('wheel', handleWheel)

            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId)
            }
        }
    }, [speed, enabled])
}

export default useSmoothScroll
