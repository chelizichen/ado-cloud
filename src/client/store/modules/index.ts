import { defineStore } from "pinia";

type CodeStore = {
  currEnity: string;
};

const useCodeStore = defineStore("store", {
  state: (): CodeStore => ({
    currEnity: "NULL",
  }),
  actions: {
    setEnity(newEnity: string) {
      this.currEnity = newEnity;
    },
  },
});

export default useCodeStore;
