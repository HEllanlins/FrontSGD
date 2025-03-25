import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="w-full h-screen bg-gray-100">
        <div className="h-1/2 w-full grid grid-cols-2 gap-4 p-4">
          <div className="bg-red-500">
            <h1>Grafico finanças</h1>
            
          </div>
          <div className="bg-green-500">
            <h1>Grafico Serviços</h1>
          </div>
        </div>

        <div className="h-1/2 w-full grid grid-cols-2 gap-4 p-4">
          <div className="bg-red-500">
            <h1>Serviços de Hoje</h1>
          </div>
          <div className="bg-green-500">
            <h1>To-do list</h1>
          </div>
        </div>
      </div>
    </>
  );
}
