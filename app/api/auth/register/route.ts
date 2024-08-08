
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {

        const { name, email, password } = await req.json();

        console.log({ name, email, password })

        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (existingUser) {
            return NextResponse.json({
                message: "User already exists"
            })
        }

        const hashedPass = await hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPass
            }
        })

        console.log('user creeated')

        return NextResponse.json({
            message: "User created succesfully"
        })

        console.log({ email, password })

    } catch (error) {

        console.log(error)

        return NextResponse.json({
            message: "An error occured"
        })

    }
}