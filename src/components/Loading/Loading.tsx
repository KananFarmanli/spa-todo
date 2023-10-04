import React from 'react'
import cls from "./Loading.module.scss"

export default function Loading() {
  return (
    <div className={cls.grid}>
          <div className={cls.loader}>
            <div className={`${cls.inner} ${cls.one}`}></div>
            <div className={`${cls.inner} ${cls.two}`}></div>
            <div className={`${cls.inner} ${cls.three}`}></div>
          </div>
        </div>
  )
}
