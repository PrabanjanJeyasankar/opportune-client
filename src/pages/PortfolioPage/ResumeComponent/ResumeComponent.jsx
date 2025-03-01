import ResumeSvg from '@/svg/ResumeSvg/ResumeSvg'
import styles from './ResumeComponent.module.css'

function ResumeComponent({ resumeLink }) {
    return (
        <a
            href={resumeLink}
            target='_blank'
            rel='noopener noreferrer'
            className={styles.resume_link}>
            <div className={styles.resume_container}>
                <ResumeSvg />
                <span className={styles.resume_text}>
                    Curriculum <span>Vita&eacute;</span>
                </span>
            </div>
        </a>
    )
}

export default ResumeComponent
