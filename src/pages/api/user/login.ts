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
    if (!findUser) return res.status(400).json({ msg: "E-mail ou Senha não confere!" })

    const checkUser = await bcrypt.compare(data.password, findUser.password)
    if (!checkUser) return res.status(400).json({ msg: "E-mail ou Senha não confere!" })

    const token = jwt.sign({
        ...findUser,
        password:undefined
    }, process.env.NEXT_PUBLIC_JWT_SECRET as string)

    return res.status(200).json({
        token,
        msg: "Login Feito Com Sucesso!"
    })
}