import primaryButtonStyles from './PrimaryButtonComponent.module.css'

const PrimaryButtonComponent = ({children, ...props}) => {
  return (
    <button
        className={primaryButtonStyles.primary_button}
        {...props}
    >
        {children}
    </button>
  )
}

export default PrimaryButtonComponent
