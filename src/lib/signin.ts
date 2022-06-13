import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()

type DataProps = {
    name: string
    email: string
    password: string
    admin: boolean
}

export async function SignIn(user:DataProps){
    

    const findUser = await prisma.user.findUnique({
        where:{
            email:user.email
        }
    })

    if(findUser) return "Esse email já está cadastrado"
    
    const signInUser = await prisma.user.create({
       data:{
        firstName: user.name,   
        admin: user.admin,
        email: user.email,
        password: user.password     
       }
    })

    return signInUser
}