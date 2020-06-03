<template>
  <main>
    <div class="wrapper">
      <div class="infos">
        <h2>Dados Gerais</h2>
        <section class="infos-content">
          <div>
            <p>Casos Confirmados</p>
            <h1>{{totais.casos}}</h1>
          </div>
          <div>
            <p>Óbitos</p>
            <h1>{{totais.obitos}}</h1>
          </div>
        </section>
      </div>

      <main class="search">
        <h2>Procure seu bairro</h2>
        <form>
          <input
            id="search-bairro"
            name="search-bairro"
            type="text"
            placeholder="Bela Vista"
            v-model="bairros"
            @click.prevent=""
          />
          <input type="submit" id="btn-search" value="Buscar" @click.prevent="">
        </form>

        <section v-if="searchBairro">
          <p><span>Bairro:</span> {{ searchBairro.bairro }}</p>
          <p><span>Casos:</span> {{ searchBairro.casos }}</p>
          <p><span>Óbitos:</span> {{ searchBairro.obitos }}</p>
        </section>
      </main>

      <main class="casos">
        <section>
          <div>
            <h2>Todos os casos</h2>
          </div>
          <div>
            <button @click="changeView = false" data-btn="table" class="active">
              <i class="fas fa-table"></i>
            </button>
            <button @click="changeView = true" data-btn="list">
              <i class="fas fa-list-alt"></i>
            </button>
          </div>
        </section>

        <ul class="casos-content" v-if="changeView === false">
          <li v-for="caso in casos" :key="caso.bairro">
            <p><span>Bairro:</span> {{ caso.bairro }}</p>
            <p><span>Casos:</span> {{ caso.casos }}</p>
            <p><span>Óbitos:</span> {{ caso.obitos }}</p>
          </li>
        </ul>
        <ul class="casos-content-list" v-else>
          <div class="list-head">
            <li>
              <p><span>Bairro</span></p>
            </li>
            <li>
              <p><span>Casos</span></p>
            </li>
            <li>
              <p><span>Óbitos</span></p>
            </li>
          </div>
          <li v-for="caso in casos" :key="caso.bairro" class="list-infos">
            <p>{{caso.bairro}}</p>
            <p>{{caso.casos }}</p>
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
  name: "Casos",
  data() {
    return {
      //cep: '',
      //bairro: '',
      bairros: "",
      casoPorBairro: "",
      casos: [],
      changeView: false
    };
  },
  computed: {
    searchBairro() {
      const searchString = this.bairros.trim();
      return (searchString && this.casos.find(({ bairro }) => bairro === this.bairros));
    },
    totais() {
      let sumCasos = 0;
      let sumObitos = 0;
      for (let i = 0; i < this.casos.length; i++) {
        sumCasos = sumCasos + this.casos[i].casos;
        sumObitos = sumObitos + this.casos[i].obitos;
      }
      return {
        casos: sumCasos.toLocaleString(),
        obitos: sumObitos.toLocaleString()
      };
    }
  },
  methods: {
    buscarCep() {
      const cep = this.cep.replace(/\D/g, "");
      if (cep.length === 8) {
        getCep(cep).then(r => {
          this.bairro = r.data.bairro;
        });
      }
    },
    getCasos() {
      api.get(`/covid19.min.json`).then(r => {
        this.casos = r.data.bairros; // => PRODUCTION
        //this.casos = r.data; // => DEVELOPMENT
      });
    },
    changeColor() {
      const btnList = document.querySelector('button[data-btn="list"]');
      const btnTable = document.querySelector('button[data-btn="table"]');
      if (this.changeView === false) {
        btnList.classList.remove("active");
        btnTable.classList.add("active");
      } else {
        btnList.classList.add("active");
        btnTable.classList.remove("active");
      }
    }
  },
  created() {
    this.getCasos();
  },
  updated() {
    this.changeColor();
  }
};
</script>

<style scoped>
.wrapper {
  max-width: 960px;
  margin-right: auto;
  margin-left: auto;
  padding-right: 10px;
  padding-left: 10px;
}

.casos,
.infos {
  margin-top: 20px;
}

h2 {
  margin-bottom: 12px;
  color: #706fd3;
}

.casos-content,
.infos-content {
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
  box-shadow: 0 4px 6px 0 rgba(31, 70, 88, 0.04);
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

.search {
  width: 100%;
  margin: 30px 0 60px 0;
}

.search section {
  padding: 22px 0 22px 12px;
  width: 100%;
  border-radius: 4px;
  background: #fff;
  border: 1px solid #dbe9f5;
  box-shadow: 0 4px 6px 0 rgba(31, 70, 88, 0.04);
  font-size: 18px;
  letter-spacing: 0.5px;
}

.search section p span {
  font-weight: bold;
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
  box-shadow: 0 4px 6px 0 rgba(31, 70, 88, 0.04);
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
  box-shadow: 0 4px 6px 0 rgba(31, 70, 88, 0.04);
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
  box-shadow: 0 4px 6px 0 rgba(31, 70, 88, 0.04);
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

form {
  position: relative;
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

#btn-search {
  width: 62px;
  background: url("../assets/search.svg") no-repeat center center;
  text-indent: -150px;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 0px;
  right: 0px;
  box-shadow: none;
}


/* Mobile */
@media only screen and (max-width: 768px) {
  .infos div,
  .casos li {
    width: 100%;
  }
  .casos li:last-child {
    text-align: left;
  }
}
</style>
