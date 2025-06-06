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
const userData = [
  { name: "L", value: 10000 },
  { name: "M", value: 20000 },
  { name: "M", value: 30000 },
  { name: "J", value: 25000 },
  { name: "V", value: 30000 },
  { name: "S", value: 15000 },
  { name: "D", value: 12000 },
];

const chartConfig = {
  desktop: {
    label: "Teléchargements ",
    color: "#0055A6",
  },
} satisfies ChartConfig;

export default function ProvinceBarChart() {
  return (
    <Card className=" border-0">
      <CardHeader className="flex flex-col items-start">
        <CardDescription>
          {" "}
          Nombre d&apos;utilisateurs actifs par jour
        </CardDescription>

        <CardTitle className="ml-2 text-3xl font-semibold text-gray-900">
          30 000
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full">
          <BarChart accessibilityLayer data={userData}>
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              // tickFormatter={value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="value" fill="#0055A6" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
