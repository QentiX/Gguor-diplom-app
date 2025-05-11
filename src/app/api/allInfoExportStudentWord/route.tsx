import prisma from '@/lib/prisma';
import { generateWordDocument } from '@/lib/wordGenerator';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { studentId } = await req.json();

    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: {
        class: {
          include: {
            supervisor: true,
            grade: true,
            lessons: {
              include: {
                subject: true,
                disciplines: true,
                assignments: {
                  include: {
                    results: {
                      where: { studentId },
                      include: {
                        assignment: {
                          include: {
                            lesson: {
                              include: {
                                assignments: true,
                                exams: true
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                },
                exams: {
                  include: {
                    results: {
                      where: { studentId },
                      include: {
                        exam: {
                          include: {
                            lesson: {
                              include: {
                                assignments: true,
                                exams: true
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        results: {
          include: {
            exam: {
              include: {
                lesson: {
                  include: {
                    assignments: true,
                    exams: true
                  }
                }
              }
            },
            assignment: {
              include: {
                lesson: {
                  include: {
                    assignments: true,
                    exams: true
                  }
                }
              }
            }
          }
        }
      }
    });

    if (!student?.class) {
      return NextResponse.json(
        { error: "Данные студента не найдены" },
        { status: 404 }
      );
    }

    const buffer = await generateWordDocument(student);
    
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename*=UTF-8''${encodeURIComponent(
          `${student.name.replace(/ /g, '_')}_отчет.docx`
        )}`
      }
    });

  } catch (error) {
    console.error('Ошибка экспорта:', error);
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}