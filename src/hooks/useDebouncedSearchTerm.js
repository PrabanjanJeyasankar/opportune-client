import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectProjectsSearchTerm } from '@/app/features/projects/projectsSelectors'

const useDebouncedSearchTerm = (delay = 300) => {
    const searchTerm = useSelector(selectProjectsSearchTerm)
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm)
        }, delay)

        return () => clearTimeout(handler)
    }, [searchTerm, delay])

    return debouncedSearchTerm
}

export default useDebouncedSearchTerm
