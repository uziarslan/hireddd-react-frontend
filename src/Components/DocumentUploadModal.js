//Pop up for document uploading, this can probably be reused or for portfolio - Dylan
import React, { useState } from "react";

const DocumentUploadModal = ({ isOpen, onClose, onUpload, onDelete, documents = [] }) => {
  const [selectedFile, setSelectedFile] = useState(null); // Track uploaded file
  const [certificateName, setCertificateName] = useState(""); // Store user-entered certificate name

  const handleClose = () => {
    setCertificateName(""); // Clears the certificate name input
    setSelectedFile(null);   // Clears the uploaded file input
    onClose();               // Calls the parent function to close the modal
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add Certificate</h2>

        {/* File Name Input */}
        <div className="input-container">
          <input
            type="text"
            placeholder="Certificate Name"
            value={certificateName} 
            onChange={(e) => setCertificateName(e.target.value)}
            style={{ fontSize: "19px", fontWeight: "400", color: "#4a4a4a", margin: "0" 
            }}
          />
        </div>

        {/* File Upload Field */}
        <div className="input-container">
          <input
            type="file"
            id="fileUpload"
            className="hidden-file-input"
            onChange={(e) => setSelectedFile(e.target.files[0])} 
          />
          <span className="file-label">{selectedFile ? selectedFile.name : "Upload File"}</span>
          <img
            src={require("../Assets/images/paperclip-icon.svg").default} 
            alt="Upload Icon"
            className="attach-icon"
            onClick={() => document.getElementById("fileUpload").click()}
          />
        </div>
        

        {/* Display Uploaded Documents */}
        <div className="uploaded-docs">
          {documents.map((doc) => (
            <div key={doc._id} className="uploaded-doc">
              <img src={require("../Assets/images/pdf-icon.svg").default}  alt="PDF Icon" />
              <span className="doc-name">{doc.fileName || "Unnamed Document"}</span>
              <img 
                src={require("../Assets/images/trash-icon.svg").default}
                alt="Delete Icon" 
                className="delete-icon" 
                onClick={() => onDelete(doc._id)} 
              />
            </div>
          ))}
        </div>

        <div className="modal-actions">
          <button className="cancel-btn" onClick={handleClose}>Cancel</button>
          <button className="save-btn" onClick={() => {
              onUpload(certificateName, selectedFile); 
              handleClose();
            }}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentUploadModal;
