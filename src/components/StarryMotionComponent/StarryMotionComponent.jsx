import React, { useEffect, useRef } from 'react'
import starryMotionStyles from './StarryMotionComponent.module.css'

function StarryMotionComponent() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        // Resize the canvas to fit the window
        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resizeCanvas()

        const speed = 0.7
        // Creating an array of stars
        const stars = []
        const numStars = 500
        const centerX = canvas.width / 2
        const centerY = canvas.height / 2

        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * canvas.width - centerX,
                y: Math.random() * canvas.height - centerY,
                z: Math.random() * canvas.width,
            })
        }

        const drawWarpSpeed = () => {
            // Clearing the canvas with a slight fade
            ctx.fillStyle = 'rgba(0, 0, 0, 1)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            stars.forEach((star) => {
                const scale = canvas.width / star.z
                const x = centerX + star.x * scale
                const y = centerY + star.y * scale
                const size = Math.max(1, 2 / star.z)

                // Drawing the star
                ctx.beginPath()
                ctx.arc(x, y, size, 0, Math.PI * 2)
                ctx.fillStyle = 'gray'
                ctx.fill()

                // Moving the star closer to the viewer
                star.z -= speed

                // Reseting the star if it moves past the user
                if (star.z <= 0) {
                    star.x = Math.random() * canvas.width - centerX
                    star.y = Math.random() * canvas.height - centerY
                    star.z = canvas.width
                }
            })
        }

        const animate = () => {
            drawWarpSpeed()
            requestAnimationFrame(animate)
        }

        // Initiate the animation
        animate()

        // Adjust canvas size on window resize
        window.addEventListener('resize', resizeCanvas)

        return () => {
            window.removeEventListener('resize', resizeCanvas)
        }
    }, [])

    return (
        <canvas ref={canvasRef} id={starryMotionStyles.universeCanvas}></canvas>
    )
}

export default StarryMotionComponent
