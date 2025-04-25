import { create } from "zustand";

export const useServiceStore = create((set) => ({
  services: [],
  addService: (service) => set((state) => ({ services: [...state.services, service] })),
  removeService: (id) => set((state) => ({ services: state.services.filter((service) => service.id !== id) })),
  updateService: (id, updatedService) =>
    set((state) => ({
      services: state.services.map((service) => (service.id === id ? { ...service, ...updatedService } : service)),
    })),
  clearServices: () => set({ services: [] }),
}));
