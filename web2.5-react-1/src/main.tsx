import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query';
import Home from './components/Home';
import { Products } from './components/Products';
// import Balance from './components/Balance';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Balance } from './components/Balance';

import './index.css';
import { MetaMaskProvider } from '@metamask/sdk-react';
import { MetamaskBalance } from './components/MetamaskBalance';
import { MetaMaskUIProvider } from '@metamask/sdk-react-ui';
import { MetamaskBalanceUI } from './components/MetamaskBalanceUI';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/products" element={<Products />} />
            <Route path="/balance" element={<Balance />} />
            <Route path="/balanceSDK" element={<MetamaskBalance />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider> */}

    {/* <MetaMaskProvider
      sdkOptions={{
        dappMetadata: {
          name: "Example React Dapp",
          url: window.location.href,
        },
        infuraAPIKey: "9d43f1a301d242339f05046815f846d2",
      }}
    >
      <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/products" element={<Products />} />
            <Route path="/balance" element={<Balance />} />
            <Route path="/balanceSDK" element={<MetamaskBalance />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
    </MetaMaskProvider> */}


    <MetaMaskUIProvider
      sdkOptions={{
        dappMetadata: {
          name: "Example React Dapp",
          url: window.location.href,
        },
        infuraAPIKey: "9d43f1a301d242339f05046815f846d2",
      }}
    >
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route path="/products" element={<Products />} />
              <Route path="/balance" element={<Balance />} />
              <Route path="/balanceSDK" element={<MetamaskBalanceUI />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </MetaMaskUIProvider>

  </StrictMode>,
)
