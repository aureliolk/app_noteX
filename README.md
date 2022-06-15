# Teste para vaga de Fullstack Jr

### Para o Avaliador
- Esse teste representa um avanço na minha carreira, estou a três anos estudando constantemente programação. Todo o meu conhecimento adquirido é de cursos ‘online’ pagos e gratuitos. Sou um profissional organizado e persistente, eu sei que irei atender a todos os requisitos, pois é nessa profissão que quero trabalhar até resto dos meus dias.  

## Questões Teóricas

1. Quais as partes principais de uma requisição HTTP?
- R> As principais Partes do Protocolo HTTP se encontra no Header e Body da requisição onde é utilizado para transmitir informações adicionais entre o cliente e o servidor.
  No HEADER Existem quatro categorias de cabeçalhos que poderão ser incluídos na mensagem os quais são: general-header, request-header, response-header e entity-header.
  No BODY corpo de dados que são que requisitados pelo cliente

2. Qual a diferença entre colocar um script dentro do "head" e no fim do "body"?
- R> Com scritp dentro do HEAD ele será carregado antes do carregamento completo do DOM isso fara com que todos os dados estejam disponíveis, no entanto, aumentara o tempo de Delay na renderização da página. Com o Scritp no final do Body ele será carregado apos o carregamento completo do DOM a depender dos dados que estão sendo solicitados isso fara um renderização mais rápida, no entanto, não a segura o carregamento completo dos dados sendo reaquistado pelo script.


3. Qual a diferença entre display: block e display: inline-block ?
- R> O display block e Inline-Block são propriedades de estilo, elas permitem que os elementos dentro de uma DIV permaneça em bloco ou ao lado independente do seu tamanho e altura. Um elemento com display block irá ocupar toda a linha independente do seu tamanho e altura, enquanto o display: inline-block ele ocupara a mesma linha do elemento anterior podendo ser definido com largura e altura. 


4. É possível criar um site responsivo SEM media queries? Por que?
- R> Sim!! Mais não seria a melhor prática, pois teria que utilizar de condicionais para saber a largura da tela do navegador e utilizar css distintos para cada tamanho.  Custo tempo x beneficio


5. No Javascript, é obrigatório usar VAR para criar uma variável?
- R> Não! Pois, eles contam, com CONST e LET, no entanto, ambas tem comportamentos diferentes para cada variável no escopo.


6. Criar funções com "function() {}" e com "() => {}" tem alguma diferença além da sintaxe?
- R> Arrow functions possuem this léxico enquanto o modelo normal possui this dinâmico. Isso significa que arrow functions herdam o contexto local de onde foi declarado, enquanto o modelo normal possui o contexto associado ao objeto que ele está vinculado no momento da chamada (se ele não estiver associado a ninguém na chamada, ele assumirá this automaticamente como o contexto global, que no caso dos navegadores é window)

font -> [StackOverflow](https://pt.stackoverflow.com/questions/143399/qual-a-diferen%C3%A7a-entre-function-e-por-que-n%C3%A3o-funciona-o-http-ge#:~:text=Retorno,%C3%A9%20omitido%20as%20chaves%20%7B%7D%20.)


7. Explique a lógica pra fazer uma paginação.
- R> Busca e Lista todos os elementos/objetos de um array especificando um limite para ser listado na tela. 
    
8. Qual a melhor forma de armazenar uma imagem no banco de dados?
- R> Não sei bem qual e a melhor forma, pois cada desenvolvedor resolve a solução de maneiras diferentes desde que haja melhoria do código. No entanto, eu vou falar o método que venho utilizando ultimamente.  Eu hospedo minha imagem via api para um serviço em nuvem EX: [Cloudinary](https://cloudinary.com), e salvo a URL no meu banco de dados.

9. No React, quantos useEffect eu posso usar?
- R> Quantas vezes eu quiser

10. Quais métodos de requisição preciso para criar um CRUD via API?
- R> POST, GET, PUT ou PATCH, DELETE


## Esse projeto esta hopedado na Vercel com o BD na PlanetScale
- Link [App FullStack Notex](https://app-note-x.vercel.app)