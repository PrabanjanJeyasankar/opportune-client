import React, { useState } from 'react'
import styles from '../ThumbnailUploadComponent/ThumbnailUploadComponent.module.css'
import ImageComponent from '../../elements/ImageComponent/ImageComponent'
import ReactModal from 'react-modal'
// import Modal from "react-modal";

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
            <label>Thumbnail</label>
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
                        <button
                            className={`preview_button ${styles.preview_button}`}
                            onClick={handlePreviewClick}>
                            Preview
                        </button>
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
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            height='40px'
                            viewBox='0 -960 960 960'
                            width='40px'
                            fill='#FFFFFF'>
                            <path d='m332-285.33 148-148 148 148L674.67-332l-148-148 148-148L628-674.67l-148 148-148-148L285.33-628l148 148-148 148L332-285.33ZM480-80q-82.33 0-155.33-31.5-73-31.5-127.34-85.83Q143-251.67 111.5-324.67T80-480q0-83 31.5-156t85.83-127q54.34-54 127.34-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82.33-31.5 155.33-31.5 73-85.5 127.34Q709-143 636-111.5T480-80Zm0-66.67q139.33 0 236.33-97.33t97-236q0-139.33-97-236.33t-236.33-97q-138.67 0-236 97-97.33 97-97.33 236.33 0 138.67 97.33 236 97.33 97.33 236 97.33ZM480-480Z' />
                        </svg>
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
