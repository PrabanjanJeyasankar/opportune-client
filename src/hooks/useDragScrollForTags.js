import { useState } from 'react'

function useDragScrollForTags(containerRef) {
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)

    const handleMouseDown = (e) => {
        if (!containerRef.current) return
        setIsDragging(true)
        setStartX(e.pageX - containerRef.current.offsetLeft)
        setScrollLeft(containerRef.current.scrollLeft)
    }

    const handleMouseUp = () => {
        setIsDragging(false)
    }

    const handleMouseMove = (e) => {
        if (!isDragging || !containerRef.current) return
        e.preventDefault()
        const x = e.pageX - containerRef.current.offsetLeft
        const walk = (x - startX) * 0.5
        containerRef.current.scrollLeft = scrollLeft - walk
    }

    return {
        isDragging,
        startX,
        scrollLeft,
        handleMouseDown,
        handleMouseUp,
        handleMouseMove,
    }
}

export default useDragScrollForTags
