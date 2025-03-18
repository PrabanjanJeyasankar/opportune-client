import { useState } from 'react'

function useSharePopover() {
    const [isSharePopoverOpen, setIsSharePopoverOpen] = useState(false)

    const handleShareClick = (e) => {
        e.stopPropagation()
        setIsSharePopoverOpen(true)
    }

    const closeSharePopover = () => setIsSharePopoverOpen(false)

    return { isSharePopoverOpen, handleShareClick, closeSharePopover }
}

export default useSharePopover