import { auth } from '@clerk/nextjs/server'
import { notFound, redirect } from 'next/navigation'
import prisma from '@/lib/prisma'
import ProfilePageContent from '@/components/ProfilePageContent'

const ProfilePage = async () => {
  const { sessionClaims, userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  const userRole = (sessionClaims?.metadata as { role?: string })?.role

  try {
    switch (userRole) {
      case 'student':
        const studentData = await prisma.student.findUnique({
          where: { id: userId },
          include: { 
            class: {
              include: {
                _count: { select: { lessons: true } }
              }
            }
          }
        })
        if (!studentData) return notFound()
        return <ProfilePageContent data={studentData} userRole={userRole} />

      case 'teacher':
        const teacherData = await prisma.teacher.findUnique({
          where: { id: userId },
          include: { 
            _count: { 
              select: { 
                subjects: true, 
                lessons: true,
                classes: true
              } 
            }
          }
        })
        if (!teacherData) return notFound()
        return <ProfilePageContent data={teacherData} userRole={userRole} />

      case 'coach':
        const coachData = await prisma.coach.findUnique({
          where: { id: userId },
          include: { 
            _count: { 
              select: { 
                disciplines: true, 
                lessons: true
              } 
            }
          }
        })
        if (!coachData) return notFound()
        return <ProfilePageContent data={coachData} userRole={userRole} />

      default:
        return notFound()
    }
  } catch (error) {
    console.error('Profile data fetch error:', error)
    return notFound()
  }
}

export default ProfilePage