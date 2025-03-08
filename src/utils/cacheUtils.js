const PREDEFINED_QUERY_KEYS = [
    ['projects'],
    ['projects', 'all'],
    ['projects', 'featured'],
    ['projects', 'trending'],
    ['user', 'projects'],
]

export function updateProjectInData(data, projectSlug, liked) {
    if (!data) return data

    const newData = structuredClone(data)

    const updateSingleProject = (project) => {
        if (!project || project.slug !== projectSlug) return project

        return {
            ...project,
            isUserLiked: liked,
            upvoteCount: liked
                ? (project.upvoteCount || 0) + 1
                : Math.max((project.upvoteCount || 0) - 1, 0),
        }
    }

    const updateProjectsArray = (projects) => {
        if (!Array.isArray(projects)) return projects

        return projects.map((project) =>
            project?.slug === projectSlug
                ? updateSingleProject(project)
                : project
        )
    }

    if (Array.isArray(newData)) {
        return updateProjectsArray(newData)
    }

    if (newData.data) {
        if (Array.isArray(newData.data)) {
            newData.data = updateProjectsArray(newData.data)
        } else if (
            newData.data.projects &&
            Array.isArray(newData.data.projects)
        ) {
            newData.data.projects = updateProjectsArray(newData.data.projects)
        } else if (newData.data.slug === projectSlug) {
            newData.data = updateSingleProject(newData.data)
        }
    }

    return newData
}

export function updateProjectInCache(queryClient, projectSlug, liked) {
    const queriesFromCache = queryClient.getQueryCache().getAll()
    const projectQueryKeys = queriesFromCache.map((query) => query.queryKey)

    const allQueryKeys = [...PREDEFINED_QUERY_KEYS, ...projectQueryKeys]

    const uniqueKeys = Array.from(
        new Set(allQueryKeys.map(JSON.stringify))
    ).map((key) => JSON.parse(key))

    uniqueKeys.forEach((queryKey) => {
        try {
            queryClient.setQueriesData({ queryKey }, (oldData) =>
                updateProjectInData(oldData, projectSlug, liked)
            )
        } catch (error) {
            console.error(`Error updating query key ${queryKey}:`, error)
        }
    })

    queryClient.invalidateQueries(['project', projectSlug])
}
