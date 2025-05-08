import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url)

	const selectedId = searchParams.get('')


	const attendanceData = await prisma.attendance.findMany();

	return NextResponse.json(attendanceData)
}
