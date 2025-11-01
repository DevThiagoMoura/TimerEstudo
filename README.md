# ⏰ Timer de Estudo (React Native + Expo)

## 🧠 Descrição

Aplicativo de **temporizador de sessões de estudo** desenvolvido em **React Native com Expo** e **React Hooks**.  
Permite configurar a duração da sessão, controlar o timer (iniciar, pausar e resetar), exibir alertas visuais e vibrar ao término.  
O app também registra estatísticas de sessões concluídas e tempo total estudado.

---

## ⚙️ Funcionalidades

- ⏱️ **Definir o tempo da sessão** via campo de entrada (`TextInput`)
- ▶️ **Iniciar**, ⏸️ **Pausar** e 🔄 **Resetar** o cronômetro
- ⏳ Exibe o tempo em formato **MM:SS**
- 🚨 Muda a cor do display quando faltar **menos de 60 segundos**
- 📳 Vibra e exibe mensagem ao término da sessão
- 📊 Estatísticas:
  - Total de **sessões completas**
  - **Tempo total estudado** acumulado
- ✅ Tempo inicial configurável diretamente no código (`tempoMinutos`)
- 🔄 Atualização automática do tempo inicial (sem precisar resetar)

---

## 🧩 Tecnologias utilizadas

- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [React Hooks](https://react.dev/reference/react)
- Componentes nativos:
  - `View`
  - `Text`
  - `TextInput`
  - `TouchableOpacity`
- API nativa: `Vibration`

---

## 📁 Estrutura do projeto


---

## 🚀 Como executar o projeto (com Expo)

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/<SEU_USUARIO>/<NOME_DO_REPOSITORIO>.git

2️⃣ Entrar na pasta do projeto
cd <NOME_DO_REPOSITORIO>

3️⃣ Instalar as dependências
npm install


ou

yarn install

4️⃣ Iniciar o servidor de desenvolvimento
npx expo start


Isso abrirá o Expo DevTools no navegador.


📱 Executar no celular

Baixe o aplicativo Expo Go:

Android (Google Play)

iOS (App Store)

No terminal ou navegador (Expo DevTools), será exibido um QR Code.

Abra o Expo Go, toque em Scan QR Code e escaneie o código.

O app será carregado diretamente no seu celular 📲

💻 Executar no navegador (modo web)

Também é possível rodar o app diretamente no navegador:

npx expo start --web

💾 Subir o projeto para o GitHub
1️⃣ Inicializar o repositório (caso ainda não exista)
git init
git add .
git commit -m "Versão inicial do Timer de Estudo com Expo"

2️⃣ Adicionar o repositório remoto
git remote add origin https://github.com/<SEU_USUARIO>/<NOME_DO_REPOSITORIO>.git

3️⃣ Enviar o código para o GitHub
git branch -M main
git push -u origin main

🧠 Observações técnicas

O valor padrão do tempo pode ser alterado diretamente no código:

const [tempoMinutos, setTempoMinutos] = useState("15");


🔄 Agora o app atualiza automaticamente o tempo inicial ao alterar essa linha,
sem precisar clicar em “Resetar”.

🧑‍💻 Autor

Desenvolvido por Thiago Moura de Carvalho
📍 Projeto acadêmico e prático para estudo de React Native com Expo e Hooks.

📄 Licença

Este projeto é de uso livre para fins educacionais.


