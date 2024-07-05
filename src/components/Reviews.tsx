'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import clsx from 'clsx'
import { useInView } from 'framer-motion'

import { Container } from '@/components/Container'

interface Review {
  title: string
  body: string
  author: string
  rating: 1 | 2 | 3 | 4 | 5
}

const reviews: Array<Review> = [
  {
    title: 'Learning is fun!',
    body: 'I downloaded Leveling Finance today and started learning about investing in a fun way.',
    author: 'SmartStudent',
    rating: 5,
  },
  {
    title: 'Perfect for beginners!',
    body: 'I didn’t understand the stock market at all before Leveling Finance. Now I feel like a pro!',
    author: 'BeginnerInvestor',
    rating: 5,
  },
  {
    title: 'So easy to use.',
    body: 'Leveling Finance makes it so easy to learn and invest that I can’t believe it’s actually this simple.',
    author: 'EasyLearner',
    rating: 5,
  },
  {
    title: 'Great app!',
    body: 'With Leveling Finance, I’m learning how to save and invest my money wisely.',
    author: 'SavingStar',
    rating: 5,
  },
  {
    title: 'Amazing experience!',
    body: 'I started using Leveling Finance and now I get helpful tips every day. I love learning about money!',
    author: 'FinanceFan',
    rating: 5,
  },
  {
    title: 'Highly recommended!',
    body: 'I was learning so fast with Leveling Finance that it felt like a game. This app is awesome!',
    author: 'LearningPro',
    rating: 5,
  },
  {
    title: 'Best app ever!',
    body: 'This is literally the most important app you will ever download in your life. Start learning and investing today!',
    author: 'HappyUser',
    rating: 5,
  },
  {
    title: 'So helpful.',
    body: 'Want to learn about investing? Get Leveling Finance.',
    author: 'FutureInvestor',
    rating: 5,
  },
  {
    title: 'No more worries!',
    body: 'After using Leveling Finance for a few weeks, I feel more confident about my financial future.',
    author: 'ConfidentSaver',
    rating: 5,
  },
  {
    title: 'I’m learning so much.',
    body: 'I love that with Leveling Finance I could start learning about investing early. I feel more prepared for the future!',
    author: 'YoungInvestor',
    rating: 5,
  },
  {
    title: 'So easy to understand.',
    body: 'Leveling Finance makes it simple to understand investing. Easy money!',
    author: 'SimpleSaver',
    rating: 5,
  },
  {
    title: 'It’s like having a mentor.',
    body: 'Every tip Leveling Finance has sent me has been so helpful. It’s like having a financial mentor!',
    author: 'GuidedLearner',
    rating: 5,
  },
  {
    title: 'Fun and educational!',
    body: 'I downloaded Leveling Finance three days ago and I’m already learning so much. I can’t believe how fun this is!',
    author: 'ExcitedLearner',
    rating: 5,
  },
  {
    title: 'Don’t wait, download now!',
    body: 'Unless you want to miss out on the best learning experience ever! I am loving this app.',
    author: 'EnthusiasticUser',
    rating: 5,
  },
]

function StarIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" {...props}>
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

function StarRating({ rating }: { rating: Review['rating'] }) {
  return (
    <div className="flex">
      {[...Array(5).keys()].map((index) => (
        <StarIcon
          key={index}
          className={clsx(
            'h-5 w-5',
            rating > index ? 'fill-indigo-500' : 'fill-gray-300',
          )}
        />
      ))}
    </div>
  )
}

function Review({
  title,
  body,
  author,
  rating,
  className,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'figure'>, keyof Review> & Review) {
  let animationDelay = useMemo(() => {
    let possibleAnimationDelays = ['0s', '0.1s', '0.2s', '0.3s', '0.4s', '0.5s']
    return possibleAnimationDelays[
      Math.floor(Math.random() * possibleAnimationDelays.length)
    ]
  }, [])

  return (
    <figure
      className={clsx(
        'animate-fade-in rounded-3xl bg-white p-6 opacity-0 shadow-md shadow-gray-900/5',
        className,
      )}
      style={{ animationDelay }}
      {...props}
    >
      <blockquote className="text-gray-900">
        <StarRating rating={rating} />
        <p className="mt-4 text-lg font-semibold leading-6 before:content-['“'] after:content-['”']">
          {title}
        </p>
        <p className="mt-3 text-base leading-7">{body}</p>
      </blockquote>
      <figcaption className="mt-3 text-sm text-gray-600 before:content-['–_']">
        {author}
      </figcaption>
    </figure>
  )
}

function splitArray<T>(array: Array<T>, numParts: number) {
  let result: Array<Array<T>> = []
  for (let i = 0; i < array.length; i++) {
    let index = i % numParts
    if (!result[index]) {
      result[index] = []
    }
    result[index].push(array[i])
  }
  return result
}

function ReviewColumn({
  reviews,
  className,
  reviewClassName,
  msPerPixel = 0,
}: {
  reviews: Array<Review>
  className?: string
  reviewClassName?: (reviewIndex: number) => string
  msPerPixel?: number
}) {
  let columnRef = useRef<React.ElementRef<'div'>>(null)
  let [columnHeight, setColumnHeight] = useState(0)
  let duration = `${columnHeight * msPerPixel}ms`

  useEffect(() => {
    if (!columnRef.current) {
      return
    }

    let resizeObserver = new window.ResizeObserver(() => {
      setColumnHeight(columnRef.current?.offsetHeight ?? 0)
    })

    resizeObserver.observe(columnRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <div
      ref={columnRef}
      className={clsx('animate-marquee space-y-8 py-4', className)}
      style={{ '--marquee-duration': duration } as React.CSSProperties}
    >
      {reviews.concat(reviews).map((review, reviewIndex) => (
        <Review
          key={reviewIndex}
          aria-hidden={reviewIndex >= reviews.length}
          className={reviewClassName?.(reviewIndex % reviews.length)}
          {...review}
        />
      ))}
    </div>
  )
}

function ReviewGrid() {
  let containerRef = useRef<React.ElementRef<'div'>>(null)
  let isInView = useInView(containerRef, { once: true, amount: 0.4 })
  let columns = splitArray(reviews, 3)
  let column1 = columns[0]
  let column2 = columns[1]
  let column3 = splitArray(columns[2], 2)

  return (
    <div
      ref={containerRef}
      className="relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3"
    >
      {isInView && (
        <>
          <ReviewColumn
            reviews={[...column1, ...column3.flat(), ...column2]}
            reviewClassName={(reviewIndex) =>
              clsx(
                reviewIndex >= column1.length + column3[0].length &&
                  'md:hidden',
                reviewIndex >= column1.length && 'lg:hidden',
              )
            }
            msPerPixel={10}
          />
          <ReviewColumn
            reviews={[...column2, ...column3[1]]}
            className="hidden md:block"
            reviewClassName={(reviewIndex) =>
              reviewIndex >= column2.length ? 'lg:hidden' : ''
            }
            msPerPixel={15}
          />
          <ReviewColumn
            reviews={column3.flat()}
            className="hidden lg:block"
            msPerPixel={10}
          />
        </>
      )}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gray-50" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gray-50" />
    </div>
  )
}

export function Reviews() {
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      className="pb-16 pt-20 sm:pb-24 sm:pt-32"
    >
      <Container>
        <h2
          id="reviews-title"
          className="text-3xl font-medium tracking-tight text-gray-900 sm:text-center"
        >
          Everyone is learning and growing with Leveling Finance.
        </h2>
        <p className="mt-2 text-lg text-gray-600 sm:text-center">
          Thousands of students are starting their investing journey and gaining financial literacy.
        </p>
        <ReviewGrid />
      </Container>
    </section>
  )
}
