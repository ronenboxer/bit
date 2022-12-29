import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'


export function Chart({ chart }) {
    const { data, title, posColor, stroke, negColor, description, unit = 'USD' , type} = chart
    return (
        <section className="chart">
            <h1 className="chart-title" style={{color:posColor}}>{title}</h1>
            <p className="chart-description">{description}</p>
            <ResponsiveContainer width="100%" height="90%">
                <AreaChart data={data} margin={{ left: 50 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fill: 'white' }} padding={{ top: 50 }} />
                    <YAxis tick={{ fill: 'white' }} type={type || 'number'}/>
                    <Tooltip />
                    <defs>
                        <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                            <stop stopColor={posColor} stopOpacity={.75} />
                            <stop stopColor={negColor} stopOpacity={.75} />
                        </linearGradient>
                    </defs>
                    <Area dataKey={unit} stroke={stroke} fill={posColor} />
                </AreaChart>
            </ResponsiveContainer>
        </section>
    )
}