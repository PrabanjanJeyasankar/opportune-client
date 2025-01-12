import styles from './InitialLoadingAnimation.module.css'

const InitialLoadingAnimation = () => {
    return (
        <div className={styles.initial_loading_container} >
            <img src='/public/opportune_logo_svg.svg' />
            <div className={styles.progress_loader}>
                <div className={styles.progress}></div>
            </div>
        </div>
    )
}

export default InitialLoadingAnimation
