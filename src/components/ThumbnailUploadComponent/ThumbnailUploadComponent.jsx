import ButtonComponent from "@/elements/ButtonComponent/ButtonComponent"
import CloseXSvg from "@/svg/CloseXSvg/CloseXSvg"
import EyeShowSVG from "@/svg/EyeShowSVG/EyeShowSVG"
import React, { useState, useEffect, useRef } from "react"
import ReactModal from "react-modal"
import ImageComponent from "../../elements/ImageComponent/ImageComponent"
import styles from "../ThumbnailUploadComponent/ThumbnailUploadComponent.module.css"
import ReplaceSvg from "@/svg/ReplaceSvg/ReplaceSvg"

ReactModal.setAppElement("#root")

const ThumbnailUploadComponent = ({
    thumbnail,
    handleInputChange,
    error,
    placeholderText = "Upload image",
    existingImageUrl = null,
}) => {
    const [isModalOpen, setModalOpen] = useState(false)
    const [previewURL, setPreviewURL] = useState(null)
    const fileInputRef = useRef(null)

    useEffect(() => {
        if (thumbnail instanceof File) {
            const objectURL = URL.createObjectURL(thumbnail)
            setPreviewURL(objectURL)

            return () => URL.revokeObjectURL(objectURL)
        } else if (existingImageUrl) {
            setPreviewURL(existingImageUrl)
        }
    }, [thumbnail, existingImageUrl])

    const handlePreviewClick = (event) => {
        event.preventDefault()
        setModalOpen(true)
    }

    const handleReplaceClick = (event) => {
        event.preventDefault()
        fileInputRef.current.click()
    }

    const closeModal = () => {
        setModalOpen(false)
    }

    const handleImageClick = (event) => {
        event.preventDefault()
        setModalOpen(true)
    }

    const hasImage = thumbnail instanceof File || existingImageUrl

    return (
        <div className={styles.thumbnail_upload}>
            <input
                className="hidden"
                accept="image/*"
                id="thumbnail_upload"
                type="file"
                name="profilePicture"
                onChange={handleInputChange}
                ref={fileInputRef}
            />

            {hasImage ? (
                <div className={styles.thumbnail_label}>
                    <div className={styles.thumbnail_preview_container}>
                        <div onClick={handleImageClick}>
                            <img
                                src={previewURL}
                                alt="Thumbnail Preview"
                                className={styles.thumbnail_preview}
                            />
                        </div>
                        <div className={styles.buttons_container}>
                            <ButtonComponent
                                type="button"
                                className={`preview_button ${styles.preview_button}`}
                                onClick={handlePreviewClick}
                            >
                                <EyeShowSVG />
                                <span>Preview</span>
                            </ButtonComponent>

                            <ButtonComponent
                                type="button"
                                className={`replace_button ${styles.replace_svg_button}`}
                                onClick={handleReplaceClick}
                            >
                                <ReplaceSvg />
                                {/* <span>Replace</span> */}
                            </ButtonComponent>
                        </div>
                    </div>
                </div>
            ) : (
                <label
                    htmlFor="thumbnail_upload"
                    className={styles.thumbnail_label}
                >
                    <span className={styles.thumbnail_placeholder}>
                        {placeholderText}
                    </span>
                </label>
            )}

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
