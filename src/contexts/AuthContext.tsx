import { createContext, useEffect, useState } from "react";
const axios = require("axios").default;



type AuthContextType = {
    user: string
    userId: string
    notes: any
    setUser: (user: string) => void
    setUserId: (userId: string) => void

}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: any) {
    const [user, setUser] = useState<any>()
    const [userId, setUserId] = useState<any>()
    const [notes, setNotes] = useState<any>()
    const [isLoading, setIsLoading] = useState(false)
 
    // console.log(notes)
    
    useEffect(() => {
        async function getUser(id:any) {
            try {
                const response = await axios.get(`/api/notes/?id=399c7542-79e5-4e18-aaf1-421a34665a62`);
                setNotes(response.data.listNotes);
                return
            } catch (error) {
                console.error(error);
                return
            }
        }
        getUser(userId)
    }, [])

    


    return (
        <AuthContext.Provider value={{ user, setUser, userId, setUserId,notes }}>
            {children}
        </AuthContext.Provider>
    )
}