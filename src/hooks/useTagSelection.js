import { useEffect } from 'react'

const useTagSelection = (tagsData, selectedTag, setSelectedTag) => {
    useEffect(() => {
        if (
            tagsData.length > 0 &&
            selectedTag !== 'All' &&
            !tagsData.some((tag) => tag.tag === selectedTag)
        ) {
            setSelectedTag('All')
        }
    }, [tagsData, selectedTag, setSelectedTag])
}

export default useTagSelection
