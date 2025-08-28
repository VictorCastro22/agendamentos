import { format, addDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarDays } from 'lucide-react';


const generateNextDays = (count: number) => {
  const days = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const date = addDays(today, i);
    days.push({
      label: i === 0 ? 'HOJE' : format(date, 'EEEE', { locale: ptBR }).slice(0, 3).toUpperCase(),
      dateString: format(date, 'yyyy-MM-dd'),
      displayDate: format(date, 'dd/MM'),
    });
  }
  return days;
};

const days = generateNextDays(4); 

type DateSelectorProps = {
  selectedDate: string;
  onDateChange: (date: string) => void;
  onOpenCalendar: () => void;
};

export function DateSelector({ selectedDate, onDateChange, onOpenCalendar }: DateSelectorProps) {
  return (
    <div className="flex items-center justify-between gap-2 px-4">
      {days.map((day) => (
        <button
          key={day.dateString}
          onClick={() => onDateChange(day.dateString)}
          className={`flex flex-col items-center justify-center p-2 rounded-lg w-16 h-16 transition-colors
            ${selectedDate === day.dateString ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300'}`}
        >
          <span className="font-bold text-sm">{day.label}</span>
          <span className="text-xs">{day.displayDate}</span>
        </button>
      ))}
      

      <button
        onClick={onOpenCalendar}
        className="flex flex-col items-center justify-center p-2 rounded-lg w-16 h-16 bg-slate-700 text-slate-300"
      >
        <CalendarDays size={24} />
        <span className="text-xs mt-1">Mais</span>
      </button>
    </div>
  );
}