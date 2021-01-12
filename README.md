![](https://bitbucket.org/peruglugluinteractive/20200627-softjs-framework/raw/3c8e48d6b5b79dde8d9ceec8f52715aab7800b98/src/soft-lib/assets/img/softjs-framework.png)

# Soft.js - v2.0.0
### Última atualização: 12/01/2021

...

## Introdução

---

O **Soft.js** é um framework em constante evolução, desenvolvido em javascript para estruturação, padronização e paginação de projetos em HTML5.

...

## Estrutura padrão

---

* [ src ]
    * [ soft-content ]
        * [ assets ]
            * { imgs, js, css, etc... }
        * soft-content.js
    * [ soft-lib ]
        * [ assets ]
            * [ css ]
                * soft.css
                * soft.css.map
            * [ imgs ]
                * soft.png
            * [ libs ]
                * jquery-3.4.1.min.js
                * jquery.html5Loader-1.8.0.min.js
                * lodash-4.17.11.min.js
            * [ sass ]
                * _mixin.sass
                * soft.sass
        * soft.js
    * [ soft-extensions ]
    * [ soft-theme ]
        * [ nome-do-tema ]
            * [ assets ]
                * { imgs, js, css, etc... }
    * index.html
    * soft-config.js

...

## Visão geral da estrutura padrão

---

## 1. [ soft-content ]

Todos os _assets_ de integridade do conteúdo do projeto devem permanecer neste diretório, tais como imagens, áudios, vídeos, arquivos para downloads, textos, etc.

Por questão de organização, é altamente aconselhável que cada página tenha a sua pasta com os seus respectivos _assets_. Cada página necessita obrigatoriamente de um arquivo **.js** com as informações que o **soft.js** irá ler para exibí-la na aplicação. Exemplo abaixo:

```javascript
var softPage = {

    pageClass: 'paginas padrao-1', // Opcional. Pode deixar vazio ('').
    pageAttribute: 'data="pag-1"', // Opcional. Pode deixar vazio ('').

    pageLoader: {
        
        loaderShowMethod: 'theme.showLoader()', // Usado para exibir o preloader de carregamento das páginas. Para remover o preloader, faça-o no método de entrada da página ou por um método padrão chamado em todos os métodos das páginas.
        
        // 'singularFiles' Não é obrigatório, mas é muito importante colocar todas as imagens usadas na página para garantir o carregamento total e melhor experiência do usuário.
        singularFiles: {
            files: [
                { 'type': 'IMAGE', 'source': 'soft-theme/example/assets/img/default/preloader.gif', 'size': 323350 },
                { 'type': 'IMAGE', 'source': 'soft-theme/example/assets/img/default/capa2.png', 'size': 4649857 },
            ]
        },

        // Opcional. Pode deixar vazio ([]).
        animationSequenceImages: []
    },

    // Obrigatório.
    pageCode: '
        <div class="container">\
            <p>Página de teste</p>\
        </div>',

    // Seu uso é opcional, mas a definição de valor (exemplos abaixo) é obrigatório.
    // Aqui eu referencio o template listado em soft-content.js
    pageTemplate: '',
    /* Existem 3 valores para esta propriedade:
    
    1. '' - Vazio;
    
    2 - {
        templateId: 'default-template',
        templateClass: ''
    };
    
    3 - 'no-template'.

    -----------------------------------

    1 - Buscará o template global em 'contentGlobal.template', porém, se também estiver vazio, seguirá sem template, inserindo o conteúdo diretamente no elemento da página;
    
    2 - Formato: {Object}. Mesmo que exista um template setado em 'contentGlobal.template', a prioridade sempre será da informação passada dentro da página. IMPORTANTE: Nunca deixe a propriedade 'templateId' vazia ('');
    
    3 - Mesmo que exista um template setado em 'contentGlobal.template', não utilizará qualquer template, inserindo o conteúdo diretamente no elemento da página.*/

    // Aqui eu referencio o(s) include(s) listado(s) em soft-content.js
    pageIncludes: [],
    /* Existem 3 valores para esta propriedade:
    
    1. '' - Vazio;

    2. [] - Vazio;
    
    3 - {
        holder: '',
        includeID: 'default-include',
        includeClass: ''
    }.

    -----------------------------------

    1 - Não adiciona nenhum include à página;
    
    2 - Formato: [Array e {Object}]. Inclui o include na página. Se o 'holder' estiver vazio, o include ficará diretamente no elemento da página. IMPORTANTE: Nunca deixe a propriedade 'includeID' vazia ('');*/

    pageStatus: 'inactive',
    // Qualquer valor diferente de 'inactive' habilita a página para navegação.

    pageInMethod: 'theme.pagina1()',
    // Opcional. Aqui colocamos o função que será executada após o carregamento da página.

    pageOutMethod: ''
    // Opcional. Aqui colocamos o função que será executada para sair da página atual. Ainda não implementado.

}

// Obrigatório. Necessário para dar continuidade na execução do carregamento do **soft.js**.
soft.pageBuild();
```

Na raiz no diretório **soft-content** temos o arquivo **soft-content.js**, reponsável por organizar o conteúdo. Exemplo abaixo:

### soft-content.js

```javascript
var softContent = [

    {

        languageLabel: 'Pt-Br', // Obrigatório.
        languageClass: 'pt-br', // Obrigatório.

        contentTitle: 'Título do Projeto', // Obrigatório.
        contentClass: '', // Opcional.
        
        contentPages: [

            {

                pageTitle: 'Página 1', // Obrigatório.
                pageId: 'pagina-1', // Obrigatório.
                pageFilePath: 'pasta/page.js'

            }

        ],

        // Opcional. Listagem dos templates usados no projeto
        // Valor padrão: ''
        contentTemplates: [

            {
                templateLabel: 'Template Padrão', // Obrigatório no caso de aplicação de template.
                templateId: 'default-template', // Obrigatório no caso de aplicação de template.
                
                // Obrigatório no caso de aplicação de template.
                templateHTML: '
                    <div class="template">\
                        <div class="coluna-direita"></div>\
                        <div id="soft-content"></div>\
                        <div class="coluna-esquerda"></div>\
                    </div>'
            }
        
        ],

        // Opcional. Listagem dos includes usados no projeto
        // Valor padrão: ''
        contentIncludes: [

            {
                includeLabel: 'Include Padrão', // Obrigatório no caso de aplicação de includes.
                includeID: 'default-include', // Obrigatório
                
                // Obrigatório no caso de aplicação de includes.
                includeHTML: '
                    <div class="include">\
                        <header></header>\
                        <footer></footer>\
                    </div>'
            }

        ],

        // Itens globais
        contentGlobal: {

            // Opcional. É usado para setar o template global, dispensando a necessidade do uso em cada página.
            // Formato: {Object}.
            // Valor padrão: ''.
            template: {
                templateId: 'default-template',
                templateClass: ''
            },

            // Opcional. Esses includes ficam em uma camada acima da estrutura da página. É indicado usar em situações onde a troca de página não deve alterar os elementos que estão por cima, como header, menu e footer, por exemplo.
            // Formato: [Array e {Object}].
            // Valor padrão: ''.
            includes: [
                {
                    includeID: 'default-include',
                    includeClass: ''
                }
            ],

            // Obrigatório. Separador da paginação.
            paginationSeparator: '/',

            // Obrigatório. Essas mensagens são exibidas no console.
            messages: {

                pageNotFound: 'Erro 404. Página não encontrada.',

                pageInactive: 'Página inativa.',

                languageNotFound: 'Idioma não encontrado.'

            }

        }

    }

]
```
...

## 2. [ soft-lib ]

Motor principal do framework.

Todos os diretórios e arquivos são editáveis, exceto o que existe dentro **[ soft-lib ]**.

Qualquer necessidade ou sugestão de mudanças por aqui, devem ser notificadas imediatamente ao time responsável pelo **Soft.js**, para análise e possíveis implementações em versões futuras.

...

## 2. [ soft-extensions ]

Libs externas e de terceiros para compor a aplicação.

É possível incluir qualquer tipo de biblioteca em Javascript ou CSS. Basta inserir em **soft-config.js**.

...

## 3. [ soft-theme ]

O conceito de estruturação do **Soft.js**, baseia-se em temas aplicados ao material no qual o projeto pertence, ou seja, alterações de temas não devem interferir no conteúdo em si.

Sendo assim, temos o diretório **[ soft-theme ]**, que por sua vez, guarda o subdiretório do tema atual do projeto.

O nome deve estar todo em 'caixa baixa', separado por '-' (hífem) ou '_' (_underline_), sem espaços, acentuações ou caracteres espaciais.

É aconselhado evitar nomes genéricos, seguindo algo relacionado ao projeto ou cliente.

...

## 4. index.html

AS mudanças geradas no **index.html** são feitas dinamicamente durante o processo de carregamento das páginas.

Não deve nunca ser editado manualmente. Salvo em situações nas quais necessitem o contato ao time responsável pelo **Soft.js** para correções e melhorias.

### index.html

```html
<!DOCTYPE html>

<html>

    <head>

        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, user-scalable=no" />

        <title></title>

        <link rel="stylesheet" type="text/css" href="soft-lib/assets/css/soft.css">

    </head>

    <body id="soft">

        <script type="text/javascript" src="soft-config.js"></script>
        <script type="text/javascript" src="soft-content/soft-content.js"></script>
        <script type="text/javascript" src="soft-lib/assets/libs/jquery-3.4.1.min.js"></script>
        <script type="text/javascript" src="soft-lib/assets/libs/jquery.html5Loader-1.8.0.min.js"></script>
        <script type="text/javascript" src="soft-lib/assets/libs/lodash-4.17.11.min.js"></script>
        <script type="text/javascript" src="soft-lib/soft.js"></script>

    </body>

</html>
```

...

## 5. soft-config.js

É o primeiro arquivo que editamos no início do projeto. Sem as informações setadas corretamente, o projeto simplesmente não funciona.

### soft-config.js

```javascript
var softConfig = {

    // Configurações globais
    global: {

        documentTitle: 'Compass :: Richmond',
        // Geralmente é o nome do cliente, coleção, macro projeto, etc.
        
        documentTitleSeparator: ' :: ',
        // Padrão: ' :: '.
        // Separador entre o título principal (documentTitle) e o nome do projeto (contentTitle), por exemplo: Jogo da memória.

        pageTitleSeparator: ' :: ',
        // Padrão: ' - '.
        // Separador entre o título da página (pageTitle) e o nome do projeto (contentTitle).

        defaultLanguage: 'pt-br',
        // Padrão: 'pt-br'.
        // Idioma padrão toda vez que o projeto é executado.

        initConsoleClear: false,
        // Padrão: 'false'.
        // No console exibimos as informações do Soft.js toda vez que o projeto é carregado. Se deixar 'true', isso será removido.

        blockContextMenu: true,
        // Padrão: 'true'.
        // Bloquear menu de contexto com o botão do mouse.

        blockF12KeyAndCtrlShiftI: true,
        // Padrão: 'true'.
        // Bloquear F12 e Ctrl+Shift+T.

        touchCallout: false,
        // Padrão: 'false'.
        // Propriedade do CSS em dispositivos móveis para travar a seleção de elementos ao pressionar o dedo sobre a tela. Valor 'true' remove a propriedade.

        userSelect: false,
        // Padrão: 'false'.
        // Propriedade do CSS para bloquear a seleção de textos.

        userDrag: false,
        // Padrão: 'false'.
        // Propriedade do CSS para bloquear o clique em imagens e arrastar para a barra de endereço ou nova aba do navegador.

    },

    splashScreen: true,
    // Padrão: 'true'.
    // Com essa opção habilitada, a primeira página da estrutura passa a ser o Splash Screen, que geralmente exibe o logo do projeto ou do cliente.

    theme: {

        themePath: 'diretorio-do-tema',
        // Diretório do tema em 'soft-theme'

        themeFaviconFilePath: 'assets/img/favicon.png',
        // Favicon

        // Arquivos CSS e JS presentes no tema.
        // A ordem colocada na lista será respeitada no HTML.
        // CSS no <head> e JS no final do <body> antes de fechar a tag.
        themeFiles: {
            cssFiles: [
                'assets/css/reset.css',
                'assets/css/default.css',
                'assets/css/custom.css',
                'assets/css/default-responsive.css',
                'assets/css/custom-responsive.css'
            ],
            jsFiles: [
                'assets/js/theme.js'
            ]
        }

    },

    // Aqui informamos os plugins e outras libs externas que serão usadas na aplicação.
    // A ordem inserida aqui será respeitada no HTML.
    // CSS no <head> e JS no final do <body> antes de fechar a tag.
    extensions: [

        {
            // Neste exemplo, temos o SCORM 1.2.
            extensionName: 'SCORM 1.2', // Nome apenas para facilitar a leitura.
            extensionPath: 'Scorm12', // Diretório -> Ex.: soft-extensions/Scorm12.
            extensionVersion: '', // A versão utilizada.
            extensionFiles: {
                cssFiles: [], // CSS.
                jsFiles: [ // JS.
                    'scormfunctions.js'
                ]
            },
            extensionConfig: {}, // Aqui setamos as configurações específicas da lib de acordo com a documentação.
            active: true // Parâmetro para ativar/desativar a extensão
        },

        {
            // Neste exemplo, temos a lib de áudio howler.js.
            extensionName: 'howler.js',
            extensionPath: 'howler',
            extensionVersion: '2.1.2',
            extensionFiles: {
                cssFiles: [],
                jsFiles: [
                    'howler.min.js'
                ]
            },
            extensionConfig: {}
        },

    ]

}
```

...

## Métodos e classes
---
O **Soft.js** possui seus meios próprios de executar determinadas tarefas dentro do projeto:

## Métodos

### **soft.navigator();**

Usado para coletar todas as informações necessárias do navegador, dispositivo, navegador, etc.

Sintaxe:
```javascript
soft.navigator();

ou

soft.navigator('Parâmetro');
```

Entradas suportadas:
```javascript
String
```

Exemplo de aplicação:
```javascript
soft.navigator();

ou

soft.navigator('title');
```

> **Importante**: No caso de fazer a chamada sem informar um parâmetro, por padrão virá o **infoBrowser** da página.

Parâmetros suportados:
```javascript
- 'browserName': Retorna o nome do navegador;
- 'browserVersion': Retorna a versão do navegador;
- 'isMobile': Retorna se é mobile ou não;
- 'device': Retorna o tipo de dispositivo do usuário;
- 'OSName': Retorna o nome do sistema operacional do dispositivo;
- 'OSVersion': Retorna a versão do sistema operacional do dispositivo;
- 'appCodeName': Retorna o nome base do navegador;
- 'appName': Retorna o nome da arquitetura do navegador;
- 'appVersion': Retorna a versão da arquitetura do navegador;
- 'platform': Retorna a plataforma do navegador;
- 'product': Retorna tipo de produto do navegador;
```

...

### **soft.pageLoader();**

Usado para carregar as imagens das páginas conforme lista de _assets_ no arquivo **.js** dentro das pastas de **soft-content**.

Sintaxe:
```javascript
soft.pageLoader(parameter);
```

Entradas suportadas:
```javascript
String e Integer
```

Exemplo de aplicação:
```javascript
soft.pageLoader(10); // pageIndex
    
soft.pageLoader('pageina-1'); // pageId
```
> **Importante**: Este método apenas faz o carregamento das páginas. Para exibir o preloader no início da página, crie um método para isso e chame-o através do **loaderShowMethod** no arquivo **.js** em **soft-content**.

...

### **soft.progressBar()**

Usada para exibir o progresso de navegação em porcentagem.

Sintaxe:
```javascript
soft.progressBar();
```

Exemplo de aplicação:
```javascript
soft.progressBar();
```

> **Importante**: A barra de progresso é apenas incremental, isto é, somente aumenta de tamanho no avanço da navegação. Caso a navegação seja em páginas já visitadas, a barra não sofre alterações.

...

### **soft.info();**

Usado apenas para exibir as informações básicas do *Soft.js**, como versão e créditos.

Sintaxe:
```javascript
soft.info();
```

...

### **soft.changeLanguage();**

Usado para trocar o idioma do conteúdo do projeto.

Sintaxe:
```javascript
soft.changeLanguage(parâmetro);
```

Entradas suportadas:
```javascript
String
```

Exemplo de aplicação:
```javascript
soft.changeLanguage('pt-br');
```
> **Importante**: O parâmetro ('pt-br') passado na função deve ser criado dentro de '**languageClass**', assim como toda sua estrutura obrigatória em **soft-content.js**.

> **Importante**: Se a função for chamada com o parâmetro vazio ou inexistente, o idioma passará a ser o padrão setado dentro de **defaultLanguage** em **soft-config.js** e por padrão será exibida uma mensagem de _warning_ no console: "_**Idioma não encontrado.**_" Essa mensagem está pré-setada dentro de '**languageNotFound**' em **soft-content.js**.

...

### **soft.getPageStatus();**

Usado para retornar o status das páginas da aplicação.

Sintaxe:
```javascript
soft.getPageStatus(page);
```

Entradas suportadas:
```javascript
Integer (pageIndex) / String (pageId)
```

Exemplo de aplicação:
```javascript
soft.getPageStatus('cover'); // Retorna o status da página com ID 'cover'
    
soft.getPageStatus(3); // Retorna o status da página de index '3'
```

...

### **soft.setPageStatus();**

Usado para desbloquear as páginas da aplicação de acordo com a navegação.
Em **soft-content.js**, na lista de páginas no objeto **contentPages**, por padrão, deixamo o parâmetro **pageStatus** como **inactive**. Desta forma, não é possível acessar essa página, mesmo forçando pelo navegador.

Sintaxe:
```javascript
soft.setPageStatus(page, status);
```

Entradas suportadas:
```javascript
Integer (pageIndex) / String (pageId), String ('active' / 'inactive')
```

Exemplo de aplicação:
```javascript
soft.setPageStatus('cover', 'active'); // Desbloqueia a página com ID 'cover'
    
soft.setPageStatus(3, 'active'); // Desbloqueia a página de index '3'
```

> **Importante**: É altamente recomendável que o **pageStatus** das páginas da aplicação tenham o valor **inactive**, alterando dentro do código de acordo o progresso ou necessidade. Isso evita o usuário acessar sem permissão.

...

### **soft.blockAll();**

Usado para bloquear as interações na página. É muito usado durante transições de telas ou _feedbacks_.

Sintaxe:
```javascript
soft.blockAll(parâmetro);
```

Entradas suportadas:
```javascript
Boolean
```

Exemplo de aplicação:
```javascript
soft.blockAll(true); // Bloqueia interação
    
soft.blockAll(false); // Libera interação
```

...

### **soft.nextPage();**

Usado para avançar à próxima página dentro da estrutura em **soft-content.js**.

Sintaxe:
```javascript
soft.nextPage();
```

Exemplo de aplicação:
```javascript
soft.nextPage();
```

> **Importante**: Caso a página atual seja a última da estrutura, esta função retornará _undefined_.

> **Importante**: Caso a página seguinte esteja inativa dentro de **pageStatus: 'inactive'** em **soft-content.js**, por padrão será exibida uma mensagem de _warning_ no console: "_**Página inativa.**_" Essa mensagem está pré-setada dentro de '**pageInactive**' em **soft-content.js**.

...

### **soft.prevPage();**

Usado para voltar à próxima anterior dentro da estrutura em **soft-content.js**.

Sintaxe:
```javascript
soft.prevPage();
```

Exemplo de aplicação:
```javascript
soft.prevPage();
```

> **Importante**: Caso a página anterior seja a primeira da estrutura e exista uma tela de _splash screen_ setada como **true** dentro de **splashScreen** em **soft-config.js**, esta função retornará _undefined_. A _splash screen_ é exibida apenas no início da aplicação.

...

### **soft.goToPage();**

Usado para avançar entre as páginas dentro da estrutura em **soft-content.js**.

Sintaxe:
```javascript
soft.goToPage('Index da página');

ou

soft.goToPage('ID da página');
```

Entradas suportadas:
```javascript
Number ou String
```

Exemplo de aplicação:
```javascript
soft.goToPage(15);

ou

soft.goToPage('inicio');
```

> **Importante**: Caso a página indicada dentro do parâmetro da função não exista, será redirecionado para a última página navegada e por padrão será exibida uma mensagem de _warning_ no console: "_**Erro 404. Página não encontrada.**_" Essa mensagem está pré-setada dentro de '**pageNotFound**' em **soft-content.js**.

> **Importante**: Caso a página indicada dentro do parâmetro da função esteja inativa dentro de **pageStatus: 'inactive'** em **soft-content.js**, por padrão será exibida uma mensagem de _warning_ no console: "_**Página inativa.**_" Essa mensagem está pré-setada dentro de '**pageInactive**' em **soft-content.js**.

...

### **soft.currentPage();**

Usado para coletar todas as informações necessárias da página atual.

Sintaxe:
```javascript
soft.currentPage();

ou

soft.currentPage('Parâmetro');
```

Entradas suportadas:
```javascript
String
```

Exemplo de aplicação:
```javascript
soft.currentPage();

ou

soft.currentPage('title');
```

> **Importante**: No caso de fazer a chamada sem informar um parâmetro, por padrão virá o **index** da página.

Parâmetros suportados:
```javascript
- 'index': Retorna o índice (int) da página.
- 'title': Retorna o título (string) da página.
- 'id': Retorna o identificador (string) da página.
- 'class': Retorna (se tiver) a classe (string) da página.
- 'templateId': Retorna (se tiver) o identificador (string) do template usado na página.
- 'templateClass': Retorna (se tiver) a classe (string) do template usado na página.
```

...

### **soft.toScale();**

Usado em conjunto com a class **.soft-scaled** para escalonar um elemento em proporções iguais, em relação ao elemento pai.

Exemplo:
```html
<div class="container">
    <div class="box-texto .soft-scaled"></div>
</div>
```
O elemento **.box-texto** será escalonado em proporções iguais em relação ao tamanho do elemento **.container**.

Sintaxe:
```javascript
soft.toScale();
```

> **Importante**: Por padrão, essa função é chamada sempre que o _window_ é redimensionado e em toda troca de página. Sua chamada manual é indicada nos casos em que um elemento a ser escalonado foi criado dinamicamente após o carregamento da página.

...

### **soft.accessibility();**

Usado para aplicar recursos de acessibilidade. No momento temos apenas o recurso **invertColor**.

Sintaxe:
```javascript
soft.accessibility.[action];
```

Exemplo de aplicação:
```javascript
soft.accessibility.invertColor();
```
**Importante**: O método é um _toggle_, ou seja, ao ser executado, é adicionada a classe **invert-color** no **body#soft**. Ao ser chamado novamente, a classe é removida.

...

### **soft.fullScreen();**

Usado para aplicar o recurso de tela cheia.

Sintaxe:
```javascript
soft.fullScreen(parameter);
```

Entradas suportadas:
```javascript
String
```

Exemplo de aplicação:
```javascript
soft.fullScreen('on'); // Ativar o fullscreen

soft.fullScreen('off'); // Desativar o fullscreen
```

...

## Classes

### **.soft-content**

Usada dentro da estrutura do template para setar onde o conteúdo de **pageContent** será inserido.

No caso de não haver template, o uso desta classe não é obrigatório.

...

### **.soft-scaled**

Usada para escalonar um elemento em proporções iguais, em relação ao elemento pai.

### Atributos auxiliares **initial-width** e **initial-height** ###

Para um melhor resultado no escalonamento do elemento, é aconselhável a utilização dos atributos **initial-width** e **initial-height**, responsáveis por definir as dimensões iniciais em pixels (px) do elemento. Os valores inseridos devem ser apenas numéricos com suporte adecimais. 

Caso não sejam aplicados os atributos no elemento escalonado, serão considerados os valores '**1024**' para '**initial-width**' e '**768**' para '**initial-height**', como padrão.

Exemplos:
```html
<div class="container">
    <div class="box-texto soft-scaled"></div>
</div>

<div class="container">
    <div class="box-texto soft-scaled" initial-width="1280" initial-height="768"></div>
</div>
```
O elemento **.box-texto** será escalonado em proporções iguais em relação ao tamanho do elemento **.container**.

> **Importante**: Todos os elementos com a classe **.soft-scaled** serão reescalonados sempre que o _window_ for redimencionado ou rotacionado (dispositivos móveis).

...

### **.soft-prev-page e .soft-next-page**

Usadas para indicarem ao **Soft.js** quais elementos são responsáveis por voltar e avançar nas páginas da estrutura.

O **Soft.js** possui um recurso interno que se atualiza a cada troca de página e, através dessas classes, 'avisa' aos elementos se a próxima tela existe e/ou se está ativa para navegação.

Essa 'comunicação' é feita adicionando e removendo a classe '**.soft-inactive**' aos elementos.

Exemplo:
```html
<footer>
    <div class="btn-prev-page soft-prev-page"></div>
    <div class="btn-next-page soft-next-page"></div>
</footer>
```

> **Importante**: O tratamento da classe '**.soft-inactive**' por parte do **Soft.js** se limita apenas em aplicar a propriedade '**pointer-events: none**' do CSS. Demais adaptações são customizáveis através do tema.

...

### **.soft-pagination**

Usada para exibir a página atual e o total de páginas.

Ao incluir essa classe no elemento, atomaticamente passa exibir a paginação do projeto.

Exemplo:
```html
<footer>
    <div class="paginacao soft-pagination"></div>
</footer>
```

Dentro desse elemento, o **Soft.js** incluirá os elementos necessários para mostrar a paginação:

```html
<footer>
    <div class="paginacao soft-pagination">
        <p><b>13</b> / <b>65</b></p>
    </div>
</footer>
```

> **Importante**: É possível editar o separador (/) que está entre os números, inclusive com texto ou caracteres. Basta alterar o **paginationSeparator** em **soft-content.js**.

...

## Como o **soft.js** funciona
---

```javascript
// 1
soft.start();
/* Aqui é onde tudo começa.
Setamos as variáveis, adicionamos os arquivos CSS e JS do tema e criamos a estrutura HTML base para receber as páginas. */

// 2
soft.checkUrlHash();
/* Verifica se existe valor na URL depois do # (hash).
Se tiver, vai buscar no 'soft-content.js'. Se não, abre a primeira página como padrão. */

// 3
soft.pageBuild();
/* Monta a página de acordo com as informações obtidas no 'soft-content.js'. */

// 4
soft.pageLoader();
/* Faz o pré-carregamento das imagens da página. */

// 5
soft.pageInMethod();
/* Após o carregamento, executa este método (se houver) para exibir a tela. */

// 6
soft.updateNavigation();
/* Envia para os elementos '.soft-prev-page', '.soft-next-page' e '.soft-pagination' as informações de página inativa, primeira ou última página. */

// 7
soft.content();
/* Insere o conteúdo de 'pageContent' em 'soft-content.js', assim como template da página ou global, se houver. */

// 8
soft.pageIncludes();
/* Insere includes da página. */

// 9
soft.globalIncludes();
/* Insere includes globais da página. */
```

...

## Extensões - SCORM
---
### **SCORM 1.2 - Funções básicas**

Para testar os pacostes SCORM, utilize o SCORM Cloud em: https://cloud.scorm.com

...

### **scormStudentID**
Usada para **RETORNAR** o id do aluno.

Sintaxe:
```javascript
scormStudentID;
```

Exemplo de aplicação:
```javascript
scormStudentID;
```

...

### **scormStudentName**
Usada para **RETORNAR** o nome do aluno.

Sintaxe:
```javascript
scormStudentName;
```

Exemplo de aplicação:
```javascript
scormStudentName;
```

...

### **scormLessonStatus.get**
Usada para **RETORNAR** o status da atividade.

Sintaxe:
```javascript
scormLessonStatus.get;
```

Exemplo de aplicação:
```javascript
if (scormLessonStatus.get == "passed") {
    Blá, blá blá;
    Códigos;
    Blá, blá blá;
    Mais códigos;
    Blá, blá blá;
}
```

...

### **scormLessonStatus.set()**
Usada para **SETAR** o status da atividade.

O SCORM possui 4 parâmetros padrões e dois deles são específicos para o status da atividade. São eles:

- **Completion**: unknown

- **Success**: unknown

Os valores mais comuns aplicados são:

- **incomplete**: Por padrão, ao iniciar a aplicação SCORM, o parâmetro **Completion** recebe esse valor, mas cada LMS é de um jeito, então é sempre bom verificar.

- **failed**: Esse valor é inserido no parâmetro **Success** e automaticamente o parâmetro **Completion** ficará como **incomplete**.

- **completed**: Esse valor é inserido no parâmetro **Completion** e não altera os outros parâmetros.

- **passed**: Esse valor é inserido no parâmetro **Success** e automaticamente o parâmetro **Completion** ficará como **completed**.

Sintaxe:
```javascript
scormLessonStatus.set('Valor de parâmetro');
```

Entradas suportadas:
```javascript
String
```

Exemplo de aplicação:
```javascript
scormLessonStatus.set('passed');
```

...

### **scormScoreRaw.get**
Usada para **RETORNAR** a pontuação (%) da atividade.

Sintaxe:
```javascript
scormScoreRaw.get;
```

Exemplo de aplicação:
```javascript
if (scormScoreRaw.get == 100) {
    Blá, blá blá;
    Códigos;
    Blá, blá blá;
    Mais códigos;
    Blá, blá blá;
}
```

...

### **scormScoreRaw.set()**
Usada para **SETAR** a pontuação (%) da atividade.

O SCORM possui 4 parâmetros padrões e um deles é específico para a pontuação (score) da atividade:

- **Score**: unknown

Sintaxe:
```javascript
scormScoreRaw.set(Valor de parâmetro);
```

Entradas suportadas:
```javascript
Integer
```

Exemplo de aplicação:
```javascript
scormScoreRaw.set(75);
```

...

### **scormScoreRaw.setMin**
Usada para **SETAR** a pontuação (%) da atividade.

O SCORM possui 4 parâmetros padrões e um deles é específico para a pontuação (score) da atividade:

- **Score**: unknown

Sintaxe:
```javascript
scormScoreRaw.setMin(Valor de parâmetro);
```

Entradas suportadas:
```javascript
Integer
```

Exemplo de aplicação:
```javascript
scormScoreRaw.setMin(0);
```

...

### **scormScoreRaw.setMax**
Usada para **SETAR** a pontuação (%) da atividade.

O SCORM possui 4 parâmetros padrões e um deles é específico para a pontuação (score) da atividade:

- **Score**: unknown

Sintaxe:
```javascript
scormScoreRaw.setMax(Valor de parâmetro);
```

Entradas suportadas:
```javascript
Integer
```

Exemplo de aplicação:
```javascript
scormScoreRaw.setMax(80);
```

...

### **scormSuspendData.get**
Usada para **RETORNAR** os valores inseridos na variável **suspend_data** do SCORM.

Sintaxe:
```javascript
scormSuspendData.get;
```

Exemplo de aplicação:
```javascript
if (scormSuspendData.get != '') {
    Blá, blá blá;
    Códigos;
    Blá, blá blá;
    Mais códigos;
    Blá, blá blá;
}
```

...

### **scormSuspendData.set()**
Usada para **SETAR** os valores dentro da variável **suspend_data** do SCORM.

**Importante:** A variável suporta até 4096 caracteres.

Sintaxe:
```javascript
scormSuspendData.set(Valor de parâmetro);
```

Entradas suportadas:
```javascript
String e/ou Integer
```

Exemplo de aplicação:
```javascript
scormSuspendData.set('Página:20, Resposta:A, Página:30, Resposta:D');

ou

scormSuspendData.set(1, 2, 3, 5, 20, 50);
```

...

### **scormManifestWriter()**
Usada para **GERAR** o arquvivo **imsmanifest.xml** do SCORM de acordo com as configurações setadas em **soft-config.js**.

**Importante:** Esta chamada deve ser feita no console do navegador, copiar o código gerado e sobrescrever o antigo dentro do **imsmanifest.xml** ou criar um novo com o mesmo nome e extensão.

Sintaxe:
```javascript
scormManifestWriter(Valor de parâmetro);
```

Entradas suportadas:
```javascript
String
```

Exemplo de aplicação:
```javascript
scormManifestWriter('index-only');
```

Parâmetros suportados:
```javascript
- 'index-only': Recomendado em aplicações que não salvam a página atual do usuário, como games, por exemplo.
- 'all-pages': Utilizado para listar todas as páginas do SCORM e salvar a página atual.
```

...

### **scormExit()**
Esta função é executada todas as vezes que a aplicação é fechada ou a atividade concluída.
É muito importante fazer a chamada desta função no botão de encerramento do SCORM.

Sintaxe:
```javascript
scormExit();
```

Exemplo de aplicação:
```javascript
scormExit();
```

**Para maiores informações sobre o SCORM, acesse a documentação oficial em:**

https://scorm.com/scorm-explained/technical-scorm/run-time/run-time-reference

...

## Change log ##
---
- ### 2.0.0 ###

    

- ### 1.1.5 ###

    - Implementação dos métodos **soft.getPageStatus()** e **soft.setPageStatus()**.

    - À partir de agora, o **page.js** não possui mais o parâmetro **pageStatus**. Isso foi incluído na lista de páginas em **soft-content.js**.

- ### 1.1.4 ###

    - Correção de bug no **contentGlobal.includes**.

    - Ajuste no SASS da class **events-none** para bloquear o evento em todos os elementos.

- ### 1.1.3 ###

    - Melhorias no método **soft.pageBuild()** para diminuir o tempo de troca de tela.

    - Remoção do **animationSequenceImages** em **softPage.pageLoader**.

    - Alteração do nome da propriedade **singularFiles** para **loaderFiles** em **softPage.pageLoader**.

- ### 1.1.2 ###

    - Melhorias no método **soft.fullScreen()**.

    - Remoção do **showLoaderPercentNumber** e **hideLoaderBeforeLoaded** em **soft-config.js**.

- ### 1.1.1 ###

    - Remoção do TweenMax do diretório **soft-lib/assets/libs**.

    - Melhorias no método **soft.pageLoader()**.

    - Implementação do método **soft.accessibility.invertColor()**.

    - Implementação do método **soft.fullScreen()**.

    - Mudança na maneira de inserir as páginas no **soft-content.js**.

- ### 1.1.0 ###

    - Alteração de nomenclatura da pasta **soft-plugins** para **soft-extensions**.

    - Todas as chamadas com o termo **plugins** foram alteradas para o termpo **extensions**.

    - Remoção completa da função nativa dos pacotes de SCORM. Agora passam a ser libs externas dentro da pasta **soft-extensions**.

    - Todas as funções de SCORM (**soft.scorm**) foram removidos. Para saber como utilizar as novas chamadas, consulte a documentação na sessão **Extensions -> SCORM**.

    - Melhorias na função **soft.navigator()**.

    - Melhorias na função **soft.progressBar()**.

    - Criação da função **soft.currentPage()**.

    - Remoção das funções **soft.get()** e **soft.set()**.

- ### 1.0.7 ###

    - Inclusão do **soft.scorm.getStudentID()** e **soft.scorm.getStudentName()**.

    - Inclusão na documentação das funções básicas do SCORM 1.2.

- ### 1.0.6 ###

    - Conversão do antecessor **Peruglr.js** para **Soft.js** junto com os nomes de métodos e classes, além de outros ajustes.

- ### 1.0.5 ###

    - Novas correções no código.

- ### 1.0.0 ###

    - **Peruglr-content.js** deixa de ser um arquivo único de conteúdo e passa a compor páginas organizadas em pastas.

- ### 0.9.0 ###

    - SCORM 1.2 agora é nativo.

    - Suporte a plugins.

    - Implementação dos métodos **Peruglr.get();** e **Peruglr.set();**.

- ### 0.8.4 ###

    - **Peruglr.goToPage();** Implementação do valor numérico inteiro para busca por index (posição) no **contentPages**.

    - **Peruglr.toScale();** Implementação de atributos auxiliares para melhor resultado no escalonamento do elemento.