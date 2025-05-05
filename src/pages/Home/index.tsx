 
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlertTriangle, ArrowRight, BarChart2, Calendar, CheckCircle, ClipboardList, Clock, Frown, Plus, Settings, Users, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useMaskedNavigation } from "../../hooks/useMaskedNavigation";
import { fetchSchedules } from "../../store/thunks/ScheduleThunks";

export const Home = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const navigate = useMaskedNavigation();

  const [searchTerm,] = useState("");
  const [currentDate, ] = useState(new Date());
  const [appointments, setAppointments] = useState<any[]>([]);

  const goToClientes = () => {
    //onClick={() => navigate('/create-user')}
    navigate('/create-user')
  }

  // 📅 Busca os agendamentos sempre que a data muda
  useEffect(() => {
    const loadSchedules = async () => {
      try {
        const dateStr = currentDate.toISOString().split('T')[0];
        const response = await dispatch(fetchSchedules(dateStr) as any); // Usando dispatch
        console.log("Carregando agendamentos...", response);
        setAppointments(response.payload || []); // Acessa os dados via response.payload
      } catch (error) {
        console.error("Erro ao carregar agendamentos:", error);
        setAppointments([]);
      }
    };
    loadSchedules();
  }, [currentDate, dispatch]); // Adicione dispatch às dependências

  // Filtra os agendamentos por data e termo de busca
  const filteredAppointments = appointments.filter(app => {
    const appointmentDate = new Date(app.date).toISOString().split('T')[0];
    const selectedDate = currentDate.toISOString().split('T')[0];
    return (
      appointmentDate === selectedDate &&
      (app.notes.toLowerCase().includes(searchTerm.toLowerCase()) // Usando "notes" como campo de busca
        // Ou adicione outros campos disponíveis (ex.: app.clientId)
      )
    );
  });

  const pendingCount = filteredAppointments.filter(app => app.status === 'pending').length;
  const confirmedCount = filteredAppointments.filter(app => app.status === 'confirmed').length;

  // Dados fictícios - substitua pelos dados reais da sua aplicação {como adicionar onCLick?}
  const stats = [
    { id: 1, name: 'Agendamentos Hoje', value: filteredAppointments.length, icon: Calendar, change: '+2', changeType: 'positive', onClick: () => navigate('/agendamentos'), iconClass: 'text-orange-400' },
    // { id: 2, name: 'Clientes Ativos', value: '84', icon: Users, change: '+5', changeType: 'positive', onClick: () => navigate('/clientes-ativos'), iconClass: 'text-blue-500' },
    { id: 3, name: 'Confirmados', value: confirmedCount, icon: CheckCircle, change: `+${confirmedCount - 5}`, changeType: 'positive', onClick: () => navigate('/confirmados'), iconClass: 'text-green-500', },
    { id: 4, name: 'Pendentes', value: pendingCount, icon: AlertTriangle, change: '-1', changeType: 'negative', onClick: () => navigate('/pendentes'), iconClass: 'text-yellow-500', },
    { id: 5, name: 'Cancelados', value: '2', icon: XCircle, change: '-1', changeType: 'negative', onClick: () => navigate('/cancelados'), iconClass: 'text-red-500' },
  ];

  // Formata a data para exibição
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bem-vindo de volta!</h1>
          <p className="mt-1 text-sm text-gray-500">Aqui está o que está acontecendo hoje.</p>
        </div>
        {/* <Button success size="xs" color="primary">Teste</Button>
        <Button success size="sm" color="secondary">Teste</Button>
        <Button success className="bg-red-500 hover:bg-red-800">Teste</Button> */}
        <button
          onClick={() => navigate('/agendamentos')}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <Plus className="-ml-1 mr-2 h-5 w-5" />
          Novo Agendamento
        </button>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((item) => (
          <div key={item.id} className="bg-white overflow-hidden shadow rounded-lg cursor-pointer" onClick={item.onClick}>
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <item.icon className={`h-6 w-6 ${item.iconClass}`} aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{item.value}</div>
                    </dd>
                  </dl>
                </div>
              </div>
              <div className={`mt-4 text-sm ${item.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                <span className="font-semibold">{item.change} em relação a ontem</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Próximos Agendamentos */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
            <Clock className="h-5 w-5 text-gray-500 mr-2" />
            Próximos Agendamentos, {formatDate(currentDate)}
          </h3>
        </div>
        {filteredAppointments.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {filteredAppointments.map((appointment) => (
              <div key={appointment.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center">
                        <p className="text-sm font-medium text-gray-900 truncate mr-2">{appointment.clientName}</p>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${appointment.status === 'confirmed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                          }`}>
                          {appointment.status === 'confirmed' ? 'Confirmado' : appointment.status === 'pending' ? 'Pendente' : 'Cancelado'}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <span className="truncate">{appointment.serviceName}</span>
                      </div>
                    </div>
                  </div>
                  <div className="ml-2 flex-shrink-0 flex flex-col items-end">
                    <p className="text-sm font-medium text-gray-900">{appointment.time}</p>
                    <button
                      onClick={() => navigate(`/agendamentos/${appointment.id}`)}
                      className="mt-1 text-sm text-green-600 hover:text-green-900 flex items-center"
                    >
                      Detalhes <ArrowRight className="ml-1 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
      <div className="px-4 py-4 sm:px-6 bg-gray-50 text-right">
        <button
          onClick={() => navigate('/agendamentos')}
          className="text-sm font-medium text-green-600 hover:text-green-500"
        >
          Ver todos os agendamentos →
        </button>
      </div>

      {/* Seção Rápida */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* Clientes Recentes */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
              <Users className="h-5 w-5 text-gray-500 mr-2" />
              Clientes Recentes
            </h3>
          </div>
          <div className="divide-y divide-gray-200">
            {[1, 2, 3].map((i) => (
              <div key={i} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-medium">
                    {['CS', 'AO', 'RS'][i - 1]}
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{['Carlos Silva', 'Ana Oliveira', 'Roberto Santos'][i - 1]}</div>
                    <div className="text-sm text-gray-500">{['carlos@email.com', 'ana@email.com', 'roberto@email.com'][i - 1]}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="px-4 py-4 sm:px-6 bg-gray-50 text-right">
            <button
              onClick={() => navigate('/clientes')}
              className="text-sm font-medium text-green-600 hover:text-green-500"
            >
              Ver todos os clientes →
            </button>
          </div>
        </div>

        {/* Ações Rápidas */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Ações Rápidas</h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <button
                onClick={goToClientes}
                className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
              >
                <div className="flex-shrink-0">
                  <Users className="h-6 w-6 text-green-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900">Novo Cliente</p>
                  <p className="text-sm text-gray-500 truncate">Cadastre um novo cliente</p>
                </div>
              </button>

              <button
                onClick={() => navigate('/servicos')}
                className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
              >
                <div className="flex-shrink-0">
                  <ClipboardList className="h-6 w-6 text-green-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900">Serviços</p>
                  <p className="text-sm text-gray-500 truncate">Gerencie seus serviços</p>
                </div>
              </button>

              <button
                onClick={() => navigate('/relatorios-agendamentos')}
                className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
              >
                <div className="flex-shrink-0">
                  <BarChart2 className="h-6 w-6 text-green-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900">Relatórios</p>
                  <p className="text-sm text-gray-500 truncate">Visualize relatórios</p>
                </div>
              </button>

              <button
                onClick={() => navigate('/teste')}
                className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
              >
                <div className="flex-shrink-0">
                  <Settings className="h-6 w-6 text-green-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900">Configurações</p>
                  <p className="text-sm text-gray-500 truncate">Ajuste as configurações</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};