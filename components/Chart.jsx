"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Update Chart to work with totalLast30DaysImpressions as a single value
export function Chart({ totalLast30DaysImpressions }) {
  const chartData = [
    { name: "Last 30 Days", impressions: totalLast30DaysImpressions },
  ];

  const chartConfig = {
    desktop: {
      label: "Impressions",
      color: "hsl(var(--chart-1))",
    },
  };

  return (
    <Card className="mt-20">
      <CardHeader>
        <CardTitle>Impressions</CardTitle>
        <CardDescription>
          Showing total impressions for the last 30 days
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart
              data={chartData}
              margin={{
                left: 12,
                right: 12,
                top: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis hide />
              <Tooltip content={<ChartTooltipContent indicator="dot" hideLabel />} />
              <Area
                dataKey="impressions"
                type="monotone"
                fill="var(--color-desktop)"
                fillOpacity={0.4}
                stroke="var(--color-desktop)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
