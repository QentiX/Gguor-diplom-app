'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart"
import { Line, LineChart, XAxis, CartesianGrid, TooltipProps } from "recharts"

type ChartData = {
  name: string
  average: number
}

type ChartType = 'subjects' | 'disciplines'

type Props = {
  activeChart: ChartType
  chartData: ChartData[]
  loading: boolean
  error: string | null
  onChartChange: (type: ChartType) => void
}

const chartConfig = {
  average: {
    label: "Средний балл",
    color: "#2563EB",
  },
} satisfies ChartConfig

const CustomTooltip = ({ payload }: TooltipProps<number, string>) => {
  if (!payload || payload.length === 0) return null
  
  return (
    <div className="bg-background p-3 rounded-lg border shadow-sm">
      <p className="font-medium text-sm">
        {payload[0].payload.name}
      </p>
      <p className="text-sm mt-1">
        Средний балл: <span className="font-semibold">{payload[0].value}</span>
      </p>
    </div>
  )
}

export function AverageScoreAdminChart({
  activeChart,
  chartData,
  loading,
  error,
  onChartChange
}: Props) {
  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Академическая успеваемость</CardTitle>
          <CardDescription>
            {loading && 'Загрузка данных...'}
            {error && `Ошибка: ${error}`}
            {!loading && !error && `Средние баллы по ${activeChart === 'subjects' ? 'предметам' : 'дисциплинам'}`}
          </CardDescription>
        </div>
        <div className="flex">
          {['subjects', 'disciplines'].map((key) => (
            <button
              key={key}
              data-active={activeChart === key}
              className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
              onClick={() => onChartChange(key as ChartType)}
            >
              <span className="text-xs text-muted-foreground">
                {key === 'subjects' ? 'Предметы' : 'Дисциплины'}
              </span>
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          {error ? (
            <div className="flex h-full items-center justify-center text-destructive">
              {error}
            </div>
          ) : loading ? (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              Загрузка данных...
            </div>
          ) : (
            <LineChart data={chartData} margin={{ left: 12, right: 12 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tick={{ fontSize: 12 }}
              />
              <ChartTooltip content={<CustomTooltip />} />
              <Line
                dataKey="average"
                type="monotone"
                stroke="var(--color-average)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  )
}