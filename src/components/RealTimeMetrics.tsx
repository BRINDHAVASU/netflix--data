import React, { useState, useEffect } from 'react';
import { Activity, Users, Clock, TrendingUp, Play, Download, Globe, Zap } from 'lucide-react';

interface RealTimeMetric {
  label: string;
  value: number;
  unit: string;
  change: number;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  isAnimating: boolean;
}

export const RealTimeMetrics: React.FC = () => {
  const [metrics, setMetrics] = useState<RealTimeMetric[]>([
    {
      label: 'Active Viewers',
      value: 2847392,
      unit: '',
      change: 0,
      icon: <Users className="w-5 h-5" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      isAnimating: false
    },
    {
      label: 'Streams Started',
      value: 156789,
      unit: '/hour',
      change: 0,
      icon: <Play className="w-5 h-5" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      isAnimating: false
    },
    {
      label: 'Avg Watch Time',
      value: 47.3,
      unit: 'min',
      change: 0,
      icon: <Clock className="w-5 h-5" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      isAnimating: false
    },
    {
      label: 'Engagement Rate',
      value: 87.3,
      unit: '%',
      change: 0,
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      isAnimating: false
    },
    {
      label: 'Downloads',
      value: 45678,
      unit: '/hour',
      change: 0,
      icon: <Download className="w-5 h-5" />,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      isAnimating: false
    },
    {
      label: 'Global Reach',
      value: 190,
      unit: ' countries',
      change: 0,
      icon: <Globe className="w-5 h-5" />,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
      isAnimating: false
    },
    {
      label: 'Peak Concurrent',
      value: 3245678,
      unit: '',
      change: 0,
      icon: <Zap className="w-5 h-5" />,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      isAnimating: false
    },
    {
      label: 'Content Hours',
      value: 15847,
      unit: ' hrs',
      change: 0,
      icon: <Activity className="w-5 h-5" />,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      isAnimating: false
    }
  ]);

  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prevMetrics => 
        prevMetrics.map((metric, index) => {
          // Different update frequencies for different metrics
          const shouldUpdate = Math.random() > 0.3; // 70% chance to update
          
          if (!shouldUpdate) return metric;

          let changePercent: number;
          let newValue: number;

          // Different volatility for different metrics
          switch (metric.label) {
            case 'Active Viewers':
              changePercent = (Math.random() - 0.5) * 0.08; // ±4% change
              break;
            case 'Streams Started':
              changePercent = (Math.random() - 0.5) * 0.15; // ±7.5% change
              break;
            case 'Avg Watch Time':
              changePercent = (Math.random() - 0.5) * 0.05; // ±2.5% change
              break;
            case 'Engagement Rate':
              changePercent = (Math.random() - 0.5) * 0.03; // ±1.5% change
              break;
            case 'Downloads':
              changePercent = (Math.random() - 0.5) * 0.12; // ±6% change
              break;
            case 'Global Reach':
              changePercent = 0; // Countries don't change frequently
              newValue = metric.value;
              break;
            case 'Peak Concurrent':
              changePercent = (Math.random() - 0.5) * 0.10; // ±5% change
              break;
            case 'Content Hours':
              changePercent = Math.random() * 0.02; // Only positive growth
              break;
            default:
              changePercent = (Math.random() - 0.5) * 0.05;
          }

          if (metric.label !== 'Global Reach') {
            newValue = metric.value * (1 + changePercent);
            
            // Ensure realistic bounds
            if (metric.unit === '%') {
              newValue = Math.max(0, Math.min(100, newValue));
            } else if (newValue < 0) {
              newValue = Math.abs(newValue);
            }
          }

          return {
            ...metric,
            value: Math.round(newValue! * 10) / 10,
            change: changePercent * 100,
            isAnimating: true
          };
        })
      );

      // Reset animation state after a short delay
      setTimeout(() => {
        setMetrics(prev => prev.map(m => ({ ...m, isAnimating: false })));
      }, 500);

      setLastUpdate(new Date());
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, []);

  const formatValue = (value: number, unit: string) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M${unit}`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K${unit}`;
    }
    return `${value}${unit}`;
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Real-Time Netflix Metrics</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-gray-500">Live</span>
          </div>
          <div className="text-xs text-gray-400">
            Updated: {lastUpdate.toLocaleTimeString()}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <div 
            key={index} 
            className={`p-4 rounded-lg border border-gray-100 transition-all duration-500 ${
              metric.isAnimating 
                ? `${metric.bgColor} scale-105 shadow-md` 
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`${metric.color} transition-all duration-300 ${
                metric.isAnimating ? 'scale-110' : ''
              }`}>
                {metric.icon}
              </div>
              <div className={`text-xs px-2 py-1 rounded-full font-medium transition-all duration-300 ${
                metric.change > 0 
                  ? 'bg-green-100 text-green-800' 
                  : metric.change < 0 
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-800'
              } ${metric.isAnimating ? 'animate-bounce' : ''}`}>
                {metric.change > 0 ? '+' : ''}{metric.change.toFixed(1)}%
              </div>
            </div>
            
            <div className={`text-2xl font-bold text-gray-900 mb-1 transition-all duration-300 ${
              metric.isAnimating ? 'text-3xl' : ''
            }`}>
              {formatValue(metric.value, metric.unit)}
            </div>
            
            <div className="text-sm text-gray-600 font-medium">{metric.label}</div>
            
            {/* Progress bar for percentage metrics */}
            {metric.unit === '%' && (
              <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className={`h-1.5 rounded-full transition-all duration-1000 ${
                    metric.color.replace('text-', 'bg-')
                  }`}
                  style={{ width: `${metric.value}%` }}
                />
              </div>
            )}
            
            {/* Sparkline effect for non-percentage metrics */}
            {metric.unit !== '%' && metric.unit !== ' countries' && (
              <div className="mt-2 flex items-end space-x-1 h-6">
                {Array.from({ length: 8 }, (_, i) => (
                  <div
                    key={i}
                    className={`w-1 rounded-t transition-all duration-300 ${
                      metric.color.replace('text-', 'bg-')
                    }`}
                    style={{ 
                      height: `${Math.random() * 100}%`,
                      opacity: metric.isAnimating ? 1 : 0.3
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Summary Stats */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">
              {formatValue(metrics[0].value + metrics[6].value, '')}
            </div>
            <div className="text-sm text-gray-600">Total Viewers</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">
              {formatValue(metrics[1].value + metrics[4].value, '')}
            </div>
            <div className="text-sm text-gray-600">Hourly Activity</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">
              {metrics[3].value.toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">Avg Engagement</div>
          </div>
        </div>
      </div>
    </div>
  );
};