# 🏙️ Suburb Swipe — "This or That" Game for City Suburbs

Suburb Swipe is a fun, interactive web game where users discover and rank their favorite suburbs in their city.
Think of it like "Tinder for suburbs" — two suburbs appear side by side with photos, and the user swipes or clicks to pick their favorite.
After 20 rounds, the app generates a **Top 10 Suburbs** ranking tailored to the user's preferences using an Elo rating system.

## 🎮 How to Play

1. **Start the Game**: Click "Start Game" to begin
2. **Choose Your Preference**: Click or tap on your preferred suburb between two options
3. **Mobile Gestures**: On mobile, swipe left to choose the right suburb, or swipe right to choose the left suburb
4. **Complete Rounds**: Play through 20 rounds of comparisons
5. **View Results**: See your personalized Top 10 Melbourne suburbs ranking

## 🚀 Features

- **Intuitive Interface**: Clean card-based design with smooth animations
- **Multiple Interaction Methods**: Click, tap, or swipe to make selections
- **Elo Rating System**: Dynamic ranking algorithm that learns your preferences
- **High-Quality Images**: Curated suburb photos for visual appeal
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **Progress Tracking**: Visual progress bar and round counter
- **Share Results**: Share your Top 10 list with others
- **Instant Deployment**: Ready for Vercel, Netlify, or similar platforms

## 🛠️ Tech Stack

- **React 19** — Latest React with modern hooks
- **Vite** — Fast build tool and development server
- **Tailwind CSS 4** — Utility-first CSS framework
- **Framer Motion** — Production-ready motion library
- **JavaScript/JSX** — Modern ES6+ syntax
- **Unsplash Images** — High-quality suburb photography

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+
- npm or yarn

### Quick Start

1. **Clone the repository:**
```bash
git clone <repository-url>
cd suburb-swipe
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start development server:**
```bash
npm run dev
```

4. **Open your browser:**
Visit `http://localhost:3000` to play the game!

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.

## 🚀 Deployment

### Vercel (Recommended)

1. **Using Vercel CLI:**
```bash
npm install -g vercel
vercel
```

2. **Using Vercel Dashboard:**
- Connect your GitHub repository
- Import the project
- Deploy automatically

### Netlify

1. **Using Netlify CLI:**
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

2. **Using Netlify Dashboard:**
- Drag and drop the `dist/` folder
- Or connect your Git repository

### Other Platforms

The app works with any static hosting service:
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting
- Surge.sh

## 📁 Project Structure

```
suburb-swipe/
├── src/
│   ├── components/
│   │   ├── GameBoard.jsx      # Main game logic and layout
│   │   ├── GameCard.jsx       # Individual suburb cards
│   │   └── Results.jsx        # Top 10 results screen
│   ├── data/
│   │   └── suburbs.js         # Suburb data and image URLs
│   ├── hooks/
│   │   └── useSwipe.js        # Custom swipe detection hook
│   ├── utils/
│   │   └── elo.js             # Elo rating system logic
│   ├── App.jsx                # Main app component
│   ├── index.css              # Global styles
│   └── main.jsx               # App entry point
├── public/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── vercel.json                # Vercel deployment config
└── package.json
```

## 🎯 Game Mechanics

### Elo Rating System

The game uses a modified Elo rating system to rank suburbs:

- **Starting Rating**: Each suburb begins with 1200 points
- **K-Factor**: Set to 32 for balanced rating changes
- **Match Results**: Winners gain points, losers lose points
- **Dynamic Ranking**: Ratings update after each choice

### Suburb Data

Currently features 10 Melbourne suburbs:
- Fitzroy, St Kilda, Brighton, South Yarra, Carlton
- Brunswick, Richmond, Toorak, Collingwood, Prahran

Each suburb includes:
- Name and description
- High-quality Unsplash image
- Dynamic Elo rating
- Match history tracking

## 🎨 Customization

### Adding New Cities

1. **Update suburb data** in `src/data/suburbs.js`:
```javascript
export const YOUR_CITY_SUBURBS = [
  {
    id: 'neighborhood-1',
    name: 'Neighborhood Name',
    description: 'Brief description of the area'
  },
  // ... more suburbs
];
```

2. **Add corresponding images** to the `SUBURB_IMAGES` object

3. **Update the component imports** to use your new data

### Modifying Game Rules

- **Round Count**: Change `MAX_ROUNDS` in `GameBoard.jsx`
- **Rating Algorithm**: Modify the Elo logic in `utils/elo.js`
- **K-Factor**: Adjust rating sensitivity in the Elo utility

### Styling Changes

- **Colors**: Update Tailwind classes throughout components
- **Animations**: Modify Framer Motion variants
- **Layout**: Adjust component structure and responsive classes

## 🧪 Testing

### Manual Testing Checklist

- [ ] Game starts correctly
- [ ] Suburb cards display with images
- [ ] Click/tap selection works
- [ ] Swipe gestures work on mobile
- [ ] Progress bar updates
- [ ] Results screen shows correct ranking
- [ ] Restart functionality works
- [ ] Responsive design on different screen sizes

### Development Testing

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🐛 Troubleshooting

### Common Issues

1. **Images not loading:**
   - Check image URLs in `suburbs.js`
   - Verify Unsplash URLs are accessible
   - Check browser console for CORS errors

2. **Build failures:**
   - Ensure all dependencies are installed
   - Check for TypeScript errors
   - Verify Tailwind configuration

3. **Animations not working:**
   - Confirm Framer Motion is installed
   - Check for JavaScript errors in console
   - Verify component imports

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

If you encounter any issues or have questions:
- Check the troubleshooting section above
- Review the project structure and code comments
- Create an issue in the repository

---

**Built with ❤️ using React, Vite, and Tailwind CSS**
