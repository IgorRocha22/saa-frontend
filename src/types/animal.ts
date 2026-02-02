export type AnimalStatus = 'disponivel' | 'em-processo' | 'adotado';
export type AnimalSpecies = 'cao' | 'gato';
export type AnimalSize = 'pequeno' | 'medio' | 'grande';
export type AnimalAge = 'filhote' | 'jovem' | 'adulto' | 'senior';

export interface Animal {
  id: string;
  name: string;
  species: AnimalSpecies;
  breed: string;
  age: AnimalAge;
  size: AnimalSize;
  gender: 'macho' | 'femea';
  image: string;
  personality: string;
  healthStatus: string;
  temperament: string[];
  status: AnimalStatus;
  createdAt: Date;
}

export interface AdoptionRequest {
  id: string;
  animalId: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  homeDescription: string;
  status: 'pendente' | 'aprovado' | 'rejeitado';
  createdAt: Date;
}
