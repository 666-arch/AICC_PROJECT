// import { Effect, Reducer, Subscription } from "umi";
// export interface GlobalModelType {
//   namespace: "global";
//   state: GlobalModelState;
//   reducers: {
//     changeGlobalBG: Reducer<GlobalModelState>;
//   };
//   subscriptions?: { setup: Subscription };
// }

// const GlobalModel: GlobalModelType = {
//   namespace: "global",
//   state: {
//     global_bg: 'Theme1'
//   },
//   reducers :{
//     changeGlobalBG(state, { payload }) {
//       debugger
//       console.log('payload',payload);
//       return {
//         ...state,
//         ...payload,
//       };
//     },
//   }
// }

// export default GlobalModel;

export default {
  namespace: 'global',
  state: {
    global_bg: '', // 电力概览页面需要显示的消息
  },
  reducers: {
    setGlobalBG(state: any, { payload }: any) {
      return {
        ...state,
        global_bg: payload,
      };
    },
  },
};