import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
    persist(
        (set, get) => ({
            token: null,
            isLoggedIn: false,
            login: (token) => {
                set({ token, isLoggedIn: true });
            },
            logout: () => {
                set({ token: null, isLoggedIn: false });
            },
        }),
        {
            name: 'auth-storage',
            onRehydrateStorage: () => (state) => {
                if (state?.token) {
                    get().login(state.token)
                }
            }
        },
    )
);

export default useAuthStore;