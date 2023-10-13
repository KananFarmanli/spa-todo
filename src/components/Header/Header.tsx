
import Loading from '../Loading/Loading'
import cls from "./Header.module.scss"
import logo from "../../assets/otod.png"




export default function Header() {
  return (
   
    <div className={cls.container}>
        <div className={cls.logo}> <img src={logo}/></div>
        <div> <Loading one={cls.one} two={cls.two} three={cls.three} loader={cls.loader}/> </div>

    </div>
  )
}
