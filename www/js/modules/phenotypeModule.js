const phenotypeSelect = Vue.component("phenotype-select", {
  template: `<select
          v-model="selectedPhenotype"
          @change="$store.dispatch('onPhenotypeChange', selectedPhenotype)"
        >
          <optgroup
            v-for="(item, index) in $store.state.phenotype.phenotypeMap"
            :label="index"
          >
            <option
              v-for="listvalue in $store.state.phenotype.phenotypeMap[index]"
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
      context.commit("setPhenotypeMap", json);
    }
  }
};
