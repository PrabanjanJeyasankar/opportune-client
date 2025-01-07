import React from 'react'

const ProfileSvg = ({isActive}) => {
  return (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="30"
        height="30"
        fill={isActive ? "white" : "gray"}
        >
        <circle cx="12" cy="8" r="4" />
        <path d="M12 14c-5.33 0-8 2.67-8 5.33V21h16v-1.67C20 16.67 17.33 14 12 14z" />
    </svg>

  )
}

export default ProfileSvg
