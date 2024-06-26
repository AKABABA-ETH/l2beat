import React from 'react'

import { HorizontalSeparator } from '../HorizontalSeparator'

interface TvlHeaderProps {
  isBridge: boolean
}

export function TvlHeader({ isBridge }: TvlHeaderProps) {
  return (
    <header
      className="mb-4 flex flex-col justify-between text-base md:flex-row"
      data-role="chart-header"
    >
      <div>
        <h1 className="mb-1 font-bold text-3xl">Value Locked</h1>
        <p className="hidden text-gray-500 md:block dark:text-gray-600">
          {isBridge
            ? 'Sum of all funds locked on Ethereum converted to '
            : 'Sum of all canonically bridged, externally bridged, and natively minted tokens, converted to '}
          <span data-role="chart-header-currency">...</span>
        </p>
      </div>
      <div className="flex flex-row items-baseline gap-2 transition-opacity duration-200 group-data-[interactivity-disabled]/chart:pointer-events-none md:flex-col md:items-end md:gap-1 group-data-[interactivity-disabled]/chart:opacity-0">
        <p
          className="whitespace-nowrap text-right font-bold text-lg md:text-3xl"
          data-role="chart-header-value"
        >
          ...
        </p>
        <p className="whitespace-nowrap text-right font-bold text-xs md:text-base">
          <span data-role="chart-header-value-change">...</span> / 7 days
        </p>
      </div>
      <HorizontalSeparator className="mt-2 md:hidden" />
    </header>
  )
}
