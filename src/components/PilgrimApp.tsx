import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, MapPin, Calendar, QrCode, Bell, Heart, Navigation, Users, Car, Phone, Globe, Wifi } from 'lucide-react';
import { useRealTimeData } from '@/hooks/useRealTimeData';
import { useLocation } from '@/hooks/useLocation';
import { useToast } from '@/hooks/use-toast';

const PilgrimApp = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const { darshanSlots, notifications, bookDarshanSlot } = useRealTimeData();
  const { currentLocation, getNearbyFacilities, openInMaps } = useLocation();
  const { toast } = useToast();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Welcome Header */}
      <Card className="bg-gradient-temple text-white shadow-divine">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Welcome, Devotee</h2>
              <p className="text-white/90">Plan your divine journey with ease</p>
            </div>
            <Heart className="h-12 w-12 animate-float" />
          </div>
        </CardContent>
      </Card>

      {/* Language Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>🕉️</span>
            <span>Select Your Language / भाषा चुनें</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['English', 'हिंदी', 'ગુજરાતી', 'मराठी'].map((lang) => (
              <Button
                key={lang}
                variant={selectedLanguage === lang.toLowerCase() ? 'temple' : 'outline'}
                onClick={() => setSelectedLanguage(lang.toLowerCase())}
              >
                {lang}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Features */}
      <Tabs defaultValue="booking" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="booking">Darshan Booking</TabsTrigger>
          <TabsTrigger value="live">Live Status</TabsTrigger>
          <TabsTrigger value="navigation">Navigation</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
        </TabsList>

        <TabsContent value="booking">
          <DarshanBooking />
        </TabsContent>

        <TabsContent value="live">
          <LiveStatus />
        </TabsContent>

        <TabsContent value="navigation">
          <NavigationHelp />
        </TabsContent>

        <TabsContent value="services">
          <PilgrimServices />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const DarshanBooking = () => {
  const { darshanSlots, bookDarshanSlot } = useRealTimeData();
  const { toast } = useToast();
  const [selectedTemple, setSelectedTemple] = useState('somnath');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const handleBooking = async (slotTime: string) => {
    setSelectedSlot(slotTime);
    bookDarshanSlot(slotTime);
    toast({
      title: "Booking Confirmed!",
      description: `Your darshan is booked for ${slotTime} at ${selectedTemple.charAt(0).toUpperCase() + selectedTemple.slice(1)} Temple`,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-spiritual-saffron" />
            <span>Book Your Darshan</span>
          </CardTitle>
          <CardDescription>
            Skip the queue with advance booking
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Select Temple</label>
              <select 
                className="w-full p-2 border border-border rounded-md"
                value={selectedTemple}
                onChange={(e) => setSelectedTemple(e.target.value)}
              >
                <option value="somnath">Somnath Temple</option>
                <option value="dwarka">Dwarka Temple</option>
                <option value="ambaji">Ambaji Temple</option>
                <option value="pavagadh">Pavagadh Temple</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Select Date</label>
              <Input 
                type="date" 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Time Slot</label>
              <select className="w-full p-2 border border-border rounded-md">
                <option>6:00 AM - 8:00 AM</option>
                <option>8:00 AM - 10:00 AM</option>
                <option>10:00 AM - 12:00 PM</option>
                <option>12:00 PM - 2:00 PM</option>
                <option>2:00 PM - 4:00 PM</option>
                <option>4:00 PM - 6:00 PM</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              variant="temple" 
              className="flex-1"
              onClick={() => selectedSlot && handleBooking(selectedSlot)}
              disabled={!selectedSlot}
            >
              <QrCode className="h-4 w-4 mr-2" />
              {selectedSlot ? `Book ${selectedSlot}` : 'Select Time Slot'}
            </Button>
            <Button 
              variant="outline"
              onClick={() => toast({ title: "Availability Updated", description: "Latest slot availability has been refreshed." })}
            >
              <Wifi className="h-4 w-4 mr-2" />
              Check Availability
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Available Slots */}
      <Card>
        <CardHeader>
          <CardTitle>Available Time Slots</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {darshanSlots.map((slot) => (
              <Card 
                key={slot.time} 
                className={`cursor-pointer transition-all hover:shadow-lg border-2 ${
                  selectedSlot === slot.time ? 'border-spiritual-saffron bg-spiritual-saffron/10' :
                  slot.status === 'full' ? 'opacity-50 cursor-not-allowed border-gray-300' : 
                  'border-transparent hover:border-spiritual-saffron/50'
                }`}
                onClick={() => slot.status !== 'full' && setSelectedSlot(slot.time)}
              >
                <CardContent className="p-4 text-center">
                  <div className="font-semibold">{slot.time}</div>
                  <Badge variant={slot.status === 'available' ? 'success' : 
                                 slot.status === 'filling' ? 'warning' : 'destructive'}>
                    {slot.status}
                  </Badge>
                  <div className="text-sm text-muted-foreground mt-1">
                    Wait: {slot.wait}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {slot.booked}/{slot.capacity}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const LiveStatus = () => {
  const { notifications } = useRealTimeData();
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-spiritual-saffron" />
            <span>Live Temple Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                <span>Current Queue Length</span>
                <Badge variant="secondary">245 people</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                <span>Estimated Wait Time</span>
                <Badge variant="secondary">45 minutes</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                <span>Temple Status</span>
                <Badge variant="secondary">Open</Badge>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                <span>Parking Availability</span>
                <Badge variant="destructive">22% Available</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                <span>Weather Conditions</span>
                <Badge variant="secondary">Clear ☀️</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                <span>Special Events</span>
                <Badge variant="secondary">Evening Aarti 6 PM</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Real-time Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-spiritual-saffron" />
            <span>Live Updates</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {notifications.slice(0, 5).map((update, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-muted/20 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  update.type === 'success' ? 'bg-green-500' :
                  update.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm">{update.message}</p>
                  <p className="text-xs text-muted-foreground">{update.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const NavigationHelp = () => {
  const { currentLocation, openInMaps, getNearbyFacilities } = useLocation();
  const { toast } = useToast();
  const nearbyParking = getNearbyFacilities('parking');

  const handleNavigation = (destination: string) => {
    if (!currentLocation) {
      toast({
        title: "Location Required",
        description: "Please enable location services to use navigation features.",
        variant: "destructive"
      });
      return;
    }
    openInMaps(destination as any);
    toast({
      title: "Navigation Started",
      description: `Opening directions to ${destination} in your maps app.`,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Navigation className="h-5 w-5 text-spiritual-saffron" />
            <span>Temple Navigation</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Button 
              variant="temple" 
              className="h-20"
              onClick={() => handleNavigation('somnath')}
            >
              <div className="text-center">
                <MapPin className="h-6 w-6 mx-auto mb-2" />
                <div>Navigate to Temple</div>
                <div className="text-xs opacity-75">Get live directions</div>
              </div>
            </Button>
            
            <Button 
              variant="divine" 
              className="h-20"
              onClick={() => {
                if (nearbyParking.length > 0) {
                  const availableParking = nearbyParking.find(p => p.available);
                  if (availableParking) {
                    handleNavigation(availableParking.name);
                  } else {
                    toast({
                      title: "Parking Full",
                      description: "All nearby parking lots are currently full. Try again later.",
                      variant: "destructive"
                    });
                  }
                }
              }}
            >
              <div className="text-center">
                <Car className="h-6 w-6 mx-auto mb-2" />
                <div>Find Parking</div>
                <div className="text-xs opacity-75">Available spots nearby</div>
              </div>
            </Button>
            
            <Button 
              variant="sacred" 
              className="h-20"
              onClick={() => toast({
                title: "Accessibility Routes",
                description: "Wheelchair and senior-friendly paths are highlighted in your navigation.",
              })}
            >
              <div className="text-center">
                <Users className="h-6 w-6 mx-auto mb-2" />
                <div>Accessibility Routes</div>
                <div className="text-xs opacity-75">Barrier-free paths</div>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-20"
              onClick={() => toast({
                title: "Emergency Contacts",
                description: "Temple Security: +91 79XXX XXXXX\nMedical: 108\nPolice: 100",
              })}
            >
              <div className="text-center">
                <Phone className="h-6 w-6 mx-auto mb-2" />
                <div>Emergency Contacts</div>
                <div className="text-xs opacity-75">24/7 support</div>
              </div>
            </Button>
          </div>

          {/* Nearby Facilities */}
          <div className="mt-6">
            <h3 className="font-semibold mb-3">Nearby Facilities</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {getNearbyFacilities().slice(0, 4).map((facility, index) => (
                <Card key={index} className="cursor-pointer hover:shadow-md transition-all">
                  <CardContent className="p-3 text-center">
                    <div className="text-sm font-medium">{facility.name}</div>
                    <div className="text-xs text-muted-foreground">{facility.distance}</div>
                    {facility.available !== undefined && (
                      <Badge variant={facility.available ? 'success' : 'destructive'} className="mt-1">
                        {facility.available ? 'Available' : 'Full'}
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const PilgrimServices = () => {
  const { toast } = useToast();

  const handleServiceClick = (serviceName: string) => {
    toast({
      title: `${serviceName} Service`,
      description: `Connecting you to ${serviceName.toLowerCase()} services...`,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Available Services</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'Prasadam Booking', desc: 'Pre-order sacred food', icon: '🍽️' },
              { title: 'Accommodation', desc: 'Book nearby dharmshalas', icon: '🏠' },
              { title: 'Taxi Services', desc: 'Reliable transport options', icon: '🚕' },
              { title: 'Medical Aid', desc: 'First aid and medical help', icon: '🏥' },
              { title: 'Lost & Found', desc: 'Report or find lost items', icon: '🔍' },
              { title: 'Donations', desc: 'Secure online donations', icon: '💰' },
            ].map((service, index) => (
              <Card 
                key={index} 
                className="cursor-pointer hover:shadow-lg transition-all border-2 border-transparent hover:border-spiritual-saffron/30"
                onClick={() => handleServiceClick(service.title)}
              >
                <CardContent className="p-4 text-center">
                  <div className="text-2xl mb-2">{service.icon}</div>
                  <h3 className="font-semibold mb-1">{service.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{service.desc}</p>
                  <Button variant="outline" size="sm" className="w-full">
                    Access Service
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PilgrimApp;