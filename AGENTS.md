# AGENTS.md — BizLk Developer & Agent Rules

This document outlines the architectural rules, folder structure conventions, and coding guidelines for AI agents and developers working on the **BizLk Mobile POS** repository.

---

## 📁 Repository Folder Structure & Conventions

All newly added code, components, and assets **MUST** follow this exact directory structure:

```
src/
├── api/            # API client modules, network services, and local database handlers
├── assets/         # Images, vector assets, static media, and Lottie JSON files
├── component/      # Shared/Global UI components (Format: src/component/<ComponentName>/index.tsx)
├── constants/      # App-wide constants, enums, unit types (e.g., unitTypes.ts)
├── hooks/          # Custom React hooks (Format: src/hooks/use<HookName>.ts)
├── interface/      # Global TypeScript interface & type definitions (e.g., inventory.ts)
└── screens/        # Screen views categorized by domain/feature module
    ├── auth/       # Authentication screens (LoginScreen.tsx, RegisterScreen.tsx)
    ├── Dashboard/  # Analytics dashboard screen and subcomponents
    └── Inventory/  # Inventory screens & screen-specific subcomponents (components/<ItemCard>/index.tsx)
```

### File Placement Rules:
1. **Global Components**: `src/component/<ComponentName>/index.tsx`
2. **Screen-Specific Components**: `src/screens/<Feature>/components/<ComponentName>/index.tsx`
3. **Screens**: `src/screens/<Feature>/<ScreenName>.tsx`
4. **TypeScript Types**: `src/interface/<featureOrDomain>.ts`
5. **Constants**: `src/constants/<name>.ts`
6. **Custom Hooks**: `src/hooks/use<HookName>.ts`

---

## 🛠️ Technology Stack & Dependencies

- **Framework**: React Native 0.83 (TypeScript)
- **Navigation**: React Navigation 7
- **UI Components & Icons**: Lucide React Native, `react-native-vector-icons`, `react-native-svg`, `lottie-react-native`
- **Charts**: `react-native-chart-kit`

---

## 💻 Development & Execution Guidelines

- **TypeScript**: Always define prop types and data interfaces. Place shared domain models in `src/interface/`.
- **Styling**: Use `StyleSheet.create` for styling components.
- **Android Runs**: Always verify ADB connection using `adb devices` before launching `npx react-native run-android`.
- **Offline First**: Maintain local state/persistence compatibility for core POS functions.
