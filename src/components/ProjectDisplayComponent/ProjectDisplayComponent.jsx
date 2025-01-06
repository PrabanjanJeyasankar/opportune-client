import React, { useMemo, useState, useEffect } from 'react'
import ProjectCardComponent from '../ProjectCardComponent/ProjectCardComponent'
import fetchHomeFeedProjectsService from '../../services/fetchHomeFeedProjects'

const ProjectDisplayComponent = ({ searchTerm, selectedTag }) => {
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
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
                console.log(fetchedProjects)
            } catch (error) {
                setError('Failed to fetch projects. Please try again.')
                console.error(error)
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
            console.log('Selected Tag: ', selectedTag)
            console.log('Project Tags: ', project.tags)
            // const matchesSelectedTag =
            //     selectedTag === 'All' ||
            //     project.techStackTags.includes(selectedTag)
            const matchesSelectedTag =
                selectedTag === 'All' ||
                (project.tags &&
                    project.tags.some(
                        (tag) => tag.toLowerCase() === selectedTag.toLowerCase()
                    ))
            console.log(matchesSelectedTag)
            return matchesSearchTerm && matchesSelectedTag
        })
    }, [debouncedSearchTerm, selectedTag, projects])

    if (loading) {
        return <div>Loading projects...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    return <ProjectCardComponent filteredProjects={filteredProjects} />
}

export default ProjectDisplayComponent
