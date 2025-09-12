'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Server, 
  Database, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Users,
  TrendingUp,
  HardDrive,
  Cpu,
  Shield
} from 'lucide-react';

interface SystemStats {
  serverStatus: 'online' | 'offline' | 'maintenance';
  databaseStatus: 'connected' | 'disconnected' | 'slow';
  activeUsers: number;
  totalRequests: number;
  responseTime: number;
  errorRate: number;
  storageUsed: number;
  storageTotal: number;
  memoryUsage: number;
  cpuUsage: number;
  uptime: string;
  lastBackup: Date;
  securityAlerts: number;
}

export function SystemMonitoring() {
  const [systemStats, setSystemStats] = useState<SystemStats | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock system stats - in real app, this would come from your monitoring system
  const mockStats: SystemStats = useMemo(() => ({
    serverStatus: 'online',
    databaseStatus: 'connected',
    activeUsers: 42,
    totalRequests: 15420,
    responseTime: 120,
    errorRate: 0.2,
    storageUsed: 2.4,
    storageTotal: 10,
    memoryUsage: 65,
    cpuUsage: 23,
    uptime: '15 days, 3 hours',
    lastBackup: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    securityAlerts: 0
  }), []);

  useEffect(() => {
    // Simulate loading system stats
    setTimeout(() => {
      setSystemStats(mockStats);
      setLoading(false);
    }, 1000);
  }, [mockStats]);


  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
      case 'connected':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'offline':
      case 'disconnected':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'maintenance':
      case 'slow':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!systemStats) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>Unable to load system statistics</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Server className="h-6 w-6" />
            System Monitoring
          </h2>
          <p className="text-muted-foreground">
            Monitor system health and performance
          </p>
        </div>
        <Button variant="outline">
          <Activity className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Server Status</CardTitle>
            {getStatusIcon(systemStats.serverStatus)}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">
              {systemStats.serverStatus}
            </div>
            <p className="text-xs text-muted-foreground">
              Uptime: {systemStats.uptime}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Database</CardTitle>
            {getStatusIcon(systemStats.databaseStatus)}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">
              {systemStats.databaseStatus}
            </div>
            <p className="text-xs text-muted-foreground">
              Response: {systemStats.responseTime}ms
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {systemStats.activeUsers}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently online
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {systemStats.errorRate}%
            </div>
            <p className="text-xs text-muted-foreground">
              Last 24 hours
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="h-5 w-5" />
              System Resources
            </CardTitle>
            <CardDescription>
              Current system resource usage
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">CPU Usage</span>
                <span className="text-sm text-muted-foreground">{systemStats.cpuUsage}%</span>
              </div>
              <Progress value={systemStats.cpuUsage} className="h-2" />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Memory Usage</span>
                <span className="text-sm text-muted-foreground">{systemStats.memoryUsage}%</span>
              </div>
              <Progress value={systemStats.memoryUsage} className="h-2" />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Storage</span>
                <span className="text-sm text-muted-foreground">
                  {systemStats.storageUsed}GB / {systemStats.storageTotal}GB
                </span>
              </div>
              <Progress 
                value={(systemStats.storageUsed / systemStats.storageTotal) * 100} 
                className="h-2" 
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Performance Metrics
            </CardTitle>
            <CardDescription>
              System performance indicators
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Total Requests</span>
              <span className="text-sm font-bold">{systemStats.totalRequests.toLocaleString()}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Response Time</span>
              <span className="text-sm font-bold">{systemStats.responseTime}ms</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Active Users</span>
              <span className="text-sm font-bold">{systemStats.activeUsers}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Error Rate</span>
              <span className={`text-sm font-bold ${
                systemStats.errorRate > 1 ? 'text-red-600' : 
                systemStats.errorRate > 0.5 ? 'text-yellow-600' : 
                'text-green-600'
              }`}>
                {systemStats.errorRate}%
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security & Maintenance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Status
            </CardTitle>
            <CardDescription>
              Security monitoring and alerts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Security Alerts</span>
              <Badge variant={systemStats.securityAlerts > 0 ? "destructive" : "default"}>
                {systemStats.securityAlerts}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Firewall Status</span>
              <Badge variant="default">Active</Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">SSL Certificate</span>
              <Badge variant="default">Valid</Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Last Security Scan</span>
              <span className="text-sm text-muted-foreground">
                {new Date(Date.now() - 2 * 60 * 60 * 1000).toLocaleString()}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HardDrive className="h-5 w-5" />
              Backup & Maintenance
            </CardTitle>
            <CardDescription>
              System maintenance and backup status
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Last Backup</span>
              <span className="text-sm text-muted-foreground">
                {systemStats.lastBackup.toLocaleString()}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Backup Status</span>
              <Badge variant="default">Success</Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Next Maintenance</span>
              <span className="text-sm text-muted-foreground">
                {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">System Uptime</span>
              <span className="text-sm text-muted-foreground">
                {systemStats.uptime}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>System Actions</CardTitle>
          <CardDescription>
            Common system maintenance tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Database className="h-6 w-6" />
              <span>Run Backup</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Activity className="h-6 w-6" />
              <span>Clear Cache</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Shield className="h-6 w-6" />
              <span>Security Scan</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

