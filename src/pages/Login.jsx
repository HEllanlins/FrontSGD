export default function Login() {
  return (
    <div className="bg-blue-200 flex justify-center items-center min-h-screen p-20">
      <div className="w-full max-w-4xl bg-gray-200 mx-10 flex rounded-lg shadow-lg">
        <div className="bg-blue-600 w-1/3 flex flex-col justify-center p-5 rounded-l-lg text-white">
          <h1 className="text-4xl text-center font-bold">SGD</h1>
          <p className="mt-10 text-center text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima voluptatem necessitatibus eum voluptas nemo
            placeat iure accusantium, architecto inventore facere harum earum quo natus.
          </p>
        </div>
        <div className="w-2/3 flex flex-col justify-center p-10 rounded-r-lg">
          <h1 className="text-3xl text-center font-black">Login</h1>
          <form className="flex flex-col items-center w-full mt-6 space-y-5">
            <div className="w-2/3 flex flex-col gap-2">
              <label className="font-medium">Email</label>
              <input className="border-gray-400 border-2 py-2 px-3 rounded-sm w-full" type="text" />
            </div>
            <div className="w-2/3 flex flex-col gap-2">
              <label className="font-medium">Senha</label>
              <input className="border-gray-400 border-2 py-2 px-3 rounded-sm w-full" type="password" />
            </div>
            <button className="w-2/3 bg-blue-600 cursor-pointer text-white py-2 rounded-md hover:bg-blue-700 transition">
              Entrar
            </button>
            <a href="#" className="text-blue-600 text-sm hover:underline">
              Esqueceu a senha?
            </a>
          </form>
        </div>
      </div>
    </div>
  );
}
