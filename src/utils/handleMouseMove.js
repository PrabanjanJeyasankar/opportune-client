function handleMouseMove(e, rockSelector, threshold = 300) {
    const x = e.clientX
    const y = e.clientY
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    //To move rocks in the opposite direction to the mouse direction
    // const offsetX = (0.5 - x / windowWidth) * 100
    // const offsetY = (0.5 - y / windowHeight) * 100

    const rocks = document.querySelectorAll(rockSelector)
    rocks.forEach((rock) => {
        // Get the position of the rock in the DOM
        const rockRect = rock.getBoundingClientRect()
        const rockCenterX = rockRect.left + rockRect.width / 2
        const rockCenterY = rockRect.top + rockRect.height / 2

        // Calculate the distance between the mouse position and the rock center
        const distance = Math.sqrt(
            (x - rockCenterX) ** 2 + (y - rockCenterY) ** 2
        )

        // value that calculates how close you want the mouse to be
        // const threshold = 300

        // If the mouse is within the threshold, move the rock
        if (distance < threshold) {
            // To move the rock repelling agains the mouse movement
            const repelX = ((rockCenterX - x) / windowWidth) * 120
            const repelY = ((rockCenterY - y) / windowHeight) * 120

            rock.style.transition = 'transform 0.5s ease-out'
            rock.style.transform = `translate(${repelX}px, ${repelY}px)`
        } else {
            // Reset the transformation if the mouse is not near the rock
            rock.style.transform = `translate(0px, 0px)`
        }
    })
}

export default handleMouseMove
