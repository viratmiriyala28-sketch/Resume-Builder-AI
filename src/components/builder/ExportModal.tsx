'use client';

import React, { useState } from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { Download, Printer, FileJson, Upload, X, Loader2, CheckCircle2 } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExportModal({ isOpen, onClose }: ExportModalProps) {
  const { resume, setResume } = useResumeStore();
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  // Option 1: Browser Native Print (100% vector selectable text)
  const handlePrintPdf = () => {
    window.print();
  };

  // Option 2: Direct one-click PDF export via html2canvas & jspdf
  const handleDirectPdfDownload = async () => {
    const docElement = document.getElementById('printable-resume-document');
    if (!docElement) return;

    setIsGeneratingPdf(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');

      const canvas = await html2canvas(docElement, {
        scale: 2, // High resolution
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'letter',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      const fileName = `${resume.personalInfo.fullName.replace(/\s+/g, '_') || 'Resume'}_Resume.pdf`;
      pdf.save(fileName);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('PDF generation error:', err);
      // Fallback to native print if canvas fails
      window.print();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // Option 3: Export raw JSON for backups
  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(resume, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${resume.personalInfo.fullName || 'resume'}-backup.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Option 4: Import JSON
  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.personalInfo && parsed.metadata) {
          setResume(parsed);
          onClose();
        } else {
          alert('Invalid resume JSON format.');
        }
      } catch (err) {
        alert('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <Download className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base font-bold text-slate-900">
              Download & Export Resume
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-600">
          Choose your preferred download method. Both options generate ATS-compliant formatting.
        </p>

        <div className="space-y-3">
          {/* Direct PDF Download */}
          <button
            type="button"
            onClick={handleDirectPdfDownload}
            disabled={isGeneratingPdf}
            className="w-full flex items-center justify-between p-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md shadow-indigo-600/20 transition-all text-left"
          >
            <div className="flex items-center gap-3">
              <Download className="w-5 h-5" />
              <div>
                <span className="text-xs font-bold block">Direct Download PDF</span>
                <span className="text-[11px] opacity-90 block">Downloads a high-res PDF file directly to your device</span>
              </div>
            </div>
            {isGeneratingPdf && <Loader2 className="w-4 h-4 animate-spin" />}
          </button>

          {/* Browser Print PDF */}
          <button
            type="button"
            onClick={handlePrintPdf}
            className="w-full flex items-center justify-between p-3.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all text-left"
          >
            <div className="flex items-center gap-3">
              <Printer className="w-5 h-5 text-slate-600" />
              <div>
                <span className="text-xs font-bold text-slate-900 block">Print / Save as PDF (Vector ATS)</span>
                <span className="text-[11px] text-slate-500 block">Uses system print engine for 100% selectable vector text</span>
              </div>
            </div>
          </button>

          {/* Backup / Restore Strip */}
          <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleExportJson}
              className="flex items-center justify-center gap-1.5 p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
            >
              <FileJson className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>

            <label className="flex items-center justify-center gap-1.5 p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer transition-colors">
              <Upload className="w-3.5 h-3.5" />
              <span>Import JSON</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportJson}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {downloadSuccess && (
          <div className="flex items-center gap-2 p-2.5 bg-emerald-50 text-emerald-800 text-xs rounded-lg border border-emerald-200 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>PDF downloaded successfully!</span>
          </div>
        )}
      </div>
    </div>
  );
}
