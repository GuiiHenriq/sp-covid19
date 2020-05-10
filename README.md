# Coronavírus - Cidade São Paulo

Esse projeto tem como objetivo em mostrar os dados do Covid-19 dentro da Cidade de São Paulo, atualmente está restrito apenas a Cidade de SP. Os dados do ABC, Osasco e região e demais municípios/cidades não estão nesse projeto **por enquanto**, nosso foco é divulgar os dados de cada bairro da cidade.
As atualizações dos dados se mantém de forma lenta por enquanto, pois se trata de um trabalho manual cada vez que é divulgado um novo mapa pela Prefeitura Municipal de São Paulo.
[https://covid19-sp.netlify.app/](https://covid19-sp.netlify.app/)

# OpenSource
Nosso projeto é totalmente open source, caso queira colaborar fique a vontade para nos ajudar com novas features, bugsfix, melhorias de layout e etc. 
Aguardo seu pull request!!


# Projeto
Este projeto foi desenvolvido com VueJS, na prática para aprender ainda mais sobre esse framework, não seguimos 100% com o melhor uso do Vue, utilizando componentização e etc, mas estamos sempre atualizando e criando novas features.

**Para Rodar o Projeto**
 - Faça um clone, utilizando git clone https://github.com/GuiiHenriq/sp-covid19
 - Instale as depêndencias, utlizando npm install (recomendando a última versão do Node)
 - Inicie o projeto, utilizando npm run serve

Nosso JSON está sendo consumido através do Netlify, para rodar o projeto local recomendamos que utilize [Json Server](https://github.com/typicode/json-server) e rode o json que se encontra dentro da pasta **/public**
É necessário alterar os paths e a o caminho do array no getAxios

# Dúvidas
Qualquer dúvida entre em contato conosco ou então abra um PR.

**Features em Desenvolvimento**
- Gráfico baseado na região.
- Melhorias no tamanho do projeto
