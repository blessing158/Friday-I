const express = require("express");

const OpenAI = require("openai");

const app = express();

/* MIDDLEWARE */

app.use(express.json());

app.use(express.static(__dirname));

/* OPENAI */

const openai = new OpenAI({

  apiKey:
    process.env.OPENAI_API_KEY

});

/* CHAT ROUTE */

app.post("/chat", async (req, res) => {

  try{

    const userMessage =
      req.body.message;

    const completion =
      await openai.chat.completions.create({

        model:"gpt-4.1-mini",

        messages:[

          {
            role:"system",

            content:
            "You are Friday, a futuristic AI assistant like Jarvis."
          },

          {
            role:"user",

            content:userMessage
          }

        ]

      });

    res.json({

      reply:
      completion
      .choices[0]
      .message
      .content

    });

  }catch(error){

    res.json({

      reply:
      "Error connecting to AI."

    });

  }

});

/* PORT */

const PORT =
  process.env.PORT || 3000;

/* START SERVER */

app.listen(PORT, () => {

  console.log(
    "Friday AI running..."
  );

});
