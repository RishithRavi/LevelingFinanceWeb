// components/Classes.js
const classes = [
  { name: 'Intro to Business', href: '#' },
  { name: 'Business', href: '#' },
  { name: 'Finance 101', href: '#' },
]

export default function Classes() {
  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold leading-7 text-gray-900 dark:text-white">
        Classes
      </h2>
      <ul className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {classes.map((classItem) => (
          <li
            key={classItem.name}
            className="overflow-hidden rounded-lg bg-gray-100 px-4 py-5 shadow dark:bg-gray-800 sm:p-6"
          >
            <a
              href={classItem.href}
              className="text-lg font-semibold text-gray-900 dark:text-white"
            >
              {classItem.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
