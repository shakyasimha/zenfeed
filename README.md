# ZenFeed

A clean, dark-themed news reader for Android that pulls your favorite sources into a single, distraction-free feed. Built with React Native and Expo.

ZenFeed is the mobile app. Its companion backend is **zenfeed-server**, a PHP service that fetches and serves feed content to the app.

> **Status:** Early development. The core UI is in place and currently runs on mock data. Features listed under [Roadmap](#roadmap) are planned, not yet implemented.

## What it does

ZenFeed is meant to be a fast, minimal reader for people who follow multiple publications and blogs. Instead of jumping between sites, you get one scrollable feed of articles, each showing its source, publish time, headline, and a short snippet.

**Currently working**

- Main feed screen with article cards (source, timestamp, title, snippet)
- Custom header with menu button, centered page title, and search button
- Dark theme styled with Tailwind classes via NativeWind

**Planned**

- Real feeds: add RSS/Atom sources and fetch live articles through zenfeed-server
- Navigation drawer opened from the header menu button
- Search across articles and sources
- Article detail / reader view
- Local-first storage so your feed and sources work offline
- OPML import and export for moving subscriptions in and out

## Tech stack

- [Expo](https://expo.dev) with Expo Router for file-based routing
- [React Native](https://reactnative.dev) with TypeScript
- [NativeWind](https://www.nativewind.dev) v4 + Tailwind CSS v3 for styling
- [`@expo/vector-icons`](https://docs.expo.dev/guides/icons/) for icons
- [`react-native-safe-area-context`](https://github.com/th3rdwave/react-native-safe-area-context) for safe area handling

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org) (an LTS release is recommended)
- The [Expo Go](https://expo.dev/go) app on a device, or an Android emulator via Android Studio

### Install and run

```bash
# Clone the repository
git clone https://github.com/shakyasimha/zenfeed.git
cd zenfeed

# Install dependencies
npm install

# Start the dev server (clear the Metro cache on first run)
npx expo start -c
```

Then press **`a`** in the terminal to open the app on an Android emulator, or scan the QR code with Expo Go on a physical device.

If the emulator can't reach the dev server, try:

```bash
npx expo start -c --localhost
adb reverse tcp:8081 tcp:8081
```

## Backend

ZenFeed will get its articles from **zenfeed-server**. When you run the server locally, point the app at it using:

- Android emulator: `http://10.0.2.2:8000` (the emulator can't use `localhost` to reach your computer)
- Physical device with Expo Go: your computer's LAN IP, for example `http://192.168.1.20:8000`

See the zenfeed-server README for setup instructions.

## Project structure

```
.
├── src/
│   ├── app/                # Screens and layouts (Expo Router)
│   │   ├── _layout.tsx     # Root layout, imports global.css
│   │   └── index.tsx       # Main feed screen
│   ├── components/
│   │   └── header.tsx      # App header (menu, title, search)
│   └── global.css          # Tailwind directives
├── assets/
├── tailwind.config.js
├── metro.config.js         # NativeWind wiring (points to src/global.css)
├── babel.config.js
└── package.json
```

## Styling notes

Styles use NativeWind `className` props. If you add new folders containing components, include them in the `content` array of `tailwind.config.js`, otherwise their classes won't be generated:

```js
content: [
  "./src/app/**/*.{js,jsx,ts,tsx}",
  "./src/components/**/*.{js,jsx,ts,tsx}",
],
```

Also make sure the `input` path in `metro.config.js` matches the actual location of `global.css`.

## Roadmap

- [ ] Replace mock data with live articles from zenfeed-server
- [ ] Drawer navigation
- [ ] Search
- [ ] Article reader view
- [ ] Offline storage
- [ ] OPML import/export

## License

Released under the [MIT License](LICENSE).

