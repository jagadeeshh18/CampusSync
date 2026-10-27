import React from 'react';
import { useNotifications } from '../../hooks/useNotifications';
import { CheckCircle2, AlertCircle, Info, Sparkles, X } from 'lucide-react';

export const Toast = () => {
  const { toasts, removeToast } = useNotifications();

  if (!toasts.length) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '380px',
        width: '100%',
        pointerEvents: 'none'
      }}
    >
      {toasts.map((toast) => {
        let icon = <Info size={18} color="#06b6d4" />;
        let borderColor = 'rgba(6, 182, 212, 0.4)';
        let bgGlow = 'rgba(6, 182, 212, 0.12)';

        if (toast.type === 'success') {
          icon = <CheckCircle2 size={18} color="#10b981" />;
          borderColor = 'rgba(16, 185, 129, 0.4)';
          bgGlow = 'rgba(16, 185, 129, 0.12)';
        } else if (toast.type === 'warning' || toast.type === 'danger') {
          icon = <AlertCircle size={18} color="#f59e0b" />;
          borderColor = 'rgba(245, 158, 11, 0.4)';
          bgGlow = 'rgba(245, 158, 11, 0.12)';
        } else if (toast.type === 'ai') {
          icon = <Sparkles size={18} color="#c084fc" />;
          borderColor = 'rgba(192, 132, 252, 0.4)';
          bgGlow = 'rgba(192, 132, 252, 0.15)';
        }

        return (
          <div
            key={toast.id}
            className="glass-panel"
            style={{
              pointerEvents: 'auto',
              padding: '12px 16px',
              borderLeft: `4px solid ${borderColor}`,
              backgroundColor: 'var(--bg-surface)',
              background: `linear-gradient(135deg, ${bgGlow}, var(--bg-surface))`,
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              boxShadow: 'var(--shadow-lg)',
              animation: 'scaleUp 200ms ease'
            }}
          >
            <div style={{ marginTop: '2px', flexShrink: 0 }}>{icon}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                {toast.title}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                {toast.message}
              </div>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '2px'
              }}
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Toast;
