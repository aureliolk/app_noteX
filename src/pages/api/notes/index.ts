import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const method = req.method
    if (method === "GET") {
        const id:any = req.query.id
        const listNotes = await prisma.notes.findMany({
            where:{
                userId: id
            }
        })

        if(listNotes.length === 0){
            res.status(200).json({msg:"Você não possui nenhuma nota"})
        }
        res.status(200).json({
            listNotes,
            msg: "GET"
        })
        return
    } else if (method === "POST") {
        const {id, color, title, notes}:any = req.body
        const addNotes = await prisma.notes.create({
            data:{
                color,
                notes,
                title,
                userId: id
            },
            include:{
                user: true    
            }
        })

        if(!addNotes){
            res.status(400).json({msg: "Houve um erro ao cirar sua nota"})
            return
        }

        res.status(200).json({ 
            addNotes,
            msg:"Sua nota foi criada"
         })
        return
    } else if (method === "PATCH") {
        const data = req.body
        
        const updataNotes = await prisma.notes.update({
            data:{
                ...data,
                id:undefined
            },
            where:{
                id:data.id
            }
        })
        if(!updataNotes){
            res.status(200).json({msg: "Houve um erro ao atualizar sua nota"})
            return
        }

        res.status(200).json({ 
            updataNotes,
            msg: "Sua nota foi atulizada"
         })
        return
    } else if (method === "DELETE") {
        const {id} = req.body
        const deleteNotes =  await prisma.notes.delete({
            where:{
                id
            }
        })
        if(!deleteNotes){
            res.status(200).json({msg: "Houve um erro ao deleta sua nota"})
            return
        }

        res.status(200).json({ 
            deleteNotes,
            msg: "Sua nota foi deletada"
         })
        return
    }
    res.status(400).json({ msg: "Esse metodo não exite !" })
}