import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store,persistor } from './redux/app/store.js';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from './Components/ui/sonner';
   createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
          <Toaster position="top-center" richColors  duration={2500} />
\        </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
  </StrictMode>
);



