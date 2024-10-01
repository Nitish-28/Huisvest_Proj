import Header from "../components/Header";
import { useParams } from 'react-router-dom';

export default function Login() {

const { id } = useParams()

  return (
    <>
      <Header></Header>
      <div>{id}</div>
    </>
  );
}
