import { Report } from '../types';

export function saveReport(report: Report) {
  localStorage.setItem(report.id, JSON.stringify(report));
}

export function getReport(id: string) {
  const report = localStorage.getItem(id);
  return report ? JSON.parse(report) : null;
}
