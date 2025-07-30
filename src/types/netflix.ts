export interface NetflixShow {
  id: string;
  title: string;
  type: 'Movie' | 'TV Show';
  genre: string[];
  releaseYear: number;
  rating: string;
  duration: string;
  country: string;
  description: string;
  viewCount: number;
  completionRate: number;
  userRating: number;
  addedDate: string;
}

export interface ViewingData {
  date: string;
  totalViews: number;
  uniqueViewers: number;
  averageWatchTime: number;
  topGenre: string;
}

export interface UserDemographics {
  ageGroup: string;
  percentage: number;
  averageWatchTime: number;
}

export interface GenrePerformance {
  genre: string;
  totalViews: number;
  averageRating: number;
  contentCount: number;
  growthRate: number;
}

export interface ContentMetrics {
  totalContent: number;
  movies: number;
  tvShows: number;
  newThisMonth: number;
  topRated: NetflixShow[];
  trending: NetflixShow[];
}