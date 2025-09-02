import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

const Profile = () => {
  const { currentUser, userProfile, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: currentUser?.email || '',
    bio: '',
    phone: '',
    location: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (userProfile) {
      setFormData(prev => ({
        ...prev,
        username: userProfile.username || '',
        email: currentUser?.email || '',
        bio: userProfile.bio || '',
        phone: userProfile.phone || '',
        location: userProfile.location || ''
      }));
    }
  }, [userProfile, currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const updatedProfile = updateProfile(formData);
      if (updatedProfile) {
        setMessage('Profile updated successfully!');
        toast.success('Profile updated successfully!');
        setIsEditing(false);
      }
    } catch (error) {
      setError('Failed to update profile: ' + error.message);
      toast.error('Failed to update profile.');
    }
  };

  const handleCancel = () => {
    setFormData({
      username: userProfile?.username || '',
      email: currentUser?.email || '',
      bio: userProfile?.bio || '',
      phone: userProfile?.phone || '',
      location: userProfile?.location || ''
    });
    setIsEditing(false);
    setError('');
    setMessage('');
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
          <p>Please sign in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Your Profile</h1>
          <p className="text-gray-500 mt-2">Manage your account information</p>
        </div>

        <div className="bg-base-200 shadow rounded-lg p-6 md:p-8">
          {message && (
            <div className="alert alert-success mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{message}</span>
            </div>
          )}

          {error && (
            <div className="alert alert-error mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile Image Section */}
            <div className="md:w-1/3 flex flex-col items-center">
              <div className="avatar mb-4">
                <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img 
                    src={currentUser.photoURL || `https://ui-avatars.com/api/?name=${formData.username || currentUser.email}&background=random`} 
                    alt="Profile" 
                  />
                </div>
              </div>
              
              <div className="text-center mt-4">
                <h2 className="text-xl font-semibold">{formData.username || currentUser.email.split('@')[0]}</h2>
                <p className="text-gray-500">{currentUser.email}</p>
                <div className="badge badge-primary badge-outline mt-2">
                  {currentUser.emailVerified ? 'Verified' : 'Not Verified'}
                </div>
              </div>
            </div>

            {/* Profile Form Section */}
            <div className="md:w-2/3">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Username</span>
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="input input-bordered"
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      className="input input-bordered bg-gray-100"
                      disabled
                    />
                    <label className="label">
                      <span className="label-text-alt">Email cannot be changed</span>
                    </label>
                  </div>
                </div>

                <div className="form-control mb-6">
                  <label className="label">
                    <span className="label-text">Bio</span>
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="textarea textarea-bordered h-24"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Phone</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="input input-bordered"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Location</span>
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="input input-bordered"
                      placeholder="City, Country"
                    />
                  </div>
                </div>

                <div className="form-control mb-6">
                  <label className="label">
                    <span className="label-text">Account Created</span>
                  </label>
                  <input
                    type="text"
                    value={new Date(currentUser.metadata.creationTime).toLocaleDateString()}
                    className="input input-bordered bg-gray-100"
                    disabled
                  />
                </div>

                <div className="flex flex-wrap gap-4 justify-end">
                  {!isEditing ? (
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="btn btn-primary"
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="btn btn-ghost"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn btn-primary"
                      >
                        Save Changes
                      </button>
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Account Information Card */}
        <div className="bg-base-200 shadow rounded-lg p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4">Account Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p><strong>User ID:</strong></p>
              <p className="text-sm text-gray-500 break-all">{currentUser.uid}</p>
            </div>
            <div>
              <p><strong>Provider:</strong></p>
              <p className="text-gray-500">
                {currentUser.providerData && currentUser.providerData[0]?.providerId.replace('.com', '')}
              </p>
            </div>
            <div>
              <p><strong>Last Sign In:</strong></p>
              <p className="text-gray-500">
                {new Date(currentUser.metadata.lastSignInTime).toLocaleString()}
              </p>
            </div>
            <div>
              <p><strong>Email Verified:</strong></p>
              <p className="text-gray-500">
                {currentUser.emailVerified ? 'Yes' : 'No'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;