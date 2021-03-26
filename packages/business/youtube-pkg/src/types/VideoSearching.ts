export interface SearchCriterias {
  artists: {
    name: string,
    altNames: string[],
  }[];
  album: string;
  title: string;
  duration: number;
}
