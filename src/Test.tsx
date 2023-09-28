import React from 'react'

type Color="red"|"green"|"yellow"|"black"|"white"

type TestProps = {
  backgroundColor: Color;
  textColor?: Color;
  fontSize: number;
  pillShape?: boolean;
  padding:number[];
  margin:[number, number]
}

export default function Test(
  {backgroundColor, fontSize, pillShape , padding}: TestProps) {

  
  return (
    <button style={{
      backgroundColor: backgroundColor,
      fontSize: fontSize,
      padding:`${padding[0]}px ${padding[1]}px ${padding[2]}px ${padding[3]}px`,
      
    
    }}>Test</button>
  )
}

