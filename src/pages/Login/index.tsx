import { Home } from "../Home"

export const Login = () => {
  return (
    <>
      <header className="w-full p-4 bg-green-400 text-white">
        <nav className="flex justify-between">
          <a className="" href="/">Marca</a>
          <ul className="flex gap-6">
            <li className="nav-item"><a className="nav-link" href="/">Sobre</a></li>
            <li className="nav-item"><a className="nav-link" href="/">Produtos</a></li>
            <li className="nav-item"><a className="nav-link" href="/">Contato</a></li>
          </ul>
        </nav>
      </header>

      {/* <section className="container p-4 mx-auto">
        <div className="border border-gray-300 p-4 rounded-md">
          <div className="card-body">
            <h5 className="card-title">Bicicleta</h5>
            <p className="card-text">Bicicleta elétrica - R$ 5.000</p>
            <a className="bg-blue-600 hover:bg-blue-800 text-white py-2 px-4 rounded-md inline-block" href="#">Comprar</a>
          </div>
        </div>
      </section> */}
      <Home />
      <footer className="w-full p-4 bg-gray-800 text-white">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 Marca. Todos os direitos reservados.</p>
        </div>
      </footer>
    </>
  )
}