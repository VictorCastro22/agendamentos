import { Search, MapPin } from 'lucide-react';
import { DateSelector } from './components/SelectDatas';
import { EspacoCard } from './components/EspacoCard';

const mockSpaces = [
  {
    id: 1,
    spaceName: "Salão Paroquial",
    category: "Eventos, Festas",
    imageUrl: "https://via.placeholder.com/150/2E2A47/FFFFFF?text=Salão", //não achei nenhuma imagem, avaliar subs
    capacity: 150,
    availableTimes: ["14:00", "16:00", "19:00", "21:00"],
  },
  {
    id: 2,
    spaceName: "Quadra Grande",
    category: "Esportes, Eventos",
    imageUrl: "https://via.placeholder.com/150/2E2A47/FFFFFF?text=Quadra", //preciso achar uma imagem ainda
    capacity: 200,
    availableTimes: ["08:00", "10:00", "15:00"],
  },
   {
    id: 3,
    spaceName: "Sala de Reunião 1",
    category: "Corporativo, Reuniões",
    imageUrl: "https://via.placeholder.com/150/2E2A47/FFFFFF?text=Sala+1", //preciso achar uma imagem ainda
    capacity: 20,
    availableTimes: ["09:00", "11:00", "14:00", "16:00"],
  },
];


function App() {
  return (
    
    <div className="bg-slate-900 min-h-screen text-white font-sans">
      <header className="flex items-center justify-between p-4 bg-slate-800/80 backdrop-blur-sm sticky top-0">
        <div className="flex items-center gap-1">
          <MapPin size={20} className="text-indigo-400" />
          <span className="font-bold text-lg">Maranguape</span>
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
          {mockSpaces.map(space => (
             <EspacoCard
              key={space.id}
              spaceName={space.spaceName}
              category={space.category}
              imageUrl={space.imageUrl}
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