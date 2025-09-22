import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CrowdDashboard from '@/components/CrowdDashboard';
import PilgrimApp from '@/components/PilgrimApp';
import TempleManagement from '@/components/TempleManagement';
import EmergencyCenter from '@/components/EmergencyCenter';
import { Users, Shield, MapPin, Heart, Bell, Calendar } from 'lucide-react';

const Index = () => {
  const [activeView, setActiveView] = useState<'admin' | 'pilgrim'>('admin');

  return (
    <div className="min-h-screen bg-gradient-divine">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-temple border-b border-spiritual-saffron/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-temple rounded-full flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-spiritual-deep-blue">Divine Flow</h1>
                <p className="text-sm text-muted-foreground">Temple & Pilgrimage Management System</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex bg-muted rounded-lg p-1">
                <Button
                  variant={activeView === 'admin' ? 'temple' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveView('admin')}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Admin Panel
                </Button>
                <Button
                  variant={activeView === 'pilgrim' ? 'temple' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveView('pilgrim')}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Pilgrim App
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeView === 'admin' ? (
          <AdminView />
        ) : (
          <PilgrimView />
        )}
      </main>
    </div>
  );
};

const AdminView = () => {
  return (
    <div className="space-y-8">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-temple border-spiritual-saffron/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center space-x-2">
              <Users className="h-5 w-5 text-spiritual-saffron" />
              <span>Current Visitors</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-spiritual-deep-blue">12,847</div>
            <div className="text-sm text-success">+15% from yesterday</div>
          </CardContent>
        </Card>

        <Card className="shadow-temple border-spiritual-saffron/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center space-x-2">
              <Clock className="h-5 w-5 text-warning" />
              <span>Avg Wait Time</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-spiritual-deep-blue">45 min</div>
            <div className="text-sm text-muted-foreground">Normal for peak hours</div>
          </CardContent>
        </Card>

        <Card className="shadow-temple border-spiritual-saffron/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center space-x-2">
              <Shield className="h-5 w-5 text-success" />
              <span>Safety Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-success">Safe</div>
            <div className="text-sm text-muted-foreground">All systems normal</div>
          </CardContent>
        </Card>

        <Card className="shadow-temple border-spiritual-saffron/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-spiritual-saffron" />
              <span>Parking Capacity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-spiritual-deep-blue">78%</div>
            <div className="text-sm text-warning">High occupancy</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="crowd" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white shadow-lg">
          <TabsTrigger value="crowd" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Crowd Monitor</span>
          </TabsTrigger>
          <TabsTrigger value="temple" className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Temple Mgmt</span>
          </TabsTrigger>
          <TabsTrigger value="emergency" className="flex items-center space-x-2">
            <Bell className="h-4 w-4" />
            <span>Emergency</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span>Analytics</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="crowd">
          <CrowdDashboard />
        </TabsContent>

        <TabsContent value="temple">
          <TempleManagement />
        </TabsContent>

        <TabsContent value="emergency">
          <EmergencyCenter />
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Analytics</CardTitle>
              <CardDescription>
                Crowd prediction and optimization insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Analytics dashboard coming soon...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const PilgrimView = () => {
  return <PilgrimApp />;
};

// Import missing components
import { Clock, BarChart3 } from 'lucide-react';

export default Index;