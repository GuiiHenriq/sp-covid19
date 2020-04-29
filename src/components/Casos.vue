<template>
  <main>
    <div class="wrapper">
      <div class="infos">
        <h2>Infos</h2>
        <section class="infos-content">
          <div>
            <p>Casos Confirmados</p>
            <h1>{{totalCasos}}</h1>
          </div>
          <div>
            <p>Óbitos</p>
            <h1>{{totalObitos}}</h1>
          </div>
        </section>
      </div>

      <main class="search">
        <form>
          <input id="cep" name="cep" type="text" placeholder="Alto do Boa Vista" v-model="cep" @keyup="buscarCep">
        </form>

        <section>
          Bairro: {{bairro}}

          <!--<ul>
            <li v-for="(bairro, index) in searchBairro" :key="index">
              <p><span>Bairro:</span> {{bairro.bairro}}</p>
              <p><span>Casos:</span> {{bairro.casos}}</p>
              <p><span>Óbitos:</span> {{bairro.obitos}}</p>
            </li>
          </ul>-->

          <p>{{searchBairro}}</p>
          <p>{{searchCasos}}</p>
          <p>{{searchObitos}}</p>
        </section>
      </main>

      <main class="casos">
        <section>
          <div>
            <h2>Casos</h2>
          </div>
          <div>
            <button @click="changeView = false" data-btn="table" class="active"><i class="fas fa-table"></i></button>
            <button @click="changeView = true" data-btn="list"><i class="fas fa-list-alt"></i></button>
          </div>
        </section>

        <ul class="casos-content" v-if="changeView === false">
          <li v-for="(caso, index) in casos" :key="index">
            <p><span>Bairro:</span> {{caso.bairro}}</p>
            <p><span>Casos:</span> {{caso.casos}}</p>
            <p><span>Óbitos:</span> {{caso.obitos}}</p>
          </li>
        </ul>
        <ul class="casos-content-list" v-else>
          <div class="list-head">
            <li><p><span>Bairro</span></p></li>
            <li><p><span>Casos</span></p></li>
            <li><p><span>Óbitos</span></p></li>
          </div>
          <li v-for="(caso, index) in casos" :key="index" class="list-infos">
            <p>{{caso.bairro}}</p>
            <p>{{caso.casos}}</p>
            <p>{{caso.obitos}}</p>
          </li>
        </ul>
      </main>
    </div>
  </main>
</template>

<script>
import { api, getCep } from "@/services.js";

export default {
  name: 'Casos',
  data() {
    return {
      cep: '',
      bairro: '',
      casoPorBairro: '',
      casos: null,
      valores: '',
      totalCasos: '',
      totalObitos: '',
      changeView: false,
      listBairros: [],
      searchBairro: '',
      searchCasos: '',
      searchObitos: '',
    };
  },
  methods: {
    buscarCep() {
      const cep = this.cep.replace(/\D/g, "");
      if(cep.length === 8) {
        getCep(cep).then(r => {
          this.bairro = r.data.bairro;
        })
      }
    },
    getCasos() {
      api.get(`/bairros`).then(r => {
        //this.casos = r.data.bairros; //ARRAY JSON WEB
        //this.casos = r.data; //ARRAY JSON LOCAL
      });
    },
    showBairro() {
      for(let i = 0; i < this.casos.length; i++){
        this.listBairros.push(this.casos[i]);
      }

      const result = this.listBairros.find(list => list.bairro === this.bairro);
      if(result) {
        this.searchBairro = result.bairro;
        this.searchCasos = result.casos;
        this.searchObitos = result.obitos
      }
    },
    getValorMax() {
      let sumCasos = 0;
      let sumObitos = 0;
      for(let i = 0; i < this.casos.length; i++){
        this.valores = this.casos[i].casos;
        sumCasos = sumCasos + this.casos[i].casos;
        sumObitos = sumObitos + this.casos[i].obitos;
      }
      this.totalCasos = sumCasos.toLocaleString();
      this.totalObitos = sumObitos.toLocaleString();
    },
    changeColor() {
      const btnList = document.querySelector('button[data-btn="list"]');
      const btnTable = document.querySelector('button[data-btn="table"]');
      if(this.changeView === false) {
        btnList.classList.remove('active');
        btnTable.classList.add('active');
      } else {
        btnList.classList.add('active');
        btnTable.classList.remove('active');
      }
    }
  },
  created() {
    this.getCasos();
  },
  beforeUpdate() {
    this.getValorMax();
    this.showBairro();
  },
  updated() {
    this.changeColor();
  }
}
</script>

<style scoped>
.wrapper {
   max-width: 960px;
   margin-right:auto; 
   margin-left: auto;
   padding-right: 10px;
   padding-left: 10px;
}

.casos, .infos {
  margin-top: 20px;
}

h2 {
  margin-bottom: 12px;
  color: #706fd3
}

.casos-content, .infos-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.infos-content {
  justify-content: space-between;
}

.infos div {
  margin-bottom: 20px;
  padding: 22px 12px;
  width: 215px;
  border-radius: 4px;
  background: #fff;
  border: 1px solid #dbe9f5;
  box-shadow: 0 4px 6px 0 rgba(31,70,88,.04);
}

.infos div h1 {
  margin-right: 12px;
  font-weight: 700;
  font-size: 40px;
  line-height: 48px;
  letter-spacing: -1.29px;
}

.infos div p {
  font-weight: bold;
  font-size: 18px;
}

.casos section {
  display: flex;
  justify-content: space-between;
}

.casos i {
  font-size: 32px;
  cursor: pointer;
  color: #345;
}

.casos button.active i {
  color: #706fd3;
}

/* Table/Cards */
.casos-content li {
  margin-bottom: 20px;
  padding: 22px 0 22px 12px;
  width: 215px;
  border-radius: 4px;
  background: #fff;
  border: 1px solid #dbe9f5;
  box-shadow: 0 4px 6px 0 rgba(31,70,88,.04);
  font-size: 18px;
  letter-spacing: 0.5px;
}

.casos li:last-child {
  width: 100%;
  text-align: center;
  margin-bottom: 60px;
}

.casos li span {
  font-weight: bold;
}

/* List */
.casos-content-list {
  max-height: 600px;
  overflow: auto;
  margin-bottom: 60px;
}

.casos-content-list li:last-child {
  margin: 0;
}

.list-head {
  display: flex;
  padding: 10px;
  margin-bottom: 15px;
  background: #fff;
  box-shadow: 0 4px 6px 0 rgba(31,70,88,.04);
}

.list-head li {
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  width: 100%;
  margin: 0 !important;
  font-size: 20px;
}

.list-infos {
  width: 100%;
  border-radius: 0;
  margin: 0;
  padding: 10px;
  box-shadow: 0 4px 6px 0 rgba(31,70,88,.04);
  background: #fff;
  font-size: 18px;
  letter-spacing: 0.5px;
  display: flex;
  justify-content: space-around;
}

.list-infos:nth-child(odd) {
  background: #f7f7f7;
}

.casos-content-list .list-infos p {
  width: 100%;
  text-align: center;
}

.search {
  width: 100%;
  margin: 30px 0 60px 0;
}

#busca {
  width: 100%;
  padding: 20px;
  border: none;
}

#busca:focus,
#busca:hover {
  transform: scale(1.1);
}

#lupa {
  width: 62px;
  height: 62px;
  background: url("../assets/search.svg") no-repeat center center;
  text-indent: -150px;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 0px;
  right: 0px;
  box-shadow: none;
}

@media only screen and (max-width: 768px) {
 .infos div, .casos li {
   width: 100%;
 }
 .casos li:last-child {
   text-align: left;
 }
}
</style>
