import ButtonComponent from "@/elements/ButtonComponent/ButtonComponent"
import CloseXSvg from "@/svg/CloseXSvg/CloseXSvg"
import EyeShowSVG from "@/svg/EyeShowSVG/EyeShowSVG"
import React, { useState, useEffect } from "react"
import ReactModal from "react-modal"
import ImageComponent from "../../elements/ImageComponent/ImageComponent"
import styles from "../ThumbnailUploadComponent/ThumbnailUploadComponent.module.css"

ReactModal.setAppElement("#root")

const ThumbnailUploadComponent = ({
    thumbnail,
    handleInputChange,
    error,
    placeholderText = "Upload Thumbnail",
}) => {
    const [isModalOpen, setModalOpen] = useState(false)
    const [previewURL, setPreviewURL] = useState(null)

    useEffect(() => {
        if (thumbnail) {
            const objectURL = URL.createObjectURL(thumbnail)
            setPreviewURL(objectURL)

            return () => URL.revokeObjectURL(objectURL)
        }
    }, [thumbnail])

    const handlePreviewClick = (event) => {
        event.preventDefault()
        setModalOpen(true)
    }

    const closeModal = () => {
        setModalOpen(false)
    }

    return (
        <div className={styles.thumbnail_upload}>
            <input
                className="hidden"
                accept="image/*"
                id="thumbnail_upload"
                type="file"
                name="thumbnail"
                onChange={handleInputChange}
            />

            <label
                htmlFor="thumbnail_upload"
                className={styles.thumbnail_label}
            >
                {thumbnail ? (
                    <div className={styles.thumbnail_preview_container}>
                        <ImageComponent
                            src={previewURL}
                            alt="Thumbnail Preview"
                            className={styles.thumbnail_preview}
                        />
                        <ButtonComponent
                            type="button"
                            className={`preview_button ${styles.preview_button}`}
                            onClick={handlePreviewClick}
                        >
                            <EyeShowSVG />
                            <span>Preview</span>
                        </ButtonComponent>
                    </div>
                ) : (
                    <span className={styles.thumbnail_placeholder}>
                        {placeholderText}
                    </span>
                )}
            </label>
            {error && <p className={styles.error_message}>{error}</p>}

            {isModalOpen && (
                <ReactModal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    contentLabel="Thumbnail Preview"
                    className={styles.modal_content}
                    overlayClassName={styles.modal_overlay}
                >
                    <button
                        onClick={closeModal}
                        className={styles.close_modal_button}
                    >
                        <CloseXSvg />
                    </button>
                    <ImageComponent
                        src={previewURL}
                        alt="Thumbnail Preview in Modal"
                        className={styles.thumbnail_preview}
                    />
                </ReactModal>
            )}
        </div>
    )
}

export default ThumbnailUploadComponent
