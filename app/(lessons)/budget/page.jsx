/* eslint-disable react/no-unescaped-entities */
import React from 'react'

export default function BudgetExplanation() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-3xl font-bold">What is a Budget?</h1>

      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">Introduction</h2>
        <p>
          A budget is a plan that helps you manage your money by outlining your
          income (money you earn or receive) and your expenses (money you
          spend). For a middle school student, learning to budget is an
          essential skill that can help you manage your allowance, gifts, or any
          other money you receive. Understanding how to create and stick to a
          budget can set you on a path to financial success and responsibility.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">
          Why is Budgeting Important?
        </h2>
        <ul className="list-inside list-disc">
          <li>
            Financial Awareness: Helps you understand where your money comes
            from and where it goes.
          </li>
          <li>
            Goal Setting: Allows you to save for things you want, like a new
            video game or a special outing with friends.
          </li>
          <li>
            Decision Making: Teaches you to make informed choices about spending
            and saving.
          </li>
          <li>
            Avoiding Debt: Helps you avoid borrowing money or owing others.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">Components of a Budget</h2>
        <p>
          A budget typically includes two main components: income and expenses.
        </p>
        <h3 className="mt-4 text-xl font-semibold">1. Income</h3>
        <p>
          Income is the money you receive. As a middle school student, your
          income might come from:
        </p>
        <ul className="list-inside list-disc">
          <li>Allowance from parents or guardians.</li>
          <li>Gifts for birthdays or holidays.</li>
          <li>
            Earnings from small jobs like babysitting, mowing lawns, or doing
            chores.
          </li>
        </ul>

        <h3 className="mt-4 text-xl font-semibold">2. Expenses</h3>
        <p>
          Expenses are the things you spend money on. These can be divided into:
        </p>
        <ul className="list-inside list-disc">
          <li>
            <strong>Fixed Expenses</strong>: Regular and consistent expenses,
            such as a monthly subscription to a magazine.
          </li>
          <li>
            <strong>Variable Expenses</strong>: Expenses that can change from
            month to month, such as buying snacks, going to the movies, or
            purchasing school supplies.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">Creating a Budget</h2>
        <p>To create a budget, follow these steps:</p>
        <ol className="list-inside list-decimal">
          <li>
            <strong>List Your Income</strong>: Write down all the money you
            expect to receive each month. For example:
            <ul className="ml-6 list-inside list-disc">
              <li>Allowance: $20</li>
              <li>Birthday gift: $10</li>
              <li>Chores: $15</li>
              <li>Total Income: $45</li>
            </ul>
          </li>
          <li>
            <strong>List Your Expenses</strong>: Write down all the things you
            plan to spend money on. Estimate how much each will cost. For
            example:
            <ul className="ml-6 list-inside list-disc">
              <li>Snacks: $10</li>
              <li>School supplies: $5</li>
              <li>Savings for a new game: $20</li>
              <li>Fun activities: $10</li>
              <li>Total Expenses: $45</li>
            </ul>
          </li>
          <li>
            <strong>Compare Income and Expenses</strong>: Ensure your total
            expenses do not exceed your total income. In this example, both are
            $45, which means your budget is balanced.
          </li>
          <li>
            <strong>Adjust as Necessary</strong>: If your expenses are more than
            your income, look for ways to cut back. Maybe you can save more by
            reducing the money spent on snacks or finding cheaper alternatives
            for fun activities.
          </li>
        </ol>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">Tracking Your Spending</h2>
        <p>
          Once you have a budget, it’s important to track your spending to
          ensure you stick to your plan. You can use a notebook, a spreadsheet,
          or even budgeting apps designed for kids and teens.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">
          Tips for Successful Budgeting
        </h2>
        <ul className="list-inside list-disc">
          <li>
            <strong>Be Realistic</strong>: Make sure your budget is achievable.
          </li>
          <li>
            <strong>Prioritize</strong>: Spend on needs before wants.
          </li>
          <li>
            <strong>Save</strong>: Always try to save a portion of your income,
            even if it’s small.
          </li>
          <li>
            <strong>Review and Adjust</strong>: Regularly review your budget and
            make adjustments as needed.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">
          Example Budget for a Month
        </h2>
        <table className="w-full table-auto border-collapse text-left">
          <thead>
            <tr>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Planned Amount</th>
              <th className="border px-4 py-2">Actual Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">Income</td>
              <td className="border px-4 py-2"></td>
              <td className="border px-4 py-2"></td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Allowance</td>
              <td className="border px-4 py-2">$20</td>
              <td className="border px-4 py-2">$20</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Birthday Gift</td>
              <td className="border px-4 py-2">$10</td>
              <td className="border px-4 py-2">$10</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Chores</td>
              <td className="border px-4 py-2">$15</td>
              <td className="border px-4 py-2">$15</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Total Income</td>
              <td className="border px-4 py-2 font-bold">$45</td>
              <td className="border px-4 py-2 font-bold">$45</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Expenses</td>
              <td className="border px-4 py-2"></td>
              <td className="border px-4 py-2"></td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Snacks</td>
              <td className="border px-4 py-2">$10</td>
              <td className="border px-4 py-2">$8</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">School Supplies</td>
              <td className="border px-4 py-2">$5</td>
              <td className="border px-4 py-2">$5</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Savings for New Game</td>
              <td className="border px-4 py-2">$20</td>
              <td className="border px-4 py-2">$20</td>
            </tr>
            <tr>
              <td className="py- 2 border px-4">$Fun Activities</td>
              <td className="border px-4 py-2">$10</td>
              <td className="border px-4 py-2">$12</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Total Expenses</td>
              <td className="border px-4 py-2 font-bold">$45</td>
              <td className="border px-4 py-2 font-bold">$45</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2 className="mb-2 text-2xl font-semibold">Conclusion</h2>
        <p>
          Budgeting is a valuable life skill that helps you manage your money
          wisely. By understanding your income and expenses, setting financial
          goals, and tracking your spending, you can make informed decisions
          about how to use your money. Start budgeting now, and you'll be better
          prepared to handle your finances in the future.
        </p>
      </section>
    </div>
  )
}
