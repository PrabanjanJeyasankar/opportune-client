import { HomeFeedResetContext } from '@/context/HomeFeedResetContext'
import { useContext } from 'react'

const useHomeFeedResetContext = () => {
    return useContext(HomeFeedResetContext)
}

export default useHomeFeedResetContext
