import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const sixMonthsAgo = new Date()
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

  try {
    const results = await prisma.result.findMany({
      where: {
        OR: [
          {
            exam: {
              startTime: { gte: sixMonthsAgo }
            }
          },
          {
            assignment: {
              startDate: { gte: sixMonthsAgo }
            }
          }
        ]
      },
      include: {
        student: {
          select: {
            name: true,
            surname: true
          }
        }
      }
    })

    const studentScores = results.reduce((acc, result) => {
      const studentId = result.studentId
      if (!acc[studentId]) {
        acc[studentId] = {
          name: `${result.student.name} ${result.student.surname}`,
          total: 0,
          count: 0
        }
      }
      acc[studentId].total += result.score
      acc[studentId].count++
      return acc
    }, {} as Record<string, { name: string; total: number; count: number }>)

    const topStudents = Object.values(studentScores)
      .map(student => ({
        student: student.name,
        average: Number((student.total / student.count).toFixed(1))
      }))
      .sort((a, b) => b.average - a.average)
      .slice(0, 10)

    return NextResponse.json({ data: topStudents })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error calculating student ratings' },
      { status: 500 }
    )
  }
}