import PropTypes from 'prop-types'
import ChevronLeft from '@/svg/ChevronLeft/ChevronLeft'
import ChevronRight from '@/svg/ChervronRight/ChevronRight'
import ButtonComponent from '../ButtonComponent/ButtonComponent'

function NavigationArrow({ direction, isHidden, onClick, styles }) {
    const isLeft = direction === 'left'

    return (
        <ButtonComponent
            className={`${styles.arrow} ${styles[`arrow-${direction}`]} ${
                !isHidden ? styles['arrow-show'] : ''
            }`}
            onClick={onClick}
            aria-label={`Scroll ${direction}`}>
            {isLeft ? <ChevronLeft /> : <ChevronRight />}
        </ButtonComponent>
    )
}

NavigationArrow.propTypes = {
    direction: PropTypes.oneOf(['left', 'right']).isRequired,
    isHidden: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    styles: PropTypes.object.isRequired,
}

export default NavigationArrow
