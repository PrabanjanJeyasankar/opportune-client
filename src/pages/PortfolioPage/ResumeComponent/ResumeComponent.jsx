import ResumeSvg from '@/svg/ResumeSvg/ResumeSvg'
import styles from './ResumeComponent.module.css'

function ResumeComponent() {
    return (
        <div className={styles.resume_container}>
            <ResumeSvg />
            <span className={styles.resume_text}>
                Curriculum <span>Vita&eacute;</span>
            </span>
        </div>
    )
}

export default ResumeComponent
