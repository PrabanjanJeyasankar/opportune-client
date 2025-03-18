const useScrollHandlerForTags = (scrollAmount = 250) => {
    const easeInOutQuad = (t, b, c, d) => {
        t /= d / 2
        if (t < 1) return (c / 2) * t * t + b
        t--
        return (-c / 2) * (t * (t - 2) - 1) + b
    }

    const smoothScroll = (element, target, duration) => {
        const start = element.scrollLeft
        const change = target - start
        const startTime = performance.now()

        const animateScroll = (currentTime) => {
            const elapsedTime = currentTime - startTime
            if (elapsedTime < duration) {
                element.scrollLeft = easeInOutQuad(
                    elapsedTime,
                    start,
                    change,
                    duration
                )
                requestAnimationFrame(animateScroll)
            } else {
                element.scrollLeft = target
            }
        }

        requestAnimationFrame(animateScroll)
    }

    return { smoothScroll, easeInOutQuad }
}

export default useScrollHandlerForTags
