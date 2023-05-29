
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppProvider } from "./context/AppContext";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
    return (
    <>
        <AppProvider>
            <AppRoutes/>
        </AppProvider>
    </>
    );
}

export default App;
