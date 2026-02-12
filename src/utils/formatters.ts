import { AnimalSpecies, AnimalGender, AnimalSize, AnimalAge } from '../types/animal';

export const formatters = {
  species: (value: AnimalSpecies) => {
    const map: Record<AnimalSpecies, string> = { DOG: 'Cão', CAT: 'Gato' };
    return map[value] || value;
  },
  gender: (value: AnimalGender) => {
    const map: Record<AnimalGender, string> = { MALE: 'Macho', FEMALE: 'Fêmea' };
    return map[value] || value;
  },
  size: (value: AnimalSize) => {
    const map: Record<AnimalSize, string> = { SMALL: 'Pequeno', MEDIUM: 'Médio', LARGE: 'Grande' };
    return map[value] || value;
  },
  age: (value: AnimalAge) => {
    const map: Record<AnimalAge, string> = { PUPPY: 'Filhote', YOUNG: 'Jovem', ADULT: 'Adulto', SENIOR: 'Sênior' };
    return map[value] || value;
  }
};