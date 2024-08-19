require("dotenv").config();
var framework = require("webex-node-bot-framework");
var agent_model = require("./aws/agent_model");

const config = {
  token: process.env.WEBEX_BOT_TOKEN
};

// Only pass the webhook URL and port if it has been set in the environment
if (process.env.WEBHOOKURL && process.env.PORT) {
  config.webhookUrl = process.env.WEBHOOKURL;
  config.port = process.env.PORT;
}


// init framework
var framework = new framework(config);
framework.start();
console.log("Starting framework, please wait...");

framework.on("initialized", () => {
  console.log("framework is all fired up! [Press CTRL-C to quit]");
});


framework.hears(/.*/gim, async (bot, trigger) => {
  const userMessage = trigger.text;
  try {
      // Generates a response using the aws bedrock agent
      const aiResponse = await agent_model.invokeBedrockAgent(userMessage, trigger.person.id);
      // Send response to user
      bot.reply(trigger.message, aiResponse);
  } catch (error) {
      var msg = `\nLo lamento ${user.displayName}, he tenido incovenientes al procesar tu solicitud. 😕 ¿Podrías volver a intenrarlo?`;
      bot.say("markdown", msg);
  }
});
// A spawn event is generated when the framework finds a space with your bot in it
// If actorId is set, it means that user has just added your bot to a new space
// If not, the framework has discovered your bot in an existing space

framework.on("spawn", (bot, id, actorId) => {
  if (!actorId) {
    // don't say anything here or your bot's spaces will get
    // spammed every time your server is restarted
    console.log(
      `While starting up, the framework found our bot in a space called: ${bot.room.title}`
    );
  } else {
    // When actorId is present it means someone added your bot got added to a new space
    // Lets find out more about them..
    var msg =
      "Estoy aquí para ayudar! 😄";
    bot.webex.people
      .get(actorId)
      .then((user) => {
        msg = `Que tal ${user.displayName}. ${msg}`;
      })
      .catch((e) => {
        console.error(
          `Failed to lookup user details in framwork.on("spawn"): ${e.message}`
        );
        msg = `Hola!. ${msg}`;
      })
      .finally(() => {
        // Say hello, and tell users what you do!
        if (bot.isDirect) {
          bot.say("markdown", msg);
        } else {
          let botName = bot.person.displayName;
          msg += `\n\nNo olvides mencionarme si necesitas ayuda dentro de este espacio de la siguiente manera para poder responderte: *@mention* ${botName} + <tu mensaje>.`;
          bot.say("markdown", msg);
        }
      });
  }
});

// Implementing a framework.on('log') handler allows you to capture
// events emitted from the framework.  Its a handy way to better understand
// what the framework is doing when first getting started, and a great
// way to troubleshoot issues.
// You may wish to disable this for production apps
framework.on("log", (msg) => {
    console.log(msg);
  });

// gracefully shutdown (ctrl-c)
process.on("SIGINT", () => {
    framework.debug("stopping...");
    framework.stop().then(() => {
      process.exit();
    });
  });
    