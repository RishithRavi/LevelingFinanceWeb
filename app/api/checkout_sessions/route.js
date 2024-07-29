import { NextResponse } from 'next/server'
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export async function POST(request) {
  try {
    const { headers } = request
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const origin = headers.get('origin')
    console.log(id)
    let price = ''
    switch (id) {
      case 'Monthly-School-Subscription':
        price = 'price_1PdJMLG0hTrwhqsDxQ1h78Ll'
        break
      case 'Monthly-District-Subscription':
        price = 'price_1PdKrfG0hTrwhqsDpFPdZoGn'
        break
      case 'Annually-School-Subscription':
        price = 'price_1PdKsUG0hTrwhqsD6PhH8uNy'
        break
      case 'Annually-District-Subscription':
        price = 'price_1PdKsuG0hTrwhqsDDsAZxzeD'
        break
    }
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: price,
          quantity: 1,
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
            maximum: 15000,
          },
        },
      ],
      phone_number_collection: {
        enabled: true,
      },
      mode: 'subscription',
      success_url: `${origin}/dashboard?success=true`,
      cancel_url: `${origin}/#pricing?canceled=true`,
    })

    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    return NextResponse.json(
      { message: err.message },
      { status: err.statusCode || 500 },
    )
  }
}

export async function OPTIONS() {
  return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 })
}
