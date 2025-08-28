import { useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { Search, MapPin, ChevronDown } from 'lucide-react';

import { DateSelector } from './components/SelectDatas';
import { EspacoCard } from './components/EspacoCard';
import { CalendarModal } from './components/CalendarioModal';
import { getAvailableTimesForPastoral } from './utils/getAvailableTimes';

const mainSpaces = [
  { id: 'centro-pastoral', name: 'Centro de Pastoral' },
  { id: 'matriz', name: 'Matriz' },
  { id: 'salao-paroquial', name: 'Salão Paroquial' },
];

const allSubSpaces = [
  { id: 1, mainSpaceId: 'centro-pastoral', spaceName: "Quadra Grande", category: "Eventos, Reuniões", imageUrl: "https://via.placeholder.com/150/111827/FFFFFF?text=Quadra", capacity: 500, availableTimes: [] },
  { id: 2, mainSpaceId: 'centro-pastoral', spaceName: "Quadra Pequena", category: "Eventos, Reuniões", imageUrl: "https://via.placeholder.com/150/1E293B/FFFFFF?text=Quadra", capacity: 100, availableTimes: [] },
  { id: 3, mainSpaceId: 'centro-pastoral', spaceName: "Sala de Reunião 01", category: "Encontros, Reuniões", imageUrl: "https://via.placeholder.com/150/1E293B/FFFFFF?text=Sala+1", capacity: 20, availableTimes: [] },
  { id: 4, mainSpaceId: 'centro-pastoral', spaceName: "Sala de Reunião 02", category: "Encontros, Reuniões", imageUrl: "https://via.placeholder.com/150/1E293B/FFFFFF?text=Sala+2", capacity: 50, availableTimes: [] },
  { id: 5, mainSpaceId: 'centro-pastoral', spaceName: "Sala de Reunião 03", category: "Encontros, Reuniões", imageUrl: "https://via.placeholder.com/150/1E293B/FFFFFF?text=Sala+3", capacity: 20, availableTimes: [] },
  { id: 6, mainSpaceId: 'centro-pastoral', spaceName: "Sala de Reunião 04", category: "Encontros, Reuniões", imageUrl: "https://via.placeholder.com/150/1E293B/FFFFFF?text=Sala+4", capacity: 20, availableTimes: [] },
  { id: 7, mainSpaceId: 'centro-pastoral', spaceName: "Sala de Reunião 05", category: "Encontros, Reuniões", imageUrl: "https://via.placeholder.com/150/1E293B/FFFFFF?text=Sala+5", capacity: 20, availableTimes: [] },
  { id: 8, mainSpaceId: 'centro-pastoral', spaceName: "Sala de Reunião 06", category: "Encontros, Reuniões", imageUrl: "https://via.placeholder.com/150/1E293B/FFFFFF?text=Sala+6", capacity: 20, availableTimes: [] },
  { id: 9, mainSpaceId: 'salao-paroquial', spaceName: "Salão Paroquial", category: "Eventos, Festas", imageUrl: "https://via.placeholder.com/150/3730A3/FFFFFF?text=Salão", capacity: 150, availableTimes: ["14:00", "16:00", "19:00", "21:00"] },
  { id: 10, mainSpaceId: 'matriz', spaceName: "Igreja", category: "Cerimônias, Missas Especiais", imageUrl: "https://via.placeholder.com/150/4C1D95/FFFFFF?text=Matriz", capacity: 300, availableTimes: ["10:00", "15:00"] },
];

function App() {
  const [selectedMainSpace, setSelectedMainSpace] = useState('centro-pastoral');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [spacesWithTimes, setSpacesWithTimes] = useState(allSubSpaces);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedSpaceName = mainSpaces.find(space => space.id === selectedMainSpace)?.name;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  useEffect(() => {
    if (selectedMainSpace === 'centro-pastoral') {
      const dateString = format(selectedDate, 'yyyy-MM-dd');
      const newTimes = getAvailableTimesForPastoral(dateString);
      const updatedSpaces = allSubSpaces.map(space => {
        if (space.mainSpaceId === 'centro-pastoral') {
          return { ...space, availableTimes: newTimes };
        }
        return space;
      });
      setSpacesWithTimes(updatedSpaces);
    } else {
      setSpacesWithTimes(allSubSpaces);
    }
  }, [selectedDate, selectedMainSpace]);

  const filteredSpaces = spacesWithTimes.filter(
    (space) => space.mainSpaceId === selectedMainSpace
  );

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setIsCalendarOpen(false);
  };

  return (
    <div className="bg-slate-900 min-h-screen text-white font-sans">
      <header className="flex items-center justify-between p-4 bg-slate-800/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="relative" ref={dropdownRef}>
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-2 font-bold text-lg">
            <MapPin size={20} className="text-indigo-400" />
            <span>{selectedSpaceName}</span>
            <ChevronDown size={20} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          {isDropdownOpen && (
            <div className="absolute mt-2 w-48 bg-slate-700 rounded-md shadow-lg py-1">
              {mainSpaces.map(space => (
                <a key={space.id} href="#" onClick={(e) => { e.preventDefault(); setSelectedMainSpace(space.id); setIsDropdownOpen(false); }} className="block px-4 py-2 text-sm text-slate-200 hover:bg-indigo-600 hover:text-white">
                  {space.name}
                </a>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <Search size={24} className="text-slate-300" />
          <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center font-bold">N</div>
        </div>
      </header>

      <main className="p-4 flex flex-col gap-6">
        <DateSelector
          selectedDate={format(selectedDate, 'yyyy-MM-dd')}
          onDateChange={(dateString) => setSelectedDate(new Date(`${dateString}T12:00:00`))}
          onOpenCalendar={() => setIsCalendarOpen(true)}
        />
        
        <div>
          <h2 className="text-2xl font-bold">Toda a Programação</h2>
          <p className="text-slate-400">Espaços disponíveis para o dia selecionado</p>
        </div>
        
        <div className="flex flex-col gap-6">
          {filteredSpaces.map(space => (
            <EspacoCard
              key={space.id}
              spaceName={space.spaceName}
              category={space.category}
              capacity={space.capacity}
              availableTimes={space.availableTimes}
            />
          ))}
        </div>
      </main>

      <CalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect}
      />
    </div>
  );
}

export default App;