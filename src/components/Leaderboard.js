import { Button } from '@headlessui/react'
import { useEffect, useState } from 'react'
import Loader from './Loader'

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

  if (isLoading) return <Loader />

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
