import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { availabilityService } from '../../services/availabilityService';
import { roleService } from '../../services/roleService';
import { AvailabilityCalendar } from '../../components/faculty/AvailabilityCalendar';
import { useNotifications } from '../../hooks/useNotifications';
import { Loader } from '../../components/common/Loader';
import { Calendar, Sparkles } from 'lucide-react';

export const MyAvailability = () => {
  const { user } = useAuth();
  const { addToast } = useNotifications();

  const [availability, setAvailability] = useState([]);
  const [assignedEvents, setAssignedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!user) return;
    try {
      const [avail, roles] = await Promise.all([
        availabilityService.getFacultyAvailability(user.id),
        roleService.getRolesByFaculty(user.id)
      ]);
      setAvailability(avail);
      setAssignedEvents(roles);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const handleUpdateStatus = async ({ date, status, note }) => {
    try {
      await availabilityService.setSlotStatus({
        facultyId: user.id,
        date,
        status,
        note
      });
      addToast({
        title: 'Availability Saved',
        message: `Status for ${date} updated to ${status}.`,
        type: 'success'
      });
      fetchData();
    } catch (err) {
      addToast({
        title: 'Error',
        message: err.message,
        type: 'danger'
      });
    }
  };

  if (loading) {
    return <Loader text="Loading availability schedule..." />;
  }

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span className="badge badge-success">Faculty Portal</span>
          <span className="badge badge-gemini">
            <Sparkles size={11} /> AI Calendar Sync
          </span>
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>My Availability Calendar</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
          Mark dates as Available, Busy, or On Leave. The Gemini AI engine checks these dates before recommending you as a substitute.
        </p>
      </div>

      <AvailabilityCalendar
        availability={availability}
        assignedEvents={assignedEvents}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
};

export default MyAvailability;
