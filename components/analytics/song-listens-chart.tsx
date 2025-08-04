"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface SongListensChartProps {
  data: Array<{
    date: string;
    listens: number;
  }>;
}

const chartConfig = {
  listens: {
    label: "Song Listens",
    color: "#10b981",
  },
} satisfies ChartConfig;

export const SongListensChart = ({ data }: SongListensChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Song Listens</CardTitle>
        <CardDescription>
          Daily song listens for the past 10 days
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              accessibilityLayer
              data={data}
              margin={{
                left: 12,
                right: 12,
              }}
            >
            <defs>
              <linearGradient id="fillListens" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="#10b981"
                  stopOpacity={0.9}
                />
                <stop
                  offset="50%"
                  stopColor="#34d399"
                  stopOpacity={0.4}
                />
                <stop
                  offset="95%"
                  stopColor="#d1fae5"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={3}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Area
              dataKey="listens"
              type="natural"
              fill="url(#fillListens)"
              fillOpacity={0.8}
              stroke="#059669"
              strokeWidth={3}
              dot={{
                fill: "#10b981",
                strokeWidth: 2,
                r: 4,
                stroke: "#ffffff",
              }}
              activeDot={{
                r: 6,
                stroke: "#059669",
                strokeWidth: 2,
                fill: "#ffffff",
              }}
            />
          </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
