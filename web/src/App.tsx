import Routes from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import './global.css'
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "./contexts/ToastContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Routes />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
