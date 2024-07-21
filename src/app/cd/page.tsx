// pages/cd-explained.tsx

import React from 'react'

export default function cd() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-xl rounded-lg bg-white p-6 shadow-lg">
        <h1 className="mb-4 text-3xl font-bold">
          Understanding Certificate of Deposit (CD)
        </h1>
        <p className="mb-2">
          Imagine you have a piggy bank where you save your money. A Certificate
          of Deposit, or CD, is like a super-special piggy bank that you give to
          a bank to hold for you. The bank promises to keep your money safe and
          even give you extra money, called interest, for letting them keep it
          for a while.
        </p>

        <h2 className="mb-2 mt-4 text-2xl font-semibold">
          How Does a CD Work?
        </h2>
        <ul className="mb-2 list-inside list-disc">
          <li>
            You Give the Bank Your Money: Just like putting money in your piggy
            bank, you give the bank a certain amount of money. This is called
            the "deposit."
          </li>
          <li>
            Pick a Time Period: You agree to leave your money with the bank for
            a set amount of time. This could be a few months or even a few
            years. This is called the "term."
          </li>
          <li>
            The Bank Pays You Interest: While the bank keeps your money, they
            use it to help other people, like giving loans. In return, they pay
            you extra money called "interest." The longer you leave your money
            with the bank, the more interest you usually get.
          </li>
          <li>
            Get Your Money Back with Extra: At the end of the term, you get your
            money back plus the interest the bank promised you.
          </li>
        </ul>

        <h2 className="mb-2 mt-4 text-2xl font-semibold">Why Use a CD?</h2>
        <ul className="mb-2 list-inside list-disc">
          <li>
            Safe and Secure: A CD is very safe because banks are good at keeping
            money safe.
          </li>
          <li>
            Extra Money (Interest): You earn extra money just for letting the
            bank keep your money for a while.
          </li>
          <li>
            No Spending Temptation: Because you can't take out the money until
            the term ends without a penalty, it helps you save.
          </li>
        </ul>

        <h2 className="mb-2 mt-4 text-2xl font-semibold">
          Example to Understand
        </h2>
        <p className="mb-2">
          Let’s say you have $100, and you put it in a CD for one year. The bank
          agrees to pay you 5% interest. At the end of the year, you will get
          back $105. That extra $5 is the interest, your reward for saving your
          money with the bank.
        </p>

        <h2 className="mb-2 mt-4 text-2xl font-semibold">
          Important Things to Remember
        </h2>
        <ul className="mb-2 list-inside list-disc">
          <li>
            Term: This is the time you agree to leave your money in the CD. It
            can be short or long.
          </li>
          <li>
            Interest Rate: This is how much extra money you will earn. Higher
            rates mean more money.
          </li>
          <li>
            Early Withdrawal: If you take your money out before the term ends,
            you might have to pay a fee, so it's best to wait.
          </li>
        </ul>

        <h2 className="mb-2 mt-4 text-2xl font-semibold">Fun Fact</h2>
        <p className="mb-2">
          Think of a CD as planting a tree. You plant a small seed (your money),
          and after some time, it grows into a big tree (more money), but you
          need to give it time to grow!
        </p>

        <h2 className="mb-2 mt-4 text-2xl font-semibold">Quick Quiz</h2>
        <p className="mb-2">
          1. What is the extra money the bank gives you called?
          <br />
          2. What happens if you take your money out of a CD before the term
          ends?
          <br />
          3. Why might someone choose to use a CD instead of a regular piggy
          bank?
        </p>

        <h2 className="mb-2 mt-4 text-2xl font-semibold">Answers</h2>
        <p className="mb-2">
          1. Interest
          <br />
          2. You might have to pay a fee.
          <br />
          3. Because it’s safe, you earn extra money, and it helps you save.
        </p>
      </div>
    </div>
  )
}
