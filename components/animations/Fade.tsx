import Reveal, { type RevealProps } from "./Reveal"

export default function Fade(props: RevealProps) {
  return <Reveal direction="none" {...props} />
}
