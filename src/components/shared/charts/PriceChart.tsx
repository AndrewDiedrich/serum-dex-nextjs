import { ComposedChart, Bar, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card, Colors, H4 } from '@blueprintjs/core'

function randomNumber(min, max) {
  return Math.random() * (max - min) + min
}

const data = [
  { time: 0, price: randomNumber(2, 300), volume: randomNumber(2, 13) },
  { time: 1, price: randomNumber(2, 300), volume: randomNumber(2, 13) },
  { time: 1, price: randomNumber(2, 300), volume: randomNumber(2, 13) },
  { time: 2, price: randomNumber(2, 300), volume: randomNumber(2, 13) },
  { time: 3, price: randomNumber(2, 300), volume: randomNumber(2, 13) },
  { time: 4, price: randomNumber(2, 300), volume: randomNumber(2, 13) },
  { time: 5, price: randomNumber(2, 300), volume: randomNumber(2, 13) },
  { time: 6, price: randomNumber(2, 300), volume: randomNumber(2, 13) },
  { time: 7, price: randomNumber(2, 300), volume: randomNumber(2, 13) },
  { time: 8, price: randomNumber(2, 300), volume: randomNumber(2, 13) },
  { time: 9, price: randomNumber(2, 300), volume: randomNumber(2, 13) },
  { time: 3, price: randomNumber(2, 300), volume: randomNumber(2, 13) },
  { time: 4, price: randomNumber(2, 300), volume: randomNumber(2, 13) },
  { time: 5, price: randomNumber(2, 300), volume: randomNumber(2, 13) },
  { time: 6, price: randomNumber(2, 300), volume: randomNumber(2, 13) },
  { time: 7, price: randomNumber(2, 300), volume: randomNumber(2, 13) },
  { time: 8, price: randomNumber(2, 300), volume: randomNumber(2, 13) },
  { time: 9, price: randomNumber(2, 300), volume: randomNumber(2, 13) },
  { time: 3, price: randomNumber(2, 300), volume: randomNumber(2, 13) },
  { time: 4, price: randomNumber(2, 300), volume: randomNumber(2, 13) },
  { time: 5, price: randomNumber(2, 300), volume: randomNumber(2, 13) },
  { time: 6, price: randomNumber(2, 300), volume: randomNumber(2, 13) },
  { time: 7, price: randomNumber(2, 300), volume: randomNumber(2, 13) },
  { time: 8, price: randomNumber(2, 300), volume: randomNumber(2, 13) },
  { time: 9, price: randomNumber(2, 300), volume: randomNumber(2, 13) },
  { time: 3, price: randomNumber(2, 300), volume: randomNumber(2, 13) },
  { time: 4, price: randomNumber(2, 300), volume: randomNumber(2, 13) },
  { time: 5, price: randomNumber(2, 300), volume: randomNumber(2, 13) },
  { time: 6, price: randomNumber(2, 300), volume: randomNumber(2, 13) },
  { time: 7, price: randomNumber(2, 300), volume: randomNumber(2, 13) },
  { time: 8, price: randomNumber(2, 300), volume: randomNumber(2, 13) },
  { time: 9, price: randomNumber(2, 300), volume: randomNumber(2, 13) },
]

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active: boolean
  payload: Array<any>
  label: string
}): JSX.Element => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`$${payload[0].value}`}</p>
        <p className="desc">{`${label}`}</p>
      </div>
    )
  }
  return <></>
}

const PriceChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart width={730} height={250} data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={Colors.BLUE2} stopOpacity={0.8} />
            <stop offset="60%" stopColor={Colors.BLUE2} stopOpacity={0.2} />
          </linearGradient>
        </defs>
        <XAxis dataKey="time" />
        <YAxis dataKey="price" />

        <Area dataKey="price" stroke={Colors.BLUE4} fill="url(#color)" />
        <Bar dataKey="volume" barSize={20} fill={Colors.GREEN4} />
        <Tooltip wrapperClassName="tooltip" content={<CustomTooltip />} />
        <CartesianGrid opacity={0.2} vertical={false} />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

export default PriceChart
