import React, { useState } from 'react';

const SocialMedia = ({ onClose, user, updateUser }) => { // Add updateUser to props
  const [socialLinks, setSocialLinks] = useState({
    linkedin: user?.social?.linkedin || '',
    twitter: user?.social?.twitter || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSocialLinks(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found. Please log in again.");
      }
      if (!user?._id) {
        throw new Error("User ID is missing. Please ensure you are logged in.");
      }

      console.log("Token:", token);
      console.log("User ID:", user._id);
      console.log("Social Links to Save:", socialLinks);

      const response = await fetch(
        `http://localhost:3000/api/v1/talent/update-profile/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ social: socialLinks }),
        }
      );

      console.log("Response Status:", response.status);
      
      const text = await response.text();
      console.log("Raw Response:", text);

      let result;
      try {
        result = JSON.parse(text);
      } catch (error) {
        console.error("Failed to parse response as JSON:", error);
        throw new Error("Invalid response format from server");
      }

      console.log("Parsed API Response:", result);

      if (result.success || result.status === "success") {
        updateUser({ ...user, social: socialLinks }); // Now updateUser is defined
        alert("Social media links updated successfully!");
        onClose();
      } else {
        alert(`Failed to update social media links: ${result.message || result.error || result.msg || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error saving social media links:", error);
      alert(`An error occurred while saving: ${error.message}`);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Social Media Links</h2>
        <p>Edit your social media links here</p>
        
        <div className="input-container social-media-input-container">
          <input 
            type="text" 
            name="linkedin"
            value={socialLinks.linkedin}
            onChange={handleChange}
            placeholder="LinkedIn URL" 
          />
        </div>
        <div className="input-container social-media-input-container">
          <input 
            type="text" 
            name="twitter"
            value={socialLinks.twitter}
            onChange={handleChange}
            placeholder="Twitter URL" 
          />
        </div>
        
        <div className="social-media-modal-actions">
          <button 
            className="cancel-btn"
            onClick={onClose}
          >
            Close
          </button>
          <button 
            className="save-btn"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialMedia;