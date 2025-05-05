/* eslint-disable @typescript-eslint/no-explicit-any */
// src/hooks/useExportData.ts
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export const useExportData = (appointments: any[], formatPeriod: () => string) => {
  const exportToJSON = () => {
    const dataStr = JSON.stringify(appointments, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    saveAs(blob, `agendamentos-${formatPeriod()}.json`);
  };

  const exportToCSV = () => {
    const headers = ["Cliente", "Serviço", "Data", "Hora", "Status"];
    const rows = appointments.map(app => [
      app.clientName,
      app.serviceName,
      new Date(app.date).toLocaleDateString("pt-BR"),
      app.time,
      app.status === "confirmed" ? "Confirmado" : "Cancelado"
    ]);

    let csv = headers.join(",") + "\n";
    rows.forEach(row => {
      csv += row.join(",") + "\n";
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `agendamentos-${formatPeriod()}.csv`);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();

    autoTable(doc, {
      head: [["Cliente", "Serviço", "Data", "Hora", "Status"]],
      body: appointments.map(app => [
        app.clientName,
        app.serviceName,
        new Date(app.date).toLocaleDateString("pt-BR"),
        app.time,
        app.status === "confirmed" ? "Confirmado" : "Cancelado"
      ]),
      startY: 20
    });

    doc.text(`Relatório de Agendamentos - ${formatPeriod()}`, 10, 10);
    doc.save(`agendamentos-${formatPeriod()}.pdf`);
  };

  return { exportToJSON, exportToCSV, exportToPDF };
};
