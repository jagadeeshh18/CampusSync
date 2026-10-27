import React from 'react';
import { EVENT_CATEGORIES } from '../../utils/constants';
import { SearchBar } from '../common/SearchBar';
import { Filter, Layers } from 'lucide-react';

export const EventFilter = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  clubs = [],
  selectedClub,
  onClubChange
}) => {
  return (
    <div
      className="glass-panel"
      style={{
        padding: '20px',
        marginBottom: '2rem',
        borderRadius: 'var(--radius-lg)'
      }}
    >
      {/* Top Search & Club Selector */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '16px',
          alignItems: 'center',
          marginBottom: '16px'
        }}
        className="filter-grid"
      >
        <SearchBar
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Search by event title, venue, or keyword..."
        />

        {clubs.length > 0 && (
          <div style={{ minWidth: '200px' }}>
            <select
              value={selectedClub || ''}
              onChange={(e) => onClubChange(e.target.value)}
              className="form-select"
              style={{ height: '44px' }}
            >
              <option value="">All Clubs & Chapters</option>
              {clubs.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Category Pills */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '4px'
        }}
      >
        <span
          style={{
            fontSize: '0.8rem',
            fontWeight: 600,
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            marginRight: '6px',
            flexShrink: 0
          }}
        >
          <Filter size={13} /> Categories:
        </span>
        {EVENT_CATEGORIES.map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              style={{
                background: isSelected ? 'var(--primary-gradient)' : 'var(--bg-secondary)',
                color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                border: isSelected ? 'none' : '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-full)',
                padding: '5px 14px',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s'
              }}
            >
              {category}
            </button>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .filter-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default EventFilter;
