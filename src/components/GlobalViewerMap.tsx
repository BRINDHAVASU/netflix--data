import React, { useState, useEffect } from 'react';
import { MapPin, Users, TrendingUp } from 'lucide-react';

interface RegionData {
  region: string;
  country: string;
  viewers: number;
  growth: number;
  topShow: string;
  coordinates: { x: number; y: number };
}

export const GlobalViewerMap: React.FC = () => {
  const [regions, setRegions] = useState<RegionData[]>([
    {
      region: 'North America',
      country: 'United States',
      viewers: 75000000,
      growth: 8.5,
      topShow: 'Stranger Things',
      coordinates: { x: 25, y: 40 }
    },
    {
      region: 'Europe',
      country: 'United Kingdom',
      viewers: 45000000,
      growth: 12.3,
      topShow: 'The Crown',
      coordinates: { x: 50, y: 35 }
    },
    {
      region: 'Asia Pacific',
      country: 'Japan',
      viewers: 38000000,
      growth: 15.7,
      topShow: 'Squid Game',
      coordinates: { x: 85, y: 45 }
    },
    {
      region: 'Latin America',
      country: 'Brazil',
      viewers: 32000000,
      growth: 18.2,
      topShow: 'Money Heist',
      coordinates: { x: 35, y: 70 }
    },
    {
      region: 'Asia',
      country: 'India',
      viewers: 28000000,
      growth: 22.1,
      topShow: 'Sacred Games',
      coordinates: { x: 75, y: 55 }
    },
    {
      region: 'Europe',
      country: 'Germany',
      viewers: 25000000,
      growth: 9.8,
      topShow: 'Dark',
      coordinates: { x: 52, y: 38 }
    }
  ]);

  const [selectedRegion, setSelectedRegion] = useState<RegionData | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setRegions(prev => prev.map(region => ({
        ...region,
        viewers: region.viewers + Math.floor(Math.random() * 10000 - 5000),
        growth: region.growth + (Math.random() - 0.5) * 2
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const totalViewers = regions.reduce((sum, region) => sum + region.viewers, 0);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Global Viewer Distribution</h3>
        <div className="text-sm text-gray-500">
          Total: {(totalViewers / 1000000).toFixed(1)}M viewers
        </div>
      </div>
      
      {/* World Map Visualization */}
      <div className="relative bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg p-4 mb-6" style={{ height: '300px' }}>
        <svg className="w-full h-full" viewBox="0 0 100 80">
          {/* Simplified world map outline */}
          <path
            d="M10,20 Q20,15 30,20 L40,25 Q50,20 60,25 L70,30 Q80,25 90,30 L90,60 Q80,65 70,60 L60,55 Q50,60 40,55 L30,50 Q20,55 10,50 Z"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="0.5"
            className="opacity-50"
          />
          
          {/* Region markers */}
          {regions.map((region, index) => (
            <g key={index}>
              <circle
                cx={region.coordinates.x}
                cy={region.coordinates.y}
                r={Math.max(2, (region.viewers / totalViewers) * 20)}
                className={`cursor-pointer transition-all duration-300 ${
                  selectedRegion?.country === region.country
                    ? 'fill-red-500 animate-pulse'
                    : 'fill-blue-500 hover:fill-red-400'
                }`}
                onClick={() => setSelectedRegion(region)}
              />
              <text
                x={region.coordinates.x}
                y={region.coordinates.y - 4}
                textAnchor="middle"
                className="text-xs font-medium fill-gray-700"
                style={{ fontSize: '3px' }}
              >
                {region.country}
              </text>
            </g>
          ))}
        </svg>
        
        {/* Tooltip */}
        {selectedRegion && (
          <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-lg border border-gray-200 min-w-48">
            <h4 className="font-semibold text-gray-900">{selectedRegion.country}</h4>
            <div className="space-y-1 mt-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Viewers:</span>
                <span className="font-medium">{(selectedRegion.viewers / 1000000).toFixed(1)}M</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Growth:</span>
                <span className={`font-medium ${selectedRegion.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {selectedRegion.growth > 0 ? '+' : ''}{selectedRegion.growth.toFixed(1)}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Top Show:</span>
                <span className="font-medium text-blue-600">{selectedRegion.topShow}</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Region Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {regions.map((region, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg border cursor-pointer transition-all duration-300 ${
              selectedRegion?.country === region.country
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => setSelectedRegion(region)}
          >
            <div className="flex items-center space-x-2 mb-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="font-medium text-gray-900 text-sm">{region.country}</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">Viewers</span>
                <span className="font-medium">{(region.viewers / 1000000).toFixed(1)}M</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">Growth</span>
                <span className={`font-medium ${region.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {region.growth > 0 ? '+' : ''}{region.growth.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};