# Custom GPT Document Upload

A React application that enables users to upload documents and convert them into an interactive AI chatbot using RAG (Retrieval-Augmented Generation) technology.

## Features

- Secure file upload with AWS S3 integration
- Document processing with RAG technology
- Real-time upload status tracking
- User authentication and session management
- Responsive UI with animated illustrations
- Document requirements validation

## Technical Stack

- React.js
- Axios for API calls
- AWS Lambda (for presigned URLs and document processing)
- React Router for navigation
- Lucide React for icons
- Custom SVG animations

## API Endpoints

- Generate Presigned URL: `https://3l358jxbf5.execute-api.us-east-2.amazonaws.com/default/generate-presigned-url`
- Process Document: `https://3l358jxbf5.execute-api.us-east-2.amazonaws.com/default/process-document`
- User Management: `http://3.19.248.251:8080/api/users/`

## File Requirements

- Supported formats: PDF, DOCX
- Maximum file size: 10MB
- Must contain extractable text
- No images or scanned documents

## Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Install required packages:
```bash
npm install react-router-dom axios lucide-react react-bootstrap
```
4. Start the development server:
```bash
npm start
```

## Usage

1. Log in with your credentials
2. Click the file upload button to select a document
3. Submit the file for processing
4. Access your personalized AI chatbot through the provided link

## Security Features

- Secure file uploads using AWS presigned URLs
- User authentication
- Session management using localStorage
- Protected routes with React Router

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request