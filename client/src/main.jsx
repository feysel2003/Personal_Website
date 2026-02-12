import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// 1. Import Web3 Libraries
import { WagmiProvider } from 'wagmi'
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
// 2. NEW: Import HelmetProvider for SEO
import { HelmetProvider } from 'react-helmet-async'

// 3. Import the config we created earlier
import { config } from './wagmi.js'
import '@rainbow-me/rainbowkit/styles.css'

// 4. Create a Query Client (Required by Wagmi v2)
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 5. WRAP EVERYTHING IN HELMET PROVIDER */}
    <HelmetProvider>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider theme={darkTheme()}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </HelmetProvider>
  </React.StrictMode>,
)