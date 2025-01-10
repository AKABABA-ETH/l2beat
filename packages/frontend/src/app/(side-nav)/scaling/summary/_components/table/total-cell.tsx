import { type WarningWithSentiment } from '@l2beat/config'
import { NoDataBadge } from '~/components/badge/no-data-badge'
import {
  TokenBreakdown,
  TokenBreakdownTooltipContent,
} from '~/components/breakdown/token-breakdown'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~/components/core/tooltip/tooltip'
import { ValueWithPercentageChange } from '~/components/table/cells/value-with-percentage-change'
import {
  WarningBar,
  sentimentToWarningBarColor,
} from '~/components/warning-bar'
import { RoundedWarningIcon } from '~/icons/rounded-warning'
import { formatTvlTableNumber } from '~/utils/number-format/format-tvl-number'

export interface TotalCellProps {
  breakdown:
    | {
        total: number
        ether: number
        stablecoin: number
        associated: number
      }
    | undefined
  associatedTokenSymbols: string[]
  change?: number
  tvlWarnings?: WarningWithSentiment[]
}

export function TotalCell(data: TotalCellProps) {
  const tvlWarnings = data.tvlWarnings ?? []
  const anyBadWarnings = tvlWarnings.some((w) => w.sentiment === 'bad')
  const anyWarningWarnings = tvlWarnings.some((w) => w.sentiment === 'warning')

  const icon = tvlWarnings.length ? (
    <RoundedWarningIcon
      className="mr-1 size-4"
      sentiment={
        anyBadWarnings ? 'bad' : anyWarningWarnings ? 'warning' : 'neutral'
      }
    />
  ) : null
  if (data.breakdown?.total === undefined) {
    return (
      <Tooltip>
        <TooltipTrigger className="flex items-center">
          {icon}
          <NoDataBadge />
        </TooltipTrigger>
        <TooltipContent className="space-y-2">
          <span>Data is not available for this project.</span>
          {tvlWarnings?.map((warning, i) => (
            <WarningBar
              key={`tvl-warning-${i}`}
              icon={RoundedWarningIcon}
              text={warning.content}
              color={sentimentToWarningBarColor(warning.sentiment)}
              // Cell itself is a href.
              // Markdown might contain links - nesting them in a tooltip
              // breaks semantics apart causing significant layout shifts.
              ignoreMarkdown
            />
          ))}
        </TooltipContent>
      </Tooltip>
    )
  }

  const totalTvl = data.breakdown.total

  return (
    <Tooltip>
      <TooltipTrigger>
        <div className="flex flex-col items-end">
          <div className="flex items-center">
            {icon}
            <ValueWithPercentageChange change={data.change}>
              {formatTvlTableNumber(totalTvl)}
            </ValueWithPercentageChange>
          </div>
          <TokenBreakdown
            total={data.breakdown.total}
            associated={data.breakdown.associated}
            ether={data.breakdown.ether}
            stablecoin={data.breakdown.stablecoin}
            className="h-[3px] w-[180px]"
          />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <TokenBreakdownTooltipContent
          total={data.breakdown.total}
          associated={data.breakdown.associated}
          ether={data.breakdown.ether}
          stablecoin={data.breakdown.stablecoin}
          tvlWarnings={tvlWarnings}
          associatedTokenSymbols={data.associatedTokenSymbols}
        />
      </TooltipContent>
    </Tooltip>
  )
}
