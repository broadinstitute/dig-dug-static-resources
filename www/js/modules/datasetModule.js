const datasetSelect = new Vue.component("dataset-select", {
  template: `<select
          v-model="dataset"
          @change="$store.dispatch('selectDataset', dataset)"
        >
          <option v-for="item in $store.state.datasetList" :value="item">{{
            item
          }}</option>
        </select>`,
  data() {
    return { selectedDataset: null };
  }
});

const datasetModule = {
  modules: {
    dataset: datasetSelect
  },

  state: {
    datasetList: null
  },
  mutations: {
    updateDatasetList(state, datasetList) {
      state.datasetList = datasetList;
    },
    selectDataset(state, dataset) {
      state.selectedDataset = dataset;
    }
  },
  actions: {
    async selectDataset(context, dataset) {
      context.commit("selectDataset", dataset);
      context.dispatch("performGetData");
    }
  }
};
