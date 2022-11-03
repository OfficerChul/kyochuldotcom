import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Main from "./components/Main/Main";
import { Routes, Route } from "react-router-dom";
import Portfolio from './components/Portfolio/Portfolio';


function App() {
  return (
    <div className="App">
      {/* <Main /> */}
      <Main />
      <Routes>
        <Route path='/kyochuldotcom' element={<Main />} />
        <Route path='/kyochuldotcom/portfolio' element={<Portfolio />} />
      </Routes>
      {/* <Main /> */}
    </div>
  );
}

export default App;
