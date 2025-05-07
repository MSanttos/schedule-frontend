/* eslint-disable @typescript-eslint/no-explicit-any */
import { Calendar, ChevronDown, Clock, Save, User, X } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store/store";
// import { fetchUserAccounts } from "../../store/thunks/AccountThunks";
import { useParams } from "react-router-dom";
import { fetchSchedulesById } from "../../store/thunks/ScheduleThunks";

interface ScheduleData {
  id: string;
  clientId: string;
  clientName: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  duration: string;
  notes: string;
  status: string;
  price: number;
  createdAt: string;
  updatedAt: string | null;
  createdBy: string;
  updatedBy: string | null;
}

export const AtualizarAgendamento = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    clientName: '',
    serviceName: '',
    date: '',
    time: '',
    duration: '',
    notes: '',
    price: 0,
    status: ''
  });

  console.log('FORMDATA: ', formData)

  // Dados fictícios - substitua por chamadas à sua API
  // const { list: clients, loading } = useSelector((state: RootState) => state.userAccounts);


  const services = [
    { id: "312886b1-9522-4b25-90fc-12b52774a977", name: "Consulta Médica", duration: 60, price: 200 },
    { id: "312886b1-9522-4b25-90fc-12b52774a978", name: "Massagem Terapêutica", duration: 45, price: 150 },
    { id: "312886b1-9522-4b25-90fc-12b52774a979", name: "Avaliação Física", duration: 30, price: 100 },
  ];

  // const [selectedClient, setSelectedClient] = useState<{ id: string, name: string } | null>(null);
  const [selectedService, setSelectedService] = useState<{
    price: any;
    duration: ReactNode; id: string, name: string
  } | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<{
    id: string;
    value: string;
    label: string;
    name: string;
  } | null>(null);
  // const [showClientDropdown, setShowClientDropdown] = useState(false);
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();

  //status agendamento
  const statusOptions = [
    { id: "pending", value: "pending", label: "Pendente", name: "Pendente" },
    { id: "confirmed", value: "confirmed", label: "Confirmado", name: "Confirmado" },
    { id: "canceled", value: "canceled", label: "Cancelado", name: "Cancelado" },
  ];

  const handleStatusSelect = (status: { id: string, value: string, label: string }) => {
      setSelectedStatus({ ...status, name: status.label }); // Add the 'name' property
      setFormData(prev => ({
        ...prev,
        status: status.value
      }));
      setShowStatusDropdown(false);
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.status;
        return newErrors;
      });
    };

  // const { list: users, loading, error } = useSelector((state: RootState) => state.userAccounts);

  useEffect(() => {
    console.log("Fetching Schedule...");
    if (id) {
      dispatch(fetchSchedulesById(id))
        .unwrap()
        .then((data: ScheduleData) => {
          // Preenche o formData com os dados recebidos
          setFormData({
            clientName: data.clientName,
            serviceName: data.serviceName,
            date: data.date,
            time: data.time,
            duration: data.duration,
            notes: data.notes,
            price: data.price,
            status: data.status
          });

          // Define o serviço selecionado
          const service = services.find(s => s.id === data.serviceId);
          if (service) {
            setSelectedService(service);
          }

          // Define o status selecionado
          const status = statusOptions.find(s => s.value === data.status);
          if (status) {
            setSelectedStatus(status);
          }
        })
        .catch(error => {
          console.error("Error fetching schedule:", error);
        });
    } else {
      console.error("ID is undefined");
    }
  }, [dispatch, id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpa erro quando o usuário começa a digitar
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    // Atualiza duração quando o serviço é selecionado
    if (name === "serviceId") {
      const service = services.find(s => s.id === value);
      if (service) {
        setSelectedService(service);
        setFormData(prev => ({
          ...prev,
          duration: service.duration.toString()
        }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('foi')
  };


  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <Calendar className="h-6 w-6 text-gray-500 mr-2" />
          Atualizar Agendamento
        </h1>
        <button
          onClick={() => navigate("/agendamentos")}
          className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Cancelar
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
          <div className="space-y-6">
            {/* Seção Cliente */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <User className="h-5 w-5 text-gray-500 mr-2" />
                Informações do Cliente
              </h3>

              <div className="mt-4">
                <label htmlFor="clientId" className="block text-sm font-medium text-gray-700 mb-1">
                  Cliente *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    readOnly
                    value={formData.clientName || "Nenhum cliente selecionado"}
                    className="w-full bg-gray-100 text-gray-700 border border-gray-300 rounded-md px-3 py-2 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Seção Serviço */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <Clock className="h-5 w-5 text-gray-500 mr-2" />
                Detalhes do Serviço
              </h3>

              <div className="mt-4">
                <label htmlFor="serviceId" className="block text-sm font-medium text-gray-700 mb-1">
                  Serviço *
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowServiceDropdown(!showServiceDropdown)}
                    className={`relative w-full bg-white border ${errors.serviceId ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 ${errors.serviceId ? 'focus:ring-red-500 focus:border-red-500' : 'focus:ring-green-500 focus:border-green-500'} sm:text-sm`}
                  >
                    <span className="block truncate">
                      {selectedService ? selectedService.name : "Selecione um serviço"}
                    </span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    </span>
                  </button>

                  {errors.serviceId && (
                    <p className="mt-2 text-sm text-red-600">{errors.serviceId}</p>
                  )}
                </div>

                {selectedService && (
                  <div className="mt-2 flex items-center">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedService(null);
                        setFormData(prev => ({ ...prev, serviceId: "", duration: "30" }));
                      }}
                      className="text-red-600 hover:text-red-900"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <span className="ml-2 text-sm text-gray-500">
                      Duração: {selectedService.duration} min • Preço: R$ {selectedService.price.toFixed(2)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Seção Data/Horário */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-medium text-gray-900">Data e Horário</h3>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                    Data *
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className={`block w-full rounded-md ${errors.date ? 'border-red-300' : 'border-gray-300'} shadow-sm focus:${errors.date ? 'ring-red-500 focus:border-red-500' : 'ring-green-500 focus:border-green-500'} sm:text-sm`}
                    min={new Date().toISOString().split("T")[0]}
                  />
                  {errors.date && (
                    <p className="mt-2 text-sm text-red-600">{errors.date}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                    Horário *
                  </label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className={`block w-full rounded-md ${errors.time ? 'border-red-300' : 'border-gray-300'} shadow-sm focus:${errors.time ? 'ring-red-500 focus:border-red-500' : 'ring-green-500 focus:border-green-500'} sm:text-sm`}
                    step="900" // Intervalos de 15 minutos
                  />
                  {errors.time && (
                    <p className="mt-2 text-sm text-red-600">{errors.time}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Seção Observações */}
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                Observações
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                value={formData.notes}
                onChange={handleChange}
                className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Informações adicionais sobre o agendamento..."
              />
            </div>
          </div>

          <div className="mt-4">
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <Clock className="h-5 w-5 text-gray-500 mr-2" />
              Confirmar Agendamento
            </h3>

            <div className="mt-4">
              <label htmlFor="serviceId" className="block text-sm font-medium text-gray-700 mb-1">
                Confirmar Status *
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                  className={`relative w-full bg-white border ${errors.serviceId ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 ${errors.serviceId ? 'focus:ring-red-500 focus:border-red-500' : 'focus:ring-green-500 focus:border-green-500'} sm:text-sm`}
                >
                  <span className="block truncate">
                      {selectedStatus ? statusOptions.find(option => option.value === formData.status)?.label : "Selecione um status"}
                  </span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  </span>
                </button>

                {showStatusDropdown && (
                  <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                      {statusOptions.map((statusOptionsSchedule) => (
                      <div
                          key={statusOptionsSchedule.id}
                        className="cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
                          onClick={() => handleStatusSelect(statusOptionsSchedule)}
                      >
                        <div className="flex items-center">
                          <span className="font-normal block truncate">
                              {statusOptionsSchedule.name}
                          </span>
                        </div>
                          {statusOptionsSchedule?.id === statusOptionsSchedule.id && (
                          <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                            <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {errors.serviceId && (
                  <p className="mt-2 text-sm text-red-600">{errors.serviceId}</p>
                )}
              </div>
            </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <Save className="-ml-1 mr-2 h-5 w-5" />
              Confirmar Agendamento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};