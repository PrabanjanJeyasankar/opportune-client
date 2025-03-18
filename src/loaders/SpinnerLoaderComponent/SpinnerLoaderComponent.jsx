import spinnerStyles from './SpinnerLoaderComponent.module.css'

function SpinnerLoaderComponent() {
    return (
        <svg
          className={spinnerStyles.loader}
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
}

export default SpinnerLoaderComponent
