# 📋 Internal Auditing App

A React Native mobile application that streamlines internal audit management. Role-based access ensures tailored functionality for Admins, Auditors, and Viewers. Built with modular architecture, safe storage, and a smooth multi-step audit flow—ready for cross-platform deployment.

---

## 🚀 Features

- 🔐 **Role-based login** (Admin, Auditor, Viewer)
- ✅ Multi-step **audit submission form** with validation
- 💬 **Commenting system** with required fields and sanitization
- 🗃️ Offline-ready **storage** using AsyncStorage
- 🗂️ Clean and minimal **audit history list** with real-time updates
- 🧹 Duplicate prevention and JSON integrity checks
- 🌐 **String constants** via centralized `strings.js`
- 📱 Safe-area ready UI for iOS & Android (notch-proof)
- 🎨 Consistent header, reusable buttons, and modular styling

---

## 🔄 App Flow

1. **Login Screen**
   - Select a role (Admin, Auditor, Viewer)
   - Role is saved to storage and loaded into context

2. **Audit History**
   - Admin: view & delete audits, access policy manual
   - Auditor: view & submit new audits
   - Viewer: read-only access
   - List auto-updates with every valid submission

3. **Audit Form (3 Steps)**
   - **Step 1**: Select rating (required)
   - **Step 2**: Toggle check items
   - **Step 3**: Enter comments (required), then submit
   - Includes validation and flow control

4. **Audit Summary**
   - Display submitted form in read-only mode
   - Accessible post-submission or from history screen

---

## ⚙️ Tech Stack

- [React Native](https://reactnative.dev)
- [`@react-native-async-storage/async-storage`](https://github.com/react-native-async-storage/async-storage)
- `react-navigation`
- `react-native-safe-area-context`
- Context API for global role management

---

## 🛠️ Project Structure
InternalAuditingApp/
├── App.js
├── README.md
├── assets/
│   └── images/
│       └── back.png
├── components/
│   ├── ActionButton.js
│   ├── FormNextBtn.js
│   ├── Header.js
│   ├── LogoutBtn.js
│   ├── RatingComponent.js
│   └── RoleBtn.js
├── constants/
│   ├── colors.js
│   └── strings.js
├── hooks/
│   └── context/
│       └── RoleContext.js
├── navigation/
│   └── AppNavigator.js
├── screens/
│   ├── AuditFormScreen.js
│   ├── AuditHistoryScreen.js
│   ├── AuditSummaryScreen.js
│   ├── LoginScreen.js
│   └── PolicyViewerScreen.js
├── utils/
│   └── storage.js