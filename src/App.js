import './App.css';
import Home from './components/Home';
import Present from './components/Present'
import Analytics from './components/Analytics'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/Present",
        element: <Present />
      },
      {
        path: "/Analytics",
        element: <Analytics />
      }
    ]
  }
]);

function App() {
  return (
    <div className='body ' >
      {/* provider browser router */}
      <RouterProvider router={router} />
    </div>
  );
}
export default App;
