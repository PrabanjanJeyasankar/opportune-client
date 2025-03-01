import ButtonComponent from '@/elements/ButtonComponent/ButtonComponent'
import { toast } from '@/hooks/use-toast'
import PaperClipSvg from '@/svg/PaperClipSvg/PaperClipSvg'
import RingStyleSvg from '@/svg/RingStyleSvg/RingStyleSvg'
import styles from './ContactSectionComponent.module.css'

function ContactSectionComponent({ onCopyEmail }) {
    const handleCopyEmail = () => {
        onCopyEmail()
        toast({ description: 'Email copied to clipboard!' })
    }

    return (
        <div className={styles.contact_section}>
            <div className={styles.contact_container}>
                <RingStyleSvg />
                <h2 className={styles.contact_title}>
                    Have a project
                    <br />
                    in mind?
                </h2>
                <ButtonComponent
                    onClick={handleCopyEmail}
                    className={styles.contact_button}>
                    <PaperClipSvg /> <span>Copy Email</span>
                </ButtonComponent>
            </div>
        </div>
    )
}

export default ContactSectionComponent
