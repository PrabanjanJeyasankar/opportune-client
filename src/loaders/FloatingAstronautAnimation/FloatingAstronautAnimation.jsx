import animationData from '@/assets/animations/astronaut_animation_lottie.json'
import Lottie from 'lottie-react'
import React from 'react'

function FloatingAstronautAnimation() {
    return (
        <div style={{ width: '200px', height: '200px' }}>
            <Lottie animationData={animationData} loop={true} />
        </div>
    )
}

export default FloatingAstronautAnimation
