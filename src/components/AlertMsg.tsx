import { ReactNode } from "react"
import { Alert } from "react-bootstrap"

type Props = {
  variant: string,
  children: ReactNode
}

export default function AlertMsg({variant, children}: Props) {
  return (
    <Alert variant={variant}>{children}</Alert>
  )
}
