import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Home } from './layout/Home'
import { Balance } from './components/Balance'

import './index.css'
import { Tx } from './components/Tx'
import { Block } from './components/Block'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} >
            <Route path="balance/:address" element={<Balance />} />
            <Route path="tx/:txNumber" element={<Tx />} />
            <Route path="block/:blockNumber" element={<Block />} />
          </Route>
          <Route path="*" element={<p className='text-center'>404 - Not Found</p>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
    </StrictMode>
)
