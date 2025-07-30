import { NetflixShow, ViewingData, UserDemographics, GenrePerformance, ContentMetrics } from '../types/netflix';

export const generateNetflixShows = (): NetflixShow[] => {
  const titles = [
    'Stranger Things', 'The Crown', 'Bridgerton', 'Money Heist', 'Squid Game',
    'The Witcher', 'Ozark', 'Dark', 'Narcos', 'House of Cards',
    'Orange Is the New Black', 'Black Mirror', 'The Umbrella Academy',
    'Lupin', 'Emily in Paris', 'The Queen\'s Gambit', 'Mindhunter',
    'Russian Doll', 'Cobra Kai', 'You', 'Elite', 'Sex Education',
    'The Good Place', 'Breaking Bad', 'Better Call Saul', 'Peaky Blinders'
  ];

  const genres = [
    'Drama', 'Comedy', 'Action', 'Thriller', 'Horror', 'Romance',
    'Sci-Fi', 'Documentary', 'Crime', 'Fantasy', 'Mystery', 'Adventure'
  ];

  const countries = ['US', 'UK', 'Spain', 'Germany', 'France', 'South Korea', 'Japan', 'India', 'Brazil', 'Canada'];
  const ratings = ['TV-MA', 'TV-14', 'TV-PG', 'R', 'PG-13', 'PG'];

  return titles.map((title, index) => ({
    id: `show-${index + 1}`,
    title,
    type: Math.random() > 0.6 ? 'TV Show' : 'Movie',
    genre: [genres[Math.floor(Math.random() * genres.length)], genres[Math.floor(Math.random() * genres.length)]],
    releaseYear: 2015 + Math.floor(Math.random() * 9),
    rating: ratings[Math.floor(Math.random() * ratings.length)],
    duration: Math.random() > 0.6 ? `${Math.floor(Math.random() * 5) + 1} Seasons` : `${Math.floor(Math.random() * 120) + 90} min`,
    country: countries[Math.floor(Math.random() * countries.length)],
    description: `An engaging ${genres[Math.floor(Math.random() * genres.length)].toLowerCase()} series that captivates audiences worldwide.`,
    viewCount: Math.floor(Math.random() * 50000000) + 1000000,
    completionRate: Math.floor(Math.random() * 40) + 60,
    userRating: Math.floor(Math.random() * 30) + 70,
    addedDate: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toISOString()
  }));
};

export const generateViewingData = (): ViewingData[] => {
  const data: ViewingData[] = [];
  const genres = ['Drama', 'Comedy', 'Action', 'Thriller', 'Horror', 'Romance'];
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date.toISOString().split('T')[0],
      totalViews: Math.floor(Math.random() * 5000000) + 15000000,
      uniqueViewers: Math.floor(Math.random() * 2000000) + 8000000,
      averageWatchTime: Math.floor(Math.random() * 60) + 45,
      topGenre: genres[Math.floor(Math.random() * genres.length)]
    });
  }
  
  return data;
};

export const generateUserDemographics = (): UserDemographics[] => [
  { ageGroup: '18-24', percentage: 22, averageWatchTime: 3.2 },
  { ageGroup: '25-34', percentage: 28, averageWatchTime: 2.8 },
  { ageGroup: '35-44', percentage: 24, averageWatchTime: 2.5 },
  { ageGroup: '45-54', percentage: 16, averageWatchTime: 2.1 },
  { ageGroup: '55+', percentage: 10, averageWatchTime: 1.8 }
];

export const generateGenrePerformance = (): GenrePerformance[] => [
  { genre: 'Drama', totalViews: 45000000, averageRating: 8.2, contentCount: 156, growthRate: 12.5 },
  { genre: 'Comedy', totalViews: 38000000, averageRating: 7.8, contentCount: 134, growthRate: 8.3 },
  { genre: 'Action', totalViews: 42000000, averageRating: 7.9, contentCount: 98, growthRate: 15.2 },
  { genre: 'Thriller', totalViews: 35000000, averageRating: 8.1, contentCount: 87, growthRate: 10.7 },
  { genre: 'Horror', totalViews: 28000000, averageRating: 7.5, contentCount: 65, growthRate: 18.9 },
  { genre: 'Romance', totalViews: 32000000, averageRating: 7.6, contentCount: 78, growthRate: 6.4 },
  { genre: 'Sci-Fi', totalViews: 31000000, averageRating: 8.3, contentCount: 54, growthRate: 22.1 },
  { genre: 'Documentary', totalViews: 25000000, averageRating: 8.5, contentCount: 89, growthRate: 14.3 }
];

export const generateContentMetrics = (shows: NetflixShow[]): ContentMetrics => {
  const movies = shows.filter(show => show.type === 'Movie').length;
  const tvShows = shows.filter(show => show.type === 'TV Show').length;
  const newThisMonth = shows.filter(show => {
    const addedDate = new Date(show.addedDate);
    const now = new Date();
    const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    return addedDate >= monthAgo;
  }).length;

  const topRated = [...shows]
    .sort((a, b) => b.userRating - a.userRating)
    .slice(0, 5);

  const trending = [...shows]
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, 5);

  return {
    totalContent: shows.length,
    movies,
    tvShows,
    newThisMonth,
    topRated,
    trending
  };
};