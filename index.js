const restify = require('restify');
const { BotFrameworkAdapter, ActivityHandler } = require('botbuilder');

// Configuración del adaptador con App ID y Secret
const adapter = new BotFrameworkAdapter({
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Crear servidor
const server = restify.createServer();
server.listen(process.env.PORT || 3978, () => {
  console.log(`Bot escuchando en ${server.url}`);
});

// Definir bot mínimo
class MyBot extends ActivityHandler {
  constructor() {
    super();
    this.onMessage(async (context, next) => {
      await context.sendActivity("Hola, soy tu bot mínimo 👋");
      await next();
    });

    this.onMembersAdded(async (context, next) => {
      await context.sendActivity("Bienvenido al bot mínimo 👋");
      await next();
    });
  }
}

const bot = new MyBot();

// Registrar endpoint /api/messages
server.post('/api/messages', async (req, res) => {
  await adapter.processActivity(req, res, async (context) => {
    await bot.run(context);
  });
});
