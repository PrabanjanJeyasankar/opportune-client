import { useEffect } from 'react'
import styles from './TagFilterComponent.module.css'

const tags = [
    { tag: 'All' },
    { tag: 'HTML' },
    { tag: 'JavaScript' },
    { tag: 'MERN' },
    { tag: 'MEAN' },
    { tag: 'UI/UX' },
    { tag: 'Blockchain' },
    { tag: 'Automation' },
    { tag: 'Libraries' },
    { tag: 'E-commerce' },
    { tag: 'Portfolios' },
    { tag: 'Desktop' },
    { tag: 'Bot' },
    { tag: 'Security' },
    { tag: 'Crypto' },
    { tag: 'Mobile' },
    { tag: 'ML' },
    { tag: 'Open source' },
    { tag: 'Web' },
    { tag: 'Cloud' },
    { tag: 'Gaming' },
    { tag: 'Entertainment' },
    { tag: 'AR/VR' },
    { tag: 'AI' },
]

function TagFilterComponent({ selectedTag, setSelectedTag }) {
    // Set default selected tag to "All" on initial render
    useEffect(() => {
        if (!selectedTag) {
            setSelectedTag('All')
        }
    }, [selectedTag, setSelectedTag])

    return (
        <div className={styles.tags_container}>
            <div className={styles.tags_filter}>
                {tags.map((tagObj, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedTag(tagObj.tag)}
                        className={`${styles.tag} ${
                            selectedTag === tagObj.tag
                                ? styles.tag_selected
                                : ''
                        }`}>
                        {tagObj.tag}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default TagFilterComponent
