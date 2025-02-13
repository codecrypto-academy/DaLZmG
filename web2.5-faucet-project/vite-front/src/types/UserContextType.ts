export type UserContextType = {
  wallet: string | null;
  setWallet: React.Dispatch<React.SetStateAction<string | null>>;
}