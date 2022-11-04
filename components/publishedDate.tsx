import Image from "next/future/image"
import { format, parse } from "date-fns"
import utilStyles from "@/styles/utils.module.css"
type Props = {
  dateStr: string
}

const PublishedDate = ({ dateStr }: Props) => {
  const date = parse(dateStr, "LLLL d, yyyy", new Date())
  const dateString = format(date, "LLLL d, yyyy")
  return (
    <small style={{ display: "flex", alignItems: "center" }} className={utilStyles.lightText}>
      <Image priority src={"/icons/cal.svg"} alt="" height={28} width={28} />
      <time dateTime={dateString}>{dateString}</time>
    </small>
  )
}

export default PublishedDate
