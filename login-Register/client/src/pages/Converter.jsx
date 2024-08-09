import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';
import './index.css';

const Converter = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFilePath, setUploadedFilePath] = useState(null);
  const [convertedFilePath, setConvertedFilePath] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleLogout = () => {
    navigate('/login');
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setSnackbarMessage('Please select a file to upload.');
      setSnackbarSeverity('warning');
      setSnackbarOpen(true);
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://localhost:8000/upload/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('File upload failed');
      }

      const data = await response.json();
      setSnackbarMessage(`File uploaded: ${data.filename}`);
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setUploadedFilePath(data.filepath);
    } catch (error) {
      console.error('Error uploading file:', error);
      setSnackbarMessage('Error uploading file. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleConvert = async () => {
    if (!uploadedFilePath) {
      setSnackbarMessage('Please upload a file first.');
      setSnackbarSeverity('warning');
      setSnackbarOpen(true);
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/convert/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filename: uploadedFilePath }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error data:', errorData);
        throw new Error(errorData.detail || 'Unknown error occurred during file conversion');
      }

      const data = await response.json();
      setSnackbarMessage('File converted successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setConvertedFilePath(data.output_path);
    } catch (error) {
      console.error('Error converting file:', error);
      setSnackbarMessage(`Error converting file: ${error.message || 'Unknown error occurred'}`);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleDownload = () => {
    if (!convertedFilePath) {
      setSnackbarMessage('No converted file available for download.');
      setSnackbarSeverity('warning');
      setSnackbarOpen(true);
      return;
    }

    window.location.href = `http://localhost:8000/download/?filepath=${convertedFilePath}`;
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="converter-container">
      <header className="header">
        <h1>FileConvert</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </header>
      <div className="upload-area">
        <input type="file" onChange={handleFileChange} />
        <small>Please upload a PDF or Word file to convert it to a text file.</small>
        <button className="upload-btn" onClick={handleUpload}>Upload File</button>
      </div>
      <div className="conversion-section">
        <button className="convert-btn" onClick={handleConvert}>Convert</button>
      </div>
      <button className="download-btn" onClick={handleDownload}>Download</button>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Converter;
