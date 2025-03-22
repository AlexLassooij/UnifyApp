import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/datamodel/datamodel';

interface UserState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      loading: false,
      setUser: (user) => set({ user }),
      setLoading: (loading) => set({ loading }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'user-storage', // unique name for localStorage
    }
  )
);