/* eslint-disable @typescript-eslint/no-explicit-any */
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

interface ExportOptions {
  fileNamePrefix: string;
  periodLabel: string;
  data: any[];
}

export const useExport = () => {
  const exportToJSON = ({ fileNamePrefix, periodLabel, data }: ExportOptions) => {
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    saveAs(blob, `${fileNamePrefix}-${periodLabel}.json`);
  };

  const exportToCSV = ({ fileNamePrefix, periodLabel, data }: ExportOptions) => {
    const headers = ["Cliente", "Serviço", "Data", "Hora", "Status"];
    const rows = data.map(app => [
      app.clientName,
      app.serviceName,
      new Date(app.date).toLocaleDateString('pt-BR'),
      app.time,
      app.status === 'confirmed' ? 'Confirmado' : 'Cancelado'
    ]);

    let csv = headers.join(",") + "\n";
    rows.forEach(row => csv += row.join(",") + "\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `${fileNamePrefix}-${periodLabel}.csv`);
  };

  const exportToPDF = ({ fileNamePrefix, periodLabel, data }: ExportOptions) => {
    const doc = new jsPDF();

    (doc as any).autoTable({
      head: [["Cliente", "Serviço", "Data", "Hora", "Status"]],
      body: data.map(app => [
        app.clientName,
        app.serviceName,
        new Date(app.date).toLocaleDateString('pt-BR'),
        app.time,
        app.status === 'confirmed' ? 'Confirmado' : 'Cancelado'
      ]),
      startY: 20
    });

    doc.text(`Relatório de Agendamentos - ${periodLabel}`, 10, 10);
    doc.save(`${fileNamePrefix}-${periodLabel}.pdf`);
  };

  return {
    exportToJSON,
    exportToCSV,
    exportToPDF
  };
};