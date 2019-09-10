const phenotypeSelect = Vue.component("phenotype-select", {
    props: ['phenotypes'],
    template: `<select
          v-model="selectedPhenotype"
          @change="$store.dispatch('onPhenotypeChange', selectedPhenotype)"
        >
          <optgroup
            v-for="(item, index) in phenotypes"
            :label="index"
          >
            <option
              v-for="listvalue in phenotypes[index]"
              :value="listvalue"
              >{{ listvalue }}
            </option>
          </optgroup>
        </select>`,
    data() {
        return {
            selectedPhenotype: null
        };
    }
});
