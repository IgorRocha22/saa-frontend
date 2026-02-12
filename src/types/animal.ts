export enum AnimalSpecies {
  DOG = 'DOG',
  CAT = 'CAT'
}

export enum AnimalSize {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE'
}

export enum AnimalAge {
  PUPPY = 'PUPPY',
  YOUNG = 'YOUNG',
  ADULT = 'ADULT',
  SENIOR = 'SENIOR'
}

export enum AnimalGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

export enum AnimalStatus {
  AVAILABLE = 'AVAILABLE',
  IN_PROCESS = 'IN_PROCESS',
  ADOPTED = 'ADOPTED'
}

export interface Animal {
  id: number;
  name: string;
  species: AnimalSpecies;
  breed: string;
  age: AnimalAge;
  size: AnimalSize;
  gender: AnimalGender;
  imageUrl: string;
  personality: string;
  healthStatus: string;
  temperament: string[];
  status: AnimalStatus;
  createdAt: string;
}

export interface AdoptionRequest {
  id?: string;
  animalId: number;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  homeDescription: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt?: string;
}
