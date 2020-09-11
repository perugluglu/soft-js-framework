## Change log ##
---
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
