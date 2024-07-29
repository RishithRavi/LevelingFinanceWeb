import React from 'react'

export default function IRAExplanation() {
  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-4 text-3xl font-bold">What is an IRA?</h1>
      <p className="mb-4">
        An IRA, or Individual Retirement Account, is a special type of savings
        account that helps people save money for their retirement. Retirement is
        when people stop working because they are older, usually after many
        years of working.
      </p>

      <h2 className="mb-3 text-2xl font-semibold">Why is it important?</h2>
      <p className="mb-4">
        Saving money in an IRA is important because it helps people have enough
        money to live on when they stop working. This means they can still pay
        for things they need, like food, housing, and fun activities, even when
        they are no longer earning a salary.
      </p>

      <h2 className="mb-3 text-2xl font-semibold">Types of IRAs</h2>
      <p className="mb-4">
        There are two main types of IRAs: Traditional IRA and Roth IRA. Let’s
        break them down:
      </p>

      <h3 className="mb-2 text-xl font-semibold">1. Traditional IRA</h3>
      <ul className="mb-4 list-inside list-disc">
        <li>
          <strong>How it works:</strong> You put money into this account, and
          you don’t have to pay taxes on that money right away. Instead, you pay
          taxes when you take the money out after you retire.
        </li>
        <li>
          <strong>Benefits:</strong> You might save money on your taxes now
          because the money you put into a Traditional IRA is not counted as
          part of your income for that year.
        </li>
        <li>
          <strong>Drawbacks:</strong> You have to pay taxes when you take the
          money out, and there might be a penalty if you take it out too early
          (before age 59½).
        </li>
      </ul>

      <h3 className="mb-2 text-xl font-semibold">2. Roth IRA</h3>
      <ul className="mb-4 list-inside list-disc">
        <li>
          <strong>How it works:</strong> You put money into this account, but
          you pay taxes on it right away. However, when you take the money out
          after you retire, you don’t have to pay taxes on it.
        </li>
        <li>
          <strong>Benefits:</strong> Your money can grow tax-free, and you won’t
          have to pay taxes when you withdraw it in retirement.
        </li>
        <li>
          <strong>Drawbacks:</strong> You don’t get any tax breaks now because
          you pay taxes on the money before you put it into the account.
        </li>
      </ul>

      <h2 className="mb-3 text-2xl font-semibold">
        How does money grow in an IRA?
      </h2>
      <p className="mb-4">Money in an IRA can grow in several ways:</p>
      <ul className="mb-4 list-inside list-disc">
        <li>
          <strong>Interest:</strong> The bank or financial institution where you
          keep your IRA pays you interest, which is a small percentage of your
          balance added to your account regularly.
        </li>
        <li>
          <strong>Investments:</strong> You can invest the money in your IRA in
          things like stocks, bonds, or mutual funds. These investments can grow
          in value over time, helping your money increase even more.
        </li>
      </ul>

      <h2 className="mb-3 text-2xl font-semibold">
        Why start saving in an IRA early?
      </h2>
      <p className="mb-4">
        Starting to save in an IRA early is important because of something
        called “compound interest.” This means the interest you earn starts
        earning its own interest, which helps your money grow faster over time.
        The earlier you start, the more time your money has to grow.
      </p>

      <h2 className="mb-3 text-2xl font-semibold">Example</h2>
      <p className="mb-4">
        Let’s say you have $100 and you put it in a savings account that earns
        5% interest each year. After one year, you would have $105. The next
        year, you would earn interest on $105, not just the original $100. This
        continues, and your money grows faster and faster the longer you leave
        it in the account.
      </p>

      <h2 className="mb-3 text-2xl font-semibold">
        Important Points to Remember
      </h2>
      <ul className="mb-4 list-inside list-disc">
        <li>
          <strong>IRA stands for Individual Retirement Account.</strong>
        </li>
        <li>
          <strong>
            There are two main types: Traditional IRA and Roth IRA.
          </strong>
        </li>
        <li>
          <strong>
            Traditional IRA offers tax benefits now, but you pay taxes when you
            withdraw.
          </strong>
        </li>
        <li>
          <strong>
            Roth IRA requires you to pay taxes now, but withdrawals are
            tax-free.
          </strong>
        </li>
        <li>
          <strong>
            Starting to save early helps your money grow more due to compound
            interest.
          </strong>
        </li>
      </ul>
    </div>
  )
}
