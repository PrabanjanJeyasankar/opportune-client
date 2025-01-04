import React from 'react'
import styles from './HeroComponent.module.css'
import InputComponent from '../../elements/InputComponent/InputComponent'

function HeroComponent() {
    return (
        <>
            <section className={styles.hero_section}>
                <h1 className={styles.hero_title}>
                    Your Projects
                    <br />
                    Their Opportunities
                </h1>
                <p className={styles.hero_subtitle}>
                    Upload your best projects here, Get noticed by your next HR.
                </p>
                <div className={styles.search_container}>
                    <InputComponent
                        type='text'
                        className={styles.search_input}
                        placeholder='Search projects...'
                    />
                    <svg
                        className={styles.search_icon}
                        width='24'
                        height='24'
                        viewBox='0 0 26 26'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path
                            d='M12.4883 21.4883C17.735 21.4883 21.9883 17.235 21.9883 11.9883C21.9883 6.74158 17.735 2.48828 12.4883 2.48828C7.24158 2.48828 2.98828 6.74158 2.98828 11.9883C2.98828 17.235 7.24158 21.4883 12.4883 21.4883Z'
                            stroke-width='1.8'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                        />
                        <path
                            d='M25.0117 24.5117L20.9883 20.4883'
                            stroke-width='1.8'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                        />
                    </svg>
                </div>
            </section>
        </>
    )
}

export default HeroComponent
