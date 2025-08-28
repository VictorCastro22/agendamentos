import { getDay } from 'date-fns';

/**
 * Gera um array de horários em intervalos de 1 hora.
 * @param start - Hora de início (ex: 8)
 * @param end - Hora de fim (ex: 21)
 * @returns Array de strings (ex: ["08:00", "09:00", ...])
 */
const generateTimeSlots = (start: number, end: number): string[] => {
  const slots = [];
  for (let i = start; i < end; i++) {
    slots.push(`${String(i).padStart(2, '0')}:00`);
  }
  return slots;
};


export const getAvailableTimesForPastoral = (dateString: string): string[] => {
  const selectedDate = new Date(`${dateString}T12:00:00`);
  const dayOfWeek = getDay(selectedDate); 
  const today = new Date();
  

  if (format(selectedDate, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd')) {

    return generateTimeSlots(9, 21);
  }

  if (dayOfWeek === 1) {
    return [];
  }

  if (dayOfWeek >= 2 && dayOfWeek <= 5) {
    return generateTimeSlots(15, 21);
  }

  if (dayOfWeek === 6 || dayOfWeek === 0) {
    const morningSlots = generateTimeSlots(8, 12);
    const afternoonSlots = generateTimeSlots(15, 21);
    return [...morningSlots, ...afternoonSlots];
  }

  return [];
};


import { format } from 'date-fns';