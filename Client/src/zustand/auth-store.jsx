import { create } from 'zustand';
import { toast } from 'react-toastify';
import { register, login, getMe } from '../api/auth-api';
import { createJSONStorage, persist } from 'zustand/middleware';
const useAuthStore = create((set, get) => ({
  name: 'Manga',
  user: null,

  actionRegister: async (form) => {
    try {
      const result = await register(form);

      toast.success(result);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  },
  currentUser: async () => {
    try {
      const result = await getMe();

      set({
        user: result.data.user
      });

      return result;
    } catch (err) {
      console.log(err);
    }
  },
  actionLogin: async (form) => {
    try {
      const result = await login(form);

      localStorage.setItem('ACCESS_TOKEN', result.data.token);

      await get().currentUser();

      return result.data.user.user.role;
    } catch (err) {
      console.log(err);
    }
  },
  actionLogout: () => {
    localStorage.clear();
    set({ user: null });
  }
}));

export default useAuthStore;
