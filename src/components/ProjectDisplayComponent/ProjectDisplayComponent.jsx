import React, { useMemo, useState, useEffect } from 'react'
import projects from '../../data/data'
import ProjectCardComponent from '../ProjectCardComponent/ProjectCardComponent'

const ProjectDisplayComponent = ({ searchTerm, selectedTag }) => {
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm)
        }, 300)

        return () => {
            clearTimeout(handler)
        }
    }, [searchTerm])

    const filteredProjects = useMemo(() => {
        const lowercasedSearchTerm = debouncedSearchTerm.toLowerCase()
        return projects.filter((project) => {
            const matchesSearchTerm = project.projectTitle
                .toLowerCase()
                .includes(lowercasedSearchTerm)
            const matchesSelectedTag =
                selectedTag === 'All' ||
                project.techStackTags.includes(selectedTag)
            return matchesSearchTerm && matchesSelectedTag
        })
    }, [debouncedSearchTerm, selectedTag, projects])

    return <ProjectCardComponent filteredProjects={filteredProjects} />
}

export default ProjectDisplayComponent
