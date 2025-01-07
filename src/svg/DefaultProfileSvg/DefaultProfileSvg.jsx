import React from 'react'
import defaultProfileSvgStyles from './DefaultProfileSvg.module.css'

const DefaultProfileSVG = () => {
  return (
    <svg
      className={defaultProfileSvgStyles.svg_container}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width="100"
      height="100"
      fill="none"
      stroke="gray"
      strokeWidth="1"
    >
      <circle cx="16" cy="16" r="15" stroke="gray" fill="none" />
      
      <circle cx="16" cy="11" r="4" fill="gray" />
      
      <path
        d="M16 18c-5 0-8 2.5-8 5v2h16v-2c0-2.5-3-5-8-5z"
        fill="gray"
      />
    </svg>


  )
}

export default DefaultProfileSVG