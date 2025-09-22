import { useState, useEffect, useCallback } from 'react';

export interface CrowdData {
  current: number;
  capacity: number;
  waitTime: string;
  status: 'normal' | 'high' | 'crowded';
}

export interface TempleArea {
  name: string;
  current: number;
  capacity: number;
  status: 'normal' | 'high' | 'crowded';
  waitTime: string;
  lastUpdated: Date;
}

export interface DarshanSlot {
  time: string;
  status: 'available' | 'filling' | 'full';
  wait: string;
  capacity: number;
  booked: number;
}

export interface Incident {
  id: string;
  type: 'medical' | 'crowd' | 'security' | 'fire';
  description: string;
  location: string;
  priority: 'low' | 'medium' | 'high';
  time: string;
  status: 'reported' | 'responding' | 'resolved';
}

export const useRealTimeData = () => {
  const [crowdData, setCrowdData] = useState<TempleArea[]>([
    { name: 'Main Sanctum', current: 245, capacity: 300, status: 'normal', waitTime: '12 min', lastUpdated: new Date() },
    { name: 'Pradakshina Path', current: 890, capacity: 1000, status: 'high', waitTime: '25 min', lastUpdated: new Date() },
    { name: 'Entry Gate', current: 156, capacity: 200, status: 'crowded', waitTime: '35 min', lastUpdated: new Date() },
    { name: 'Prasadam Hall', current: 78, capacity: 150, status: 'normal', waitTime: '5 min', lastUpdated: new Date() },
    { name: 'Parking Area', current: 420, capacity: 500, status: 'high', waitTime: 'N/A', lastUpdated: new Date() },
  ]);

  const [darshanSlots, setDarshanSlots] = useState<DarshanSlot[]>([
    { time: '6:00 AM', status: 'available', wait: '5 min', capacity: 200, booked: 45 },
    { time: '8:00 AM', status: 'filling', wait: '15 min', capacity: 300, booked: 245 },
    { time: '10:00 AM', status: 'full', wait: '45 min', capacity: 300, booked: 300 },
    { time: '12:00 PM', status: 'available', wait: '8 min', capacity: 400, booked: 120 },
    { time: '2:00 PM', status: 'available', wait: '12 min', capacity: 300, booked: 89 },
    { time: '4:00 PM', status: 'filling', wait: '25 min', capacity: 500, booked: 420 },
  ]);

  const [incidents, setIncidents] = useState<Incident[]>([
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
      status: 'reported'
    }
  ]);

  const [notifications, setNotifications] = useState<Array<{
    id: string;
    message: string;
    type: 'success' | 'warning' | 'info' | 'error';
    time: string;
  }>>([]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCrowdData(prev => prev.map(area => ({
        ...area,
        current: Math.max(0, area.current + Math.floor(Math.random() * 20 - 10)),
        lastUpdated: new Date(),
      })));

      // Add random notifications
      if (Math.random() > 0.7) {
        const messages = [
          'Main gate queue reduced by 30 people',
          'Special darshan booking now available',
          'Parking lot B is now 85% full',
          'Weather conditions favorable for next 3 hours',
          'AI prediction: Crowd surge expected in 45 minutes'
        ];
        
        setNotifications(prev => {
          const newNotification = {
            id: Date.now().toString(),
            message: messages[Math.floor(Math.random() * messages.length)],
            type: ['success', 'info', 'warning'][Math.floor(Math.random() * 3)] as any,
            time: 'Just now'
          };
          return [newNotification, ...prev.slice(0, 4)];
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const updateIncidentStatus = useCallback((incidentId: string, newStatus: string) => {
    setIncidents(prev => prev.map(incident => 
      incident.id === incidentId 
        ? { ...incident, status: newStatus as any }
        : incident
    ));
  }, []);

  const addIncident = useCallback((incident: Omit<Incident, 'id' | 'time'>) => {
    const newIncident: Incident = {
      ...incident,
      id: `INC${Date.now()}`,
      time: 'Just now'
    };
    setIncidents(prev => [newIncident, ...prev]);
  }, []);

  const bookDarshanSlot = useCallback((slotTime: string) => {
    setDarshanSlots(prev => prev.map(slot => 
      slot.time === slotTime && slot.status !== 'full'
        ? { ...slot, booked: slot.booked + 1, status: slot.booked + 1 >= slot.capacity ? 'full' : slot.status }
        : slot
    ));
  }, []);

  return {
    crowdData,
    darshanSlots,
    incidents,
    notifications,
    updateIncidentStatus,
    addIncident,
    bookDarshanSlot
  };
};