/* eslint-disable @typescript-eslint/no-explicit-any */
import { Calendar, Clock, User, ChevronDown, X, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ReactNode, useState } from "react";

export const NovoAgendamento = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    clientId: "",
    serviceId: "",
    date: "",
    time: "",
    duration: "30",
    notes: "",
    status: "pending"
  });

  // Dados fictícios - substitua por chamadas à sua API
  const clients = [
    { id: "1", name: "Carlos Silva", email: "carlos@email.com" },
    { id: "2", name: "Ana Oliveira", email: "ana@email.com" },
    { id: "3", name: "Roberto Santos", email: "roberto@email.com" },
  ];

  const services = [
    { id: "1", name: "Consulta Médica", duration: 60, price: 200 },
    { id: "2", name: "Massagem Terapêutica", duration: 45, price: 150 },
    { id: "3", name: "Avaliação Física", duration: 30, price: 100 },
  ];

  const [selectedClient, setSelectedClient] = useState<{ id: string, name: string } | null>(null);
  const [selectedService, setSelectedService] = useState<{
    price: any;
    duration: ReactNode; id: string, name: string 
} | null>(null);
  const [showClientDropdown, setShowClientDropdown] = useState(false);
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const handleClientSelect = (client: { id: string, name: string }) => {
    setSelectedClient(client);
    setFormData(prev => ({
      ...prev,
      clientId: client.id
    }));
    setShowClientDropdown(false);
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.clientId;
      return newErrors;
    });
  };

  const handleServiceSelect = (service: {
    price: any;
    duration: any; id: string, name: string 
}) => {
    setSelectedService(service);
    setFormData(prev => ({
      ...prev,
      serviceId: service.id,
      duration: service.duration.toString(),
      price: service.price.toString()
      
    }));
    setShowServiceDropdown(false);
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.serviceId;
      return newErrors;
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.clientId) newErrors.clientId = "Selecione um cliente";
    if (!formData.serviceId) newErrors.serviceId = "Selecione um serviço";
    if (!formData.date) newErrors.date = "Informe a data";
    if (!formData.time) newErrors.time = "Informe o horário";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Aqui você faria a chamada à API para criar o agendamento
      console.log("Dados do agendamento:", formData);

      // Simulando sucesso no cadastro
      alert("Agendamento criado com sucesso!");
      navigate("/agendamentos");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <Calendar className="h-6 w-6 text-gray-500 mr-2" />
          Novo Agendamento
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
                  <button
                    type="button"
                    onClick={() => setShowClientDropdown(!showClientDropdown)}
                    className={`relative w-full bg-white border ${errors.clientId ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 ${errors.clientId ? 'focus:ring-red-500 focus:border-red-500' : 'focus:ring-green-500 focus:border-green-500'} sm:text-sm`}
                  >
                    <span className="block truncate">
                      {selectedClient ? selectedClient.name : "Selecione um cliente"}
                    </span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    </span>
                  </button>

                  {showClientDropdown && (
                    <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                      {clients.map((client) => (
                        <div
                          key={client.id}
                          className="cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
                          onClick={() => handleClientSelect(client)}
                        >
                          <div className="flex items-center">
                            <span className="font-normal block truncate">
                              {client.name}
                            </span>
                          </div>
                          {selectedClient?.id === client.id && (
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

                  {errors.clientId && (
                    <p className="mt-2 text-sm text-red-600">{errors.clientId}</p>
                  )}
                </div>

                {selectedClient && (
                  <div className="mt-2 flex items-center">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedClient(null);
                        setFormData(prev => ({ ...prev, clientId: "" }));
                      }}
                      className="text-red-600 hover:text-red-900"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <span className="ml-2 text-sm text-gray-500">{clients.find(c => c.id === selectedClient.id)?.email}</span>
                  </div>
                )}
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

                  {showServiceDropdown && (
                    <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                      {services.map((service) => (
                        <div
                          key={service.id}
                          className="cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
                          onClick={() => handleServiceSelect(service)}
                        >
                          <div className="flex items-center">
                            <span className="font-normal block truncate">
                              {service.name} ({service.duration} min)
                            </span>
                          </div>
                          {selectedService?.id === service.id && (
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

              <div className="mt-4">
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                  Duração (minutos)
                </label>
                <select
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                >
                  <option value="15">15 minutos</option>
                  <option value="30">30 minutos</option>
                  <option value="45">45 minutos</option>
                  <option value="60">60 minutos</option>
                  <option value="90">90 minutos</option>
                  <option value="120">120 minutos</option>
                </select>
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

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <Save className="-ml-1 mr-2 h-5 w-5" />
              Salvar Agendamento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};