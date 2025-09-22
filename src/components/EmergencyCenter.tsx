import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Phone, Shield, Zap, Users, MapPin, Heart, Siren } from 'lucide-react';
import { useRealTimeData } from '@/hooks/useRealTimeData';
import { useToast } from '@/hooks/use-toast';

const EmergencyCenter = () => {
  const [emergencyLevel, setEmergencyLevel] = useState<'green' | 'yellow' | 'red'>('green');
  const { incidents, updateIncidentStatus } = useRealTimeData();
  const { toast } = useToast();

  const emergencyContacts = [
    { name: 'Local Police', number: '100', type: 'police' },
    { name: 'Fire Department', number: '101', type: 'fire' },
    { name: 'Medical Emergency', number: '108', type: 'medical' },
    { name: 'Temple Security', number: '+91 79XXX XXXXX', type: 'security' },
  ];

  const activeIncidents = [
    {
      id: 'INC001',
      type: 'medical',
      description: 'Elderly pilgrim feeling dizzy near main gate',
      location: 'Main Entrance',
      priority: 'medium',
      time: '5 min ago',
      status: 'responding'
    },
    {
      id: 'INC002',
      type: 'crowd',
      description: 'Minor crowd buildup at prasadam counter',
      location: 'Prasadam Hall',
      priority: 'low',
      time: '12 min ago',
      status: 'monitoring'
    }
  ];

  const getIncidentIcon = (type: string) => {
    switch (type) {
      case 'medical': return <Heart className="h-4 w-4 text-red-500" />;
      case 'crowd': return <Users className="h-4 w-4 text-yellow-500" />;
      case 'security': return <Shield className="h-4 w-4 text-blue-500" />;
      default: return <AlertTriangle className="h-4 w-4 text-orange-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'emergency';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Emergency Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className={`shadow-lg border-2 ${
          emergencyLevel === 'green' ? 'border-green-500 bg-green-50' :
          emergencyLevel === 'yellow' ? 'border-yellow-500 bg-yellow-50' :
          'border-red-500 bg-red-50'
        }`}>
          <CardContent className="p-6 text-center">
            <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
              emergencyLevel === 'green' ? 'bg-green-500' :
              emergencyLevel === 'yellow' ? 'bg-yellow-500' :
              'bg-red-500'
            }`}>
              {emergencyLevel === 'green' ? (
                <Shield className="h-8 w-8 text-white" />
              ) : emergencyLevel === 'yellow' ? (
                <AlertTriangle className="h-8 w-8 text-white" />
              ) : (
                <Siren className="h-8 w-8 text-white animate-pulse" />
              )}
            </div>
            <h3 className="text-lg font-bold mb-2">
              {emergencyLevel === 'green' ? 'All Clear' :
               emergencyLevel === 'yellow' ? 'Caution' : 'Emergency'}
            </h3>
            <p className="text-sm text-muted-foreground">
              Current temple safety status
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-spiritual-saffron rounded-full mx-auto mb-4 flex items-center justify-center">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-bold mb-2">2 Active</h3>
            <p className="text-sm text-muted-foreground">
              Incidents being managed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-spiritual-deep-blue rounded-full mx-auto mb-4 flex items-center justify-center">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-bold mb-2">3.2 min</h3>
            <p className="text-sm text-muted-foreground">
              Average response time
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Actions */}
      <Card className="border-red-200 bg-red-50/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-red-700">
            <Siren className="h-5 w-5" />
            <span>Emergency Response Actions</span>
          </CardTitle>
          <CardDescription>
            Immediate emergency response tools and protocols
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="emergency" 
              className="h-16 flex-col"
              onClick={() => {
                setEmergencyLevel('yellow');
                toast({ title: "General Alert Activated", description: "All staff and pilgrims have been notified.", variant: "destructive" });
              }}
            >
              <AlertTriangle className="h-6 w-6 mb-1" />
              <span>General Alert</span>
            </Button>
            
            <Button 
              variant="emergency" 
              className="h-16 flex-col"
              onClick={() => {
                setEmergencyLevel('red');
                toast({ title: "Evacuation Protocol", description: "Emergency evacuation procedures initiated.", variant: "destructive" });
              }}
            >
              <Users className="h-6 w-6 mb-1" />
              <span>Crowd Evacuation</span>
            </Button>
            
            <Button 
              variant="emergency" 
              className="h-16 flex-col"
              onClick={() => toast({ title: "Medical Team Dispatched", description: "Emergency medical services are on their way.", variant: "destructive" })}
            >
              <Heart className="h-6 w-6 mb-1" />
              <span>Medical Emergency</span>
            </Button>
            
            <Button 
              variant="emergency" 
              className="h-16 flex-col"
              onClick={() => toast({ title: "Security Alert", description: "Security forces have been notified and are responding.", variant: "destructive" })}
            >
              <Shield className="h-6 w-6 mb-1" />
              <span>Security Alert</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Active Incidents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-spiritual-saffron" />
            <span>Active Incidents</span>
          </CardTitle>
          <CardDescription>
            Currently ongoing incidents requiring attention
          </CardDescription>
        </CardHeader>
        <CardContent>
          {activeIncidents.length === 0 ? (
            <div className="text-center py-8">
              <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <p className="text-muted-foreground">No active incidents</p>
            </div>
          ) : (
            <div className="space-y-4">
              {incidents.map((incident) => (
                <div key={incident.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center space-x-4">
                    {getIncidentIcon(incident.type)}
                    <div>
                      <h3 className="font-semibold text-spiritual-deep-blue">
                        {incident.id} - {incident.description}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{incident.location}</span>
                        </span>
                        <span>{incident.time}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Badge variant={getPriorityColor(incident.priority)}>
                      {incident.priority.toUpperCase()}
                    </Badge>
                    
                    <Badge variant="outline">
                      {incident.status.toUpperCase()}
                    </Badge>

                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => toast({ title: "Incident Details", description: `Viewing full details for ${incident.id}` })}
                      >
                        View Details
                      </Button>
                      <Button 
                        variant="temple" 
                        size="sm"
                        onClick={() => {
                          updateIncidentStatus(incident.id, 'resolved');
                          toast({ title: "Status Updated", description: `Incident ${incident.id} marked as resolved.` });
                        }}
                      >
                        Update Status
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Emergency Contacts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Phone className="h-5 w-5 text-spiritual-saffron" />
            <span>Emergency Contacts</span>
          </CardTitle>
          <CardDescription>
            Quick access to emergency services and contacts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {emergencyContacts.map((contact, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-lg transition-all border-l-4 border-l-spiritual-saffron">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{contact.name}</h3>
                      <p className="text-lg font-mono text-spiritual-deep-blue">{contact.number}</p>
                    </div>
                    <Button variant="temple" size="sm">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI-Powered Predictions */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-blue-700">
            <Zap className="h-5 w-5" />
            <span>AI Emergency Predictions</span>
          </CardTitle>
          <CardDescription>
            Predictive analysis for potential emergency situations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="font-medium text-yellow-800">Crowd Surge Predicted</p>
                  <p className="text-sm text-yellow-600">Expected in main sanctum area at 6:00 PM</p>
                </div>
              </div>
              <Badge variant="default">Medium Risk</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-800">Low Risk Period</p>
                  <p className="text-sm text-green-600">Optimal conditions expected for next 2 hours</p>
                </div>
              </div>
              <Badge variant="secondary">Low Risk</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmergencyCenter;