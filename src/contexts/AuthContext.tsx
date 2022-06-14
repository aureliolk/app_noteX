import { createContext, useState } from "react";

type AuthContextType = {
    user: string
    setUser : (user: string) => void
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children}: any) {
    const [user, setUser] = useState("")

    return(
        <AuthContext.Provider value={{user,setUser}}>
            {children}
        </AuthContext.Provider>
    )
}