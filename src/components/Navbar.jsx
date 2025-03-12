import { IoIosHome } from "react-icons/io";
import { FaScrewdriverWrench } from "react-icons/fa6";
import { MdAttachMoney } from "react-icons/md";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaWarehouse } from "react-icons/fa";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { FaHelmetSafety } from "react-icons/fa6";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 p-8 shadow-lg">
      <div className="flex items-center justify-between">
        <a href="/" className="text-white text-xl font-bold">
          SGD
        </a>

        <div className="md:flex space-x-6">
          <div className="flex items-center text-xl font-bold">
            <IoIosHome className="text-white" />
            <a href="/" className="text-white hover:text-gray-300">
              Home
            </a>
          </div>
          <div className="flex items-center gap-2 text-xl font-bold">
            <FaScrewdriverWrench className="text-white" />
            <a href="/chamados" className="text-white hover:text-gray-300">
              Chamados
            </a>
          </div>
          <div className="flex items-center gap-2 text-xl font-bold">
            <HiMiniUserGroup className="text-white" />
            <a href="/clientes" className="text-white hover:text-gray-300">
              Clientes
            </a>
          </div>
          <div className="flex items-center gap-2 text-xl font-bold">
            <FaWarehouse className="text-white" />
            <a href="/estoque" className="text-white hover:text-gray-300">
              Estoque
            </a>
          </div>
          <div className="flex items-center gap-2 text-xl font-bold">
            <MdAttachMoney className="text-white" />
            <a href="/financeiro" className="text-white hover:text-gray-300">
              Financeiro
            </a>
          </div>
          <div className="gap-2 text-xl font-bold relative">
            <div className="flex items-center gap-2 text-xl">
              <FaHelmetSafety className="text-white" />
              <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-gray-300">
                Operacional
              </button>
              {isOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}
            </div>
            {isOpen && (
              <div className="absolute mt-6 w-fit bg-blue-600 rounded-lg shadow-lg p-2">
                <ul>
                  <li>
                    <a href="/veiculos" className="text-white hover:text-gray-300">
                      Veiculos
                    </a>
                  </li>
                  <li>
                    <a href="/funcionarios" className="text-white hover:text-gray-300">
                      Funcionarios
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
