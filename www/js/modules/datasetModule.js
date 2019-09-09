const datasetSelect = Vue.component("dataset-select", {
  template: `<select
          v-model="selectedDataset"
          @change="$store.dispatch('onDatasetChange', selectedDataset)"
        >
          <option v-for="item in $store.state.dataset.datasetList" :value="item">{{
            item
          }}</option>
        </select>`,
  data() {
    return { selectedDataset: null,
        };
    }
});

const datasetModule = {
  state: {
    datasetList: null
  },
  mutations: {
    updateDatasetList(state, datasetList) {
      state.datasetList = datasetList;
        }
    },
  actions: {
      async getDatasets(context, phenotype) {
        let json = await fetch(`/getDatasets/${phenotype}`).then(resp =>
          resp.json()
      );
        context.commit("updateDatasetList", json);
    }
  }
};
