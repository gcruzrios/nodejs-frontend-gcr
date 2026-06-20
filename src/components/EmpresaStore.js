import { create } from "zustand";
import axios from "axios";

const useEmpresaStore = create((set, get) => ({
  empresas: [],
  loading: false,
  error: null,

  fetchEmpresas: async () => {
    if (get().loading) return;
    set({ loading: true, error: null });
    try {
      const response = await axios.get("/api/empresas");
      set({ empresas: response.data.data, loading: false });
    } catch {
      set({ error: "Error al cargar las empresas.", loading: false });
    }
  },

  deleteEmpresa: async (id) => {
    await axios.delete(`/api/empresas/${id}`);
    set((state) => ({
      empresas: state.empresas.filter((e) => e._id !== id),
    }));
  },

  reset: () => set({ empresas: [], loading: false, error: null }),
}));

export default useEmpresaStore;
