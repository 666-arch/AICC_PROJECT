import { create, StoreApi, UseBoundStore } from "zustand";
interface GlobalState {
    showModalState: boolean;
    setShowModalState: (state: boolean) =>void;
}
const useGlobalStore: UseBoundStore<StoreApi<GlobalState>> = create((set) => ({
    showModalState: false,
    setShowModalState(value) {
        set({
            showModalState: value
        })
    }
}));

export default useGlobalStore;