// components/OverviewDashboard.js
const stats = [
  { name: 'Total Students', value: '120' },
  { name: 'Total Revenue', value: '$820,000' },
  { name: 'Total Minutes', value: '2,500' },
]

export default function OverviewDashboard() {
  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold leading-7 text-gray-900 dark:text-white">
        Overview
      </h2>

      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="overflow-hidden rounded-lg bg-gray-100 px-4 py-5 shadow dark:bg-gray-800 sm:p-6"
          >
            <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
              {stat.name}
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
