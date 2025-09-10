import { create } from "zustand";

interface UiState {
  isLoginOpen: boolean;
  isAuthenticated: boolean;
  openLogin: () => void;
  closeLogin: () => void;
  login: () => void;
  logout: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  isLoginOpen: false,
  isAuthenticated: false,
  openLogin: () => set({ isLoginOpen: true }),
  closeLogin: () => set({ isLoginOpen: false }),
  login: () => set({ isAuthenticated: true, isLoginOpen: false }),
  logout: () => set({ isAuthenticated: false }),
}));
