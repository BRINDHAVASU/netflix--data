import React, { useState, useEffect } from 'react';
import { Play, Pause, Download, Star, Users, MapPin } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'stream_start' | 'download' | 'rating' | 'milestone';
  title: string;
  description: string;
  timestamp: Date;
  icon: React.ReactNode;
  color: string;
  location?: string;
}

export const LiveActivityFeed: React.FC = () => {
  const [activities, setActivities] = useState<ActivityItem[]>([]);

  const generateActivity = (): ActivityItem => {
    const types = ['stream_start', 'download', 'rating', 'milestone'] as const;
    const type = types[Math.floor(Math.random() * types.length)];
    
    const shows = [
      'Stranger Things', 'The Crown', 'Bridgerton', 'Money Heist', 'Squid Game',
      'The Witcher', 'Ozark', 'Dark', 'Narcos', 'House of Cards'
    ];
    
    const locations = [
      'New York, US', 'London, UK', 'Tokyo, JP', 'São Paulo, BR', 'Mumbai, IN',
      'Berlin, DE', 'Paris, FR', 'Sydney, AU', 'Toronto, CA', 'Seoul, KR'
    ];

    const show = shows[Math.floor(Math.random() * shows.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];

    switch (type) {
      case 'stream_start':
        return {
          id: `activity-${Date.now()}-${Math.random()}`,
          type,
          title: `${show} started streaming`,
          description: `${Math.floor(Math.random() * 1000) + 100} viewers joined`,
          timestamp: new Date(),
          icon: <Play className="w-4 h-4" />,
          color: 'text-green-600',
          location
        };
      case 'download':
        return {
          id: `activity-${Date.now()}-${Math.random()}`,
          type,
          title: `${show} downloaded`,
          description: `${Math.floor(Math.random() * 500) + 50} downloads in last minute`,
          timestamp: new Date(),
          icon: <Download className="w-4 h-4" />,
          color: 'text-blue-600',
          location
        };
      case 'rating':
        return {
          id: `activity-${Date.now()}-${Math.random()}`,
          type,
          title: `${show} highly rated`,
          description: `Average rating: ${(Math.random() * 2 + 8).toFixed(1)}/10`,
          timestamp: new Date(),
          icon: <Star className="w-4 h-4" />,
          color: 'text-yellow-600',
          location
        };
      case 'milestone':
        const milestones = [
          '1M views reached',
          '500K downloads completed',
          '100K concurrent viewers',
          'Trending #1 globally'
        ];
        return {
          id: `activity-${Date.now()}-${Math.random()}`,
          type,
          title: `${show} milestone`,
          description: milestones[Math.floor(Math.random() * milestones.length)],
          timestamp: new Date(),
          icon: <Users className="w-4 h-4" />,
          color: 'text-purple-600',
          location
        };
    }
  };

  useEffect(() => {
    // Initialize with some activities
    const initialActivities = Array.from({ length: 5 }, () => generateActivity());
    setActivities(initialActivities);

    const interval = setInterval(() => {
      const newActivity = generateActivity();
      setActivities(prev => [newActivity, ...prev.slice(0, 9)]); // Keep only 10 most recent
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Live Activity Feed</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-sm text-gray-500">Live Updates</span>
        </div>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {activities.map((activity, index) => (
          <div 
            key={activity.id}
            className={`flex items-start space-x-3 p-3 rounded-lg transition-all duration-500 ${
              index === 0 ? 'bg-blue-50 border border-blue-200 animate-fadeIn' : 'hover:bg-gray-50'
            }`}
          >
            <div className={`flex-shrink-0 p-2 rounded-full bg-white border ${activity.color}`}>
              {activity.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-900 truncate">
                  {activity.title}
                </h4>
                <span className="text-xs text-gray-500">
                  {activity.timestamp.toLocaleTimeString()}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
              {activity.location && (
                <div className="flex items-center space-x-1 mt-2">
                  <MapPin className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-500">{activity.location}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};