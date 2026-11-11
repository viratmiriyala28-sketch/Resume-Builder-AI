'use client';

import React from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { BadgeCheck, Plus, Trash2 } from 'lucide-react';
import { generateId } from '@/lib/utils';

export default function CertificationsForm() {
  const { resume, addCertificationItem, updateCertificationItem, removeCertificationItem } = useResumeStore();
  const certifications = resume.certifications;

  const handleAddNew = () => {
    addCertificationItem({
      id: generateId('cert'),
      name: '',
      issuer: '',
      issueDate: '',
      credentialUrl: '',
    });
  };

  return (
    <div className="space-y-4">
      <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <BadgeCheck className="w-4 h-4 text-indigo-600" />
            <span>Certifications & Credentials</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Industry certifications, vendor qualifications, or professional course accreditations.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddNew}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Certification</span>
        </button>
      </div>

      {certifications.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl">
          <BadgeCheck className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-xs font-medium text-slate-500">No certifications added yet.</p>
          <button
            type="button"
            onClick={handleAddNew}
            className="mt-3 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
          >
            + Add Certification
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {certifications.map((cert, idx) => (
            <div
              key={cert.id}
              className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm relative space-y-3"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Certification #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeCertificationItem(cert.id)}
                  className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                  title="Delete Entry"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Certification Name *
                  </label>
                  <input
                    type="text"
                    value={cert.name}
                    onChange={(e) => updateCertificationItem(cert.id, { name: e.target.value })}
                    placeholder="e.g., AWS Certified Cloud Practitioner"
                    className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-lg py-2 px-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Issuing Organization *
                  </label>
                  <input
                    type="text"
                    value={cert.issuer}
                    onChange={(e) => updateCertificationItem(cert.id, { issuer: e.target.value })}
                    placeholder="e.g., Amazon Web Services / Meta"
                    className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-lg py-2 px-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Issue Date</label>
                  <input
                    type="text"
                    value={cert.issueDate}
                    onChange={(e) => updateCertificationItem(cert.id, { issueDate: e.target.value })}
                    placeholder="e.g., Jan 2025"
                    className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-lg py-2 px-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Credential URL</label>
                  <input
                    type="text"
                    value={cert.credentialUrl || ''}
                    onChange={(e) => updateCertificationItem(cert.id, { credentialUrl: e.target.value })}
                    placeholder="e.g., https://aws.amazon.com/verify"
                    className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-lg py-2 px-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
