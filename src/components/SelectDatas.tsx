import { useState } from 'react';

const days = [
  { label: "HOJE", date: "27/08" },
  { label: "QUI", date: "28/08" },
  { label: "SEX", date: "29/08" },
  { label: "SÁB", date: "30/08" },
  { label: "DOM", date: "31/08" },
];

export function DateSelector() {
  const [selectedDate, setSelectedDate] = useState("27/08");

  return (
    <div className="flex items-center justify-between gap-2 px-4">
      {days.map((day) => (
        <button
          key={day.date}
          onClick={() => setSelectedDate(day.date)}
          className={`flex flex-col items-center justify-center p-2 rounded-lg w-16 h-16 transition-colors
            ${selectedDate === day.date ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300'}`}
        >
          <span className="font-bold text-sm">{day.label}</span>
          <span className="text-xs">{day.date}</span>
        </button>
      ))}
    </div>
  );
}