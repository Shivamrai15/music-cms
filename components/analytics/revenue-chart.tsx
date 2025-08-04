"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface RevenueChartProps {
  data: Array<{
    month: string;
    revenue: number;
    subscriptions: number;
  }>;
}

const chartConfig = {
  revenue: {
    label: "Revenue (₹)",
    color: "#8b5cf6",
  },
} satisfies ChartConfig;

export const RevenueChart = ({ data }: RevenueChartProps) => {
  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const averageRevenue = totalRevenue / data.length;

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Revenue Overview
          <span className="text-sm font-normal text-muted-foreground">
            Total: ₹{totalRevenue.toFixed(2)}
          </span>
        </CardTitle>
        <CardDescription>
          Monthly subscription revenue for the past 12 months • Average: ₹{averageRevenue.toFixed(2)}/month
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              accessibilityLayer
              data={data}
              margin={{
                top: 20,
                left: 12,
                right: 12,
                bottom: 20,
              }}
            >
            <defs>
              <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="#8b5cf6"
                  stopOpacity={0.9}
                />
                <stop
                  offset="50%"
                  stopColor="#a78bfa"
                  stopOpacity={0.6}
                />
                <stop
                  offset="95%"
                  stopColor="#e9d5ff"
                  stopOpacity={0.3}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={12}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={12}
              tickFormatter={(value) => `₹${value}`}
            />
            <ChartTooltip 
              cursor={{ fill: 'rgba(139, 92, 246, 0.1)' }}
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-lg border bg-background p-3 shadow-md">
                      <div className="text-sm font-medium">{label}</div>
                      <div className="text-sm text-muted-foreground">
                        Revenue: <span className="font-semibold text-foreground">₹{data.revenue}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Subscriptions: <span className="font-semibold text-foreground">{data.subscriptions}</span>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar
              dataKey="revenue"
              fill="url(#fillRevenue)"
              strokeWidth={0}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
