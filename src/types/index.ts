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
export interface ILocation {
  name: string;
  type: string;
  dimension: string;
  residents: any[];
}

export interface ILocationFilters {
  page: number;
  name?: string;
}
