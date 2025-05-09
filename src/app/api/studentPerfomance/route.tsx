import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { studentId } = await req.json()

  if (!studentId) {
    return NextResponse.json({ error: 'Student ID required' }, { status: 400 })
  }

  try {
    const results = await prisma.$queryRaw<{ year: number; month: number; average: number }[]>`
      SELECT
        EXTRACT(YEAR FROM COALESCE(e."startTime", a."startDate"))::integer as year,
        EXTRACT(MONTH FROM COALESCE(e."startTime", a."startDate"))::integer as month,
        AVG(r.score)::float as average
      FROM "Result" r
      LEFT JOIN "Exam" e ON r."examId" = e.id
      LEFT JOIN "Assignment" a ON r."assignmentId" = a.id
      WHERE 
        r."studentId" = ${studentId}
        AND (
          e."startTime" >= NOW() - INTERVAL '5 months'
          OR a."startDate" >= NOW() - INTERVAL '5 months'
        )
      GROUP BY year, month
      ORDER BY year, month
    `

    return NextResponse.json({ data: results })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch performance data' },
      { status: 500 }
    )
  }
}