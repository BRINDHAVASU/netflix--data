import React from 'react';
import { GenrePerformance } from '../types/netflix';

interface GenreChartProps {
  data: GenrePerformance[];
}

export const GenreChart: React.FC<GenreChartProps> = ({ data }) => {
  const maxViews = Math.max(...data.map(d => d.totalViews));
  const colors = [
    'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-red-500',
    'bg-yellow-500', 'bg-indigo-500', 'bg-pink-500', 'bg-orange-500'
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Genre Performance</h3>
      <div className="space-y-4">
        {data.map((genre, index) => {
          const percentage = (genre.totalViews / maxViews) * 100;
          
          return (
            <div key={genre.genre} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">{genre.genre}</span>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>{(genre.totalViews / 1000000).toFixed(1)}M views</span>
                  <span>★ {genre.averageRating}</span>
                  <span className={`px-2 py-1 rounded-full ${genre.growthRate > 15 ? 'bg-green-100 text-green-800' : genre.growthRate > 10 ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                    +{genre.growthRate}%
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full ${colors[index % colors.length]} transition-all duration-1000 ease-out rounded-full`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};