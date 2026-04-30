# Central de Comunicação

Este projeto implementa uma Central de Comunicação, uma aplicação web interativa para gerenciar conversas. O objetivo é fornecer uma interface intuitiva para usuários interagirem com suas mensagens, com funcionalidades como busca, envio de mensagens, arquivamento de conversas e visualização de status.

## Tecnologias Utilizadas

O projeto foi desenvolvido utilizando um conjunto moderno de tecnologias para garantir performance, escalabilidade e uma excelente experiência de desenvolvimento:

*   **Vue.js (v3):** Framework progressivo para construção de interfaces de usuário. Escolhido pela sua reatividade, componentes reutilizáveis e ecossistema robusto.
*   **TypeScript:** Superset do JavaScript que adiciona tipagem estática. Essencial para projetos de grande escala, oferecendo maior segurança, legibilidade e manutenibilidade do código.
*   **SASS/SCSS:** Pré-processador CSS que estende as funcionalidades do CSS com variáveis, mixins, funções e aninhamento, facilitando a organização e a escrita de estilos complexos.
*   **Pinia:** Gerenciador de estado leve e intuitivo para Vue.js. Utilizado para centralizar e gerenciar o estado da aplicação, como as conversas, o termo de busca e o rascunho de mensagem.
*   **Vite:** Ferramenta de build de próxima geração para projetos web. Oferece um ambiente de desenvolvimento extremamente rápido com Hot Module Replacement (HMR) e um build otimizado para produção.
*   **HTML/CSS:** Linguagens fundamentais para a estrutura e estilização da interface web.

## Arquitetura do Projeto: Baseada em Features

A arquitetura do projeto é **baseada em features**, o que significa que o código é organizado em módulos independentes, cada um representando uma funcionalidade específica da aplicação. No caso, a principal feature é a `communication-center`.

### Como a Arquitetura Influencia o Projeto:

*   **Organização:** Facilita a localização de arquivos relacionados a uma funcionalidade específica, como componentes, stores Pinia, mocks e tipos, todos agrupados sob `src/features/communication-center`.
*   **Manutenibilidade:** Alterações em uma feature tendem a ter impacto limitado em outras, reduzindo a chance de introduzir bugs e tornando o código mais fácil de manter.
*   **Escalabilidade:** Novas features podem ser adicionadas como novos módulos, sem afetar a estrutura existente, o que é ideal para projetos que crescem com o tempo.
*   **Colaboração:** Equipes podem trabalhar em diferentes features simultaneamente com menos conflitos de código.

## Comandos Importantes

Para rodar, buildar e formatar o projeto, utilize os seguintes comandos na raiz do diretório do projeto:

*   **Instalar Dependências:**
    ```bash
    npm install
    ```

*   **Rodar o Projeto em Modo de Desenvolvimento:**
    Inicia o servidor de desenvolvimento com HMR, ideal para desenvolvimento. O projeto estará acessível em `http://localhost:3000` (ou outra porta disponível).
    ```bash
    npm run dev
    ```

*   **Buildar o Projeto para Produção:**
    Compila e otimiza o projeto para implantação em ambiente de produção.
    ```bash
    npm run build
    ```

*   **Formatar o Código:**
    Utiliza o Prettier para formatar automaticamente o código, garantindo consistência no estilo de codificação.
    ```bash
    npm run format
    ```

## Validações e Decisões de Experiência do Usuário (UX)

Durante o desenvolvimento, diversas validações e decisões foram tomadas para aprimorar a experiência do usuário:

1.  **Busca de Conversas:**
    *   **Funcionalidade:** O campo de busca (`input-search-contact`) permite filtrar a lista de conversas ativas em tempo real, exibindo apenas os contatos cujo nome corresponde ao termo de busca. Isso facilita a localização rápida de conversas específicas.
    *   **Impacto na UX:** Reduz o tempo e o esforço do usuário para encontrar uma conversa, especialmente em listas extensas.

2.  **Envio de Mensagens:**
    *   **Validação de Conteúdo:** O botão de envio de mensagem (`btn-send-message`) permanece inativo se o campo de texto (`input-message`) estiver vazio ou contiver apenas espaços em branco. A mensagem só é enviada se houver conteúdo válido.
    *   **Limite de Caracteres:** O campo de mensagem possui um limite de 2000 caracteres, com um contador visível (`characterCount`) que informa ao usuário quantos caracteres foram digitados e quantos restam. Ao atingir o limite, o contador muda de cor para alertar o usuário.
    *   **Quebra de Linha:** O atalho `Shift + Enter` permite adicionar uma nova linha no campo de texto, enquanto `Enter` sozinho envia a mensagem. Isso oferece flexibilidade na escrita de mensagens mais longas sem enviá-las prematuramente.
    *   **Impacto na UX:** Previne o envio acidental de mensagens vazias, orienta o usuário sobre o tamanho máximo permitido e oferece controle sobre o formato da mensagem.

3.  **Arquivamento de Conversas:**
    *   **Funcionalidade:** Usuários podem arquivar conversas ativas através do botão "Arquivar". Conversas arquivadas são movidas para uma seção separada, acessível através do botão "Conversas Arquivadas". Ao desarquivar, a conversa retorna à lista principal.
    *   **Impacto na UX:** Ajuda a manter a lista de conversas ativas organizada e focada nas interações mais relevantes, permitindo acesso fácil a conversas antigas quando necessário.

4.  **Visualização de Mensagens e Notificações:**
    *   **Marcação de Mensagens Lidas:** Ao selecionar uma conversa, todas as mensagens não lidas são automaticamente marcadas como lidas (`visualized: true`), e o contador de mensagens não lidas é zerado. Um marcador de "Novas Mensagens" pode aparecer para indicar onde as novas mensagens começam, desaparecendo após um tempo.
    *   **Simulação de Resposta:** Após o envio de uma mensagem, o sistema simula uma resposta do participante da conversa após um breve período, indicando que o participante está "digitando..." e, em seguida, enviando uma resposta pré-definida. Isso cria uma experiência de chat mais dinâmica e responsiva.
    *   **Impacto na UX:** Fornece feedback visual claro sobre o status das mensagens, melhora a sensação de interação em tempo real e ajuda o usuário a acompanhar o fluxo da conversa.

5.  **Responsividade:**
    *   **Sidebar Adaptativa:** Em telas menores (dispositivos móveis), a barra lateral de conversas é recolhida e pode ser acessada através de um menu, com um backdrop que fecha a sidebar ao clicar fora dela. Em telas maiores, a sidebar é sempre visível.
    *   **Impacto na UX:** Garante que a aplicação seja utilizável e visualmente agradável em diferentes tamanhos de tela, otimizando o espaço disponível.
