# Anthropic Chat Desktop Application

An ElectronJS desktop application that brings Anthropic's AI assistant capabilities to your desktop. This application replicates functionalities similar to ChatGPT's desktop app but utilizes Anthropic's API to provide AI-powered chatting experiences.
![Screenshot 2024-10-31 at 12 18 40 PM](https://github.com/user-attachments/assets/76115a49-229d-4e0b-b08e-68241767b13a)
![Screenshot 2024-10-31 at 12 18 56 PM](https://github.com/user-attachments/assets/dfd2fa8f-4648-4cb3-be6e-629c2b981e70)

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Building the Application](#building-the-application)
- [Folder Structure](#folder-structure)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **User Authentication**: Sign in or sign up using email/password or Google OAuth via Firebase Authentication.
- **Chat Interface**: Engage in conversations with Anthropic's AI models through a user-friendly interface.
- **Chat History**: View and manage your past conversations, with the ability to start new chats.
- **Model Selection**: Choose from different Anthropic AI models for your chats.
- **Image Upload**: Send images in chats, with images stored securely in Firebase Storage.
- **Screenshot Capture**: Take screenshots directly from the app and send them in chats.
- **Voice Input**: Use your microphone to transcribe audio messages via OpenAI's Whisper API.
- **Settings Panel**: Manage your account settings and application preferences.

---

## Technology Stack

### Frontend

- **ElectronJS**: Framework for building cross-platform desktop applications using web technologies.
- **ReactJS**: Library for building the user interface.
- **Webpack**: Module bundler for compiling JavaScript modules.
- **Babel**: JavaScript compiler to use next-generation JavaScript, including JSX syntax.
- **CSS Modules**: For scoped CSS styling.

### Backend Services

- **Firebase**:
  - **Authentication**: For user authentication and management.
  - **Firestore**: Real-time database for storing chats and messages.
  - **Storage**: For storing uploaded images and screenshots.
- **Anthropic API**: For AI-powered chat responses.
- **OpenAI Whisper API**: For audio transcription services.
- **NodeJS**: JavaScript runtime for backend operations within Electron.

### Additional Libraries

- **Axios**: For making HTTP requests to external APIs.
- **React Media Recorder**: For recording audio inputs.
- **Screenshot-desktop**: For capturing screenshots.
- **Electron Builder**: For packaging the application for distribution.
- **Dotenv**: For environment variable management.

---

## Installation

### Prerequisites

- **Node.js** (v14.x or higher)
- **npm** (v6.x or higher)
- **Electron** (installed locally as a dev dependency)
- **Firebase Account**: For authentication, database, and storage.
- **Anthropic API Key**: Obtain from [Anthropic](https://www.anthropic.com/).
- **OpenAI API Key**: For using the Whisper transcription service.

### Clone the Repository

```bash
git clone [https://github.com/yourusername/anthropic-chat-app.git](https://github.com/AmirFone/anthropic-desktop-application)
cd anthropic-chat-app
```

### Install Dependencies

```bash
npm install
```

---

## Configuration

### Environment Variables

Create a `.env` file in the root directory of the project and add the following environment variables:

```env
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id

# OpenAI API Key for Whisper
OPENAI_API_KEY=your_openai_api_key

# Anthropic API Key (Users will input their own keys, but you may need one for testing)
ANTHROPIC_API_KEY=your_anthropic_api_key

# Application Environment
NODE_ENV=development
```

### Firebase Initialization

Ensure that you have set up a Firebase project with:

- **Authentication**: Enable Email/Password and Google Sign-In methods.
- **Firestore Database**: Create necessary collections (`users`, `chats`).
- **Storage**: Set up Firebase Storage for image and screenshot uploads.
- **Security Rules**: Configure Firestore and Storage security rules to allow appropriate read/write access.

### Anthropic API Key

Each user is required to input their own Anthropic API key upon first login. This key is securely stored in Firestore under the user's document.

---

## Running the Application

### Development Mode

To run the application in development mode with hot reloading:

```bash
npm run dev
```

This command concurrently runs the Webpack development server and Electron.

### Production Mode

To build and run the application in production mode:

```bash
npm run build
npm start
```

---

## Building the Application

To package the application for distribution on your platform:

```bash
npm run dist
```

This will create executable files for Windows, macOS, or Linux in the `dist/` directory, depending on your operating system.

---

## Folder Structure

```
anthropic-chat-app/
├── main/                   # Main process code
│   ├── main.js             # Electron app entry point
│   ├── preload.js          # Preload script exposing IPC methods
│   ├── anthropicService.js # Service to interact with Anthropic API
│   ├── FirebaseService.js  # Service for Firebase interactions
│   ├── screenshot.js       # Screenshot functionality
│   ├── whisper.js          # Audio transcription service
│   ├── FirebaseStorageService.js # Service for Firebase Storage
│   └── ...                 # Other backend services
├── renderer/               # Renderer process code (React app)
│   ├── public/             # Public assets
│   │   ├── index.html      # HTML template
│   │   └── dist/           # Compiled assets
│   └── src/                # React source code
│       ├── components/     # React components
│       ├── contexts/       # React contexts for state management
│       ├── App.jsx         # Main App component
│       ├── styles.css      # Global styles
│       └── index.jsx       # React app entry point
├── .babelrc                # Babel configuration
├── .gitignore              # Git ignore file
├── package.json            # NPM scripts and dependencies
├── package-lock.json       # NPM lock file
├── webpack.config.js       # Webpack configuration
├── README.md               # Project documentation
└── ...                     # Other configuration and resource files
```

---

## Dependencies

### Main Dependencies

- **electron**: `^latest` — Framework for building desktop applications.
- **react**: `^latest` — Library for building user interfaces.
- **react-dom**: `^latest` — DOM-specific methods for React.
- **firebase**: `^latest` — Firebase client SDK.
- **firebase-admin**: `^latest` — Firebase Admin SDK for backend services.
- **axios**: `^latest` — Promise-based HTTP client.
- **dotenv**: `^latest` — Loads environment variables from `.env` file.
- **screenshot-desktop**: `^latest` — Capture screenshots.
- **react-media-recorder**: `^latest` — Record audio and video in React.
- **form-data**: `^latest` — Handles form data for HTTP requests.

### Development Dependencies

- **webpack**: `^latest` — Module bundler.
- **webpack-cli**: `^latest` — Command-line interface for Webpack.
- **webpack-dev-server**: `^latest` — Development server for Webpack.
- **babel-loader**: `^latest` — Transpiles JavaScript files using Babel.
- **@babel/core**: `^latest` — Babel compiler core.
- **@babel/preset-env**: `^latest` — Smart defaults for Babel.
- **@babel/preset-react**: `^latest` — Adds JSX support to Babel.
- **css-loader**: `^latest` — Resolves CSS imports.
- **style-loader**: `^latest` — Injects CSS into the DOM.
- **electron-builder**: `^latest` — Package and distribute Electron applications.
- **concurrently**: `^latest` — Run multiple commands concurrently.
- **dotenv-webpack**: `^latest` — Supports dotenv in Webpack.
- **node-polyfill-webpack-plugin**: `^latest` — Polyfills Node.js core modules in Webpack.

---

## Contributing

Contributions are welcome! If you have suggestions or find issues, please open an issue or submit a pull request.

### Steps to Contribute

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/YourFeature`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/YourFeature`.
5. Open a pull request.

---

## License

This project is licensed under the **MIT License**.

---

## Additional Notes

- **Error Handling**: The application includes comprehensive error handling and logging to help with debugging.
- **Security**: User API keys and sensitive information are stored securely using Firebase security practices.
- **Customization**: Feel free to customize the UI components and styles to better fit your preferences.
- **Future Enhancements**:
  - Implement Redux for more advanced state management.
  - Add support for more AI models as they become available.
  - Enhance the settings panel with more user preferences.

---

**Disclaimer**: This application is intended for educational purposes. Ensure you comply with the terms of service of Anthropic, OpenAI, and Firebase when using their services.
