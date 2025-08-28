import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { ptBR } from 'date-fns/locale';

type CalendarModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
};

export function CalendarModal({ isOpen, onClose, selectedDate, onDateSelect }: CalendarModalProps) {
  
  if (!isOpen) {
    return null;
  }

  return (
    //overlay
    <div 
      className="fixed inset-0 bg-black/60 z-20 flex items-center justify-center"
      onClick={onClose} 
    >
      
      <div 
        className="bg-slate-800 p-4 rounded-lg text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={(date) => {
            if (date) {
              onDateSelect(date);
            }
          }}
          locale={ptBR}
          disabled={{ before: new Date() }}
          styles={{
            caption: { color: '#a78bfa' },
            head: { color: '#a78bfa' }, 
            day: { color: 'white' },
          }}
        />
      </div>
    </div>
  );
}