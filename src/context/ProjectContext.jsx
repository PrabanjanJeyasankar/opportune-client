import React, { createContext, useEffect, useMemo, useState } from 'react'
import useHomeFeedProjects from '../hooks/useHomeFeedProjects'
import useDebouncedSearchTerm from '../hooks/useDebouncedSearchTerm'
import useOnlineStatus from '../hooks/useOnlineStatus'
import useUserContext from '@/hooks/useUserContext'
import useHomeFeedResetContext from '@/hooks/useHomeFeedResetContext'
import { useQueryClient } from '@tanstack/react-query'

const ProjectContext = createContext()

const ProjectProvider = ({ children }) => {
    const [currentViewingProject, setCurrentViewingProject] = useState(null)
    const isOnline = useOnlineStatus()
    const debouncedSearchTerm = useDebouncedSearchTerm()
    const { selectedTag } = useHomeFeedResetContext()
    const { isUserLoggedIn } = useUserContext()
    const queryClient = useQueryClient()

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        error,
        refetch,
    } = useHomeFeedProjects(debouncedSearchTerm, selectedTag, isOnline)

    useEffect(() => {
        if (isUserLoggedIn) {
            queryClient.invalidateQueries({ queryKey: ['homeFeedProjects'] })
        }
    }, [isUserLoggedIn, queryClient])

    const allProjects = useMemo(
        () => (data?.pages ? data.pages.flat() : []),
        [data]
    )

    const filteredProjects = useMemo(() => {
        if (!allProjects.length) return []
        const lowercasedSearchTerm = debouncedSearchTerm?.toLowerCase() || ''
        return allProjects.filter((project) => {
            const matchesSearchTerm =
                !debouncedSearchTerm ||
                project.title?.toLowerCase().includes(lowercasedSearchTerm)
            const matchesSelectedTag =
                !selectedTag ||
                selectedTag === 'All' ||
                (project.tags &&
                    project.tags.some(
                        (tag) => tag.toLowerCase() === selectedTag.toLowerCase()
                    ))
            return matchesSearchTerm && matchesSelectedTag
        })
    }, [debouncedSearchTerm, selectedTag, allProjects])

    return (
        <ProjectContext.Provider
            value={{
                filteredProjects,
                fetchNextPage,
                hasNextPage,
                isFetchingNextPage,
                isLoading,
                error,
                refetch,
                isOnline,
                currentViewingProject,
                setCurrentViewingProject,
            }}>
            {children}
        </ProjectContext.Provider>
    )
}

export { ProjectContext, ProjectProvider }
