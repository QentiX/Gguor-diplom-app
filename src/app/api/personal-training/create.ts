import prisma from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { title, description, recommendations, studentId, coachId, files } = req.body;

    const training = await prisma.personalTraining.create({
      data: {
        title,
        description,
        recommendations,
        studentId,
        coachId,
        files: {
          createMany: {
            data: files.map((file: any) => ({
              url: file.url,
              fileType: file.fileType,
              originalName: file.originalName,
            })),
          },
        },
      },
    });

    res.status(200).json(training);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка при создании тренировки" });
  }
}
