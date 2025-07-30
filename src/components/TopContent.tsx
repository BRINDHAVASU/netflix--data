import React from 'react';
import { NetflixShow } from '../types/netflix';
import { Star, Eye, Clock } from 'lucide-react';

interface TopContentProps {
  title: string;
  shows: NetflixShow[];
  metric: 'rating' | 'views';
}

export const TopContent: React.FC<TopContentProps> = ({ title, shows, metric }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">{title}</h3>
      <div className="space-y-4">
        {shows.map((show, index) => (
          <div key={show.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
              index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-600' : 'bg-gray-300'
            }`}>
              {index + 1}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-900 truncate">{show.title}</h4>
              <div className="flex items-center space-x-3 mt-1">
                <span className="text-xs text-gray-500">{show.type}</span>
                <span className="text-xs text-gray-500">{show.releaseYear}</span>
                <div className="flex items-center space-x-1">
                  {show.genre.slice(0, 2).map((g, i) => (
                    <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex-shrink-0 text-right">
              {metric === 'rating' ? (
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium text-gray-900">{show.userRating}</span>
                </div>
              ) : (
                <div className="flex items-center space-x-1">
                  <Eye className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium text-gray-900">
                    {(show.viewCount / 1000000).toFixed(1)}M
                  </span>
                </div>
              )}
              <div className="flex items-center space-x-1 mt-1">
                <Clock className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-500">{show.completionRate}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};