import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useState, useEffect } from 'react';

interface NeighborhoodChartProps {
  status: string;
  timeframe: string;
}

const generateData = (timeframe: string, status: string) => {
  const points = timeframe === '24h' ? 24 : timeframe === '7d' ? 7 : 30;
  const baseValue = status === 'critical' ? 40 : status === 'warning' ? 20 : 5;
  
  return Array.from({ length: points }, (_, i) => ({
    time: timeframe === '24h' ? `${i}:00` : `Dia ${i + 1}`,
    value: Math.max(0, baseValue + Math.floor(Math.random() * 20 - 10)),
  }));
};

export function NeighborhoodChart({ status, timeframe }: NeighborhoodChartProps) {
  const [data, setData] = useState(generateData(timeframe, status));

  useEffect(() => {
    setData(generateData(timeframe, status));
  }, [timeframe, status]);

  const getChartColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'rgb(34, 197, 94)';
      case 'warning':
        return 'rgb(234, 179, 8)';
      case 'critical':
        return 'rgb(239, 68, 68)';
      default:
        return 'rgb(59, 130, 246)';
    }
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
        <XAxis
          dataKey="time"
          fontSize={10}
          tickLine={false}
          axisLine={false}
          interval={'preserveStartEnd'}
        />
        <YAxis
          fontSize={10}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Relatos
                      </span>
                      <span className="font-bold text-muted-foreground">
                        {payload[0].value}
                      </span>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          }}
        />
        <Line
          type="monotone"
          dataKey="value"
          strokeWidth={2}
          activeDot={{
            r: 4,
            style: { fill: getChartColor(status) },
          }}
          style={{
            stroke: getChartColor(status),
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}