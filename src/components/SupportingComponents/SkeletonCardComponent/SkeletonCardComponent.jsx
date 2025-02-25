import { Skeleton } from '../../ui/skeleton'
import styles from './SkeletonCardComponent.module.css'

const SkeletonCardComponent = () => (
    <div className={styles.skeleton_project_card_container}>
        <Skeleton className={styles.skeleton_project_card_image} />
        <Skeleton className={styles.skeleton_project_card_title} />
        <Skeleton className={styles.skeleton_project_card_tags} />
        <Skeleton className={styles.skeleton_project_card_description} />
    </div>
)

export default SkeletonCardComponent
