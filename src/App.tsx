import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';



function App() {
  return (

    <Router>
      <Header />
      <main className="pt-[60px]">
        <Routes>
          <Route path="/" element={<Home />} />

        </Routes>
      </main>
    </Router>
  );
}

export default App;
