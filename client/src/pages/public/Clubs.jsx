import React, { useState, useEffect } from 'react';
import { eventService } from '../../services/eventService';
import { ClubList } from '../../components/clubs/ClubList';
import { SearchBar } from '../../components/common/SearchBar';
import { useDebounce } from '../../hooks/useDebounce';
import { Building2, Users } from 'lucide-react';

export const Clubs = () => {
  const [clubs, setClubs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const debouncedSearch = useDebounce(searchQuery, 250);

  useEffect(() => {
    const fetchClubs = async () => {
      setLoading(true);
      try {
        const data = await eventService.getClubs();
        if (debouncedSearch) {
          const q = debouncedSearch.toLowerCase();
          setClubs(
            data.filter(
              (c) =>
                c.name.toLowerCase().includes(q) ||
                c.category.toLowerCase().includes(q) ||
                c.description.toLowerCase().includes(q)
            )
          );
        } else {
          setClubs(data);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchClubs();
  }, [debouncedSearch]);

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '3rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <span className="badge badge-primary" style={{ marginBottom: '6px' }}>
          Campus Ecosystem
        </span>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800 }}>Student Clubs &amp; Chapters</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Explore student societies, technical chapters, and cultural organizations across campus.
        </p>
      </div>

      <div style={{ maxWidth: '480px', marginBottom: '2rem' }}>
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by club name or category..."
        />
      </div>

      <ClubList clubs={clubs} loading={loading} />
    </div>
  );
};

export default Clubs;
