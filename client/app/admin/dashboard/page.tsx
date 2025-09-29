"use client";

import { motion } from "framer-motion";
import {
  Users,
  FolderOpen,
  FileText,
  TrendingUp,
  DollarSign,
  Activity,
  Clock,
  CheckCircle,
  Loader2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import StatsCard from "@/components/admin/StatsCard";
import { useDashboardData } from "@/hooks/useDashboardData";

const getIconByType = (type: string) => {
  switch (type) {
    case "project":
      return FolderOpen;
    case "blog_post":
      return FileText;
    case "team_member":
      return Users;
    default:
      return Activity;
  }
};

const getColorByType = (type: string) => {
  switch (type) {
    case "project":
      return "#3B82F6";
    case "blog_post":
      return "#22C55E";
    case "team_member":
      return "#F59E0B";
    default:
      return "#8B5CF6";
  }
};

export default function Dashboard() {
  const { data, loading, error, refetch } = useDashboardData();

  // Loading state
  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" style={{ color: "#3B82F6" }} />
            <p style={{ color: "#94A3B8" }}>Loading dashboard data...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <AlertCircle className="w-8 h-8 mx-auto mb-4" style={{ color: "#EF4444" }} />
            <p className="mb-4" style={{ color: "#94A3B8" }}>Failed to load dashboard data</p>
            <p className="text-sm mb-4" style={{ color: "#6B7280" }}>{error}</p>
            <button
              onClick={refetch}
              className="flex items-center gap-2 mx-auto px-4 py-2 rounded-lg transition-colors"
              style={{ 
                backgroundColor: "#3B82F6", 
                color: "#F8FAFC",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#2563EB";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#3B82F6";
              }}
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Create stats array from API data
  const stats = data ? [
    {
      icon: FolderOpen,
      title: "Active Projects",
      value: data.stats.activeProjects.toString(),
      change: "+12%",
      color: "#3B82F6",
      bgColor: "rgba(59, 130, 246, 0.1)",
    },
    {
      icon: Users,
      title: "Total Clients",
      value: data.stats.totalClients.toString(),
      change: "+8%",
      color: "#22C55E",
      bgColor: "rgba(34, 197, 94, 0.1)",
    },
    {
      icon: Users,
      title: "Team Members",
      value: data.stats.teamMembers.toString(),
      change: "+23%",
      color: "#8B5CF6",
      bgColor: "rgba(139, 92, 246, 0.1)",
    },
    {
      icon: FileText,
      title: "Blog Posts",
      value: data.stats.blogPosts.toString(),
      change: "+5%",
      color: "#F59E0B",
      bgColor: "rgba(245, 158, 11, 0.1)",
    },
  ] : [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: "#F8FAFC" }}>
            Dashboard <span style={{ color: "#3B82F6" }}>Overview</span>
          </h1>
          <p style={{ color: "#94A3B8" }}>
            Welcome back! Here's what's happening with your projects.
          </p>
        </div>
        <button
          onClick={refetch}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
          style={{ 
            backgroundColor: "#374151", 
            color: "#F8FAFC",
            border: "1px solid #4B5563"
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.currentTarget.style.backgroundColor = "#4B5563";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#374151";
          }}
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.slice(0, 5).map((stat, index: number) => (
          <StatsCard key={stat.title} {...stat} index={index} />
        ))}
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {" "}
        {/* Performance Chart */}
        <motion.div
          className="rounded-2xl p-6 border"
          style={{
            backgroundColor: "#1A1B23",
            borderColor: "#374151",
          }}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold" style={{ color: "#F8FAFC" }}>
              Project Performance
            </h3>
            <TrendingUp className="w-6 h-6" style={{ color: "#22C55E" }} />
          </div>

          {/* Mock chart visualization */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span style={{ color: "#94A3B8" }}>Completed</span>
              <span className="font-semibold" style={{ color: "#22C55E" }}>
                {data?.performance.completed || 0}%
              </span>
            </div>
            <div
              className="w-full rounded-full h-2"
              style={{ backgroundColor: "#374151" }}
            >
              <motion.div
                className="h-2 rounded-full"
                style={{ backgroundColor: "#22C55E" }}
                initial={{ width: 0 }}
                animate={{ width: `${data?.performance.completed || 0}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>

            <div className="flex items-center justify-between">
              <span style={{ color: "#94A3B8" }}>In Progress</span>
              <span className="font-semibold" style={{ color: "#3B82F6" }}>
                {data?.performance.inProgress || 0}%
              </span>
            </div>
            <div
              className="w-full rounded-full h-2"
              style={{ backgroundColor: "#374151" }}
            >
              <motion.div
                className="h-2 rounded-full"
                style={{ backgroundColor: "#3B82F6" }}
                initial={{ width: 0 }}
                animate={{ width: `${data?.performance.inProgress || 0}%` }}
                transition={{ duration: 1, delay: 0.7 }}
              />
            </div>

            <div className="flex items-center justify-between">
              <span style={{ color: "#94A3B8" }}>Planning</span>
              <span className="font-semibold" style={{ color: "#F59E0B" }}>
                {data?.performance.planning || 0}%
              </span>
            </div>
            <div
              className="w-full rounded-full h-2"
              style={{ backgroundColor: "#374151" }}
            >
              <motion.div
                className="h-2 rounded-full"
                style={{ backgroundColor: "#F59E0B" }}
                initial={{ width: 0 }}
                animate={{ width: `${data?.performance.planning || 0}%` }}
                transition={{ duration: 1, delay: 0.9 }}
              />
            </div>
          </div>
        </motion.div>
        {/* Recent Activity */}
        <motion.div
          className="rounded-2xl p-6 border"
          style={{
            backgroundColor: "#1A1B23",
            borderColor: "#374151",
          }}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold" style={{ color: "#F8FAFC" }}>
              Recent Activity
            </h3>
            <Activity className="w-6 h-6" style={{ color: "#3B82F6" }} />
          </div>

          <div className="space-y-4">
            {data?.recentActivity && data.recentActivity.length > 0 ? (
              data.recentActivity.slice(0, 4).map((activity, index: number) => {
                const IconComponent = getIconByType(activity.type);
                const iconColor = getColorByType(activity.type);
                
                return (
                  <motion.div
                    key={activity.id}
                    className="flex items-start space-x-3 p-3 rounded-lg transition-colors"
                    style={{ backgroundColor: "transparent" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(55, 65, 81, 0.5)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "#374151" }}
                    >
                      <IconComponent
                        className="w-5 h-5"
                        style={{ color: iconColor }}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium" style={{ color: "#F8FAFC" }}>
                        {activity.action}
                      </p>
                      <p className="text-sm" style={{ color: "#94A3B8" }}>
                        {activity.details}
                      </p>
                      <div
                        className="flex items-center text-xs mt-1"
                        style={{ color: "#6B7280" }}
                      >
                        <Clock className="w-3 h-3 mr-1" />
                        {activity.timeDisplay}
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="text-center py-8">
                <Activity className="w-8 h-8 mx-auto mb-2" style={{ color: "#6B7280" }} />
                <p style={{ color: "#94A3B8" }}>No recent activity</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
