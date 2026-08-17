import React, { useState } from 'react';
import { ShieldCheck, X, FileText, CheckCircle, Smartphone } from 'lucide-react';

interface KycModalProps {
  onClose: () => void;
  onSubmitKyc: (data: {
    fullName: string;
    docType: 'BI' | 'Passaporte' | 'DIRE';
    docNumber: string;
    nuit: string;
    phone: string;
    payoutMethod: string;
  }) => void;
}

export const KycModal: React.FC<KycModalProps> = ({ onClose, onSubmitKyc }) => {
  const [fullName, setFullName] = useState('Nádia Silva');
  const [docType, setDocType] = useState<'BI' | 'Passaporte' | 'DIRE'>('BI');
  const [docNumber, setDocNumber] = useState('110100452319A');
  const [nuit, setNuit] = useState('149823091');
  const [phone, setPhone] = useState('841234567');
  const [payoutMethod, setPayoutMethod] = useState('mpesa');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      onSubmitKyc({
        fullName,
        docType,
        docNumber,
        nuit,
        phone,
        payoutMethod
      });
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
      <div 
        className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl border border-pink-100 space-y-5 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-pink-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink-100 text-pink-600">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-stone-900">
                Verificação de Criador FanScale (KYC)
              </h3>
              <p className="text-[11px] text-stone-400">
                Conformidade com a legislação de Moçambique 🇲🇿
              </p>
            </div>
          </div>

          <button onClick={onClose} className="text-stone-400 hover:text-stone-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 mx-auto">
              <CheckCircle className="h-8 w-8" />
            </div>
            <h4 className="font-display text-base font-bold text-stone-900">
              Documentos Submetidos com Sucesso!
            </h4>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              A equipa de conformidade do FanScale Moçambique irá rever os teus dados em até 24 horas.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs text-stone-800">
            
            <div className="rounded-2xl bg-pink-50 p-3.5 text-stone-700 space-y-1">
              <span className="font-bold text-pink-900 block">Porque é necessária a verificação?</span>
              <p className="text-[11px] text-stone-600">
                Para desbloquear recebimentos M-Pesa e garantir uma comunidade segura para todos os utilizadores moçambicanos.
              </p>
            </div>

            <div className="space-y-1">
              <label className="block font-bold text-stone-700">Nome Completo (como no Documento)</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-2xl border border-stone-200 bg-stone-50 p-2.5 font-semibold text-stone-900 focus:border-pink-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block font-bold text-stone-700">Tipo de Documento</label>
                <select
                  value={docType}
                  onChange={(e) => setDocType(e.target.value as any)}
                  className="w-full rounded-2xl border border-stone-200 bg-stone-50 p-2.5 font-semibold text-stone-900 focus:border-pink-500 focus:outline-none"
                >
                  <option value="BI">Bilhete de Identidade (B.I.)</option>
                  <option value="Passaporte">Passaporte Moçambicano</option>
                  <option value="DIRE">DIRE</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-stone-700">Número do Documento</label>
                <input
                  type="text"
                  required
                  value={docNumber}
                  onChange={(e) => setDocNumber(e.target.value)}
                  placeholder="Ex: 110100452319A"
                  className="w-full rounded-2xl border border-stone-200 bg-stone-50 p-2.5 font-semibold text-stone-900 focus:border-pink-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block font-bold text-stone-700">NUÍT (Moçambique)</label>
                <input
                  type="text"
                  required
                  value={nuit}
                  onChange={(e) => setNuit(e.target.value)}
                  placeholder="9 dígitos"
                  className="w-full rounded-2xl border border-stone-200 bg-stone-50 p-2.5 font-semibold text-stone-900 focus:border-pink-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-stone-700">Telemóvel M-Pesa / e-Mola</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="84 / 86..."
                  className="w-full rounded-2xl border border-stone-200 bg-stone-50 p-2.5 font-semibold text-stone-900 focus:border-pink-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block font-bold text-stone-700">Método Preferencial para Recebimento de Rendimentos</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPayoutMethod('mpesa')}
                  className={`p-2.5 rounded-xl border text-center font-bold ${
                    payoutMethod === 'mpesa' ? 'border-pink-600 bg-pink-50 text-pink-700' : 'border-stone-200'
                  }`}
                >
                  Vodacom M-Pesa
                </button>
                <button
                  type="button"
                  onClick={() => setPayoutMethod('emola')}
                  className={`p-2.5 rounded-xl border text-center font-bold ${
                    payoutMethod === 'emola' ? 'border-pink-600 bg-pink-50 text-pink-700' : 'border-stone-200'
                  }`}
                >
                  Movitel e-Mola
                </button>
                <button
                  type="button"
                  onClick={() => setPayoutMethod('bank')}
                  className={`p-2.5 rounded-xl border text-center font-bold ${
                    payoutMethod === 'bank' ? 'border-pink-600 bg-pink-50 text-pink-700' : 'border-stone-200'
                  }`}
                >
                  Banco BCI / BIM
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-gradient-to-r from-pink-600 via-rose-500 to-pink-500 py-3 font-bold text-white shadow-lg shadow-pink-500/30 hover:from-pink-700 hover:to-rose-600 transition-all"
            >
              Enviar Dados para Aprovação
            </button>

          </form>
        )}
      </div>
    </div>
  );
};
