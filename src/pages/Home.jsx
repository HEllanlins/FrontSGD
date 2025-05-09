import Navbar from '../components/Navbar';
import GraficoStatusServico from '../components/GraficoStatusServico';
import GraficoMetaMensal from '../components/GraficoMetaMensal';
import ReposicaoEstoque from '../components/ReposicaoEstoque';
import TodoList from '../components/TodoList';

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center">
        <div className="h-1/2 w-full grid grid-cols-2 gap-4 p-4">
          <GraficoStatusServico />
          <GraficoMetaMensal />
        </div>
        <div className="h-1/2 w-full grid grid-cols-2 gap-4 p-4">
          <ReposicaoEstoque />
          <TodoList />
        </div>
      </div>
    </>
  );
}
