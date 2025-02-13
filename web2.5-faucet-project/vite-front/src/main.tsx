import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Home } from './components/Home'
import { Faucet } from './components/Faucet'
import { BalanceMeta } from './components/BalanceMetamask'
import { Balance } from './components/Balance'
import { Transfer } from './components/Transfer'

// import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} >
          <Route index path="/home" element={<h1>Home</h1>} />
          <Route path="/faucet" element={<Faucet />} />
          <Route path="/balanceMeta" element={<BalanceMeta />} />
          <Route path="/balance" element={<Balance />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path='*' element={<h1>Not Found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
