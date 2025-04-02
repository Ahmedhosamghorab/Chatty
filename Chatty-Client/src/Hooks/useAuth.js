import { createContext } from "react"

export const authContext = createContext()
export const useAuth = ()=>({
    authUser : null,
    isSigningUp : false ,
    isLogingIn : false ,
    checkingAuth : async()=>{
      
    }
})
export default function authProvider({children}){
    return <authContext.Provider value={useAuth}>{children}</authContext.Provider>
}