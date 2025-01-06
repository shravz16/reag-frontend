import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import { ExternalLink } from 'lucide-react';
import { Button, Modal } from "react-bootstrap";
function FileUpload() {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [uploadbox,setUploadBox]=useState(true);
  const [fileName, setFileName] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const navigate = useNavigate();
  const jbsn=JSON.parse(localStorage.getItem('user')).uniqueNumber;
  useEffect(() => {
    const checkFileStatus = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.uniqueNumber) return;
  
  
        // If fileCreatedAt is null, show upload box (true)
        // If fileCreatedAt has a value, hide upload box (false)
        console.log(user.filecreatedat === null||user.filecreatedat===undefined)
        setUploadBox(user.filecreatedat === null||user.filecreatedat===undefined);
        
      } catch (error) {
        console.error('Error checking file status:', error);
        // In case of error, show upload box by default
        setUploadBox(true);
      }
    };
  
    checkFileStatus();
  }, []);
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const name = selectedFile.name;
      setFileName(name);
      setText(name);
    }
  };

  const handleClick = async () => {
    if (!file) return;
    setUploadStatus('Uploading...');
    const jsn=JSON.parse(localStorage.getItem('user'));
    try {
      const response = await axios.post(
        'https://3l358jxbf5.execute-api.us-east-2.amazonaws.com/default/generate-presigned-url',
        {
          fileName: fileName,
          fileType: file.type,
          customerId: jsn.uniqueNumber
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      );

      const url = response.data.uploadURL;
      await axios.put(url, file, {
        headers: {
          "Content-Type": file.type
        }
      });

      await axios.post(
        'https://3l358jxbf5.execute-api.us-east-2.amazonaws.com/default/process-document',
        {
          documentLocation: jsn.uniqueNumber + '/' + fileName,
          customerId: jsn.uniqueNumber,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      );

      setUploadStatus('File uploaded successfully!');
      await axios.put(`http://localhost:8080/api/users/${jsn.id}`, {
        filecreatedat: new Date().toISOString()
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
      
      setTimeout(() => setUploadStatus(''), 3000);
      setTimeout(()=>setUploadBox(false),5000) ;

      jsn.filecreatedat=new Date().toISOString();
      console.log(JSON.stringify(jsn));
      localStorage.setItem('user',JSON.stringify(jsn))
    } catch (error) {
      console.error(error);
      setUploadStatus('Upload failed. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div ><h1 className='header'>Custom GPT</h1>
    
    <div className="App">
      {/* Logout button positioned absolutely at the top */}
      <button
        onClick={handleLogout}
        className="styled-button logout-button"
        style={{ 
          position: 'absolute',
          top: ' 40px',
          right: '20px',
          width: 'auto',
          padding: '8px 20px',
          backgroundColor: '#ef4444'
        }}
      >
        Logout
      </button>
      <h1 className='headcontent'>Turn your static documents into dynamic knowledge. Our AI-powered system doesn't just read your files – it understands them, creating a personalized chatbot that can discuss your documents in detail, from high-level concepts to specific details.</h1>
      <div class="illustration-container" style={{width: '100%', maxWidth: '600px', margin: '1rem auto'}}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
<rect width="400" height="300" fill="#6366f1"/>
<path d="M0 50 Q100 75 200 50 T400 50" fill="none" stroke="#FFFFFF" stroke-width="2" opacity="0.1"/>
<path d="M0 100 Q100 125 200 100 T400 100" fill="none" stroke="#FFFFFF" stroke-width="2" opacity="0.1"/>
<path d="M0 150 Q100 175 200 150 T400 150" fill="none" stroke="#FFFFFF" stroke-width="2" opacity="0.1"/>
<circle cx="200" cy="150" r="50" fill="#818cf8" opacity="0.9"/>
<path d="M175 125 Q200 100 225 125 T200 175" fill="none" stroke="#FFFFFF" stroke-width="3"/>
<g transform="translate(125,125)">
<rect x="0" y="0" width="30" height="40" fill="#FFFFFF" rx="3"/>
<line x1="5" y1="10" x2="25" y2="10" stroke="#6366f1" stroke-width="2"/>
<line x1="5" y1="20" x2="25" y2="20" stroke="#6366f1" stroke-width="2"/>
<line x1="5" y1="30" x2="15" y2="30" stroke="#6366f1" stroke-width="2"/>
</g>
<g transform="translate(245,125)">
<rect x="0" y="0" width="30" height="40" fill="#FFFFFF" rx="3"/>
<line x1="5" y1="10" x2="25" y2="10" stroke="#6366f1" stroke-width="2"/>
<line x1="5" y1="20" x2="25" y2="20" stroke="#6366f1" stroke-width="2"/>
<line x1="5" y1="30" x2="15" y2="30" stroke="#6366f1" stroke-width="2"/>
</g>
<path d="M155 145 L185 150" stroke="#FFFFFF" stroke-width="2" marker-end="url(#arrowhead)"/>
<path d="M245 145 L215 150" stroke="#FFFFFF" stroke-width="2" marker-start="url(#arrowhead)"/>
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
<polygon points="0 0, 10 3.5, 0 7" fill="#FFFFFF"/>
</marker>
</defs>
<circle cx="200" cy="150" r="60" fill="none" stroke="#FFFFFF" stroke-width="2" opacity="0.2">
<animate attributeName="r" values="60;70;60" dur="2s" repeatCount="indefinite"/>
<animate attributeName="opacity" values="0.2;0.1;0.2" dur="2s" repeatCount="indefinite"/>
</circle>
<circle cx="200" cy="150" r="70" fill="none" stroke="#FFFFFF" stroke-width="2" opacity="0.1">
<animate attributeName="r" values="70;80;70" dur="2s" repeatCount="indefinite"/>
<animate attributeName="opacity" values="0.1;0.05;0.1" dur="2s" repeatCount="indefinite"/>
</circle>
</svg></div>
<h1 className='headcontent'>Upload your documents to create a customized AI chatbot using RAG technology. Our system analyzes your content and creates an intelligent assistant that can answer questions, provide insights, and discuss your documents in detail.</h1><br></br>
<div>
  
    { uploadbox &&
      (<div className="App-content">
        
        <label htmlFor="file-input" className="styled-label">Input File:</label>
        <input
          id="file-input"
          name="file-input"
          type="file"
          className="styled-input-file"
          onChange={handleFileChange}
        />
        <br /><br />
        <button
          onClick={handleClick}
          className="styled-button"
          disabled={!file}
        >
          Click to send
        </button>
        {uploadStatus && (
          <div style={{
            marginTop: '1rem',
            padding: '0.75rem',
            borderRadius: '0.375rem',
            backgroundColor: uploadStatus.includes('failed') ? '#fee2e2' : '#d1fae5',
            color: uploadStatus.includes('failed') ? '#dc2626' : '#059669'
          }}>
            {uploadStatus}
          </div>
        )}
      </div>)}
   
      {
        !uploadbox && (<div ><button className='button-44'onClick={()=>{setUploadBox(true)}}>Want to upload new document?</button><br></br>
               <a
      href={`http://adfa407aa0ca74ef5b859fb051a82fb9-529934779.us-east-2.elb.amazonaws.com/?id=${jbsn}`}
      
      target="_blank"
      rel="noopener noreferrer"
    >
      Visit Website
      <ExternalLink className="w-4 h-4" />
    </a>
          </div>)
      }
    </div>
    <div className="file-upload-info bg-white p-6 rounded-lg shadow-sm">
 <h1 className="text-gray-800 font-semibold mb-4">File Requirements:</h1>
 <ul className="text-gray-600 space-y-2">
   <li className="flex items-center">
     <span className="mr-2">•</span>
     Accepted formats: PDF or DOCX
   </li>
   <li className="flex items-center">
     <span className="mr-2">•</span>
     Maximum file size: 10MB
   </li>
   <li className="flex items-center">
     <span className="mr-2">•</span>
     Must contain extractable text
   </li>
   <li className="flex items-center">
     <span className="mr-2">•</span>
     No images or scanned documents
   </li>
 </ul>
 

</div>
    </div>
    
    </div>
    
  );
}

export default FileUpload;