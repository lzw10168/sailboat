interface IHelloProps {
  msg?: string;
}
const Hello = (props: IHelloProps) => {
  const { msg = 'Hello!' } = props;
  return (<div>{msg}</div>);
}
export default Hello
