import { useState, useEffect } from 'react'
import useHomeFeedResetContext from '@/hooks/useHomeFeedResetContext'

const useDebouncedSearchTerm = (delay = 300) => {
    const { searchTerm } = useHomeFeedResetContext()
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm)

    useEffect(() => {
        const handler = setTimeout(
            () => setDebouncedSearchTerm(searchTerm),
            delay
        )
        return () => clearTimeout(handler)
    }, [searchTerm, delay])

    return debouncedSearchTerm
}

export default useDebouncedSearchTerm
