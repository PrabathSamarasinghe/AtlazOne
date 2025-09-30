import { useState, useEffect } from 'react';
import { getDirectDashboardStats } from '@/lib/direct-queries';

interface DashboardStats {
  teamMembers: number;
  activeProjects: number;
  totalClients: number;
  revenue: string;
  blogPosts: number;
}

interface DashboardPerformance {
  completed: number;
  inProgress: number;
  planning: number;
}

interface RecentActivity {
  id: string;
  action: string;
  details: string;
  time: string;
  type: string;
  timeDisplay: string;
}

interface DashboardData {
  stats: DashboardStats;
  performance: DashboardPerformance;
  recentActivity: RecentActivity[];
}

export const useDashboardData = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch stats directly from database
      const stats = await getDirectDashboardStats();
      
      // Mock performance and activity data (or fetch from API if needed)
      const dashboardData = {
        stats,
        performance: {
          completed: 85,
          inProgress: 12,
          planning: 8
        },
        recentActivity: [
          {
            id: '1',
            action: 'New blog post created',
            details: 'Admin created a new blog post',
            time: new Date().toISOString(),
            type: 'blog',
            timeDisplay: 'Just now'
          }
        ]
      };
      
      setData(dashboardData);
      console.log('Dashboard stats fetched directly from database:', stats);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Dashboard data fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const refetch = () => {
    fetchDashboardData();
  };

  return {
    data,
    loading,
    error,
    refetch
  };
};