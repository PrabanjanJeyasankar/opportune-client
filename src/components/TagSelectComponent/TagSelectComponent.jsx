import React, { useEffect, useState } from "react"
import InputComponent from "../../elements/InputComponent/InputComponent"
import styles from "../TagSelectComponent/TagSelectComponent.module.css"

const TagSelectComponent = ({
    handleTagClick,
    selectedTags,
    error,
    serviceFunction,
}) => {
    const [searchTerm, setSearchTerm] = useState("")
    const [suggestedTags, setSuggestedTags] = useState([])
    const [warning, setWarning] = useState("")

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (searchTerm) {
                fetchSuggestedTags(searchTerm)
            } else {
                setSuggestedTags([])
            }
        }, 300)

        return () => clearTimeout(delayDebounce)
    }, [searchTerm])

    const fetchSuggestedTags = async (term) => {
        try {
            if (serviceFunction.function) {
                const response = await serviceFunction.function(term)
                const tags = response.data.data.map(
                    (item) => Object.values(item)[1]
                )
                setSuggestedTags(tags)
            } else {
                console.error(
                    `Function ${serviceFunction.fn} not found in ${serviceFunction.service}`
                )
                setSuggestedTags([])
            }
        } catch (error) {
            if (!navigator.onLine || !error.response) {
                toast({
                    description: "No internet connection. Please check your network.",
                })
            } else if (error.response.status === 500 || error.response.status === 503) {
                toast({ description: "Server error. Please try again later." })
            } else {
                toast({
                    description: "Something went wrong. Please try again.",
                })
            }
            console.error(`Error in ${serviceFunction.service}:`, error)
            setSuggestedTags([])
        } 
    }

    const handleAddTag = (tag) => {
        if (selectedTags.length >= 3) {
            setWarning("You can only select three tags.")
            return
        }
        setWarning("")
        handleTagClick(tag)
        setSearchTerm("")
        setSuggestedTags([])
    }

    const handleRemoveTag = (tag) => {
        handleTagClick(tag)
    }

    return (
        <div className={styles.tags_section}>
            <div className={styles.search_section}>
                <InputComponent
                    type="text"
                    placeholder="Search for tags..."
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    className={styles.search_input}
                />

                {suggestedTags.length > 0 && (
                    <div className={styles.suggestions}>
                        {suggestedTags.map((tag) => (
                            <div
                                key={tag}
                                className={styles.suggestion_item}
                                onClick={() => handleAddTag(tag)}
                            >
                                {tag}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className={styles.tags_container}>
                {selectedTags.map((tag) => (
                    <div key={tag} className={styles.tag_button}>
                        {tag}
                        <span onClick={() => handleRemoveTag(tag)}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="16"
                                height="16"
                                className={styles.cancel_icon}
                                fill="currentColor"
                            >
                                <path d="M18.36 5.64a1 1 0 00-1.41 0L12 10.59 7.05 5.64a1 1 0 00-1.41 1.41L10.59 12l-4.95 4.95a1 1 0 101.41 1.41L12 13.41l4.95 4.95a1 1 0 001.41-1.41L13.41 12l4.95-4.95a1 1 0 000-1.41z" />
                            </svg>
                        </span>
                    </div>
                ))}
            </div>

            {warning && <p className={styles.error_message}>{warning}</p>}
            {error && <p className={styles.error_message}>{error}</p>}
        </div>
    )
}

export default TagSelectComponent
