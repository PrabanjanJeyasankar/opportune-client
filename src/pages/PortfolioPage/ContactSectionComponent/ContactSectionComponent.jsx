import PaperClipSvg from '@/svg/PaperClipSvg/PaperClipSvg'
import RingStyleSvg from '@/svg/RingStyleSvg/RingStyleSvg'
import React from 'react'
import styles from './ContactSectionComponent.module.css'

function ContactSectionComponent({ onCopyEmail }) {
    return (
        <div className={styles.contact_section}>
            <div className={styles.contact_container}>
                <RingStyleSvg />
                <h2 className={styles.contact_title}>
                    Have a project
                    <br />
                    in mind?
                </h2>
                <button onClick={onCopyEmail} className={styles.contact_button}>
                    <PaperClipSvg /> <span>Copy Email</span>
                </button>
            </div>
        </div>
    )
}

export default ContactSectionComponent
