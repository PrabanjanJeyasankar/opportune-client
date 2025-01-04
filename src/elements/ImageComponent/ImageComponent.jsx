import PropTypes from 'prop-types'
import styles from './ImageComponent.module.css'

function ImageComponent({ src, alt, className }) {
    return (
        <img
            src={src}
            alt={alt}
            className={`${styles.image} ${className || ''}`}
        />
    )
}

ImageComponent.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    className: PropTypes.string,
}

export default ImageComponent
