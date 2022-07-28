import * as React from 'react';
import { useState, useEffect, useRef, createContext, useContext } from 'react';
import { ThemeContext } from '../App';
interface IHelloProps {
  msg?: string;
}


const Hello = (props: IHelloProps) => {
  const { msg = 'Hello!' } = props;
  const theme = useContext(ThemeContext);
  const style = {
    color: theme.color,
    backgroundColor: theme.backgroundColor,
  }
  return (<div style={style}>{msg}</div>);
}
export default Hello
