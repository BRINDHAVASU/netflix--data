import React from 'react';
import { UserDemographics } from '../types/netflix';

interface DemographicsChartProps {
  data: UserDemographics[];
}

export const DemographicsChart: React.FC<DemographicsChartProps> = ({ data }) => {
  const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-red-500', 'bg-orange-500'];
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">User Demographics</h3>
      <div className="space-y-6">
        {/* Pie Chart Representation */}
        <div className="flex justify-center">
          <div className="relative w-48 h-48">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {data.reduce((acc, segment, index) => {
                const startAngle = acc.currentAngle;
                const angle = (segment.percentage / 100) * 360;
                const endAngle = startAngle + angle;
                
                const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
                const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
                const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
                const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);
                
                const largeArcFlag = angle > 180 ? 1 : 0;
                
                const pathData = [
                  `M 50 50`,
                  `L ${x1} ${y1}`,
                  `A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                  'Z'
                ].join(' ');
                
                acc.paths.push(
                  <path
                    key={index}
                    d={pathData}
                    className={colors[index % colors.length].replace('bg-', 'fill-')}
                    stroke="white"
                    strokeWidth="1"
                  />
                );
                
                acc.currentAngle = endAngle;
                return acc;
              }, { paths: [] as React.ReactNode[], currentAngle: 0 }).paths}
            </svg>
          </div>
        </div>
        
        {/* Legend and Details */}
        <div className="space-y-3">
          {data.map((segment, index) => (
            <div key={segment.ageGroup} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full ${colors[index % colors.length]}`} />
                <span className="font-medium text-gray-900">{segment.ageGroup}</span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span className="font-semibold">{segment.percentage}%</span>
                <span>{segment.averageWatchTime}h avg</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};