import "./App.css";
import Main from "./components/Main/Main";
import { Routes, Route } from "react-router-dom";
import Portfolio from './components/Portfolio/Portfolio';


function App() {
  return (
    <div className="App">
      {/* <Main /> */}
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/portfolio' element={<Portfolio />} />
      </Routes>
      {/* <Main /> */}
    </div>
  );
}

export default App;
