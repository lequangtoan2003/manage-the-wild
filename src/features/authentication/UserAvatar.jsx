import { useNavigate } from 'react-router-dom';
import { useUser } from './useUser';

export default function UserAvatar() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { fullName = 'Unknown User', avatar = '/default-user.jpg' } =
    user?.user_metadata || {};

  return (
    <button
      onClick={() => navigate('/account')}
      className="flex items-center gap-2"
    >
      <img
        src={avatar}
        alt={`${fullName}'s avatar`}
        className="h-10 w-10 rounded-full object-cover"
        onError={(e) => {
          e.currentTarget.src = '/default-user.jpg';
        }}
      />
      <span className="text-sm font-semibold">{fullName}</span>
    </button>
  );
}
