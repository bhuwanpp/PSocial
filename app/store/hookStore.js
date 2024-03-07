import { create } from 'zustand'

 export const useLocalStore = create((set) => ({
 localStorePost: [],
 setLocalStorePost:(newLocalStore)=> set({localStorePost:newLocalStore})

}))