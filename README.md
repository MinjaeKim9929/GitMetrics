# GitMetrics

A beautiful, modern web application to visualize and analyze GitHub profiles with interactive charts and comprehensive statistics.

![GitMetrics Banner](https://img.shields.io/badge/GitMetrics-Profile%20Analytics-blueviolet?style=for-the-badge)

## Features

### Profile Analytics
- **Comprehensive Profile Overview** - View user information including bio, location, company, and website
- **Repository Statistics** - Total repositories, followers, following, stars, and forks
- **Copy Username** - Quick copy button with toast notification

### Interactive Visualizations
- **Repository Activity Chart** - Bar chart showing repository creation timeline
  - Click any bar to view repositories created in that specific month
  - Smooth animations when expanding repository details
- **Language Distribution** - Doughnut chart displaying programming language usage across repositories
- **Top Repositories** - Showcase of most popular repositories ranked by stars and forks

### Smart Search Experience
- **Real-time Autocomplete** - GitHub API-powered search suggestions as you type
- **Recent Searches** - Quickly access previously viewed profiles (stored locally)
- **User Avatars** - Visual identification of suggested users
- **Debounced Search** - Optimized API calls with request cancellation

### UI/UX Enhancements
- **Skeleton Loading States** - Content-aware loading placeholders matching actual layouts
- **Empty States** - Friendly messages for missing data with helpful icons
- **Smooth Animations** - Staggered fade-in effects for repository cards
- **Toast Notifications** - Visual feedback for user actions
- **Responsive Design** - Fully optimized for mobile, tablet, and desktop

### Design System
- **Modern Gradient Theme** - Purple and pink gradient aesthetic
- **Glassmorphism** - Backdrop blur effects for depth and elegance
- **Animated Backgrounds** - Pulsing gradient orbs for visual interest
- **Consistent Hover States** - Smooth transitions and interactive feedback

## Tech Stack

- **React 19** - Latest React with modern hooks
- **Vite** - Lightning-fast build tool and dev server
- **React Router 7** - Client-side routing
- **Tailwind CSS 4** - Utility-first CSS framework
- **Chart.js** - Interactive and responsive charts
- **React Chart.js 2** - React wrapper for Chart.js
- **Axios** - HTTP client for API requests
- **GitHub API** - Real-time user and repository data

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- GitHub Personal Access Token (optional, for higher API rate limits)

### Installation

1. Clone the repository
```bash
git clone https://github.com/MinjaeKim9929/GitMetrics.git
cd GitMetrics
```

2. Navigate to the project directory
```bash
cd gitmetrics
```

3. Install dependencies
```bash
npm install
```

4. Create a `.env` file in the `gitmetrics` directory (optional)
```bash
VITE_GITHUB_TOKEN=your_github_personal_access_token
```

5. Start the development server
```bash
npm run dev
```

6. Open your browser and navigate to `http://localhost:5173`

## Usage

### Searching for Users

1. Enter a GitHub username in the search bar
2. As you type, autocomplete suggestions will appear
3. Click on a suggestion or press Enter to view the profile

### Viewing Profile Analytics

- **Profile Card**: View basic user information and statistics
- **Activity Chart**: See repository creation timeline
  - Click any bar to expand and view repositories from that month
- **Language Chart**: Explore programming language distribution
- **Top Repositories**: Browse starred repositories with links to GitHub

### Recent Searches

- Click on the search bar when empty to see recent searches
- Hover over recent searches to reveal a delete button
- Recent searches are stored locally (up to 5 profiles)

## Project Structure

```
gitmetrics/
├── src/
│   ├── components/
│   │   ├── ActivityChart.jsx       # Interactive bar chart with clickable months
│   │   ├── LanguageChart.jsx       # Doughnut chart for languages
│   │   ├── ProfileCard.jsx         # User profile information
│   │   ├── RepoList.jsx            # Top repositories list
│   │   ├── SearchBar.jsx           # Autocomplete search component
│   │   ├── Loading.jsx             # Loading spinner
│   │   ├── SkeletonLoader.jsx      # Skeleton loading states
│   │   └── EmptyState.jsx          # Empty state components
│   ├── pages/
│   │   ├── Home.jsx                # Landing page with search
│   │   └── Profile.jsx             # Profile analytics page
│   ├── utils/
│   │   └── github.js               # GitHub API helper functions
│   ├── App.jsx                     # Main app component
│   ├── main.jsx                    # App entry point
│   └── index.css                   # Global styles and animations
├── public/
├── package.json
└── README.md
```

## API Rate Limits

The GitHub API has rate limits:
- **Unauthenticated requests**: 60 requests per hour
- **Authenticated requests**: 5,000 requests per hour

To increase your rate limit, add a GitHub Personal Access Token to your `.env` file.

### Creating a GitHub Token

1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a descriptive name (e.g., "GitMetrics")
4. No scopes are required for public data
5. Generate and copy the token
6. Add it to your `.env` file as `VITE_GITHUB_TOKEN`

## Features in Detail

### Interactive Activity Chart
The activity chart shows when repositories were created over time. Click any bar to expand a detailed view of repositories created in that month, with smooth animations and full repository details.

### Smart Autocomplete
Type at least 2 characters to trigger autocomplete. The search uses GitHub's user search API with:
- 300ms debounce to prevent excessive requests
- Request cancellation for outdated searches
- User avatars and type badges (User/Organization)
- Up to 5 suggestions per query

### Skeleton Loaders
Content-aware loading states that match the actual component layouts:
- Profile card skeleton with avatar, text, and stat placeholders
- Chart skeletons with appropriate shapes (bar/doughnut)
- Repository list skeletons with card layouts

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- [GitHub API](https://docs.github.com/en/rest) for providing comprehensive user data
- [Chart.js](https://www.chartjs.org/) for beautiful, responsive charts
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Heroicons](https://heroicons.com/) for the icon system

## Contact

Minjae Kim - [@MinjaeKim9929](https://github.com/MinjaeKim9929)

Project Link: [https://github.com/MinjaeKim9929/GitMetrics](https://github.com/MinjaeKim9929/GitMetrics)

---

Made with ❤️ and React
