"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
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

export function Chart({ dailyImpressionsLast30Days }) {
  console.log("dailyImpressionsLast30Days:", dailyImpressionsLast30Days);

  if (!Array.isArray(dailyImpressionsLast30Days) || dailyImpressionsLast30Days.length === 0) {
    return (
      <Card className="mt-20">
        <CardHeader>
          <CardTitle>Daily Impressions</CardTitle>
          <CardDescription>
            No data available for the last 30 days.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  // Map the data
  const chartData = dailyImpressionsLast30Days.map((day) => ({
    name: day.date, // Display date
    impressions: day.impressions, // Impressions value
  }));

  const chartConfig = {
    desktop: {
      label: "Impressions",
      color: "hsl(var(--chart-1))",
    },
  };

  return (
    <Card className="mt-20">
      <CardHeader>
        <CardTitle>Daily Impressions</CardTitle>
        <CardDescription>
          Showing daily impressions for the last 30 days
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={chartData}
              margin={{
                left: 12,
                right: 12,
                top: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(tick) => tick.slice(5)} // Format date to MM-DD
              />
              <YAxis 
                hide={false} // Make the Y-Axis visible
                domain={['auto', 'auto']} // Allow auto scaling of Y-Axis
              />
              <Tooltip
                content={
                  <ChartTooltip>
                    {(payload) =>
                      payload.length ? (
                        <ChartTooltipContent
                          indicator="dot"
                          title={payload[0].payload.name}
                          value={`${payload[0].value} Impressions`}
                        />
                      ) : null
                    }
                  </ChartTooltip>
                }
              />
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
