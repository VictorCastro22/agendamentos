import type { EspacoCardProps } from '../types/EspacoTy';
import { Users, Building } from 'lucide-react';


export function EspacoCard({ spaceName, category, capacity, availableTimes }: EspacoCardProps) {
  return (
    <div className="bg-slate-800 rounded-lg p-4 flex flex-col gap-4">
      <div className="flex gap-4">

        <div className="flex flex-col">
          <h3 className="text-xl font-bold text-white">{spaceName}</h3>
          <p className="text-sm text-slate-400">{category}</p>
          
          <div className="flex items-center gap-2 mt-2 text-slate-300">
            <Users size={16} />
            <span className="text-sm">Capacidade: {capacity} pessoas</span>
          </div>
          <div className="flex items-center gap-2 mt-1 text-slate-300">
            <Building size={16} />
            <span className="text-sm">Centro de Pastoral</span>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-slate-300 mb-2 border-t border-slate-700 pt-3">
          Horários disponíveis:
        </h4>
        <div className="flex flex-wrap gap-3">
          {availableTimes.map((time) => (
            <button
              key={time}
              className="bg-slate-700 text-white font-semibold py-2 px-5 rounded-lg hover:bg-indigo-600 transition-colors"
            >
              {time}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}