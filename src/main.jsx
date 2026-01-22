import { StrictMode } from 'react'
import { Toaster } from "@/components/ui/sonner"
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Createtrip from './create-trip/index.jsx'
import Header from './components/ui/custom/Header.jsx'
import TripDetails from './viewTrip/TripDetails.jsx'
const router =createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },
   {
    path:'/a',
    element:<Createtrip/>
  },
  {
     path:'/trip/:id', 
    element: <TripDetails /> 
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <Toaster />
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
 