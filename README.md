Netflix Clone Frontend (React)

This is the frontend for a Netflix Clone application, built using React. It consumes the Django REST API backend and displays movies, images, and videos.

Features

User Authentication

Login and logout using backend API

Conditional rendering based on superuser status

Movie Management

Browse all movies

Play video trailers

Display movie images

Admin Features

Superuser can access admin-only pages (via backend)

Tech Stack

Frontend: React, React Router

State Management: useState, useEffect

Styling: CSS

Media Handling: HTML5 video and image tags

API Requests: Axios

Prerequisites

Node.js 20+

NPM or Yarn

Backend running locally (or deployed)

Setup Instructions
1. Clone the repository
git clone https://github.com/swagath088/netflix-clone-django-react.git
cd netflix-clone-django-react
2. Install dependencies
npm install
# or
yarn install

3. Add sample media

Add small sample media to demonstrate the app:

media_sample/
├── images/
│   └── sample.jpg
└── movies/
    └── sample.mp4


images/sample.jpg → example movie poster

movies/sample.mp4 → example trailer video

4. Run the frontend
npm start
# or
yarn start


App runs on: http://localhost:3000

Connects to backend API at: http://127.0.0.1:8000

5. Notes

Ensure your backend server is running before starting the frontend.

Only include sample media to demonstrate functionality; do not upload full movie files.

The frontend reads images and videos from the media_sample folder.