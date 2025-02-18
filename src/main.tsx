// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import 'virtual:windi.css'
import './style/index.css'
import './style/font.css'
import './service/system/mock.ts'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>,
  <App />
)
