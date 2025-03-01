import { ArrowRightIcon } from "@heroicons/react/20/solid"
import {
  IconCopy,
  IconDownload,
  IconExternalLink,
  IconGavel,
  IconHistory,
} from "@tabler/icons-react"
import { FC, useCallback, useMemo } from "react"
import { auctionHouseAddress } from "../../contracts/generated"
import { CHAIN_ID } from "../../lib/settings"
import { shortenAddress } from "../../lib/shortenAddress"
import { useBlockExplorerUrl } from "../../lib/useBlockExplorerUrl"
import { Avatar } from "../Avatar"
import { Drawer } from "../Drawer"
import { EthValue } from "../EthValue"
import { CrestViewData, useCrestDetailsDrawer } from "./useCrestDetailsDrawer"
import { CrestHistoryEvent, useCrestHistory } from "./useCrestHistory"
import { Tooltip, TooltipContent, TooltipTrigger } from "../Tooltip"
import { copySvgAsPng, downloadSvgAsPng } from "../../lib/svgToPng"

const isFounderMint = (ev: CrestHistoryEvent) =>
  ev.type === "mint" && ev.to !== auctionHouseAddress[CHAIN_ID]

const AvatarAndAddress: FC<{ address: string; size?: number }> = ({ address, size = 16 }) => {
  const blockExplorerUrl = useBlockExplorerUrl(CHAIN_ID)

  if (address === auctionHouseAddress[CHAIN_ID])
    return (
      <a
        href={`${blockExplorerUrl}/address/${address}`}
        target="_blank"
        className="inline-flex items-center gap-1 hover:text-neutral-300"
      >
        <IconGavel size={size} />
        <span>Auction House</span>
      </a>
    )

  return (
    <a
      href={`${blockExplorerUrl}/address/${address}`}
      target="_blank"
      className="inline-flex items-center gap-1 hover:text-neutral-300"
    >
      <Avatar size={size} address={address} />
      <span>{shortenAddress(address, 4, 4)}</span>
    </a>
  )
}

const CrestHistoryEventView: FC<{ ev: CrestHistoryEvent }> = ({ ev }) => {
  const blockExplorerUrl = useBlockExplorerUrl(CHAIN_ID)

  const dateDisplay = useMemo(() => {
    if (ev.timestamp === "now") return "Just now"
    const date = new Date(Number(ev.timestamp))
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
  }, [ev.timestamp])

  return (
    <div className="py-2 leading-none">
      <div className="flex w-full items-center justify-between text-xs font-light ">
        <div className="grow">{dateDisplay}</div>
        <a
          target="_blank"
          href={
            ev.txHash
              ? `${blockExplorerUrl}/tx/${ev.txHash}`
              : `${blockExplorerUrl}/address/${auctionHouseAddress[CHAIN_ID]}`
          }
          className="inline-flex items-center capitalize hover:text-neutral-300"
        >
          {ev.type}
          <span className="pb-1">
            <IconExternalLink className="inline h-4" />
          </span>
        </a>
      </div>

      {ev.type === "mint" && (
        <div className="flex items-center gap-2">
          <div>{isFounderMint(ev) ? "Founder mint" : "Minted"} for </div>
          <AvatarAndAddress address={ev.to} size={14} />
        </div>
      )}
      {ev.type === "burn" && (
        <div className="flex items-center gap-2">
          <div>Burned by </div>
          <AvatarAndAddress address={ev.from} size={14} />
        </div>
      )}
      {ev.type === "transfer" && (
        <>
          <div className="flex w-full items-center justify-between gap-2">
            <AvatarAndAddress address={ev.from} size={14} />
            <ArrowRightIcon className="h-4 w-4" />
            <AvatarAndAddress address={ev.to} size={14} />
          </div>
        </>
      )}
      {ev.type === "bid" && (
        <>
          <div className="flex w-full items-center justify-between gap-2">
            <AvatarAndAddress address={ev.from} size={14} />
            <div className="text-neutral-300">
              <EthValue wei={ev.value} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

const CrestHistory: FC<{ crest: CrestViewData | null | undefined }> = ({ crest }) => {
  const events = useCrestHistory(crest)

  return (
    <div className="mt-8">
      <div className="flex items-center gap-1 font-semibold text-neutral-300">
        <IconHistory className="inline" size={18} />
        <span className="">History</span>
      </div>
      {events?.map((ev) => (
        <CrestHistoryEventView key={ev.id} ev={ev} />
      ))}
    </div>
  )
}

const CrestImage: FC<{ crest: CrestViewData }> = ({ crest }) => {
  const handleCopyClick = useCallback(() => {
    copySvgAsPng(crest.image)
  }, [crest])

  const handleDownloadClick = useCallback(() => {
    downloadSvgAsPng(crest.image, `crest-${crest.id}.png`)
  }, [crest])

  return (
    <div className="relative text-center">
      <img src={crest.image} alt="" className="aspect-square w-full rounded-xl" />
      <div className="absolute bottom-3 right-3 flex gap-2">
        <Tooltip placement="bottom-end">
          <TooltipTrigger asChild>
            <button type="button" className="hover:text-neutral-300" onClick={handleDownloadClick}>
              <IconDownload />
            </button>
          </TooltipTrigger>
          <TooltipContent>Download</TooltipContent>
        </Tooltip>
        <Tooltip placement="bottom-end">
          <TooltipTrigger asChild>
            <button type="button" className="hover:text-neutral-300" onClick={handleCopyClick}>
              <IconCopy />
            </button>
          </TooltipTrigger>
          <TooltipContent>Copy as PNG</TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}

const CrestDetails: FC<{ tokenId: string }> = ({ tokenId }) => {
  const { data: token, isLoading, error } = useCrestDetailsDrawer(tokenId)

  if (error) return <div className="text-red p-4">{(error as Error).message}</div>

  if (isLoading)
    return (
      <div className="p-4">
        <div className="aspect-square w-full animate-pulse rounded-xl bg-neutral-900"></div>
      </div>
    )

  if (!token)
    return (
      <div className="p-4">
        <div className="aspect-square w-full animate-pulse rounded-xl bg-neutral-900"></div>
        <div className="mt-4">Crest data isn't available yet, please wait.</div>
      </div>
    )

  return (
    <div className="p-4">
      <CrestImage crest={token} />
      <div className="mt-4">
        <div className="space-y-1">
          {token.attributes.map(({ type, value }, i) => (
            <div key={i} className="flex w-full items-center justify-between">
              <div>{type.replace("Quadrant ", "")}</div>
              <div className="rounded bg-neutral-900 px-2 py-1 text-sm text-neutral-500">
                {value}
              </div>
            </div>
          ))}
          <div className="flex w-full items-center justify-between">
            <div>Owned by</div>
            <AvatarAndAddress address={token.owner} />
          </div>
          <div className="flex w-full items-center justify-between">
            <div>Created on</div>
            <div>{new Date(Number(token.timestamp)).toLocaleDateString()}</div>
          </div>
        </div>
      </div>
      <CrestHistory crest={token} />
    </div>
  )
}

export const CrestDetailsDrawer = ({
  tokenId,
  show,
  onDismiss,
}: {
  tokenId: string
  show?: boolean
  onDismiss?: () => void
}) => {
  return (
    <Drawer title={`Crest #${tokenId}`} lightDismiss show={show} onDismiss={onDismiss}>
      <CrestDetails tokenId={tokenId} />
    </Drawer>
  )
}
