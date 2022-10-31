import { PrismaClient } from "@prisma/client"
import argon2 from "argon2"
import {body,validationResult} from "express-validator"

const prisma = new PrismaClient()

export const getUsers = async  (req,res) =>{
    try {
        const response = await prisma.user.findMany()
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}

export const getUserById = async (req,res) =>{
    try {
        const response = await prisma.user.findUnique({
            where:{
                id:req.params.id
            }
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({msg:error.message})
    }
}

export const createUser = async (req,res) =>{
    const {username,password,email,role} = req.body
    const hasPassword = await argon2.hash(password)
    try {

        const user = await prisma.user.create({
            data:{
                username:username,
                password:hasPassword,
                email:email,
                role:role
            }
        })
        res.status(201).json(user)
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
}

export const updateUser = async (req,res) =>{
    const user = await user.findUnique({
        where:{
            id: req.params.id
        }
    })
    if(!user) return res.status(404).json({msg:"user tidak ditemukan"})

    const {username,password,email,role} = req.body
    let hasPassword

    if(password === "" || password === null){
        hasPassword = user.password
    }else{
        hasPassword = await argon2.hash(password)
    }

    try {
        const user = await prisma.user.update({
            where:{
                id: req.params.id
            },
            data:{
                username:username,
                password:hasPassword,
                email:email,
                role:role
            }
        })
        res.status(201).json(user)
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
}

export const deleteUser = async (req,res) =>{
    try {
        const user = await prisma.user.delete({
            where:{
                id: req.params.id
            }
        })
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
}

export const validation = ()=> {
 return [
            body('username').exists().isString().withMessage('Username is not empty'),
            body('password').exists().isString().withMessage('Username is not empty'),
            body('email').exists().isEmail().withMessage('Username is not empty'),
            body('role').exists().isString().withMessage('Username is not empty')
        ]
}