import { Calendar, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-800 text-white border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sobre */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-green-400" />
              AgendaPlus
            </h3>
            <p className="text-gray-300 text-sm">
              O sistema de agendamentos mais completo para o seu negócio.
            </p>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-green-400" />
                contato@agendaplus.com
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-green-400" />
                (11) 1234-5678
              </li>
              <li className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-green-400" />
                São Paulo, SP
              </li>
            </ul>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="/sobre" className="hover:text-green-400 transition-colors">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="/termos" className="hover:text-green-400 transition-colors">
                  Termos de Serviço
                </a>
              </li>
              <li>
                <a href="/privacidade" className="hover:text-green-400 transition-colors">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="/suporte" className="hover:text-green-400 transition-colors">
                  Suporte
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Direitos Autorais */}
        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>
            &copy; {currentYear} AgendaPlus. Todos os direitos reservados.
          </p>
          <p className="mt-1">
            Desenvolvido com ❤️ por sua equipe
          </p>
        </div>
      </div>
    </footer>
  );
};