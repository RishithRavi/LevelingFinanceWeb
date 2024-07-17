import { NextResponse } from 'next/server'

// Define the handler function
export async function GET(request, { params }) {
  const { phone, ticker } = params
  const token = request.headers.get('authorization')

  const response = await fetch(
    `https://api.levelingfinance.com/api/user/${phone}/stocks/${ticker}/history/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  if (!response.ok) {
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: response.status },
    )
  }

  const data = await response.json()
  return NextResponse.json(data)
}
