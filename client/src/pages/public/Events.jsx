import React, { useState, useEffect } from 'react';
import { eventService } from '../../services/eventService';
import { roleService } from '../../services/roleService';
import { EventList } from '../../components/events/EventList';
import { EventFilter } from '../../components/events/EventFilter';
import { useDebounce } from '../../hooks/useDebounce';
import { Calendar, Sparkles } from 'lucide-react';

export const Events = () => {
  const [events, setEvents] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [rolesMap, setRolesMap] = useState({});
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedClub, setSelectedClub] = useState('');

  const debouncedSearch = useDebounce(searchQuery, 250);

  useEffect(() => {
    const fetchClubs = async () => {
      const clubData = await eventService.getClubs();
      setClubs(clubData);
    };
    fetchClubs();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const [evts, roles] = await Promise.all([
          eventService.getEvents({
            search: debouncedSearch,
            category: selectedCategory,
            clubId: selectedClub
          }),
          roleService.getAllRoles()
        ]);
        setEvents(evts);

        const rMap = {};
        roles.forEach((r) => {
          rMap[r.eventId] = (rMap[r.eventId] || 0) + 1;
        });
        setRolesMap(rMap);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [debouncedSearch, selectedCategory, selectedClub]);

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '3rem' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span className="badge badge-primary">College Calendar</span>
          <span className="badge badge-gemini">
            <Sparkles size={11} /> AI Role Verified
          </span>
        </div>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800 }}>Explore College Events</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Browse official university events, inspect assigned faculty juries, and register online.
        </p>
      </div>

      {/* Filter Component */}
      <EventFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        clubs={clubs}
        selectedClub={selectedClub}
        onClubChange={setSelectedClub}
      />

      {/* Header bar with count */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.25rem',
          fontSize: '0.85rem',
          color: 'var(--text-muted)'
        }}
      >
        <span>
          Showing <strong style={{ color: 'var(--text-primary)' }}>{events.length}</strong> college event{events.length === 1 ? '' : 's'}
        </span>
      </div>

      {/* Events Grid */}
      <EventList events={events} loading={loading} rolesMap={rolesMap} />
    </div>
  );
};

export default Events;
