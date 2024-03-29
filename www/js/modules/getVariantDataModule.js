const getVariantDataModule = {
    namespaced:true,
    state() {
        return {variants: null, limit:25}
    },
    mutations: {
        updateVariants(state, variants) {
            state.variants = variants;
        },
        setLimit(state, limit){
            state.limit = limit;
        },
        clearData(state){
            state.variants = [];
        }
    },
    actions: {
        async getData(context, {dataset, phenotype}) {
            //input JSON
            let body = {
                passback: "abc123",
                entity: "variant",
                page_start: -1,
                page_size: -1,
                limit: context.state.limit,
                count: false,
                result_format: "verbose",
                properties: {
                    cproperty: [
                        "CHROM",
                        "CLOSEST_GENE",
                        "DBSNP_ID",
                        "POS",
                        "VAR_ID"
                    ],
                    dproperty: { MAF: [dataset] },
                    pproperty: {
                        ODDS_RATIO: { [dataset]: [phenotype] },
                        P_VALUE: { [dataset]: [phenotype] }
                    }
                },
                filters: [
                    {
                        dataset_id: dataset,
                        phenotype: phenotype,
                        operand: "P_VALUE",
                        operator: "LT",
                        value: 1,
                        operand_type: "FLOAT"
                    },
                    {
                        dataset_id: dataset,
                        phenotype: phenotype,
                        operand: "P_VALUE",
                        operator: "GT",
                        value: 0.0,
                        operand_type: "FLOAT"
                    }
                ]
            };
            // download the variants
            let variantJson = fetch(`/getData`, {
                method: "POST",
                body: JSON.stringify(body)
            })
            .then(resp => resp.json())
            .then(json =>
                tableColumns(
                    json,
                    "VAR_ID",
                    "CHROM",
                    "POS",
                    "CLOSEST_GENE",
                    "P_VALUE"
                )
            )
            .then(variantData => context.commit("updateVariants", variantData))
            .catch(error => console.log(error.message));
        }
    }
};
