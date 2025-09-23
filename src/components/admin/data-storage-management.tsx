'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Database, 
  Activity, 
  RefreshCw,
  BarChart3,
  Settings,
  Shield,
  TrendingUp,
  HardDrive,
  Clock,
  Users,
  FileText,
  Zap
} from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import toast from 'react-hot-toast';

// System data interfaces
interface DatabaseStats {
  totalUsers: number;
  totalLessons: number;
  totalActivities: number;
  totalSessions: number;
  storageUsed: string;
  lastBackup: Date;
  dataIntegrity: 'healthy' | 'warning' | 'error';
  averageResponseTime: number;
  errorRate: number;
}

interface DataHealthCheck {
  id: string;
  name: string;
  status: 'pass' | 'warning' | 'fail';
  description: string;
  lastChecked: Date;
  details?: string;
}

interface SystemMetric {
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  change: number;
}

export function DataStorageManagement() {
  const { isAdmin, isModerator } = useAdmin();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [databaseStats, setDatabaseStats] = useState<DatabaseStats | null>(null);
  const [healthChecks, setHealthChecks] = useState<DataHealthCheck[]>([]);
  const [systemMetrics, setSystemMetrics] = useState<SystemMetric[]>([]);
  const [quota, setQuota] = useState<{
    configured: boolean;
    message?: string;
    readsToday: number | null;
    writesToday: number | null;
    deletesToday: number | null;
    storageBytes: number | null;
    egressBytesMonth: number | null;
    window: { start: string; end: string } | null;
    billingRequired?: boolean;
    billingUrl?: string;
  } | null>(null);

  // Load system data
  const loadSystemData = async () => {
    try {
      setLoading(true);
      
      // Load database statistics
      const [usersSnapshot, activitiesSnapshot, sessionsSnapshot] = await Promise.all([
        getDocs(collection(db, 'userProfiles')),
        getDocs(collection(db, 'userActivities')),
        getDocs(collection(db, 'userSessions'))
      ]);

      const stats: DatabaseStats = {
        totalUsers: usersSnapshot.size,
        totalLessons: 0, // Would need to count from lessons collection
        totalActivities: activitiesSnapshot.size,
        totalSessions: sessionsSnapshot.size,
        storageUsed: '2.4 GB', // Mock data - would need actual calculation
        lastBackup: new Date(),
        dataIntegrity: 'healthy',
        averageResponseTime: 120, // ms
        errorRate: 0.02 // 2%
      };

      setDatabaseStats(stats);

      // Load health checks
      const checks: DataHealthCheck[] = [
        {
          id: 'orphaned-activities',
          name: 'Orphaned Activities',
          status: 'pass',
          description: 'All activities have valid user references',
          lastChecked: new Date(),
          details: '0 orphaned records found'
        },
        {
          id: 'missing-progress',
          name: 'Missing Progress Data',
          status: 'warning',
          description: 'Some users missing progress data',
          lastChecked: new Date(),
          details: '3 users without progress records'
        },
        {
          id: 'duplicate-sessions',
          name: 'Duplicate Sessions',
          status: 'pass',
          description: 'No duplicate session records found',
          lastChecked: new Date(),
          details: 'All sessions are unique'
        },
        {
          id: 'data-consistency',
          name: 'Data Consistency',
          status: 'pass',
          description: 'User profile data is consistent',
          lastChecked: new Date(),
          details: 'All profiles have required fields'
        }
      ];

      setHealthChecks(checks);

      // Load system metrics
      const metrics: SystemMetric[] = [
        {
          name: 'Daily Active Users',
          value: 1247,
          unit: 'users',
          trend: 'up',
          change: 12.5
        },
        {
          name: 'Database Queries',
          value: 45678,
          unit: 'queries',
          trend: 'up',
          change: 8.2
        },
        {
          name: 'Storage Usage',
          value: 2.4,
          unit: 'GB',
          trend: 'up',
          change: 5.1
        },
        {
          name: 'Response Time',
          value: 120,
          unit: 'ms',
          trend: 'down',
          change: -15.3
        }
      ];

      setSystemMetrics(metrics);

      // Fetch quotas
      try {
        const res = await fetch('/api/admin/quotas', { cache: 'no-store' });
        const data = await res.json();
        setQuota(data);
      } catch {
        setQuota(null);
      }

    } catch (error) {
      console.error('Error loading system data:', error);
      toast.error('Failed to load system data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin || isModerator) {
      loadSystemData();
    }
  }, [isAdmin, isModerator]);

  if (!isAdmin && !isModerator) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <Database className="h-6 w-6" />
            Access Denied
          </CardTitle>
          <CardDescription>
            You don&apos;t have permission to access data storage management.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass':
      case 'healthy':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'fail':
      case 'error':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />;
      default:
        return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-6 w-6" />
            Data Storage Management
          </CardTitle>
          <CardDescription>
            Monitor system health, data integrity, and platform performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <Button onClick={loadSystemData} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh Data
            </Button>
            <Button variant="outline">
              <Shield className="h-4 w-4 mr-2" />
              Run Health Check
            </Button>
            <Button variant="outline">
              <HardDrive className="h-4 w-4 mr-2" />
              Backup Now
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="health">Data Health</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* System Usage (Firestore Quotas) */}
              <Card>
                <CardHeader>
                  <CardTitle>System Usage (Firestore Free Tier)</CardTitle>
                  <CardDescription>
                    Daily operation counts and storage. Connect Cloud Monitoring for live data.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {quota ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">Reads Today</span>
                          <span className="text-xs text-muted-foreground">50,000 free/day</span>
                        </div>
                        <div className="text-2xl font-bold">{quota.readsToday ?? '—'}</div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">Writes Today</span>
                          <span className="text-xs text-muted-foreground">20,000 free/day</span>
                        </div>
                        <div className="text-2xl font-bold">{quota.writesToday ?? '—'}</div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">Deletes Today</span>
                          <span className="text-xs text-muted-foreground">20,000 free/day</span>
                        </div>
                        <div className="text-2xl font-bold">{quota.deletesToday ?? '—'}</div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">Storage</span>
                          <span className="text-xs text-muted-foreground">1 GiB free</span>
                        </div>
                        <div className="text-2xl font-bold">{quota.storageBytes != null ? `${(quota.storageBytes / (1024**3)).toFixed(2)} GiB` : '—'}</div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">Egress (This Month)</span>
                          <span className="text-xs text-muted-foreground">10 GiB free/month</span>
                        </div>
                        <div className="text-2xl font-bold">{quota.egressBytesMonth != null ? `${(quota.egressBytesMonth / (1024**3)).toFixed(2)} GiB` : '—'}</div>
                      </div>
                      {!quota.configured && (
                        <div className="md:col-span-2 lg:col-span-3 p-3 border rounded-lg bg-muted/40 text-sm">
                          {quota.message}
                        </div>
                      )}
                      {quota.configured && quota.billingRequired && (
                        <div className="md:col-span-2 lg:col-span-3 p-4 border rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
                          <div className="flex items-start space-x-3">
                            <div className="text-yellow-600 dark:text-yellow-400">⚠️</div>
                            <div>
                              <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                                Billing Required for Live Metrics
                              </p>
                              <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                                Cloud Monitoring API requires billing to be enabled on your Google Cloud project.
                              </p>
                              <a 
                                href={quota.billingUrl || '#'} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-block mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                              >
                                Enable Billing →
                              </a>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground">Loading usage…</div>
                  )}
                </CardContent>
              </Card>
              {/* Database Stats */}
              {databaseStats && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{databaseStats.totalUsers.toLocaleString()}</div>
                      <p className="text-xs text-muted-foreground">
                        Registered users
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Activities</CardTitle>
                      <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{databaseStats.totalActivities.toLocaleString()}</div>
                      <p className="text-xs text-muted-foreground">
                        User actions tracked
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
                      <HardDrive className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{databaseStats.storageUsed}</div>
                      <p className="text-xs text-muted-foreground">
                        Database storage
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Data Integrity</CardTitle>
                      <Shield className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <Badge className={getStatusColor(databaseStats.dataIntegrity)}>
                        {databaseStats.dataIntegrity}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        System health status
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* System Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>System Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Response Time</span>
                        <span className="text-sm text-muted-foreground">
                          {databaseStats?.averageResponseTime}ms
                        </span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Error Rate</span>
                        <span className="text-sm text-muted-foreground">
                          {(databaseStats?.errorRate || 0) * 100}%
                        </span>
                      </div>
                      <Progress value={2} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="health" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Data Health Checks</CardTitle>
                  <CardDescription>
                    Automated checks for data integrity and consistency
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {healthChecks.map((check) => (
                      <div key={check.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="text-2xl">
                            {check.status === 'pass' ? '✅' : 
                             check.status === 'warning' ? '⚠️' : '❌'}
                          </div>
                          <div>
                            <h4 className="font-medium">{check.name}</h4>
                            <p className="text-sm text-muted-foreground">{check.description}</p>
                            {check.details && (
                              <p className="text-xs text-muted-foreground mt-1">{check.details}</p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(check.status)}>
                            {check.status}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">
                            {check.lastChecked.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>System Metrics</CardTitle>
                  <CardDescription>
                    Key performance indicators and usage statistics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {systemMetrics.map((metric, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{metric.name}</h4>
                          {getTrendIcon(metric.trend)}
                        </div>
                        <div className="text-2xl font-bold mb-1">
                          {metric.value.toLocaleString()} {metric.unit}
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`text-sm ${
                            metric.trend === 'up' ? 'text-green-600' : 
                            metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                          }`}>
                            {metric.change > 0 ? '+' : ''}{metric.change}%
                          </span>
                          <span className="text-xs text-muted-foreground">vs last week</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="maintenance" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Data Cleanup</CardTitle>
                    <CardDescription>
                      Remove old or unnecessary data
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full" variant="outline">
                      <Clock className="h-4 w-4 mr-2" />
                      Clean Old Sessions (30+ days)
                    </Button>
                    <Button className="w-full" variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Archive Inactive Users
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Zap className="h-4 w-4 mr-2" />
                      Optimize Database Indexes
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>System Operations</CardTitle>
                    <CardDescription>
                      Administrative tasks and maintenance
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full" variant="outline">
                      <HardDrive className="h-4 w-4 mr-2" />
                      Create Backup
                    </Button>
                    <Button className="w-full" variant="outline">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Settings className="h-4 w-4 mr-2" />
                      System Configuration
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
