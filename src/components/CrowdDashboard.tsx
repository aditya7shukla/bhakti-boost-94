import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, AlertTriangle, CheckCircle, Camera, Gauge, Zap, Brain, TrendingUp } from 'lucide-react';
import { useRealTimeData } from '@/hooks/useRealTimeData';
import { useAI } from '@/hooks/useAI';
import { useToast } from '@/hooks/use-toast';

const CrowdDashboard = () => {
  const { crowdData, notifications, updateIncidentStatus } = useRealTimeData();
  const { predictions, generateCrowdOptimization, isAnalyzing } = useAI();
  const { toast } = useToast();
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'normal': return 'success';
      case 'high': return 'warning';
      case 'crowded': return 'emergency';
      default: return 'secondary';
    }
  };

  const handleDeployStaff = async () => {
    toast({
      title: "Staff Deployment Initiated",
      description: "Additional security personnel are being dispatched to high-traffic areas.",
    });
  };

  const handleSendNotification = async () => {
    toast({
      title: "Notification Sent",
      description: "Pilgrims have been notified about current wait times and alternate routes.",
    });
  };

  const handleAIOptimization = async () => {
    try {
      const optimization = await generateCrowdOptimization(crowdData);
      toast({
        title: "AI Optimization Complete",
        description: optimization.predictedImpact,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate optimization recommendations.",
        variant: "destructive"
      });
    }
  };

  const handleAreaAction = (area: string, action: string) => {
    setSelectedArea(area);
    toast({
      title: `Action: ${action}`,
      description: `Executing ${action.toLowerCase()} for ${area}`,
    });
  };

  return (
    <div className="space-y-6">
      {/* AI Prediction Alerts */}
      {predictions.length > 0 && (
        <div className="space-y-4">
          {predictions.slice(0, 2).map((prediction, index) => (
            <Card key={index} className={`border-2 ${
              prediction.priority === 'high' ? 'border-red-500 bg-red-50' :
              prediction.priority === 'medium' ? 'border-yellow-500 bg-yellow-50' :
              'border-blue-500 bg-blue-50'
            }`}>
              <CardHeader>
                <CardTitle className={`flex items-center space-x-2 ${
                  prediction.priority === 'high' ? 'text-red-700' :
                  prediction.priority === 'medium' ? 'text-yellow-700' :
                  'text-blue-700'
                }`}>
                  <Brain className="h-5 w-5" />
                  <span>AI Prediction - {prediction.type.replace('_', ' ').toUpperCase()}</span>
                  <Badge variant="outline">{prediction.confidence}% confidence</Badge>
                </CardTitle>
                <CardDescription>
                  {prediction.message} (Expected in {prediction.timeframe})
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium mb-2">Recommended Actions:</h4>
                    <ul className="text-sm space-y-1">
                      {prediction.recommendations.map((rec, i) => (
                        <li key={i} className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-current rounded-full"></span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="temple" size="sm" onClick={handleDeployStaff}>
                      Deploy Additional Staff
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleSendNotification}>
                      Send Pilgrim Notifications
                    </Button>
                    <Button variant="divine" size="sm" onClick={handleAIOptimization} disabled={isAnalyzing}>
                      {isAnalyzing ? (
                        <>
                          <Zap className="h-4 w-4 mr-2 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <TrendingUp className="h-4 w-4 mr-2" />
                          Get AI Optimization
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Real-time Notifications */}
      {notifications.length > 0 && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-blue-700">
              <CheckCircle className="h-5 w-5" />
              <span>Live Updates</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {notifications.slice(0, 3).map((notification) => (
                <div key={notification.id} className="flex items-center space-x-3 p-2 bg-white/60 rounded-lg">
                  <div className={`w-2 h-2 rounded-full ${
                    notification.type === 'success' ? 'bg-green-500' :
                    notification.type === 'warning' ? 'bg-yellow-500' :
                    notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Real-time Area Monitoring */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Camera className="h-5 w-5 text-spiritual-saffron" />
            <span>Real-time Area Monitoring</span>
          </CardTitle>
          <CardDescription>
            Live crowd density and queue management across temple areas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {crowdData.map((area, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-spiritual-deep-blue">{area.name}</h3>
                    <Badge variant={getStatusVariant(area.status)}>
                      {area.status.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{area.current}/{area.capacity}</span>
                    </div>
                    
                    <div className="flex-1 max-w-xs">
                      <Progress 
                        value={(area.current / area.capacity) * 100} 
                        className="h-2"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Gauge className="h-4 w-4" />
                      <span>Wait: {area.waitTime}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleAreaAction(area.name, 'View Live Feed')}
                  >
                    <Camera className="h-3 w-3 mr-1" />
                    View Feed
                  </Button>
                  {area.status === 'crowded' && (
                    <Button 
                      variant="emergency" 
                      size="sm"
                      onClick={() => handleAreaAction(area.name, 'Emergency Protocol')}
                    >
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Immediate Action
                    </Button>
                  )}
                  <Button 
                    variant="sacred" 
                    size="sm"
                    onClick={() => handleAreaAction(area.name, 'Optimize Flow')}
                  >
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Optimize
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-temple">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Crowd Control</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button 
              variant="temple" 
              className="w-full"
              onClick={() => handleAreaAction('All Areas', 'Activate Queue Management')}
            >
              <Users className="h-4 w-4 mr-2" />
              Activate Queue Management
            </Button>
            <Button 
              variant="sacred" 
              className="w-full"
              onClick={() => handleAreaAction('Entry Gates', 'Emergency Closure')}
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Emergency Gate Control
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-temple">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Communication</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button 
              variant="divine" 
              className="w-full"
              onClick={handleSendNotification}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Send Mass Alert
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => toast({ title: "Wait times updated", description: "All area wait times have been refreshed." })}
            >
              <Gauge className="h-4 w-4 mr-2" />
              Update Wait Times
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-temple">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">AI Assistance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button 
              variant="temple" 
              className="w-full"
              onClick={handleAIOptimization}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <Zap className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Brain className="h-4 w-4 mr-2" />
                  Get AI Optimization
                </>
              )}
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => toast({ title: "Report Generated", description: "Crowd prediction report has been compiled and sent to your dashboard." })}
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Prediction Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CrowdDashboard;