export interface ICharacter {
  id: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: any;
  location: any;
  episode: any[];
  image: string;
}

export interface ICharacterFilters {
  page: number;
  name?: string;
  status?: string;
  species?: string;
  type?: string;
  gender?: string;
}

export interface ISkeletonProps {
  width: string;
}
