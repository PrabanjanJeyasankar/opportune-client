import styles from './StatisticGridComponent.module.css'

function StatisticGridComponent({
    totalUpvoteCount = 0,
    totalProjectCount = 0,
    professionalExperience,
    skills = ['HTML', 'CSS', 'Java Script'],
}) {
    return (
        <div className={styles.resume_social_container}>
            <div className={styles.count_and_skills_container}>
                <div className={styles.upvote_project_experience_count}>
                    <div className={styles.total_upvote_count_container}>
                        <div className={styles.total_upvote_count}>
                            {totalUpvoteCount}
                        </div>
                        <span className={styles.total_upvote_count_title}>
                            Upcounts
                        </span>
                    </div>

                    <div className={styles.total_project_count_container}>
                        <div className={styles.total_project_count}>
                            {totalProjectCount}
                        </div>
                        <span className={styles.total_project_count_title}>
                            Projects
                        </span>
                    </div>

                    <div className={styles.professional_experience_container}>
                        <div className={styles.professional_experience_count}>
                            {professionalExperience === 0
                                ? '<1'
                                : professionalExperience}
                        </div>
                        <span
                            className={
                                styles.professional_experience_count_title
                            }>
                            Experience
                        </span>
                    </div>
                </div>

                <div className={styles.skills_grid_container}>
                    <div className={styles.skills_grid}>
                        {skills.map((skill, index) => (
                            <div key={index} className={styles.skill_item}>
                                {skill}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StatisticGridComponent
