# BizLk — Mobile Point of Sale

![BizLk Screenshot](src/assets/logo.png)

**BizLk** is a mobile-based **offline-first Point of Sale (POS)** application built with [React Native](https://reactnative.dev). It is designed to help small businesses manage sales, track inventory, and monitor performance — all from a smartphone, with no internet connection required.

---

## Features

### Core POS
- **Dashboard** — At-a-glance sales analytics with daily totals, sales count, low-stock alerts, and recent transactions.
- **Inventory** — Search products by name or scan barcodes to look up items instantly.
- **New Sale (POS)** — Quick order entry with product search, quantity adjustment, and multiple payment methods (Cash, Card, QR).
- **Sales History** — View past transactions and receipts.
- **More** — Access settings, account info, and additional tools.

### Offline First
- All product catalogs, transaction records, and sales data are stored **locally on the device** using async storage / SQLite.
- Full functionality is available **without an internet connection** — perfect for markets, food trucks, and pop-up stalls.

### Authentication
- **Login** and **Register** flows with email/password validation.
- Secure password handling with show/hide toggle.

### UI / UX
- Animated **splash screen** powered by Lottie.
- Clean, responsive layout with a **bottom navigation bar** for quick switching between sections.
- SVG-based gradient header and live **date/time** display on the dashboard.

---

## Tech Stack

| Category         | Library                        |
| ---------------- | ------------------------------ |
| Framework        | React Native 0.83              |
| Language         | TypeScript                     |
| Navigation       | React Navigation 7 (Stack)     |
| Icons            | Lucide React Native            |
| Icon Font        | react-native-vector-icons      |
| Charts           | react-native-chart-kit         |
| Animations       | lottie-react-native            |
| SVG              | react-native-svg               |

---

## Project Structure

```
src/
├── assets/           # Images and Lottie animation files
├── component/        # Reusable UI components (Header, MenuBar, SearchBar, Title, SplashScreen)
├── interface/        # TypeScript type definitions
└── screens/
    ├── auth/         # Login & Register screens
    ├── Dashboard/    # Home screen with analytics charts
    └── Inventory/    # Product search & barcode scanning
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) >= 20
- [React Native CLI](https://reactnative.dev/docs/environment-setup) environment configured
- Android Studio (for Android builds) or Xcode (for iOS builds)

### Installation

```sh
# Clone the repository
git clone <your-repo-url>
cd BizLk

# Install dependencies
npm install
```

### Run the App

#### Android

```sh
npm run android
```

#### iOS

```sh
# Install CocoaPods dependencies (first time only)
cd ios && pod install && cd ..

# Run the iOS app
npm run ios
```

### Running Tests

```sh
npm test
```

### Linting

```sh
npm run lint
```

---

## Development

1. Start the Metro bundler:

```sh
npm start
```

2. Press `a` to run on Android or `i` to run on iOS.

---

## Configuration

Edit `app.json` to change the app display name and bundle identifier before building release versions:

```json
{
  "name": "BizLk",
  "displayName": "BizLk"
}
```

---

## License

This project is private and intended for internal business use.

---

## Learn More

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [React Navigation](https://reactnavigation.org/docs/getting-started)
- [react-native-chart-kit](https://github.com/indieswap/react-native-chart-kit)
