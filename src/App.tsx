import { BrowserRouter, Route,Routes } from 'react-router-dom';
import MainPage from './pages/MainPage'
import ProjectDetails from './pages/ProductDetails';
import { Toaster } from 'sonner';

function App() {
  //const [count, setCount] = useState(0)
  return (
  
  <BrowserRouter>
  <Toaster position='top-center' richColors />
  <Routes>
   
   <Route path="/" element={<MainPage />} />
    <Route path="/project/:id" element={<ProjectDetails />} />
   </Routes>
  </BrowserRouter>
  
  )
}

export default App
