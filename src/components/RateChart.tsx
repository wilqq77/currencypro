import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export interface Point { date: string; value: number }

export function RateChart({ data, color = '#1687F8' }: { data: Point[]; color?: string }) {
  if (!data.length) {
    return (
      <div className="text-xs text-muted py-6 text-center">
        История котировок недоступна
      </div>
    );
  }
  return (
    <ResponsiveContainer width="100%" height={160}>
      <LineChart data={data}>
        <XAxis dataKey="date" hide />
        <YAxis hide domain={['auto', 'auto']} />
        <Tooltip
          formatter={(v: number) => v.toFixed(4)}
          labelFormatter={(l) => l}
          contentStyle={{ fontSize: 12, borderRadius: 8, borderColor: '#EAF5FF' }}
        />
        <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}