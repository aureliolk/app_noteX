import { createContext, useState } from "react";

type AuthContextType = {
    user: string
    setUser : ()=>void
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children}: any) {
    const [user, setUser] = useState()

    return(
        {children}
    )
}