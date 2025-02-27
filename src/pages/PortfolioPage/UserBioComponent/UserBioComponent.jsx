import React from 'react'
import styles from './UserBioComponent.module.css'

function UserBioComponent({ portfolioBio }) {
    const splitBioText = (bio) => {
        const sentences = bio.split(/(?<=[.!?])\s+/)
        let firstHalf = ''
        let secondHalf = ''

        sentences.forEach((sentence) => {
            if (
                firstHalf.split(' ').length <
                Math.ceil(bio.split(' ').length / 2)
            ) {
                firstHalf += sentence + ' '
            } else {
                secondHalf += sentence + ' '
            }
        })

        return { firstHalf: firstHalf.trim(), secondHalf: secondHalf.trim() }
    }

    const { firstHalf, secondHalf } = splitBioText(
        portfolioBio || 'Your bio here...'
    )

    return (
        <div className={styles.bio_container}>
            <p className={styles.bio_text}>
                <span className={styles.first_half}>{firstHalf}</span>
                <span className={styles.second_half}>{secondHalf}</span>
            </p>
        </div>
    )
}

export default UserBioComponent
