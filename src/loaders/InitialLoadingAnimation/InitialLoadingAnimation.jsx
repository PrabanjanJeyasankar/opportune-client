import AppIconSvg from '@/svg/AppIconSvg/AppIconSvg'
import styles from './InitialLoadingAnimation.module.css'

const InitialLoadingAnimation = () => {
    return (
        <div className={styles.initial_loading_container} >
            <AppIconSvg width='60' height='60' />
            <div className={styles.progress_loader}>
                <div className={styles.progress}></div>
            </div>
        </div>
    )
}

export default InitialLoadingAnimation
