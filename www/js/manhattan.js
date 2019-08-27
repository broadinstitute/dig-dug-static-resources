Vue.component("manhattan-plot", {
    data(){
        return {
            chart:null
        }
    },
    mounted(){
        this.chart = c3.generate({
            data:{
                xs:{
                    data:"data_x"
                },
                type:"scatter",
                columns:[]
            },
            bindto: '#chart',
            axis:{
                x:{
                    label:"Chromosome",
                    tick:{
                        format(pos){
                            for (chrom in chromosomeStart){
                                if(chromosomeStart[chrom] == pos){
                                    return chrom
                                }
                            }
                        },
                        values:chromosomes.map((c) => chromosomeStart[c])
                    }
                },
                y:{
                    label:"-log10 P"
                }
            }

        });
        this.$store.subscribe((mutation, state) => {
            if(mutation.type == "setTableData"){
                let xs = ['data_x'];
                let ys = ['data'];

                this.$store.state.tableData.forEach((v) => {
                    let p_value = v[4][this.$store.state.selectedDataset][this.$store.state.selectedPhenotype];
                    let pos = chromosomeStart[v[1]] + v[2];
                    xs.push(pos); // Pos
                    ys.push(-Math.log10(p_value)); // P_VALUE
                });
                //console.log("data", ys);
                this.chart.load({
                    columns: [xs, ys]
                });
            }
        })
    }
});

let  chromosomeLength = {
     //chromosome name, length
                 '1':247249719,
                 '2':242951149,
                 '3':199501827,
                 '4':191273063,
                 '5':180857866,
                 '6':170899992,
                 '7':158821424,
                 '8':146274826,
                 '9':140273252,
                 '10':135374737,
                 '11':134452384,
                 '12':132349534,
                 '13':114142980,
                 '14':106368585,
                 '15':100338915,
                 '16':88827254,
                 '17':78774742,
                 '18':76117153,
                 '19':63811651,
                 '20':62435964,
                 '21':46944323,
                 '22':49691432,
                 'X':154913754,
                 'Y':57772954,
             };

let chromosomes = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18",
"19","20","21","22","X","Y"];

let chromosomeStart = {};
let start = 0;
for (i in chromosomes){
    let chrom = chromosomes[i];
    chromosomeStart[chrom] = start;
    start+=chromosomeLength[chrom];
}
