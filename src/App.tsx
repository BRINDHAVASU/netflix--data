import React, { useState, useEffect } from 'react';
import { Play, BarChart3, Users, TrendingUp, Film, Tv, Calendar, Star } from 'lucide-react';
import { MetricCard } from './components/MetricCard';
import { ViewingChart } from './components/ViewingChart';
import { GenreChart } from './components/GenreChart';
import { TopContent } from './components/TopContent';
import { DemographicsChart } from './components/DemographicsChart';
import { RealTimeMetrics } from './components/RealTimeMetrics';
import { LiveActivityFeed } from './components/LiveActivityFeed';
import { GlobalViewerMap } from './components/GlobalViewerMap';
import {
  generateNetflixShows,
  generateViewingData,
  generateUserDemographics,
  generateGenrePerformance,
  generateContentMetrics
} from './data/netflixData';

function App() {
  const [shows] = useState(() => generateNetflixShows());
  const [viewingData] = useState(() => generateViewingData());
  const [demographics] = useState(() => generateUserDemographics());
  const [genrePerformance] = useState(() => generateGenrePerformance());
  const [contentMetrics] = useState(() => generateContentMetrics(shows));
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const totalViews = viewingData.reduce((sum, day) => sum + day.totalViews, 0);
  const avgRating = shows.reduce((sum, show) => sum + show.userRating, 0) / shows.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-black text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Play className="w-8 h-8 text-red-600 fill-current" />
                <h1 className="text-2xl font-bold">Netflix Analytics</h1>
              </div>
              <div className="hidden md:flex items-center space-x-6 ml-8">
                <span className="text-red-400 font-medium">Dashboard</span>
                <span className="text-gray-300 hover:text-white cursor-pointer transition-colors">Content</span>
                <span className="text-gray-300 hover:text-white cursor-pointer transition-colors">Users</span>
                <span className="text-gray-300 hover:text-white cursor-pointer transition-colors">Reports</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-300">Last Updated</div>
              <div className="text-lg font-mono">{currentTime.toLocaleTimeString()}</div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Key Metrics */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Performance Indicators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="Total Content"
              value={contentMetrics.totalContent.toLocaleString()}
              change={8.2}
              changeLabel="vs last month"
              icon={<BarChart3 className="w-6 h-6" />}
              color="blue"
            />
            <MetricCard
              title="Monthly Views"
              value={`${(totalViews / 1000000).toFixed(1)}M`}
              change={12.5}
              changeLabel="vs last month"
              icon={<TrendingUp className="w-6 h-6" />}
              color="green"
            />
            <MetricCard
              title="Active Subscribers"
              value="247.2M"
              change={3.8}
              changeLabel="global subscribers"
              icon={<Users className="w-6 h-6" />}
              color="purple"
            />
            <MetricCard
              title="Avg Rating"
              value={avgRating.toFixed(1)}
              change={2.1}
              changeLabel="user satisfaction"
              icon={<Star className="w-6 h-6" />}
              color="orange"
            />
          </div>
        </section>

        {/* Content Breakdown */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Content Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard
              title="Movies"
              value={contentMetrics.movies}
              icon={<Film className="w-6 h-6" />}
              color="red"
            />
            <MetricCard
              title="TV Shows"
              value={contentMetrics.tvShows}
              icon={<Tv className="w-6 h-6" />}
              color="blue"
            />
            <MetricCard
              title="New This Month"
              value={contentMetrics.newThisMonth}
              icon={<Calendar className="w-6 h-6" />}
              color="green"
            />
          </div>
        </section>

        {/* Charts and Analytics */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RealTimeMetrics />
          <LiveActivityFeed />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ViewingChart data={viewingData} />
          <GlobalViewerMap />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <GenreChart data={genrePerformance} />
          <DemographicsChart data={demographics} />
        </section>

        {/* Top Content */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TopContent
            title="Top Rated Content"
            shows={contentMetrics.topRated}
            metric="rating"
          />
          <TopContent
            title="Most Watched Content"
            shows={contentMetrics.trending}
            metric="views"
          />
        </section>

        {/* Footer */}
        <footer className="text-center py-8 text-gray-500 border-t border-gray-200">
          <p>Netflix Analytics Dashboard - Real-time insights into content performance and user engagement</p>
          <p className="text-sm mt-2">Data refreshes every 30 seconds • Last sync: {currentTime.toLocaleString()}</p>
        </footer>
      </main>
    </div>
  );
}

export default App;