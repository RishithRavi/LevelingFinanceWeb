import { Container } from '@/components/Container'

const faqs = [
  [
    {
      question: 'How do I know the tips are good?',
      answer:
        'We base our tips on well-researched information and our goal is to help you learn about investing wisely. You can trust that we provide valuable learning experiences.',
    },
    {
      question: 'Is this app suitable for kids?',
      answer:
        'Absolutely! Leveling Finance is designed to make learning about investing fun and accessible for kids and teens.',
    },
    {
      question: 'Can teachers use this app in the classroom?',
      answer:
        'Yes, teachers can use Leveling Finance as an educational tool to teach students about financial literacy and smart investing.',
    },
  ],
  [
    {
      question: 'Is there any age limit to using Leveling Finance?',
      answer:
        'There is no specific age limit. Our app is designed for K-12 students, but anyone interested in learning about finance can use it.',
    },
    {
      question: 'Where is Leveling Finance based?',
      answer:
        'Leveling Finance is a global platform accessible to users from around the world.',
    },
    {
      question: 'How much does it cost?',
      answer:
        'Leveling Finance offers a free tier for individual users and a premium tier for schools and organizations at $1 per student per month or $10 per student per year.',
    },
  ],
  [
    {
      question: 'How do I get started?',
      answer:
        'Simply download the app from the App Store, create an account, and start exploring our learning modules and investment tips.',
    },
    {
      question: 'Can I track my progress?',
      answer:
        'Yes, you can track your learning progress and see how much you’ve learned about investing over time.',
    },
    {
      question: 'Who can I contact for support?',
      answer:
        'If you need any help or have more questions, you can reach out to us at info@levelingfinance.com.',
    },
  ],
]

export function Faqs() {
  return (
    <section
      id="faqs"
      aria-labelledby="faqs-title"
      className="border-t border-gray-200 py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faqs-title"
            className="text-3xl font-medium tracking-tight text-gray-900"
          >
            Frequently asked questions
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            If you have anything else you want to ask,{' '}
            <a
              href="mailto:info@levelingfinance.com"
              className="text-gray-900 underline"
            >
              reach out to us
            </a>
            .
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="space-y-10">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="text-lg font-semibold leading-6 text-gray-900">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-sm text-gray-700">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
