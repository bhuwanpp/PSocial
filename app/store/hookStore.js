import { create } from 'zustand'

 export const useLocalStore = create((set) => ({
 localStore: [],
 setLocalStore:(newLocalStore)=> set({localStore:newLocalStore})

}))