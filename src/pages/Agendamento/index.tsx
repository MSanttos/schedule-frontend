import { Calendar, Clock, Search, Plus, Frown, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Agendamentos = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState("");

  // Dados fictícios - substitua pelos dados reais da sua aplicação
  const appointments = [
    {
      id: 1,
      clientName: "Carlos Silva",
      service: "Consulta Médica",
      date: new Date().toISOString().split('T')[0],
      time: "09:00",
      duration: "60 min",
      status: "confirmado",
      clientEmail: "carlos@email.com",
      clientPhone: "(11) 98765-4321"
    },
    {
      id: 2,
      clientName: "Ana Oliveira",
      service: "Massagem Terapêutica",
      date: new Date().toISOString().split('T')[0],
      time: "10:30",
      duration: "45 min",
      status: "confirmado",
      clientEmail: "ana@email.com",
      clientPhone: "(11) 91234-5678"
    },
    {
      id: 3,
      clientName: "Roberto Santos",
      service: "Avaliação Física",
      date: new Date().toISOString().split('T')[0],
      time: "11:15",
      duration: "30 min",
      status: "pendente",
      clientEmail: "roberto@email.com",
      clientPhone: "(11) 92345-6789"
    }
  ];

  // Filtra os agendamentos por data e termo de busca
  const filteredAppointments = appointments.filter(app =>
    app.date === currentDate.toISOString().split('T')[0] &&
    (app.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.service.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Navegação entre dias
  const changeDate = (days: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  };

  // Formata a data para exibição
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Calendar className="h-6 w-6 text-gray-500 mr-2" />
            Agendamentos
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Gerencie todos os agendamentos do seu negócio
          </p>
        </div>
        <button
          onClick={() => navigate('/novo-agendamento')}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <Plus className="-ml-1 mr-2 h-5 w-5" />
          Novo Agendamento
        </button>
      </div>

      {/* Controles de Data e Busca */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center">
            <button
              onClick={() => changeDate(-1)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <ChevronLeft className="h-5 w-5 text-gray-500" />
            </button>
            <div className="mx-4 text-lg font-medium text-gray-900">
              {formatDate(currentDate)}
            </div>
            <button
              onClick={() => changeDate(1)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <ChevronRight className="h-5 w-5 text-gray-500" />
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="ml-2 px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Hoje
            </button>
          </div>

          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              placeholder="Buscar cliente ou serviço..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Lista de Agendamentos */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
            <Clock className="h-5 w-5 text-gray-500 mr-2" />
            Agendamentos do Dia
          </h3>
        </div>

        {filteredAppointments.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {filteredAppointments.map((appointment) => (
              <li key={appointment.id} className="hover:bg-gray-50">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <div className="flex items-center mb-3 sm:mb-0">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-medium">
                        {appointment.clientName.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{appointment.clientName}</div>
                        <div className="text-sm text-gray-500">{appointment.service}</div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:items-end">
                      <div className="flex items-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-3 ${appointment.status === 'confirmado'
                            ? 'bg-green-100 text-green-800'
                            : appointment.status === 'pendente'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                          {appointment.status === 'confirmado' ? 'Confirmado' : appointment.status === 'pendente' ? 'Pendente' : 'Cancelado'}
                        </span>
                        <span className="text-sm font-medium text-gray-900">{appointment.time}</span>
                      </div>
                      <div className="mt-1 text-sm text-gray-500">{appointment.duration}</div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <div className="text-sm text-gray-500 mb-2 sm:mb-0">
                      <span className="block">{appointment.clientEmail}</span>
                      <span className="block">{appointment.clientPhone}</span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => navigate(`/agendamentos/${appointment.id}/editar`)}
                        className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => navigate(`/agendamentos/${appointment.id}`)}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        Detalhes
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="px-4 py-12 text-center">
            <Frown className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum agendamento encontrado</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm
                ? "Nenhum agendamento corresponde à sua busca."
                : "Não há agendamentos para esta data."}
            </p>
            <div className="mt-6">
              <button
                onClick={() => navigate('/novo-agendamento')}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <Plus className="-ml-1 mr-2 h-5 w-5" />
                Novo Agendamento
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};