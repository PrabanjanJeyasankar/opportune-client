import React, { useMemo, useState, useEffect } from 'react'
import ProjectCardComponent from '../ProjectCardComponent/ProjectCardComponent'
import fetchHomeFeedProjectsService from '../../services/fetchHomeFeedProjects'


const HomeFeedProjectsComponent = ({ searchTerm, selectedTag }) => {
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm)
        }, 300)

        return () => {
            clearTimeout(handler)
        }
    }, [searchTerm])

    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true)
            setError(null)

            try {
                const fetchedProjects = await fetchHomeFeedProjectsService()
                setProjects(fetchedProjects)
            } catch (error) {
                setError('Failed to fetch projects. Please try again.')
            } finally {
                setLoading(false)
            }
        }

        fetchProjects()
    }, [])

    const filteredProjects = useMemo(() => {
        const lowercasedSearchTerm = debouncedSearchTerm?.toLowerCase()
        return (projects || []).filter((project) => {
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
    }, [debouncedSearchTerm, selectedTag, projects])

    if (error) {
        return <div>{error}</div>
    }

    return (
        <ProjectCardComponent
            filteredProjects={filteredProjects}
            isLoading={loading}
        />
    )
}

export default HomeFeedProjectsComponent
