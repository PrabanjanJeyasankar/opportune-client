import useHomeFeedResetContext from '@/hooks/useHomeFeedResetContext'
import { useQuery } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import { useEffect, useMemo, useState } from 'react'
import fetchHomeFeedProjectsService from '../../services/fetchHomeFeedProjects'
import ProjectCardComponent from '../ProjectCardComponent/ProjectCardComponent'
import styles from './HomeFeedProjectsComponent.module.css'

const HomeFeedProjectsComponent = () => {
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
    const { searchTerm, selectedTag } = useHomeFeedResetContext()

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm)
        }, 300)
        return () => {
            clearTimeout(handler)
        }
    }, [searchTerm])

    const {
        data: fetchedProjects,
        isLoading: queryLoading,
        error: queryError,
    } = useQuery({
        queryKey: [
            'homeFeedProjects',
            { searchTerm: debouncedSearchTerm, selectedTag },
        ],
        queryFn: fetchHomeFeedProjectsService,
        staleTime: 5 * 60 * 1000,
        cacheTime: 5 * 60 * 1000,
        retry: 2,
    })

    const filteredProjects = useMemo(() => {
        if (!fetchedProjects) return []
        const lowercasedSearchTerm = debouncedSearchTerm?.toLowerCase()
        return fetchedProjects.filter((project) => {
            const matchesSearchTerm = project.title
                ?.toLowerCase()
                .includes(lowercasedSearchTerm)
            const matchesSelectedTag =
                selectedTag === 'All' ||
                (project.tags &&
                    project.tags.some(
                        (tag) => tag.toLowerCase() === selectedTag.toLowerCase()
                    ))
            return matchesSearchTerm && matchesSelectedTag
        })
    }, [debouncedSearchTerm, selectedTag, fetchedProjects])

    if (queryError) {
        return <div>Failed to fetch projects. Please try again.</div>
    }

    return (
        <div className={styles.home_feed_projects_container}>
            <ProjectCardComponent
                filteredProjects={filteredProjects}
                isLoading={queryLoading}
            />
        </div>
    )
}

HomeFeedProjectsComponent.propTypes = {
    searchTerm: PropTypes.string,
    selectedTag: PropTypes.string,
}

export default HomeFeedProjectsComponent
