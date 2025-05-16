import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const videos = await prisma.videosLibrary.findMany({
      select: {
        id: true,
        title: true,
        thumbnail: true,
        videoUrl: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 3,
    })

    return NextResponse.json(videos)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    )
  }
}