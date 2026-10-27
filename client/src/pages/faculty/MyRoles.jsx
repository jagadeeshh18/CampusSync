import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { roleService } from '../../services/roleService';
import { MyAssignments } from '../../components/faculty/MyAssignments';
import { UnavailableModal } from '../../components/faculty/UnavailableModal';
import { useNotifications } from '../../hooks/useNotifications';
import { useSocket } from '../../hooks/useSocket';
import { Loader } from '../../components/common/Loader';
import { UserCheck, Sparkles } from 'lucide-react';

export const MyRoles = () => {
  const { user } = useAuth();
  const socket = useSocket();
  const { addToast } = useNotifications();

  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchRoles = async () => {
    if (!user) return;
    try {
      const data = await roleService.getRolesByFaculty(user.id);
      setRoles(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, [user]);

  const handleOpenModal = (role) => {
    setSelectedRole(role);
    setModalOpen(true);
  };

  const handleSubmitUnavailable = async (roleId, reason) => {
    try {
      await roleService.reportUnavailability(roleId, user.id, reason);
      addToast({
        title: 'Unavailability Submitted',
        message: 'Organizers alerted and Gemini AI substitute matching initiated.',
        type: 'warning'
      });
      socket.emit('ROLE_UPDATED', { roleId, message: 'Faculty reported unavailable.' });
      fetchRoles();
    } catch (err) {
      addToast({
        title: 'Error',
        message: err.message,
        type: 'danger'
      });
    }
  };

  if (loading) {
    return <Loader text="Loading your assigned roles..." />;
  }

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span className="badge badge-success">Faculty Portal</span>
          <span className="badge badge-gemini">
            <Sparkles size={11} /> Role Governance
          </span>
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>My Institutional Roles</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
          Manage your designated responsibilities as Judge, Coordinator, Session Chair, or Evaluator.
        </p>
      </div>

      <MyAssignments assignments={roles} onReportUnavailable={handleOpenModal} />

      <UnavailableModal
        role={selectedRole}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmitUnavailable}
      />
    </div>
  );
};

export default MyRoles;
