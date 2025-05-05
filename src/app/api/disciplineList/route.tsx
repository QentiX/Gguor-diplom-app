import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: any) {
	const result = await prisma.disciplines.findMany()

	return NextResponse.json(result)
}
