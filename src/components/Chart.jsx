import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
// const data = [{ name: 'Page A', uv: 400, pv: 0, amt: 2400 },{ name: 'Page B', uv: 300, pv: 2400, amt: 2400 },{ name: 'Page C', uv: 200, pv: 2400, amt: 2400 },{ name: 'Page D', uv: 100, pv: 2400, amt: 2400 }];


export function Chart({ chart }) {
    const { data, title, posColor, negColor, description, unit = 'USD' } = chart
    const gradientOffset = () => {
        const dataMax = Math.max(...data.map((i) => i[unit]));
        const dataMin = Math.min(...data.map((i) => i[unit]));

        if (dataMax <= 0) {
            return 0;
        }
        if (dataMin >= 0) {
            return 1;
        }

        return dataMax / (dataMax - dataMin);
    }

    const off = gradientOffset()
    return (
        <section className="chart">
            <h1 className="chart-title">{title}</h1>
            <p className="chart-description">{description}</p>
            <ResponsiveContainer width="100%" height="90%">
                <AreaChart data={data} margin={{left:50}}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fill: 'white' }} padding={{top:50}}/>
                    <YAxis tick={{ fill: 'white' }} />
                    <Tooltip />
                    <defs>
                        <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                            <stop offset={off} stopColor={posColor} stopOpacity={.75} />
                            <stop offset={off} stopColor={negColor} stopOpacity={.75} />
                        </linearGradient>
                    </defs>
                    <Area dataKey={unit} stroke="#774e03" fill="url(#splitColor)" />
                </AreaChart>
            </ResponsiveContainer>
        </section>
    )
}