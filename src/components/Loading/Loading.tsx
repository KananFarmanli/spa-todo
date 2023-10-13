import React from 'react'
import cls from "./Loading.module.scss"

type PropsType={
  one?: string,
  two?: string,
  three?: string,
  loader?: string
}

export default function Loading({one, two, three, loader }:PropsType) {
  return (
    <div className={cls.grid}>
          <div className={`${cls.defaultLoader} ${loader}`}>
            <div className={`${cls.inner} ${cls.one} ${one} `}></div>
            <div className={`${cls.inner} ${cls.two} ${two}`}></div>
            <div className={`${cls.inner} ${cls.three} ${three}`}></div>
          </div>
        </div>
  )
}
