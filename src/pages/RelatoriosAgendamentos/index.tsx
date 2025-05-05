 /* eslint-disable @typescript-eslint/no-explicit-any */
import "jspdf-autotable";
import { ChevronLeft, ChevronRight, Download, FileText, Frown, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useExportData } from "../../hooks/useExportData";
import { fetchSchedules } from "../../store/thunks/ScheduleThunks";

export const RelatoriosAgendamentos = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [periodo, setPeriodo] = useState<string>("dia"); // 'dia', 'semana', 'mes', 'ano', 'personalizado'
  const [isOpenModal, setIsOpenModal] = useState(false);

  const dispatch = useDispatch();
  const toggleDropdown = () => setIsOpenModal(prev => !prev);
  const { exportToJSON, exportToCSV, exportToPDF } = useExportData(appointments, () => periodo);

  useEffect(() => {
    const loadSchedules = async () => {
      setLoading(true);
      try {
        // 1. Ajusta as datas de início e fim conforme o período selecionado
        const dateStart = new Date(startDate);
        let dateEnd = new Date(endDate);

        // Define o final do período automaticamente
        if (periodo === "dia") {
          dateEnd = new Date(dateStart);
        } else if (periodo === "semana") {
          dateEnd = new Date(dateStart);
          dateEnd.setDate(dateStart.getDate() + 6);
        } else if (periodo === "mes") {
          dateEnd = new Date(dateStart.getFullYear(), dateStart.getMonth() + 1, 0);
        } else if (periodo === "ano") {
          dateEnd = new Date(dateStart.getFullYear(), 11, 31);
        }

        // 2. Gera todas as datas entre o período
        const datesInRange = getDatesBetween(dateStart, dateEnd);

        // 3. Para cada data, faz uma requisição individual
        const allAppointments = [];
        for (const date of datesInRange) {
          const dateStr = date.toISOString().split('T')[0];
          const response = await dispatch(fetchSchedules(dateStr) as any);

          // Filtra os agendamentos que realmente pertencem à data específica
          const filteredForDate = (response.payload || []).filter((app: any) => {
            const appDate = new Date(app.date).toISOString().split('T')[0];
            return appDate === dateStr;
          });

          allAppointments.push(...filteredForDate);
        }

        // 4. Atualiza o estado com os agendamentos filtrados
        setAppointments(allAppointments);

      } catch (error) {
        console.error("Erro ao carregar relatórios:", error);
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    loadSchedules();
  }, [startDate, endDate, periodo, dispatch]);

  // Função auxiliar para gerar um array de datas entre dois pontos
  function getDatesBetween(startDate: Date, endDate: Date): Date[] {
    const dates = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  }

  // Filtra os agendamentos por termo de busca
  const filteredAppointments = appointments.filter(app =>
    app.clientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.serviceName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Navegação entre períodos
  const changePeriod = (direction: number) => {
    const newStartDate = new Date(startDate);
    const newEndDate = new Date(endDate);

    if (periodo === "dia") {
      newStartDate.setDate(newStartDate.getDate() + direction);
      newEndDate.setDate(newEndDate.getDate() + direction);
    } else if (periodo === "semana") {
      newStartDate.setDate(newStartDate.getDate() + (7 * direction));
      newEndDate.setDate(newEndDate.getDate() + (7 * direction));
    } else if (periodo === "mes") {
      newStartDate.setMonth(newStartDate.getMonth() + direction);
      newEndDate.setMonth(newEndDate.getMonth() + direction);
    } else if (periodo === "ano") {
      newStartDate.setFullYear(newStartDate.getFullYear() + direction);
      newEndDate.setFullYear(newEndDate.getFullYear() + direction);
    }

    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  // Formata o período para exibição
  const formatPeriod = () => {
    if (periodo === "dia") {
      return startDate.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
    } else if (periodo === "semana") {
      return `${startDate.toLocaleDateString('pt-BR')} a ${endDate.toLocaleDateString('pt-BR')}`;
    } else if (periodo === "mes") {
      return startDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
    } else if (periodo === "ano") {
      return startDate.toLocaleDateString('pt-BR', { year: 'numeric' });
    }
    return `${startDate.toLocaleDateString('pt-BR')} a ${endDate.toLocaleDateString('pt-BR')}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <FileText className="h-6 w-6 text-gray-500 mr-2" />
            Relatórios de Agendamentos
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Exporte agendamentos por período personalizado
          </p>
        </div>
      </div>

      {/* Controles de Período e Busca */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            {/* Seletor de Período */}
            <select
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value)}
              className="block w-max pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
            >
              <option value="dia">Dia</option>
              <option value="semana">Semana</option>
              <option value="mes">Mês</option>
              <option value="ano">Ano</option>
              <option value="personalizado">Personalizado</option>
            </select>

            {/* Navegação */}
            <div className="flex items-center">
              <button
                onClick={() => changePeriod(-1)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <ChevronLeft className="h-5 w-5 text-gray-500" />
              </button>
              <div className="mx-4 text-lg font-medium text-gray-900">
                {formatPeriod()}
              </div>
              <button
                onClick={() => changePeriod(1)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <ChevronRight className="h-5 w-5 text-gray-500" />
              </button>
              <button
                onClick={() => {
                  setStartDate(new Date());
                  setEndDate(new Date());
                }}
                className="ml-2 px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Hoje
              </button>
            </div>
          </div>

          {/* Busca e Exportação */}
          <div className="flex gap-2">
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

            {/* Dropdown de Exportação */}
            <div className="relative inline-block text-left">
              <button
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                id="export-menu"
                aria-expanded="true"
                aria-haspopup="true"
                onClick={toggleDropdown}
              >
                <Download className="h-5 w-5 text-gray-500 mr-2" />
                Exportar
              </button>
              {isOpenModal && (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="export-menu"
                >
                  <div className="py-1" role="none">
                    <button
                      onClick={() => {
                        exportToPDF();
                        setIsOpenModal(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      PDF
                    </button>
                    <button
                      onClick={() => {
                        exportToCSV();
                        setIsOpenModal(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      CSV
                    </button>
                    <button
                      onClick={() => {
                        exportToJSON();
                        setIsOpenModal(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      JSON
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Agendamentos */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {filteredAppointments.length} agendamentos encontrados
          </h3>
        </div>

        {loading ? (
          <div className="px-4 py-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
            <p className="mt-4 text-sm text-gray-500">Carregando agendamentos...</p>
          </div>
        ) : filteredAppointments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Serviço
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data/Hora
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAppointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-medium">
                          {appointment.clientName?.charAt(0) || '?'}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{appointment.clientName}</div>
                          <div className="text-sm text-gray-500">{appointment.clientPhone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{appointment.serviceName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(appointment.date).toLocaleDateString('pt-BR')} às {appointment.time}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${appointment.status === 'confirmed'
                        ? 'bg-green-100 text-green-800'
                        : appointment.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                        }`}>
                        {appointment.status === 'confirmed' ? 'Confirmado' : appointment.status === 'pending' ? 'Pendente' : 'Cancelado'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="px-4 py-12 text-center">
            <Frown className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum agendamento encontrado</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm
                ? "Nenhum agendamento corresponde à sua busca."
                : "Não há agendamentos para este período."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};