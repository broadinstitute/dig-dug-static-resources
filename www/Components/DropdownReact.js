// //Code review
// //indent the code proeprly - hard to follow the code right now.
// //document the code - comment the Code - make it clearer - not hacky
// //name properly - name the functions properly.

class DropdownReact extends React.Component {
  constructor() {
    super();

    this.state = {
      displayMenu: false,
      isLoaded: false,
      datasets: [],
      phenotypes: []
  };


    this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);

  }

  showDropdownMenu(event) {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
      document.addEventListener('click', this.hideDropdownMenu);
    });
  }

  hideDropdownMenu() {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener('click', this.hideDropdownMenu);
    });

  }

  componentDidMount() {
      this.fetchDatasets();
      this.fetchPhenotypes();
  }

  fetchDatasets(){
      fetch('http://localhost:8090/getDatasets')
      .then(res => res.json())
      .then(json => {
          //console.log(json);
          this.setState({
              isLoaded:true,
              datasets:json
          })
      } )
  }

  fetchPhenotypes(){
      fetch('http://localhost:8090/getPhenotypes')
      .then(res => res.json())
      .then(json => {
          //console.log(json);
          this.setState({
              isLoaded:true,
              phenotypes:json
          })
      } )
  }
  render() {
      var { isLoaded, datasets, phenotypes } = this.state;

      if(!isLoaded){
          console.log("hello loaded");
          return (
            React.createElement("div", { className: "dropdown", style: { background: "red", width: "200px" } },
            React.createElement("div", { className: "button", onClick: this.showDropdownMenu }, " My Setting "),
        )
        );
      }
      else{

          // var Data     = this.state.datasets,
          //   Datasets = function(dataset) {
          //       return <option>{dataset}</option>;
          //   };
          //   return <select>{Data.map(Datasets)}</select>;

console.log(this.state.phenotypes['GLYCEMIC']);
            var Phenotype     = this.state.phenotypes[],
              Phenotypes = function(phenotype) {
                  return <option>{phenotype}</option>;
              };
              return <select>{Phenotype.map(Phenotypes)}</select>;
      }

  }}

//const domContainer2 = document.querySelector('#showDatasetDropdown');
const domContainer3 = document.querySelector('#showPhenotypeDropdown');
//ReactDOM.render(e(DropdownReact), domContainer2);
ReactDOM.render(e(DropdownReact), domContainer3);
