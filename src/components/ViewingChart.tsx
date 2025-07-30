import React from 'react';
import { ViewingData } from '../types/netflix';

interface ViewingChartProps {
  data: ViewingData[];
}

export const ViewingChart: React.FC<ViewingChartProps> = ({ data }) => {
  const maxViews = Math.max(...data.map(d => d.totalViews));
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Daily Viewing Trends</h3>
      <div className="space-y-4">
        <div className="flex justify-between text-sm text-gray-600 mb-4">
          <span>Views (Millions)</span>
          <span>Last 30 Days</span>
        </div>
        <div className="relative h-64 flex items-end space-x-1">
          {data.slice(-14).map((item, index) => {
            const height = (item.totalViews / maxViews) * 100;
            const date = new Date(item.date);
            const isWeekend = date.getDay() === 0 || date.getDay() === 6;
            
            return (
              <div key={index} className="flex-1 flex flex-col items-center group">
                <div className="relative w-full">
                  <div
                    className={`w-full rounded-t-md transition-all duration-300 group-hover:opacity-80 ${
                      isWeekend ? 'bg-red-500' : 'bg-blue-500'
                    }`}
                    style={{ height: `${height}%` }}
                  />
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {(item.totalViews / 1000000).toFixed(1)}M views
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-2 transform -rotate-45 origin-top-left">
                  {date.getMonth() + 1}/{date.getDate()}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span className="text-gray-600">Weekdays</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span className="text-gray-600">Weekends</span>
          </div>
        </div>
      </div>
    </div>
  );
};