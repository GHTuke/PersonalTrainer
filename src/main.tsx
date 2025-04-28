import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Customer from './Customer.tsx'
import Training from './Training.tsx'
import Error from './Error.tsx'
import Calendar from './Calendar.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        element: <Customer />,
        index: true
      },
      {
        path: "training",
        element: <Training />
      },
      {
        path: "calendar",
        element: <Calendar />
      }
    ]
  },

])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
