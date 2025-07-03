import { useAuth } from "./hooks/useAuth";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const { loading } = useAuth();
  if (loading) {
    <p>Carregando...</p>;
  }
  return <AppRoutes></AppRoutes>;
}

export default App;
