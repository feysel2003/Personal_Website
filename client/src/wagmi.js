// client/src/wagmi.js
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia, polygon, hardhat } from 'wagmi/chains';

// PASTE YOUR REAL ID HERE (Keep the quotes!)
const projectId = '3011a6d4f4210a66f48e9337cb45c950'; 

export const config = getDefaultConfig({
  appName: 'My Prof Portfolio',
  projectId: projectId,
  chains: [hardhat, sepolia, polygon],
  ssr: false,
});