import React, { ReactNode } from 'react'
interface ButtonProps{
   children:ReactNode,
   className:string,
   onClick?:()=>void;
   type?:'button'|'submit'|'reset';
}
const Button = ({children,onClick,className="",...rest}:ButtonProps) => {
  return (
    <div onClick={onClick} className={`px-3 py-1 cursor-pointer light:text-black ${className}`}>{children}</div>
  )
}

export default Button