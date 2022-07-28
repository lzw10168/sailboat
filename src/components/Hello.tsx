import * as React from 'react';
import { useState, useEffect, useRef, createContext, useContext } from 'react';
interface IHelloProps {
  msg?: string;
}

const Hello = (props: IHelloProps) => {
  const { msg = 'Hello!' } = props;

  return <div>{msg}</div>;
};
export default Hello;
