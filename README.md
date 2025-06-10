# Pulse - Developer Productivity Platform

## Overview

**Pulse** is a comprehensive developer productivity platform designed to streamline the coding journey for competitive programmers and software developers. It integrates multiple coding platforms (LeetCode, GitHub, CodeChef, Codeforces) into a unified dashboard, providing real-time activity tracking, progress visualization, and performance analytics. The platform features task management, contest notifications, hackathon discovery, and an upcoming revision workspace for interview preparation, making it a one-stop solution for developers to track their growth, stay organized, and never miss important coding opportunities.

## Features

- **Activity Tracking**: Visual heatmaps for LeetCode and GitHub activity with streak counters and progress analytics
- **Problem of the Day**: Daily LeetCode challenge integration with difficulty-based progress tracking
- **Task Management**: Comprehensive todo system with status tracking (TO-DO, In Progress, Completed)
- **Contest Notifications**: Real-time updates for coding contests across LeetCode, CodeChef, and Codeforces platforms
- **Hackathon Discovery**: Curated list of hackathons with prize information, deadlines, and registration links
- **Platform Integration**: Seamless connection with GitHub and LeetCode accounts for automated data sync
- **Revision Workspace**: Upcoming feature for interview preparation with custom practice sheets and reminders
- **Smart Reminders**: Google Calendar integration for coding practice sessions and contest notifications
- **Responsive Design**: Optimized for both desktop and mobile devices for on-the-go access

## Getting Started

This project includes both Backend and Frontend components.

### Prerequisites
- Node.js installed on your system
- npm package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kunal-8759/Pulse.git
   ```

2. **Navigate to backend directory and install dependencies**
   ```bash
   cd Backend
   npm install
   ```

3. **Navigate to frontend directory(in a new terminal) and install dependencies**
   ```bash
   cd Frontend
   npm install
   ```

4. **Run both servers**
   
   Start the backend server:
   ```bash
   npm run dev
   ```
   
   Start the frontend server (in a new terminal):
   ```bash
   npm run dev
   ```

## 🛠️ Technology Stack
- **Backend**: Node.js with Express.js
- **Framework**: React.js with Javascript
- **Build Tool**: Vite
- **State Management**: React Context API and React Query
- **Styling**: Raw CSS, Tailwind CSS with Material UI, toast components
- **Routing**: React Router v6
- **Date Handling**: date-fns and date-fns-tz
- **HTTP Client**: Axios

## 🔌 API Integrations

The application integrates with the following APIs:
- **LeetCode**: GraphQL API for contest data, heatmap, daily problem
- **Codeforces**: REST API for contest listings
- **CodeChef**: REST API for contest information
- **Devpost**: For hackathon listings
- **GitHub**: REST API for user activity tracking
- **Google Calendar**: For smart reminders and event management 

## 🤔 Challenges & Solutions


### CORS Restrictions
**Challenge**: Many competitive programming platforms don't provide CORS headers, preventing direct API access from browsers.

**Solution**: Implemented proxy-based fetching strategies to securely access platform data.

### Time Zone Management
**Challenge**: Displaying contest times correctly across different time zones.

**Solution**: Used date-fns-tz for proper time zone conversions, storing all times as ISO strings internally and converting to local time for display.

### User Experience on Mobile
**Challenge**: Creating a seamless experience across desktop and mobile devices.

**Solution**: Implemented a responsive design with optimized navigation that adapts to different screen sizes.

## 🔮 Future Enhancements
### Revision Workspace
The upcoming *Revision Workspace* will be a comprehensive interview preparation hub designed to help developers excel in technical interviews:

- *Smart Question Curation*: Add solved or planned questions from popular coding platforms with intelligent categorization
- *Custom Practice Sheets*: Create focused revision sheets organized by topics, difficulty levels, or company-specific patterns
- *Enhanced Notes System*: Multi-layered note-taking feature allowing developers to capture different solution approaches, time complexities, and key insights for each problem
- *Intelligent Reminders*: Google Calendar integration for personalized coding practice schedules with automated notifications
- *Progress Analytics*: Track revision consistency, identify weak areas, and monitor improvement over time


___

Built with ❤️ by [Kunal Kumar](https://www.linkedin.com/in/kunal-kumar-78094a258/)