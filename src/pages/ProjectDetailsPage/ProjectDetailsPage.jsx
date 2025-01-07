import styles from './ProjectDetailsPage.module.css'
import ImageTemp from '../../assets/images/ProjectTemplates/opportune_thumbnail.png'
import UserImage from '../../assets/images/ProjectTemplates/img2.png'
import ButtonComponent from '../../elements/ButtonComponent/ButtonComponent'
import UpvoteIconSvg from '../../svg/UpvoteIconSvg/UpvoteIconSvg'
import EyeShowSVG from '../../svg/EyeShowSVG/EyeShowSVG'
import ShareIconSvg from '../../svg/ShareIconSvg/ShareIconSvg'
import ImageComponent from '../../elements/ImageComponent/ImageComponent'
import ArrowUpRightSvg from '../../svg/ArrowUpRightSvg/ArrowUpRightSvg'
import GithubSvg from '../../svg/GithubSvg/GithubSvg'
import ChainLinkSvg from '../../svg/ChainLinkSvg/ChainLinkSvg'

import Image1 from '../../assets/images/ProjectTemplates/img1.png'
import Image2 from '../../assets/images/ProjectTemplates/img2.png'
import Image3 from '../../assets/images/ProjectTemplates/img3.png'
import Image4 from '../../assets/images/ProjectTemplates/img4.png'

const tags = [
    { tag: 'HTML' },
    { tag: 'JavaScript' },
    { tag: 'MERN' },
    { tag: 'UI/UX' },
]

const imageData = [
    {
        id: 1,
        src: Image1,
        alt: 'User Image 1',
    },
    {
        id: 2,
        src: Image2,
        alt: 'Placeholder Image 2',
    },
    {
        id: 3,
        src: Image3,
        alt: 'Placeholder Image 3',
    },
    {
        id: 4,
        src: Image4,
        alt: 'Placeholder Image 4',
    },
]

function ProjectDetailsPage() {
    return (
        <>
            <section className={styles.project_details_container}>
                <header className={styles.header}>
                    <div className={styles.profile_section}>
                        <div>
                            <ImageComponent
                                src={UserImage}
                                alt='Profile'
                                className={styles.avatar}
                            />
                        </div>
                        <div className={styles.info}>
                            <span className={styles.user_name}>
                                Ryan Johnson
                            </span>
                            <span className={styles.status}>
                                Available for work
                            </span>
                        </div>
                    </div>
                    <div className={styles.user_profile_actions}>
                        <ButtonComponent
                            className={styles.action_button}
                            aria-label='Like'>
                            {/* <Heart size={20} /> */}
                        </ButtonComponent>
                        <ButtonComponent
                            className={styles.action_button}
                            aria-label='Bookmark'>
                            {/* <Bookmark size={20} /> */}
                        </ButtonComponent>
                        <ButtonComponent className={styles.view_profile_button}>
                            View Profile
                        </ButtonComponent>
                    </div>
                </header>
                <div className={styles.project_meta}>
                    <div className={styles.thumbnail}>
                        <ImageComponent src={Image1} alt='Project Thumbnail' />
                    </div>
                    <div className={styles.project_meta_header}>
                        <div className={styles.title_and_docs}>
                            <h1 className={styles.project_title}>Opportune</h1>
                            <p className={styles.project_documentation_link}>
                                <span>docs</span>
                                <ArrowUpRightSvg
                                    strokeWidth={2}
                                    height={16}
                                    width={16}
                                />
                            </p>
                        </div>
                        <div className={styles.project_actions}>
                            <div className={styles.upvote}>
                                <UpvoteIconSvg />
                                <span className={styles.upvote_count}>232</span>
                            </div>
                            <div className={styles.project_views}>
                                <EyeShowSVG />
                                <span className={styles.views_count}>1045</span>
                            </div>
                            <div className={styles.share}>
                                <ShareIconSvg />
                            </div>
                        </div>
                    </div>
                    <div className={styles.project_tags}>
                        {tags.map((tagObj, tagIndex) => (
                            <span key={tagIndex} className={styles.project_tag}>
                                {tagObj.tag}
                            </span>
                        ))}
                    </div>
                    <p className={styles.project_description}>
                        A non-automated description title im writing so i can
                        fill up my empty space using letters and words inside
                        div using module css this can go on forever but i have
                        to stop four or five lines , but i could not find words
                        to fill up the remaining lines you know, so if i stop
                        here i think i can style this project description
                    </p>
                    <div className={styles.external_links}>
                        <ButtonComponent className={styles.hosted_link_button}>
                            <ChainLinkSvg width={18} height={18} />{' '}
                            <span>Hosted Link</span>
                        </ButtonComponent>
                        <ButtonComponent className={styles.github_link_button}>
                            <GithubSvg /> <span>Github Link</span>
                        </ButtonComponent>
                    </div>
                </div>
                <div className={styles.separator}></div>
                <div className={styles.more_projects_by_user}>
                    <div className={styles.more_projects_header}>
                        <h1 className={styles.more_projects_title}>
                            More by Ryan Johnsan
                        </h1>
                        <p className={styles.view_profile_link}>View Profile</p>
                    </div>
                    <div className={styles.image_gallery}>
                        {imageData.map((image) => (
                            <div
                                key={image.id}
                                className={styles.image_wrapper}>
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className={styles.image}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProjectDetailsPage
