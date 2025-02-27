import React from 'react'
import styles from './ProfileSectionComponent.module.css'

function ProfileSectionComponent({ name, title }) {
    return (
        <div className={styles.profile_section}>
            <div className={styles.profile_header}>
                <div className={styles.profile_image_container}>
                    <img
                        loading='lazy'
                        src='https://cdn.prod.website-files.com/63fbd08ddcf51344a63f9add/63fbd08ddcf5133a563f9af5_Avatar.png'
                        alt='Profile'
                        className={styles.profile_image}
                    />
                </div>
                <h1 className={styles.profile_text}>
                    {name}
                    <br />
                    <span className={styles.professional_title}>
                        is a {title}
                    </span>
                </h1>
            </div>
        </div>
    )
}

export default ProfileSectionComponent
