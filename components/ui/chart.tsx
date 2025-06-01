"use client"

interface ChartProps {
  data: Array<{ name: string; value: number; color?: string }>
  height?: number
  type?: "bar" | "line" | "area"
}

export function Chart({ data, height = 200, type = "bar" }: ChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value))

  if (type === "bar") {
    return (
      <div className="w-full" style={{ height }}>
        <div className="flex items-end justify-between h-full gap-2">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div
                className="w-full rounded-t-md transition-all duration-500 ease-out"
                style={{
                  height: `${(item.value / maxValue) * 80}%`,
                  backgroundColor: item.color || `hsl(${(index * 360) / data.length}, 70%, 50%)`,
                  minHeight: "4px",
                }}
              />
              <span className="text-xs text-gray-500 mt-2 text-center">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (type === "line") {
    const points = data
      .map((item, index) => {
        const x = (index / (data.length - 1)) * 100
        const y = 100 - (item.value / maxValue) * 80
        return `${x},${y}`
      })
      .join(" ")

    return (
      <div className="w-full" style={{ height }}>
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polyline
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            points={points}
            vectorEffect="non-scaling-stroke"
          />
          {data.map((item, index) => {
            const x = (index / (data.length - 1)) * 100
            const y = 100 - (item.value / maxValue) * 80
            return (
              <circle key={index} cx={x} cy={y} r="3" fill="hsl(var(--primary))" vectorEffect="non-scaling-stroke" />
            )
          })}
        </svg>
        <div className="flex justify-between mt-2">
          {data.map((item, index) => (
            <span key={index} className="text-xs text-gray-500">
              {item.name}
            </span>
          ))}
        </div>
      </div>
    )
  }

  return null
}

interface PieChartProps {
  data: Array<{ name: string; value: number; color: string }>
  size?: number
}

export function PieChart({ data, size = 200 }: PieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  let currentAngle = 0

  const slices = data.map((item) => {
    const percentage = (item.value / total) * 100
    const angle = (item.value / total) * 360
    const startAngle = currentAngle
    currentAngle += angle

    const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180)
    const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180)
    const x2 = 50 + 40 * Math.cos(((startAngle + angle) * Math.PI) / 180)
    const y2 = 50 + 40 * Math.sin(((startAngle + angle) * Math.PI) / 180)

    const largeArcFlag = angle > 180 ? 1 : 0

    return {
      ...item,
      percentage,
      path: `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`,
    }
  })

  return (
    <div className="flex items-center gap-4">
      <svg width={size} height={size} viewBox="0 0 100 100">
        {slices.map((slice, index) => (
          <path key={index} d={slice.path} fill={slice.color} stroke="white" strokeWidth="1" />
        ))}
      </svg>
      <div className="space-y-2">
        {slices.map((slice, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: slice.color }} />
            <span className="text-sm">{slice.name}</span>
            <span className="text-sm text-gray-500">({slice.percentage.toFixed(1)}%)</span>
          </div>
        ))}
      </div>
    </div>
  )
}
