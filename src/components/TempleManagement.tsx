import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, Users, Settings, Bell, CheckCircle, XCircle, AlertTriangle, Save, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TempleManagement = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="schedule" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="schedule">Schedules</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="staff">Staff</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule">
          <ScheduleManagement />
        </TabsContent>

        <TabsContent value="bookings">
          <BookingManagement />
        </TabsContent>

        <TabsContent value="staff">
          <StaffManagement />
        </TabsContent>

        <TabsContent value="settings">
          <TempleSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const ScheduleManagement = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const { toast } = useToast();

  const todaySchedule = [
    { time: '5:00 AM', event: 'Mangala Aarti', status: 'completed', capacity: 200, booked: 180 },
    { time: '12:00 PM', event: 'Madhyana Aarti', status: 'active', capacity: 300, booked: 245 },
    { time: '6:00 PM', event: 'Sandhya Aarti', status: 'upcoming', capacity: 500, booked: 420 },
    { time: '8:00 PM', event: 'Shayan Aarti', status: 'upcoming', capacity: 200, booked: 150 },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'active': return <Clock className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'upcoming': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default: return <XCircle className="h-4 w-4 text-red-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Date Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-spiritual-saffron" />
            <span>Daily Schedule Management</span>
          </CardTitle>
          <CardDescription>
            Manage temple timings, ceremonies, and capacity limits
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-4">
            <Input 
              type="date" 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-48"
            />
            <Button 
              variant="temple"
              onClick={() => toast({ title: "Add Event", description: "New event form opened." })}
            >
              Add New Event
            </Button>
            <Button 
              variant="outline"
              onClick={() => toast({ title: "Bulk Edit", description: "Bulk editing mode activated." })}
            >
              Bulk Edit
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Today's Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {todaySchedule.map((event, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center space-x-4">
                  {getStatusIcon(event.status)}
                  <div>
                    <h3 className="font-semibold text-spiritual-deep-blue">{event.time}</h3>
                    <p className="text-sm text-muted-foreground">{event.event}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-sm font-medium">{event.booked}/{event.capacity}</div>
                    <div className="text-xs text-muted-foreground">Bookings</div>
                  </div>
                  
                  <Badge variant={
                    event.status === 'completed' ? 'secondary' :
                    event.status === 'active' ? 'default' :
                    event.status === 'upcoming' ? 'secondary' : 'destructive'
                  }>
                    {event.status.toUpperCase()}
                  </Badge>

                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => toast({ title: "Edit Event", description: `Editing ${event.event}` })}
                    >
                      Edit
                    </Button>
                    {event.status === 'upcoming' && (
                      <Button 
                        variant="divine" 
                        size="sm"
                        onClick={() => toast({ title: "Event Started", description: `${event.event} has been started early.` })}
                      >
                        Start Early
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <Button 
              variant="temple" 
              className="w-full"
              onClick={() => toast({ title: "Schedule Update Sent", description: "All pilgrims have been notified of the latest schedule." })}
            >
              <Bell className="h-4 w-4 mr-2" />
              Send Schedule Update
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <Button 
              variant="sacred" 
              className="w-full"
              onClick={() => toast({ title: "Capacity Settings", description: "Opening capacity management panel." })}
            >
              <Settings className="h-4 w-4 mr-2" />
              Capacity Settings
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <Button 
              variant="divine" 
              className="w-full"
              onClick={() => toast({ title: "Festival Calendar", description: "Opening festival and special events calendar." })}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Festival Calendar
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const BookingManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const recentBookings = [
    { id: 'TMP001', pilgrim: 'Rajesh Kumar', event: 'Sandhya Aarti', time: '6:00 PM', status: 'confirmed', phone: '+91 98765 43210' },
    { id: 'TMP002', pilgrim: 'Priya Sharma', event: 'Madhyana Aarti', time: '12:00 PM', status: 'pending', phone: '+91 98765 43211' },
    { id: 'TMP003', pilgrim: 'Amit Patel', event: 'Mangala Aarti', time: '5:00 AM', status: 'cancelled', phone: '+91 98765 43212' },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-spiritual-saffron" />
            <span>Booking Management</span>
          </CardTitle>
          <CardDescription>
            View and manage digital darshan bookings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Input 
              placeholder="Search by booking ID or name..." 
              className="flex-1"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button 
              variant="temple"
              onClick={() => toast({ title: "Search Results", description: `Searching for: ${searchTerm}` })}
            >
              Search
            </Button>
            <Button 
              variant="outline"
              onClick={() => toast({ title: "Export Complete", description: "Booking data has been exported to CSV." })}
            >
              Export Data
            </Button>
          </div>

          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div>
                    <h3 className="font-semibold">{booking.pilgrim}</h3>
                    <p className="text-sm text-muted-foreground">ID: {booking.id}</p>
                    <p className="text-sm text-muted-foreground">{booking.phone}</p>
                  </div>
                </div>

                <div className="text-center">
                  <p className="font-medium">{booking.event}</p>
                  <p className="text-sm text-muted-foreground">{booking.time}</p>
                </div>

                <div className="flex items-center space-x-3">
                  <Badge variant={
                    booking.status === 'confirmed' ? 'secondary' :
                    booking.status === 'pending' ? 'default' : 'destructive'
                  }>
                    {booking.status.toUpperCase()}
                  </Badge>

                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => toast({ title: "Booking Details", description: `Viewing details for ${booking.pilgrim}` })}
                    >
                      View Details
                    </Button>
                    {booking.status === 'pending' && (
                      <Button 
                        variant="temple" 
                        size="sm"
                        onClick={() => toast({ title: "Booking Confirmed", description: `Confirmed booking for ${booking.pilgrim}` })}
                      >
                        Confirm
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const StaffManagement = () => {
  const { toast } = useToast();
  const staffMembers = [
    { name: 'Pandit Ramesh', role: 'Head Priest', status: 'on-duty', location: 'Main Sanctum', shift: '5 AM - 1 PM' },
    { name: 'Security Guard Suresh', role: 'Security', status: 'on-duty', location: 'Main Gate', shift: '9 AM - 6 PM' },
    { name: 'Volunteer Meera', role: 'Crowd Control', status: 'break', location: 'Queue Area', shift: '6 AM - 2 PM' },
    { name: 'Dr. Patel', role: 'Medical Officer', status: 'on-call', location: 'Medical Center', shift: '24/7' },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-spiritual-saffron" />
            <span>Staff Deployment</span>
          </CardTitle>
          <CardDescription>
            Monitor and manage staff allocation across temple areas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {staffMembers.map((staff, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <h3 className="font-semibold">{staff.name}</h3>
                  <p className="text-sm text-muted-foreground">{staff.role}</p>
                </div>

                <div className="text-center">
                  <p className="font-medium">{staff.location}</p>
                  <p className="text-sm text-muted-foreground">{staff.shift}</p>
                </div>

                <div className="flex items-center space-x-3">
                  <Badge variant={
                    staff.status === 'on-duty' ? 'secondary' :
                    staff.status === 'break' ? 'default' :
                    staff.status === 'on-call' ? 'secondary' : 'destructive'
                  }>
                    {staff.status.toUpperCase()}
                  </Badge>

                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => toast({ title: "Contacting Staff", description: `Calling ${staff.name}...` })}
                  >
                    Contact
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <Button 
              variant="temple"
              onClick={() => toast({ title: "Staff Deployment", description: "Additional staff have been notified and are en route." })}
            >
              Deploy Additional Staff
            </Button>
            <Button 
              variant="outline"
              onClick={() => toast({ title: "Staff Schedule", description: "Opening staff schedule management." })}
            >
              Staff Schedule
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const TempleSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    openingTime: '05:00',
    closingTime: '21:00',
    maxCapacity: 5000,
    advanceBookingDays: 7
  });

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Temple configuration has been updated successfully.",
    });
  };

  const handleReset = () => {
    setSettings({
      openingTime: '05:00',
      closingTime: '21:00',
      maxCapacity: 5000,
      advanceBookingDays: 7
    });
    toast({
      title: "Settings Reset",
      description: "Temple settings have been reset to default values.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Temple Configuration</CardTitle>
          <CardDescription>
            Manage temple operational settings and parameters
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Daily Opening Time</label>
              <Input 
                type="time" 
                value={settings.openingTime}
                onChange={(e) => setSettings({...settings, openingTime: e.target.value})}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Daily Closing Time</label>
              <Input 
                type="time" 
                value={settings.closingTime}
                onChange={(e) => setSettings({...settings, closingTime: e.target.value})}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Maximum Daily Capacity</label>
              <Input 
                type="number" 
                value={settings.maxCapacity}
                onChange={(e) => setSettings({...settings, maxCapacity: parseInt(e.target.value)})}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Advance Booking Days</label>
              <Input 
                type="number" 
                value={settings.advanceBookingDays}
                onChange={(e) => setSettings({...settings, advanceBookingDays: parseInt(e.target.value)})}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button 
              variant="temple"
              onClick={handleSaveSettings}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
            <Button 
              variant="outline"
              onClick={handleReset}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset to Default
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TempleManagement;