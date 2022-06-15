import { createContext, useEffect, useState } from "react";
const axios = require("axios").default;



type AuthContextType = {
    user: string
    userId: string
    
    setUser: (user: string) => void
    setUserId: (userId: string) => void

}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: any) {
    const [user, setUser] = useState<any>()
    const [userId, setUserId] = useState<any>()
    
 
    // console.log(notes)
    
    

    


    return (
        <AuthContext.Provider value={{ user, setUser, userId, setUserId }}>
            {children}
        </AuthContext.Provider>
    )
}