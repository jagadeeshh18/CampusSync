import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Check, AlertCircle, Clock, Save } from 'lucide-react';
import { AVAILABILITY_STATUS } from '../../utils/constants';

export const AvailabilityCalendar = ({
  availability = [],
  assignedEvents = [],
  onUpdateStatus
}) => {
  // Calendar month state: November 2026 (matching event seed dates)
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(10); // 0-indexed: 10 is November
  const [selectedDay, setSelectedDay] = useState(null);
  const [slotStatus, setSlotStatus] = useState(AVAILABILITY_STATUS.AVAILABLE);
  const [slotNote, setSlotNote] = useState('');

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Helper to get number of days in month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Find record for day
  const getDayRecord = (day) => {
    const monthStr = String(currentMonth + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    const dateStr = `${currentYear}-${monthStr}-${dayStr}`;

    const record = availability.find((a) => a.date === dateStr);
    const eventOnDay = assignedEvents.find((ae) => {
      const eDate = ae.event?.startDate?.split('T')[0];
      return eDate === dateStr;
    });

    return { dateStr, record, eventOnDay };
  };

  const handleDayClick = (day) => {
    const { dateStr, record } = getDayRecord(day);
    setSelectedDay(dateStr);
    setSlotStatus(record?.status || AVAILABILITY_STATUS.AVAILABLE);
    setSlotNote(record?.note || '');
  };

  const handleSaveDayStatus = async () => {
    if (!selectedDay) return;
    await onUpdateStatus({
      date: selectedDay,
      status: slotStatus,
      note: slotNote
    });
    setSelectedDay(null);
  };

  return (
    <div className="glass-panel" style={{ padding: '28px', borderRadius: 'var(--radius-xl)' }}>
      {/* Month Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'rgba(99, 102, 241, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary-500)'
            }}
          >
            <CalendarIcon size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
              {monthNames[currentMonth]} {currentYear}
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Click any date to update your availability status
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={handlePrevMonth}
            className="btn btn-secondary btn-sm"
            aria-label="Previous month"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={handleNextMonth}
            className="btn btn-secondary btn-sm"
            aria-label="Next month"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Weekday Labels */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '8px',
          textAlign: 'center',
          fontWeight: 600,
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          marginBottom: '8px'
        }}
      >
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>

      {/* Days Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '8px'
        }}
      >
        {/* Leading empty days */}
        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
          <div
            key={`empty-${i}`}
            style={{
              height: '84px',
              background: 'rgba(255, 255, 255, 0.01)',
              borderRadius: 'var(--radius-md)',
              border: '1px dashed var(--border-subtle)'
            }}
          />
        ))}

        {/* Days of month */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const { dateStr, record, eventOnDay } = getDayRecord(day);
          const isSelected = selectedDay === dateStr;

          let badgeColor = 'transparent';
          let statusText = '';
          if (record?.status === 'leave') {
            badgeColor = 'var(--danger-bg)';
            statusText = 'On Leave';
          } else if (record?.status === 'busy') {
            badgeColor = 'var(--warning-bg)';
            statusText = 'Busy';
          } else if (record?.status === 'available') {
            badgeColor = 'var(--success-bg)';
            statusText = 'Available';
          }

          return (
            <div
              key={day}
              onClick={() => handleDayClick(day)}
              style={{
                height: '84px',
                padding: '8px',
                borderRadius: 'var(--radius-md)',
                background: isSelected ? 'rgba(99, 102, 241, 0.15)' : 'var(--bg-secondary)',
                border: isSelected
                  ? '2px solid var(--primary-500)'
                  : eventOnDay
                  ? '1px solid #818cf8'
                  : '1px solid var(--border-subtle)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.15s'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{day}</span>
                {record?.status && (
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background:
                        record.status === 'leave'
                          ? '#ef4444'
                          : record.status === 'busy'
                          ? '#f59e0b'
                          : '#10b981'
                    }}
                  />
                )}
              </div>

              <div>
                {eventOnDay && (
                  <div
                    style={{
                      fontSize: '0.68rem',
                      background: 'rgba(99, 102, 241, 0.25)',
                      color: '#a5b4fc',
                      padding: '2px 4px',
                      borderRadius: '4px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      fontWeight: 600,
                      marginBottom: '2px'
                    }}
                    title={eventOnDay.title}
                  >
                    🎯 {eventOnDay.title}
                  </div>
                )}
                {statusText && (
                  <div
                    style={{
                      fontSize: '0.65rem',
                      color:
                        record.status === 'leave'
                          ? '#f87171'
                          : record.status === 'busy'
                          ? '#fbbf24'
                          : '#34d399',
                      fontWeight: 500
                    }}
                  >
                    {statusText}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginTop: '20px',
          paddingTop: '16px',
          borderTop: '1px solid var(--border-subtle)',
          fontSize: '0.8rem',
          color: 'var(--text-secondary)',
          flexWrap: 'wrap'
        }}
      >
        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Legend:</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
          Available
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
          Busy
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
          On Leave
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '12px', height: '10px', borderRadius: '3px', background: 'rgba(99, 102, 241, 0.4)' }} />
          Assigned Event Role
        </div>
      </div>

      {/* Day Status Edit Drawer/Modal */}
      {selectedDay && (
        <div
          style={{
            marginTop: '20px',
            padding: '16px 20px',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-medium)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '14px',
            animation: 'scaleUp 150ms ease'
          }}
        >
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>
              Set Availability for {selectedDay}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Faculty availability directly influences Gemini AI substitution compatibility rankings
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <select
              value={slotStatus}
              onChange={(e) => setSlotStatus(e.target.value)}
              className="form-select"
              style={{ width: '140px', height: '36px', fontSize: '0.82rem' }}
            >
              <option value={AVAILABILITY_STATUS.AVAILABLE}>Available</option>
              <option value={AVAILABILITY_STATUS.BUSY}>Busy</option>
              <option value={AVAILABILITY_STATUS.LEAVE}>On Leave</option>
            </select>

            <input
              type="text"
              placeholder="Optional note (e.g. In lab)"
              value={slotNote}
              onChange={(e) => setSlotNote(e.target.value)}
              className="form-input"
              style={{ width: '180px', height: '36px', fontSize: '0.82rem' }}
            />

            <button
              onClick={handleSaveDayStatus}
              className="btn btn-primary btn-sm"
              style={{ height: '36px' }}
            >
              <Save size={14} /> Update Date
            </button>
            <button
              onClick={() => setSelectedDay(null)}
              className="btn btn-secondary btn-sm"
              style={{ height: '36px' }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvailabilityCalendar;
