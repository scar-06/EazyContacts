// app/store/useStore.ts
import { create } from "zustand";

interface Contact {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  addresses: string[];
  longitude: number;
  latitude: number;
}

interface ContactStore {
  contacts: Contact[];
  addContact: (contact: Contact) => void;
}

export const useContactStore = create<ContactStore>((set) => ({
  contacts: [],
  addContact: (contact) =>
    set((state) => ({ contacts: [...state.contacts, contact] })),
}));
