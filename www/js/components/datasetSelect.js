const datasetSelect = Vue.component("dataset-select", {
    props: ['datasets'],
    template: `<select
            v-model="selectedDataset"
            @change="$store.dispatch('onDatasetChange', selectedDataset)"
          >
            <option v-for="item in datasets" :value="item">{{
              item
            }}</option>
          </select>`,
    data() {
        return {
            selectedDataset: null,
        };
    }
});
