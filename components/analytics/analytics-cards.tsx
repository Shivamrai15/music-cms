import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  colorScheme?: 'blue' | 'green' | 'purple' | 'orange';
}

const colorSchemes = {
  blue: {
    card: "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:from-blue-100 hover:to-blue-200 transition-all duration-300 hover:scale-105 hover:shadow-lg",
    title: "text-blue-700",
    value: "text-blue-900",
    icon: "text-blue-600",
    trend: "text-blue-600"
  },
  green: {
    card: "bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 hover:from-emerald-100 hover:to-emerald-200 transition-all duration-300 hover:scale-105 hover:shadow-lg",
    title: "text-emerald-700",
    value: "text-emerald-900",
    icon: "text-emerald-600",
    trend: "text-emerald-600"
  },
  purple: {
    card: "bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:from-purple-100 hover:to-purple-200 transition-all duration-300 hover:scale-105 hover:shadow-lg",
    title: "text-purple-700",
    value: "text-purple-900",
    icon: "text-purple-600",
    trend: "text-purple-600"
  },
  orange: {
    card: "bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:from-orange-100 hover:to-orange-200 transition-all duration-300 hover:scale-105 hover:shadow-lg",
    title: "text-orange-700",
    value: "text-orange-900",
    icon: "text-orange-600",
    trend: "text-orange-600"
  }
};

export const AnalyticsCard = ({ title, value, subtitle, icon, trend, colorScheme = 'blue' }: AnalyticsCardProps) => {
  const colors = colorSchemes[colorScheme];
  
  return (
    <Card className={`rounded-xl cursor-pointer ${colors.card}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={`text-sm font-medium ${colors.title}`}>{title}</CardTitle>
        <div className={colors.icon}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${colors.value}`}>{value.toLocaleString()}</div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">
            {subtitle}
          </p>
        )}
        {trend && (
          <p className={`text-xs mt-2 font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {trend.isPositive ? '+' : ''}{trend.value}% from last month
          </p>
        )}
      </CardContent>
    </Card>
  );
};

