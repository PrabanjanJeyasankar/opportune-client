import styles from './ProfileSectionComponent.module.css'

function ProfileSectionComponent({ name, title, profilePicture }) {
    return (
        <div className={styles.profile_section}>
            <div className={styles.profile_header}>
                <div className={styles.profile_image_container}>
                    <img
                        loading='lazy'
                        src={profilePicture}
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
