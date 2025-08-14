# 🚀 FTX Test Suite

> **FasTrax POS** — Internal Automation Test Suite  
> Author(s):
> |Name| Role | Email |
> |----|-----|-----|
> | Jon Eiser | Project Maintainer | jon.e@goftx.com |

[![Node.js](https://img.shields.io/badge/node-%3E%3D18.x-brightgreen.svg)](https://nodejs.org/)
[![Appium](https://img.shields.io/badge/Appium-v2.x-blueviolet.svg)](https://appium.io/)
[![Mocha](https://img.shields.io/badge/Tested%20with-Mocha-yellow.svg)](https://mochajs.org/)
[![License: Internal](https://img.shields.io/badge/license-Internal-lightgrey.svg)](#)

## 📑 Table of Contents
- [Overview](#-overview)
- [Project Structure](#-project-structure)
- [Setup Instructions](#-setup-instructions)
  - [Prerequisites](#1️⃣-prerequisites)
  - [Install Dependencies](#2️⃣-install-dependencies)
  - [Appium Server Setup](#3️⃣-appium-server-setup)
  - [Running Tests](#4️⃣-running-tests)
- [Writing Tests](#-writing-tests)
- [Features](#-features)
- [To-Do](#-to-do)
- [Best Practices & Conventions](#-best-practices--conventions)
- [License](#-license)
- [Authors & Maintainers](#-authors--maintainers)

---

## 📖 Overview
This repository contains an automated end-to-end (E2E) testing framework built with **Node.js**, leveraging **Appium**, **WebdriverIO**, **Flutter Driver**, and **Mocha** for test execution and reporting.  
The suite is designed to run functional UI tests against mobile applications, ensuring consistent quality and fast regression cycles.

---

## 📂 Project Structure

```plaintext
ftx_test_suite/
├── applications
│   ├── ftxposlite/          # Flutter POS System
│   │   ├── apks/
│   │   ├── pages/
│   │   ├── tests/
│   │   └── use_cases/
│   └── merchant/            # Handheld Merchant App
├── configs/                 # Application Specifc Configs 
├── src/
├── .gitignore
├── package-lock.json
├── package.json
└── README.md

# example project structure
project-root/
├── tests/                  # Test specifications (Mocha test files)
│   ├── flutter/            # Flutter-specific test cases
│   └── common/             # Reusable test utilities
├── page_objects/           # Page Object Model (selectors, actions)
├── config/                 # Test configurations & capabilities
│   ├── android.config.js
│   └── ios.config.js
├── utils/                  # Helper functions, logging, data generators
├── package.json            # Node.js dependencies
└── README.md               # Project documentation
```

---

## 🛠 Setup Instructions

### 1️⃣ Prerequisites
- **Node.js** (>= 18.x recommended)
- **Java JDK** (>= 11.x)
- **Android SDK** / Xcode (for iOS testing)
- **Appium Server** (v2.x recommended)
- **Flutter SDK** (if testing Flutter apps)

---

### 2️⃣ Install Dependencies
```bash
npm install
```

---

### 3️⃣ Appium Server Setup

#### Option 1: Global Installation (Not Recommended for CI)
```bash
npm install -g appium
appium driver install flutter
appium driver install uiautomator2
appium
```

#### Option 2: Local Installation (Preferred for Projects)
```bash
npm install appium --save-dev
npx appium driver install flutter
npx appium driver install uiautomator2
npx appium
```

> **Note:** Ensure device/emulator is running before starting tests.

---

### 4️⃣ Running Tests

#### Run all tests:
```bash
npm test
```

#### Run specific suite:
```bash
npx mocha tests/flutter/login.spec.js
```

#### Run with custom capabilities:
```bash
npx wdio config/android.config.js
```

---

## 🧩 Pages & Use Cases

- **Pages** = screen-level wrappers hiding raw selectors and context switching.  
  Example: `LoginPage.login(email, pass)`, `DashboardPage.getMessageCount()`.

- **Use Cases** = business flows that compose pages (and other use cases).  
  Example: `CheckDashboardMessages` calls `Login` then verifies dashboard state.


## 🧪 Writing Tests

- **Mocha** is used for test definitions (`describe`, `it`).
- **Appium Flutter Finder** is used for selecting elements in Flutter apps.
- **Page Object Model (POM)** is encouraged for maintainable selectors.
- **Pages** should contain the logic and **Use Cases** control the flow.

Example:
```javascript
const find = require('appium-flutter-finder');

describe('Login flow', () => {
  it('should login successfully', async () => {
    const emailField = find.byValueKey('emailInput');
    await driver.elementClick(emailField);
    await driver.elementSendKeys(emailField, 'test@example.com');
    // ...
  });
});
```

---

## 📋 Features
- Cross-platform mobile testing (Android/iOS)
- Flutter widget-level automation
- Page Object Model for cleaner test code
- Configurable test environments
- CI/CD pipeline ready

---

## 📝 To-Do
- [ ] Add test coverage reports
- [ ] Implement visual regression testing
- [ ] Add support for parallel test execution
- [ ] Create reusable fixtures for test data

---

## 🛡 Best Practices & Conventions
- Keep selectors in `page_objects/` for reusability.
- Group related tests into descriptive `describe()` blocks.
- Avoid hard-coded waits; use explicit waits instead.
- Run tests on real devices in addition to emulators.

---

## 📜 License
> Internal use only. Unauthorized distribution prohibited.

---
