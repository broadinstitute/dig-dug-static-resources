const getVariantDataModule = {
    state() {
        return {variants: null}
    },
    mutations: {
        updateVariants(state, variants) {
            state.variants = variants;
        }
    },
    actions: {
        async getData(context, dataset, phenotype, limit) {
            console.log("inside getVariantDataModule " + dataset);
            console.log("inside getVariantDataModule " + phenotype);

            //input JSON
            let body = {
                passback: "abc123",
                entity: "variant",
                page_start: -1,
                page_size: -1,
                limit: limit || 25,
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
