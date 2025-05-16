import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const news = await prisma.news.findMany({
      select: {
        id: true,
        title: true,
        thumbnail: true,
        createdAt: true,
        content: true,
      },
      orderBy: { 
        createdAt: 'desc' 
      },
      take: 3
    })

    return NextResponse.json(news)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    )
  }
}