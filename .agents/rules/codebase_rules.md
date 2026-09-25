---
description: BizLk React Native POS Agent Rules - Folder structure, component architecture, and coding conventions
globs: "**/*"
---

# BizLk Codebase & Architecture Rules

## 1. Project Overview & Tech Stack
- **Project**: BizLk — Mobile Point of Sale (POS), offline-first React Native application.
- **Framework**: React Native (TypeScript)
- **Navigation**: React Navigation (Stack/Tab)
- **UI & Icons**: Lucide React Native, react-native-vector-icons, react-native-svg, lottie-react-native
- **Charts**: react-native-chart-kit

---

## 2. Directory & File Structure Rules

Agents must strictly adhere to the following directory layout for any new files, components, or refactoring:

```
c:\Users\anjul\Documents\BizLk\src\
├── api/            # API services, network fetchers, local DB handlers
├── assets/         # Images, static media, Lottie animations
├── component/      # Shared/global reusable UI components (e.g. src/component/<ComponentName>/index.tsx)
├── constants/      # App constants, enums, unit types (e.g., unitTypes.ts)
├── hooks/          # Custom React hooks (e.g., useInventory, useAuth)
├── interface/      # Global TypeScript interfaces & types (e.g., inventory.ts, sidemenu.ts)
└── screens/        # Screen components organized by feature module
    ├── auth/       # Auth screens (LoginScreen.tsx, RegisterScreen.tsx)
    ├── Dashboard/  # Dashboard screens and dashboard-specific logic
    └── Inventory/  # Inventory screens & screen-specific subcomponents (components/<ItemCard>/index.tsx)
```

### Folder Placement Guidelines:
1. **Global Reusable Components**:
   - Location: `src/component/<ComponentName>/index.tsx`
   - Example: `src/component/ConfirmationModal/index.tsx`, `src/component/header/index.tsx`
   - Do NOT place feature-specific or single-use components in global `src/component/`.

2. **Screen-Specific Components**:
   - Location: `src/screens/<FeatureName>/components/<ComponentName>/index.tsx`
   - Example: `src/screens/Inventory/components/ItemCard/index.tsx`

3. **Screens**:
   - Location: `src/screens/<FeatureGroup>/<ScreenName>.tsx` or `src/screens/<FeatureGroup>/index.tsx`
   - Example: `src/screens/auth/LoginScreen.tsx`, `src/screens/Inventory/Inventory.tsx`

4. **Types and Interfaces**:
   - Location: `src/interface/<domain>.ts`
   - All shared interfaces and data models must be placed in `src/interface/`.

5. **Constants**:
   - Location: `src/constants/<domain>.ts`
   - Store fixed options, unit types, route names, and configuration values here.

6. **Custom Hooks**:
   - Location: `src/hooks/use<HookName>.ts`

---

## 3. Coding Conventions & Best Practices

1. **TypeScript Strictness**:
   - Export explicit interfaces and types from `src/interface/`.
   - Avoid using `any`. Use strongly typed props for every component.

2. **Component Exports**:
   - Use folder-based component structure with `index.tsx` when component has dedicated styles or sub-parts.
   - Use clean, named exports or functional component defaults.

3. **Styling**:
   - Use React Native `StyleSheet.create` for component styling.
   - Maintain color consistency with existing theme gradients and UI tokens.

4. **Offline-First Data Patterns**:
   - Treat local storage / SQLite as primary data source for POS features (sales, inventory catalog).

5. **Build & Execution Verification**:
   - When building/testing Android, check active devices via `adb devices` before triggering `npx react-native run-android`.
