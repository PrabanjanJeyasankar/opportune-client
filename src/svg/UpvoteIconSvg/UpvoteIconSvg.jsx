function UpvoteIconSvg({ style }) {
    return (
        <svg
            width='18'
            height='16'
            viewBox='0 0 16 14'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M14.7333 10.3111L8.81923 1.86249C8.42113 1.29377 7.57887 1.29377 7.18077 1.86249L1.26672 10.3111C0.547606 11.3384 1.28253 12.75 2.53652 12.75H13.4635C14.7175 12.75 15.4524 11.3384 14.7333 10.3111Z'
                stroke={style?.stroke || 'white'}
                fill={style?.fill || 'none'}
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    )
}

export default UpvoteIconSvg
