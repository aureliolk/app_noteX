import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient()

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const data = req.body
    const findUser = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    })
    if(findUser) return res.status(400).json({msg: "Esse email já esta cadastrado"})
    const signInUser = await prisma.user.create({
        data:{
            ...data,
            password: await bcrypt.hash(data.password, 10),
            checkPassword: undefined
        },
    })  

    const token = jwt.sign({
        ...signInUser,
        password:undefined
      }, process.env.NEXT_PUBLIC_JWT_SECRET as string)
      
      return res.status(200).json({
        token,
        msg:"Usuario criado com sucesso!"
      })
}