import {
  Document, Packer, Paragraph, TextRun,
  Table, TableRow, TableCell, AlignmentType,
  HeadingLevel
} from "docx";

const formatDate = (date: Date) => 
  date ? new Intl.DateTimeFormat("ru-RU").format(new Date(date)) : '-';

const createInfoRow = (label: string, value: string) => 
  new TableRow({
    children: [
      new TableCell({ children: [new Paragraph(label)] }),
      new TableCell({ children: [new Paragraph(value)] })
    ]
  });

const createTableHeader = (headers: string[]) =>
  new TableRow({
    children: headers.map(header =>
      new TableCell({
        children: [new Paragraph({ children: [new TextRun({ text: header, bold: true })] })],
        shading: { fill: "#DDDDDD" }
      })
    )
  });

const createResultRow = (result: any) => {
  const lesson = result.exam?.lesson || result.assignment?.lesson;
  const assignment = lesson?.assignments?.[0];
  const exam = lesson?.exams?.[0];

  return new TableRow({
    children: [
      result.exam ? 'Экзамен' : 'Задание',
      exam?.title || assignment?.title || 'Без названия',
      formatDate(exam?.startTime || assignment?.startDate),
      formatDate(exam?.endTime || assignment?.dueDate),
      result.score?.toString() || '-'
    ].map(text => 
      new TableCell({ children: [new Paragraph(text)] })
    )
  });
};

export async function generateWordDocument(student: any) {
  // Получение данных
  const subjects = Array.from(new Set(
    student.class?.lessons
      ?.filter((l: any) => l.subject)
      ?.map((l: any) => l.subject?.name)
      ?.filter(Boolean)
  )) || [];

  const disciplines = Array.from(new Set(
    student.class?.lessons
      ?.filter((l: any) => l.disciplines)
      ?.map((l: any) => l.disciplines?.name)
      ?.filter(Boolean)
  )) || [];

  // Расчет среднего балла
  const totalScore = student.results?.reduce((sum: number, r: any) => sum + (r.score || 0), 0) || 0;
  const averageScore = student.results?.length 
    ? (totalScore / student.results.length).toFixed(2)
    : '0.00';

  const doc = new Document({
    sections: [{
      children: [
        // Название учреждения
        new Paragraph({
          children: [new TextRun({
            text: 'Филиал учреждения образования',
            size: 22,
            color: '#666666'
          })],
          alignment: AlignmentType.CENTER,
          spacing: { after: 0 },
        }),

        new Paragraph({
          children: [new TextRun({
            text: '"Гомельское государственное училище олимпийского резерва"',
            size: 22,
            color: '#666666'
          })],
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
        }),

        // Заголовок отчета
        new Paragraph({
          children: [new TextRun({
            text: `Отчет об успеваемости ученика: ${student.name} ${student.surname}`,
            bold: true,
            size: 28,
            color: '#000000'
          })],
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
        }),

        // Основная информация
        new Table({
          columnWidths: [2000, 3000],
          rows: [
            createInfoRow('Учебный год:', `${new Date().getFullYear()}/${new Date().getFullYear() + 1}`),
            createInfoRow('Класс:', student.class?.name || '-'),
            createInfoRow('Специализация:', student.position || '-'),
            createInfoRow('Классный руководитель:', 
              student.class?.supervisor?.name + ' ' + student.class?.supervisor?.surname || '-'),
            createInfoRow('Предметы:', subjects.join(', ') || 'Нет данных'),
            createInfoRow('Дисциплины:', disciplines.join(', ') || 'Нет данных')
          ]
        }),

        // Журнал успеваемости
        new Paragraph({
          text: "Классный журнал",
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 400, after: 200 },
        }),

        new Table({
          columnWidths: [1500, 3500, 1500, 1500, 1000],
          rows: [
            createTableHeader(['Тип задания', 'Тема', 'Дата выполнения', 'Дата оценки', 'Оценка']),
            ...(student.results || []).map((result: any) => createResultRow(result))
          ]
        }),

        // Статистика
        new Paragraph({
          text: `Всего заданий: ${student.results?.length || 0}`,
          spacing: { before: 400 }
        }),
        new Paragraph({
          text: `Средний балл: ${averageScore}`,
          spacing: { after: 400 }
        })
      ]
    }]
  });

  return Packer.toBuffer(doc);
}