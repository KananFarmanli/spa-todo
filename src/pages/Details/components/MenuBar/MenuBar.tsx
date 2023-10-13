import React, { useEffect} from "react";
import cls from "./MenuBar.module.scss";

type MyComponentProps = {
  menuList: string[];
  children: React.ReactNode | string; 
};

type Value = {
    forRender: string;
    width: number;
    height: number;
    left: number;

    
  };
  


export default  React.memo(function  MenuBar(props: MyComponentProps) {
/*   function getMenu(arr: string[]) {
    let obj: { [key: string]: boolean } = {};
    for (let index = 0; index < arr.length; index++) {
      index == 0 ? (obj[arr[index]] = true) : (obj[arr[index]] = false);
    }
    return obj;
  }

  */

  const childrenArray = React.Children.toArray(props.children);




  const [value, setValue] = React.useState<Value>({
    forRender: "",
    width: 0,
    height: 0,
    left: 0,
  });

  const selectItem = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const buttonElement = e.currentTarget;
    const targetWidth = buttonElement.offsetWidth;
    const closestParent = buttonElement.closest("#myDiv"); // Замените 'your-parent-selector' на селектор вашего родительского элемента
    const rectButton = buttonElement.getBoundingClientRect();
    const rectParent = closestParent!.getBoundingClientRect();
    const distanceFromParentStart = rectButton.left - rectParent.left;
    const childrenCount = closestParent!.children.length-1 || 0;
    const id =buttonElement.id



    setValue((prev) => ({
      ...prev,
      forRender:id,
      left: distanceFromParentStart,
      width: targetWidth,
    }));
  };


  useEffect(() => {
    let widthEl = document.querySelector('[data-default="defaultButton"]') as HTMLElement;

    let width = widthEl!.offsetWidth;
    let height = widthEl!.offsetHeight;

    setValue((prev) => ({
      ...prev,
      forRender:props.menuList[0],
      width,
      height,
    }));
  }, []);

  return (
    <div className={cls["menu-container"]}>
      <div className={cls.container}>
        <div className={cls.navbar} id="myDiv">
          <div
            className={cls.background}
            style={{
              width: `${value.width}px`,
              height: `${value.height}px`,
              left: `${value.left}px`,
            }}
          ></div>

          {props.menuList.map((item, index) => {
            return (
              <div
                className={cls.menu}
                data-default={`${index == 0 && "defaultButton"}`}
                id={item}
                key={index}
                onClick={selectItem}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
      <div className={cls.overlay}></div>
      
      <div className={cls.sectionContent}>
      {
         childrenArray.map((el:any,index) => {


           if(value.forRender == el.props.id){
    
           return ( <div className={cls.menuContainer} key={index}>
                {el}
              </div>)
            
           }else{

               return (
                 <div className={`${cls.menuContainer} ${cls["menu-non-active"]} `} key={index}>
                   {el}
                 </div>
               );
           }

          })} 

  
        </div>
    </div>
  );
}
)



