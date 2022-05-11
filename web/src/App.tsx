import Routes from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import './global.css'

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
