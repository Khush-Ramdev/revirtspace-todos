import "./css/App.css";
import Header from "./components/Header";
import Createnote from "./components/createnote";
import Notes from "./components/notes";

function App() {
    return (
        <div className="App">
            <Header />
            <Createnote />
            <Notes />
        </div>
    );
}

export default App;
