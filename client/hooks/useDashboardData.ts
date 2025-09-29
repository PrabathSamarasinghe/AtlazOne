import { useState, useEffect } from 'react';

interface DashboardStats {
  teamMembers: any;
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
      
      const response = await fetch('/api/admin/dashboard');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch dashboard data: ${response.status}`);
      }
      
      const dashboardData = await response.json();
      setData(dashboardData);
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