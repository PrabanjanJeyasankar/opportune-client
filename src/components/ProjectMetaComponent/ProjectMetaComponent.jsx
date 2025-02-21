import ImageComponent from '../../elements/ImageComponent/ImageComponent'
import ArrowUpRightSvg from '../../svg/ArrowUpRightSvg/ArrowUpRightSvg'
import ChainLinkSvg from '../../svg/ChainLinkSvg/ChainLinkSvg'
import EyeShowSVG from '../../svg/EyeShowSVG/EyeShowSVG'
import GithubSvg from '../../svg/GithubSvg/GithubSvg'
import ShareIconSvg from '../../svg/ShareIconSvg/ShareIconSvg'
import UpvoteIconSvg from '../../svg/UpvoteIconSvg/UpvoteIconSvg'
import styles from './ProjectMetaComponent.module.css'

function ProjectMetaComponent({ project, handleClick }) {
    // const [upvoteCount, setUpvoteCount] = useState(project?.upvoteCount || 0)
    // const [isUpvoted, setIsUpvoted] = useState(false)
    // const { userData } = UserContext()
    return (
        <div className={styles.project_meta}>
            <div className={styles.thumbnail}>
                <ImageComponent
                    src={project?.thumbnailUrl}
                    alt='Project Thumbnail'
                />
            </div>
            <div className={styles.project_meta_header}>
                <div className={styles.title_and_docs}>
                    <h1 className={styles.project_title}>{project?.title}</h1>
                    <p className={styles.project_documentation_link}>
                        <a
                            href={project?.documentation}
                            target='_blank'
                            rel='noopener noreferrer'
                            className={styles.documentation_link}>
                            <span>docs</span>
                            <ArrowUpRightSvg
                                strokeWidth={2}
                                height={16}
                                width={16}
                            />
                        </a>
                    </p>
                </div>
                <div className={styles.project_actions}>
                    <div className={styles.upvote}>
                        <UpvoteIconSvg />
                        <span className={styles.upvote_count}>
                            {project?.upvoteCount}
                        </span>
                    </div>
                    <div className={styles.project_views}>
                        <EyeShowSVG />
                        <span className={styles.views_count}>
                            {project?.viewsCount}
                        </span>
                    </div>
                    <div className={styles.share} onClick={handleClick}>
                        <ShareIconSvg />
                    </div>
                </div>
            </div>
            <div className={styles.project_tags}>
                {project?.tags?.map((tag, tagIndex) => (
                    <span key={tagIndex} className={styles.project_tag}>
                        {tag}
                    </span>
                ))}
            </div>

            <p className={styles.project_description}>{project?.description}</p>
            <div className={styles.external_links}>
                <a
                    href={project?.hostedLink}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={styles.hosted_link_button}>
                    <ChainLinkSvg width={18} height={18} />
                    <span>Hosted Link</span>
                </a>
                <a
                    href={project?.githubLink}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={styles.github_link_button}>
                    <GithubSvg />
                    <span>Github Link</span>
                </a>
            </div>
        </div>
    )
}

export default ProjectMetaComponent
