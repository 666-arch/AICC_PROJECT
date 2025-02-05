import { create, StoreApi, UseBoundStore } from "zustand";
export interface IdOptions {
    id: string;
    name: string;
    status: string;
}
interface GlobalState {
    idList: Array<IdOptions> | [];
    setIdList: (data: Array<IdOptions>) => void;
}
const useGlobalStore: UseBoundStore<StoreApi<GlobalState>> = create((set) => ({
    idList: [],
    setIdList: (data: IdOptions[]) => set(state => ({
        idList: [...state.idList, ...data]
    }))
}));

export default useGlobalStore;