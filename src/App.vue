<template>
  <div id="app">
    <header>
      <div><h1>Covid-19 | São Paulo</h1></div>
      <div><p>Última Atualização: 29/05/2020</p></div>
    </header>
    <Casos />
    <footer>
      <p>Os dados são coletados a partir do mapa divulgado pela Prefeitura Municipal de São Paulo</p>
      <p>Fonte: <a href="https://www.prefeitura.sp.gov.br/cidade/secretarias/upload/saude/COVID19_Relatorio_SItuacional_SMS_20200529.pdf" target="_blank">Boletim Cidade de São Paulo</a></p>
      <a href="https://github.com/GuiiHenriq" target="_blank">Guilherme Henrique</a>
    </footer>
  </div>
</template>

<script>
import Casos from './components/Casos.vue'

export default {
  name: 'App',
  components: {
    Casos
  }
}
</script>

<style>
/* FONTS */
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400&display=swap');
@font-face {
  font-family: 'Archive';
  src: url('fonts/archive.otf');
}

/* RESET */
* {box-sizing: border-box;}

body,
ul,
li,
h1,
h2,
p {padding: 0px;margin: 0px;}

ul {list-style: none;}

body {font-family: "Nunito", Helvetica, Arial, sans-serif;color: #345;background: url("./assets/pattern.svg") repeat top;}

button {border: none;background: none;}

a {color: #345;text-decoration: none;}

/*img {max-width: 100%;display: block;}*/


header, footer {
  background: #fff;
  width: 100%;
  height: 8vh;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

header h1 {
  font-family: "Archive", Helvetica, Arial, sans-serif;
  font-weight: normal;
}

header p {
  color: #a5b1c2;
  font-weight: bold;
}

footer {
  box-shadow: 0px -4px 8px rgba(30, 60, 90, 0.1);
  height: 12vh;
}

footer p {
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
}

footer a {
  text-decoration: underline;
  font-size: 18px;
}

.btn {
  display: block;
  padding: 10px 30px;
  background: #87f;
  border-radius: 4px;
  color: #fff;
  text-align: center;
  font-size: 1rem;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.2);
  transition: all 0.3s;
  border: none;
  font-family: "Nunito", Helvetica, Arial, sans-serif;
  cursor: pointer;
}

.btn:hover {
  background: #65d;
  transform: scale(1.1);
}

.btn-disabled,
.btn-disabled:hover {
  background: #bbc;
  transform: scale(1);
}

#app {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
}

input,
textarea {
  border-radius: 4px;
  border: 1px solid white;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  transition: all 0.3s;
  font-size: 1rem;
  font-family: "Nunito", Helvetica, Arial, sans-serif;
  margin-bottom: 15px;
  width: 100%;
}

input:hover,
input:focus,
textarea:hover,
textarea:focus {
  outline: none;
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
  border-color: #87f;
}

/* Mobile */
@media only screen and (max-width: 768px) {
  header h1 {
    font-size: 26px;
  }
  footer {
    height: auto;
    padding: 10px 0;
  }
  footer p, footer p a{
    text-align: center;
    font-size: 16px;
  }
}

/* Dark Theme Browser/System 
@media screen and (prefers-color-scheme: dark) {
  body, header, footer {
    background: #222831 !important;
  }

  header h1, header p, footer, footer a, .casos i {
    color: #ececec !important;
  }

  h2 {
    color: #f2a365 !important;
  }

  .casos button.active i {
    color: #f2a365 !important;
  } 
}*/
</style>
