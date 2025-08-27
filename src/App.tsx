import { useState, useRef, useEffect } from 'react';
import { Search, MapPin, ChevronDown } from 'lucide-react';
import { DateSelector } from './components/SelectDatas';
import { EspacoCard } from './components/EspacoCard';


const mainSpaces = [
  { id: 'centro-pastoral', name: 'Centro de Pastoral' },
  { id: 'matriz', name: 'Matriz' },
  { id: 'salao-paroquial', name: 'Salão Paroquial' },
];

const allSubSpaces = [
  { id: 1, mainSpaceId: 'centro-pastoral', spaceName: "Quadra Grande", category: "Eventos, Reuniões", capacity: 500, availableTimes: ["08:00", "10:00", "15:00"]},
  { id: 2, mainSpaceId: 'centro-pastoral', spaceName: "Quadra Pequena", category: "Eventos, Reuniões", capacity: 100, availableTimes: ["08:00", "10:00", "15:00"]},
  { id: 3, mainSpaceId: 'centro-pastoral', spaceName: "Sala de Reunião 01", category: "Encontros, Reuniões", capacity: 20, availableTimes: ["09:00", "11:00", "14:00", "16:00"]},
  { id: 4, mainSpaceId: 'centro-pastoral', spaceName: "Sala de Reunião 02", category: "Encontros, Reuniões", capacity: 50, availableTimes: ["09:00", "11:00", "14:00", "16:00"]},
  { id: 5, mainSpaceId: 'centro-pastoral', spaceName: "Sala de Reunião 03", category: "Encontros, Reuniões", capacity: 20, availableTimes: ["09:00", "11:00", "14:00", "16:00"]},
  { id: 6, mainSpaceId: 'centro-pastoral', spaceName: "Sala de Reunião 04", category: "Encontros, Reuniões", capacity: 20, availableTimes: ["09:00", "11:00", "14:00", "16:00"]},
  { id: 7, mainSpaceId: 'centro-pastoral', spaceName: "Sala de Reunião 05", category: "Encontros, Reuniões", capacity: 20, availableTimes: ["09:00", "11:00", "14:00", "16:00"]},
  { id: 8, mainSpaceId: 'centro-pastoral', spaceName: "Sala de Reunião 06", category: "Encontros, Reuniões", capacity: 20, availableTimes: ["09:00", "11:00", "14:00", "16:00"]},
  { id: 9, mainSpaceId: 'salao-paroquial', spaceName: "Salão Paroquial", category: "Eventos, Festas", capacity: 150, availableTimes: ["14:00", "16:00", "19:00", "21:00"]},
  { id: 10, mainSpaceId: 'matriz', spaceName: "Igreja", category: "Cerimônias, Missas Especiais", capacity: 300, availableTimes: ["10:00", "15:00"]},
];


function App() {
  const [selectedMainSpace, setSelectedMainSpace] = useState('centro-pastoral');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedSpaceName = mainSpaces.find(space => space.id === selectedMainSpace)?.name;

  const filteredSpaces = allSubSpaces.filter(
    (space) => space.mainSpaceId === selectedMainSpace
  );
  
  // 4. Lógica para fechar o dropdown ao clicar fora dele
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    // Adiciona o listener quando o componente monta
    document.addEventListener("mousedown", handleClickOutside);
    // Remove o listener quando o componente desmonta
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);


  return (
    <div className="bg-slate-900 min-h-screen text-white font-sans">
      <header className="flex items-center justify-between p-4 bg-slate-800/80 backdrop-blur-sm sticky top-0 z-10">
        
        {/* 5. O novo seletor com dropdown */}
        <div className="relative" ref={dropdownRef}>
          {/* Botão que abre/fecha o dropdown */}
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 font-bold text-lg"
          >
            <MapPin size={20} className="text-indigo-400" />
            <span>{selectedSpaceName}</span>
            <ChevronDown size={20} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {/* O menu dropdown que aparece/desaparece */}
          {isDropdownOpen && (
            <div className="absolute mt-2 w-48 bg-slate-700 rounded-md shadow-lg py-1">
              {mainSpaces.map(space => (
                <a
                  key={space.id}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedMainSpace(space.id);
                    setIsDropdownOpen(false); // Fecha o dropdown ao selecionar
                  }}
                  className="block px-4 py-2 text-sm text-slate-200 hover:bg-indigo-600 hover:text-white"
                >
                  {space.name}
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <Search size={24} className="text-slate-300" />
          <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center font-bold">
            N
          </div>
        </div>
      </header>

      <main className="p-4 flex flex-col gap-6">
        <DateSelector />
        
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
    </div>
  );
}

export default App;