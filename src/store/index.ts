import { create, StoreApi, UseBoundStore } from "zustand";
interface GlobalState {
    showModalState: boolean;
    setShowModalState: (value: boolean) => void;
}
const useGlobalStore: UseBoundStore<StoreApi<GlobalState>> = create((set) => ({
    showModalState: false,
    setShowModalState(state: boolean) {
        set({
            showModalState: state
        })
    }
}));

export default useGlobalStore;