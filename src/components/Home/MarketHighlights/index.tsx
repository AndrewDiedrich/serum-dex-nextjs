import { Card, H2, Spinner } from '@blueprintjs/core'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
const MarketHighlights = ({ data1 = [], data2 = [] }: { data1: []; data2: [] }): JSX.Element => {
  const CustomTooltip = ({ active, payload }: { active: boolean; payload: Array<any> }): JSX.Element => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`$${payload[0].value}`}</p>
          <p className="desc">date</p>
        </div>
      )
    }
    return <div>no data</div>
  }

  return (
    <div>
      <Card>
        <div className="flex-row-wrap" style={{ justifyContent: 'space-between' }}>
          {/* <H2>{market.market}</H2> */}
          <ResponsiveContainer className="token-chart" width="40%" height={200}>
            <AreaChart data={data1}>
              <defs>
                <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1A7AC7" stopOpacity={0.4} />
                  <stop offset="0%" stopColor="#1A7AC7" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <Area dataKey="price" stroke="#1A7AC7" fill="#0678fb" />
              <XAxis
                minTickGap={17}
                dataKey="time"
                axisLine={false}
                tickLine={false}
                // tickFormatter={(str, i) => {
                //   if (i % 7 === 0) {
                //     const newDate = dateFormat(str, 'mmmm d')
                //     return newDate
                //   } else {
                //     return ''
                //   }
                // }}
                tickMargin={10}
              />
              <YAxis
                tickFormatter={(number) => `$${number.toFixed(2)}`}
                dataKey="price"
                axisLine={false}
                tickLine={false}
                tickCount={8}
                type="number"
              />
              <Tooltip wrapperClassName="tooltip" content={<CustomTooltip />} />
              <CartesianGrid opacity={0.2} vertical={false} />
            </AreaChart>
          </ResponsiveContainer>

          <ResponsiveContainer className="token-chart" width="40%" height={200}>
            <AreaChart data={data2}>
              <defs>
                <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1A7AC7" stopOpacity={0.4} />
                  <stop offset="0%" stopColor="#1A7AC7" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <Area dataKey="price" stroke="#1A7AC7" fill="#0678fb" />
              <XAxis
                minTickGap={17}
                dataKey="time"
                axisLine={false}
                tickLine={false}
                // tickFormatter={(str, i) => {
                //   if (i % 7 === 0) {
                //     const newDate = dateFormat(str, 'mmmm d')
                //     return newDate
                //   } else {
                //     return ''
                //   }
                // }}
                tickMargin={10}
              />
              <YAxis
                tickFormatter={(number) => `$${number.toFixed(2)}`}
                dataKey="price"
                axisLine={false}
                tickLine={false}
                tickCount={8}
                type="number"
              />
              <Tooltip wrapperClassName="tooltip" content={<CustomTooltip />} />
              <CartesianGrid opacity={0.2} vertical={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  )
}

export default MarketHighlights
