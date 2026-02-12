# 🐾 SAA - Sistema de Apoio à Adoção

<div align="center">

![SAA Logo](https://img.shields.io/badge/SAA-Sistema_de_Apoio_à_Adoção-4A90E2?style=for-the-badge)

**Plataforma moderna e intuitiva para facilitar a adoção de animais**

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.12-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?style=flat&logo=vite)](https://vitejs.dev/)

</div>

---

## 📋 Sobre o Projeto

O **SAA (Sistema de Apoio à Adoção)** é uma aplicação web de alta fidelidade desenvolvida para facilitar o processo de adoção de animais. Com design intuitivo e experiência de usuário otimizada, o sistema conecta animais que precisam de um lar com pessoas que querem adotar.

### ✨ Características Principais

- 🎨 **Design Moderno**: Interface clean com paleta de cores acolhedora
- 🔍 **Busca Avançada**: Filtros por espécie, porte, idade e busca por texto
- 📱 **Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- 🖼️ **Galeria Visual**: Cards atrativos com fotos reais dos animais
- 📝 **Formulário de Adoção**: Modal intuitivo para manifestação de interesse
- 👨‍💼 **Painel Administrativo**: Gestão completa de animais e pedidos
- ⚡ **Performance**: Desenvolvido com Vite para carregamento ultra-rápido

---

## 🎯 Funcionalidades

### Para Usuários (Adotantes)

- ✅ Visualizar vitrine com animais disponíveis
- ✅ Filtrar por espécie (cão/gato), porte e idade
- ✅ Buscar por nome ou raça
- ✅ Ver detalhes completos do animal (saúde, temperamento, personalidade)
- ✅ Enviar pedido de adoção através de formulário
- ✅ Favoritar animais (em desenvolvimento)
- ✅ Compartilhar perfis de animais (em desenvolvimento)

### Para Administradores

- ✅ Gerenciar estoque de animais
- ✅ Cadastrar novos animais
- ✅ Atualizar status (Disponível, Em Processo, Adotado)
- ✅ Editar informações dos animais
- ✅ Excluir registros
- ✅ Visualizar pedidos de adoção (em desenvolvimento)
- ✅ Sistema de badges coloridos para status

---

## 🚀 Começando

### Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [pnpm](https://pnpm.io/) - Gerenciador de pacotes

```bash
# Instalar pnpm globalmente
npm install -g pnpm
```

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/saa-adocao.git
cd saa-adocao
```

2. **Instale as dependências**
```bash
pnpm install
```

3. **Inicie o servidor de desenvolvimento**
```bash
pnpm dev
```

4. **Acesse a aplicação**
```
http://localhost:5173
```

### Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev          # Inicia servidor de desenvolvimento

# Produção
pnpm build        # Gera build otimizado
pnpm preview      # Preview do build de produção
```

---

## 🏗️ Estrutura do Projeto

```
saa-adocao/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── Header.tsx              # Cabeçalho do site
│   │   │   ├── Home.tsx                # Página principal/vitrine
│   │   │   ├── AnimalCard.tsx          # Card de animal
│   │   │   ├── AnimalDetails.tsx       # Detalhes do animal
│   │   │   ├── AdoptionModal.tsx       # Modal de formulário
│   │   │   └── AdminDashboard.tsx      # Painel administrativo
│   │   └── App.tsx                     # Componente raiz
│   ├── data/
│   │   └── mockAnimals.ts              # Dados mock dos animais
│   ├── types/
│   │   └── animal.ts                   # TypeScript interfaces
│   └── styles/
│       ├── theme.css                   # Tema customizado
│       └── fonts.css                   # Importação de fontes
├── public/                             # Arquivos estáticos
├── package.json                        # Dependências do projeto
├── vite.config.ts                      # Configuração do Vite
└── README.md                           # Este arquivo
```

---

## 🎨 Design System

### Paleta de Cores

| Cor | Hex | Uso |
|-----|-----|-----|
| 🔵 Azul Principal | `#4A90E2` | Ações primárias, confiança |
| 🟢 Verde Esperança | `#52C41A` | Sucesso, disponibilidade |
| 🟠 Terracota | `#E07856` | Destaques secundários |
| 🟡 Amarelo Aviso | `#FFA940` | Processos em andamento |

### Tipografia

- **Família**: Sans-serif (System UI)
- **Pesos**: Normal (400), Medium (500)
- **Hierarquia**: H1 → H4 com tamanhos responsivos

### Componentes

- ✨ Bordas arredondadas (0.625rem)
- 🌈 Sombras suaves para profundidade
- 🎯 Transições fluidas (300ms)
- 📐 Grid responsivo (1-3 colunas)

---

## 🛠️ Tecnologias Utilizadas

### Core

- **React 18.3.1** - Biblioteca para UI
- **TypeScript** - Tipagem estática
- **Vite 6.3.5** - Build tool ultra-rápido

### Estilização

- **Tailwind CSS 4.1.12** - Framework CSS utility-first
- **Lucide React** - Ícones modernos

### Bibliotecas UI

- **Radix UI** - Componentes acessíveis headless
- **Motion** - Animações suaves
- **React Hook Form** - Gerenciamento de formulários

### Dev Tools

- **@vitejs/plugin-react** - Suporte React no Vite
- **@tailwindcss/vite** - Integração Tailwind

---

## 📸 Screenshots

### Tela Inicial (Home)
Vitrine com animais disponíveis, busca e filtros inteligentes.

### Detalhes do Animal
Visualização completa com informações de saúde, temperamento e botão de adoção.

### Painel Administrativo
Dashboard completo com gestão de animais, tabela interativa e formulário de cadastro.

---

## 🔮 Roadmap

### Em Desenvolvimento
- [ ] Sistema de autenticação para administradores
- [ ] Funcionalidade de favoritos com persistência
- [ ] Integração com API backend

### Futuras Melhorias
- [ ] Chat em tempo real com abrigos
- [ ] Sistema de agendamento de visitas
- [ ] Histórico de adoções
- [ ] Dashboard com analytics
- [ ] Aplicativo mobile (React Native)
- [ ] Integração com redes sociais
- [ ] Sistema de doações

---

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Se você quer contribuir:

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

### Padrões de Código

- Use TypeScript para type safety
- Siga os padrões ESLint do projeto
- Componentes devem ser funcionais com hooks
- Use Tailwind CSS para estilização
- Mantenha componentes pequenos e reutilizáveis

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👥 Autores

Desenvolvido como demonstração de UI/UX e desenvolvimento front-end para pós-graduação de desenvolvimento fullstack pela PUC-RS.

---

## 📞 Contato & Suporte

- 🐛 Issues: [GitHub Issues](https://github.com/seu-usuario/saa-adocao/issues)
- 💬 Discussões: [GitHub Discussions](https://github.com/seu-usuario/saa-adocao/discussions)

---

## 🙏 Agradecimentos

- [Unsplash](https://unsplash.com/) - Pelas lindas fotos dos animais
- [Lucide Icons](https://lucide.dev/) - Pelos ícones modernos
- [Tailwind CSS](https://tailwindcss.com/) - Pelo framework incrível
- Comunidade React - Pelo ecossistema fantástico

---

<div align="center">

**Feito com ❤️ e 🐾 para ajudar animais a encontrarem um lar (E garantir minha aprovação)**

[⬆ Voltar ao topo](#-saa---sistema-de-apoio-à-adoção)

</div>
