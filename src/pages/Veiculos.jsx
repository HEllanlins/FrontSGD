import api from "../services/axios";
import Nav from "../components/Navbar";

export default function Veiculos() {
  
  async function getveiculos(){
    const data = await api.get("/veiculo")
     console.log(data)
  }
  getveiculos()
  return (
    <>
      <Nav />
      <h1>Veiculos</h1>
    </>
  );
}
