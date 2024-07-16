import { Button } from '@headlessui/react'
import { useEffect, useState } from 'react'

// components/Leaderboard.js
// const leaderboard = [
//   { name: 'Charlie (Class 1A)', score: '$120,802' },
//   { name: 'Jackie (Class 2A)', score: '$100,212' },
//   { name: 'Chan (Class 3B)', score: '$80,220' },
//   { name: 'Jax (Class 2B)', score: '$79,803' },
//   { name: 'Lisa (Class 4B)', score: '$75,642' },
// ]

export default function Leaderboard() {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/students')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])

  if (isLoading)
    return (
      <div class="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
        <svg
          class="animate-spin text-gray-300"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
        >
          <path
            d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
            stroke="currentColor"
            stroke-width="5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
            stroke="currentColor"
            stroke-width="5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="text-gray-900"
          ></path>
        </svg>
      </div>
    )

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold leading-7 text-gray-900 dark:text-white">
        Leaderboard
      </h2>
      <ul className="mt-5 divide-y divide-gray-200 dark:divide-gray-700">
        {data.res.map((student, index) => (
          <li key={student.name} className="py-4">
            <div className="flex justify-between">
              <div>
                <span className="blue mr-6 py-1 text-sm font-bold italic text-indigo-500">
                  {index + 1}
                </span>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {student.name}
                </span>
              </div>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {student.score}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <Button>
        <span className="py-2 pl-5 font-semibold italic text-indigo-500">
          See All
        </span>
      </Button>
    </div>
  )
}
