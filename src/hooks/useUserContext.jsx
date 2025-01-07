import { useContext } from "react"
import { UserContext } from "../context/userContext"


const useUserContext = () => {
  return useContext(UserContext)
}

export default useUserContext
