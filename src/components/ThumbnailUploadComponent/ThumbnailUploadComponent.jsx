import ButtonComponent from '@/elements/ButtonComponent/ButtonComponent'
import CloseXSvg from '@/svg/CloseXSvg/CloseXSvg'
import EyeShowSVG from '@/svg/EyeShowSVG/EyeShowSVG'
import React, { useState } from 'react'
import ReactModal from 'react-modal'
import ImageComponent from '../../elements/ImageComponent/ImageComponent'
import styles from '../ThumbnailUploadComponent/ThumbnailUploadComponent.module.css'

ReactModal.setAppElement('#root')

const ThumbnailUploadComponent = ({ thumbnail, handleInputChange, error }) => {
    const [isModalOpen, setModalOpen] = useState(false)

    const handlePreviewClick = () => {
        setModalOpen(true)
    }

    const closeModal = () => {
        setModalOpen(false)
    }

    return (
        <div className={styles.thumbnail_upload}>
            <input
                className='hidden'
                accept='image/*'
                id='thumbnail_upload'
                type='file'
                name='thumbnail'
                onChange={handleInputChange}
            />

            <label
                htmlFor='thumbnail_upload'
                className={styles.thumbnail_label}>
                {thumbnail ? (
                    <div className={styles.thumbnail_preview_container}>
                        <ImageComponent
                            src={URL.createObjectURL(thumbnail)}
                            alt='Thumbnail Preview'
                            className={styles.thumbnail_preview}
                        />
                        <ButtonComponent
                            className={`preview_button ${styles.preview_button}`}
                            onClick={handlePreviewClick}>
                            <EyeShowSVG />
                            <span>Preview</span>
                        </ButtonComponent>
                    </div>
                ) : (
                    <span className={styles.thumbnail_placeholder}>
                        Upload Thumbnail
                    </span>
                )}
            </label>
            {error && <p className={styles.error_message}>{error}</p>}

            {isModalOpen && (
                <ReactModal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    contentLabel='Thumbnail Preview'
                    className={styles.modal_content}
                    overlayClassName={styles.modal_overlay}>
                    <button
                        onClick={closeModal}
                        className={styles.close_modal_button}>
                        <CloseXSvg />
                    </button>
                    <ImageComponent
                        src={URL.createObjectURL(thumbnail)}
                        alt='Thumbnail Preview in Modal'
                        className={styles.thumbnail_preview}
                    />
                </ReactModal>
            )}
        </div>
    )
}

export default ThumbnailUploadComponent
