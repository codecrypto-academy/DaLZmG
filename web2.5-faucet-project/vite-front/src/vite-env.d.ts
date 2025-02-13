/// <reference types="vite/client" />

interface TransParams {
  to: string;
  from: string;
  value: string;
}

interface Ethereum {
  request: (args: { method: string; params?: any[] }) => Promise<any>;
}

declare global {
  interface Window {
    ethereum: Ethereum;
  }
}

interface Window {
  ethereum: any;
}