import { ReactNode } from "react";
import classes from '../assets/css/HeadingH1.module.css'

type Props = { children: ReactNode }

export default function HeadingH1({children}: Props) {
  return (
    <h1 
      className={`
        p-2 mt-2 
        rounded
        text-white 
        bg-success
        text-center
        ${classes.policeTitle}
      `}
    >
      {children}
    </h1>
  )
}
