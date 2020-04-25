<template>
  <section>
    <header></header>
    <div class="wrapper">
      <!--<form>
        <label for="cep">Cep</label>
        <input id="cep" name="cep" type="text" v-model="cep" @keyup="buscarCep">
      </form>

      <section>
        Bairro: {{bairro}}
      </section>-->

      <div class="infos">
        <div>
          <p>Casos Confirmados</p>
          <h1>{{totalCasos}}</h1>
        </div>
        <div>
          <p>Óbitos</p>
          <h1>{{totalObitos}}</h1>
        </div>
      </div>

      <ul class="casos">
        <li v-for="(caso, index) in casos" :key="index">
          <p><span>Bairro:</span> {{caso.bairro}}</p>
          <p><span>Casos:</span> {{caso.casos}}</p>
          <p><span>Óbitos:</span> {{caso.obitos}}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { api, getCep } from "@/services.js";

export default {
  name: 'Casos',
  data() {
    return {
      cep: '',
      bairro: '',
      casos: null,
      valores: '',
      totalCasos: '',
      totalObitos: ''
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
        this.casos = r.data;
      });
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
    }
  },
  created() {
    this.getCasos();
  },
  beforeUpdate() {
    this.getValorMax();
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
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.infos {
  justify-content: space-around;
}

.infos div {
  margin-top: 20px;
  padding: 22px 12px;
  width: 215px;
  border-radius: 16px;
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
  color: blueviolet;
}

.casos li {
  margin-top: 20px;
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

form {
  max-width: 600px;
  margin: 30px auto 60px auto;
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
</style>
