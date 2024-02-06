import React, { useState } from 'react';
import { useAuth } from '../../Context/AuthContext'; 
import { TbLogout2 } from "react-icons/tb";
import { LuUserCircle2 } from "react-icons/lu";
import './Profile.css';
interface ProfileProps {
  user: {
    email: string | null;
  };
}

/**
 * Profile component displays the current user's profile icon and email, with a dropdown menu for signing out.
 * It leverages the `useAuth` hook for authentication actions, specifically sign out functionality. The dropdown
 * menu's visibility is toggled by clicking the profile icon.
 *
 */

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const { signout } = useAuth();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleProfileClick = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleSignOut = () => {
    signout(); 
  };

  return (
    <div className="profile" onClick={handleProfileClick}>
      <span className="profile-icon"><LuUserCircle2 size={30}/></span>

      {isDropdownOpen && (
        <div className="dropdown">
          <ul>
            <li className="user-email">{user.email}</li>
            <li onClick={handleSignOut}> <TbLogout2/> Sign Out</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profile;
