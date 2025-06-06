"use client";

import { Bar, BarChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A bar chart";
const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
  { month: "July", desktop: 198 },
  { month: "August", desktop: 221 },
  { month: "September", desktop: 189 },
  { month: "October", desktop: 265 },
  { month: "November", desktop: 240 },
  { month: "December", desktop: 278 },
];

const chartConfig = {
  desktop: {
    label: "Teléchargements ",
    color: "#0055A6",
  },
} satisfies ChartConfig;

export default function DashboardBarChart() {
  return (
    <Card className=" border-0">
      <CardHeader className="flex flex-col items-start">
        <CardDescription> Téléchargement par mois</CardDescription>

        <CardTitle className="ml-2 text-3xl font-semibold text-gray-900">
          24 000
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <BarChart accessibilityLayer data={chartData}>
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="desktop" fill="#0055A6" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
