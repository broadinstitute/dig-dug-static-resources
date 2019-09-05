const phenotypeSelect = new Vue.component("phenotype-select", {
  template: `<select
          v-model="phenotype"
          @change="$store.dispatch('selectPhenotype', phenotype)"
        >
          <optgroup
            v-for="(item, index) in $store.state.phenotypeMap"
            :label="index"
          >
            <option
              v-for="listvalue in $store.state.phenotypeMap[index]"
              :value="listvalue"
              >{{ listvalue }}
            </option>
          </optgroup>
        </select>`,
  data() {
    return { selectedPhenotype: null };
  }
});

const phenotypeModule = {
  state: {
    phenotypeMap: null
  },
  mutations: {
    setPhenotypeMap(state, map) {
      state.phenotypeMap = map;
    }
  },
  actions: {
    async getPhenotypes(context) {
      let json = await fetch("/getPhenotypes").then(resp => resp.json());

      context.commit("updatePhenotypeMap", json);
    },

    async selectPhenotype(context, phenotype) {
      let json = await fetch(`/getDatasets/${phenotype}`).then(resp =>
        resp.json()
      );

      // commit changes
      context.commit("selectPhenotype", phenotype);
      context.commit("updateDatasetList", json);
    }
  }
};
