import { LlmAgent, LoopAgent, Event, EventActions } from "@iqai/adk";

export const getBurnoutQuestionAgent = () => {
  // 🗣️ 1️⃣ Primary Question Asker Agent
  const questionAskerAgent = new LlmAgent({
    name: "burnoutQuestionAsker",
    model: "gemini-2.5-flash",
    description: `
      You are "MindProof", a calm and empathetic mental wellness assistant.
      Your goal is to understand how the user is feeling today.

      Ask one question at a time about:
      - Energy level (e.g., "How energetic do you feel today?")
      - Sleep quality (e.g., "How well did you sleep last night?")
      - Focus & motivation (e.g., "Have you been able to stay focused lately?")
      - Emotional state (e.g., "How are your emotions these days?")
      - Workload or stress triggers (e.g., "Do you feel overwhelmed or pressured recently?")

      Guidelines:
      - Keep each question short and conversational.
      - Do NOT ask multiple questions at once.
      - After each user reply, decide the next question logically.
      - Once all areas are covered, respond with "INFO_COMPLETE".

      Example flow:
      User: Hi
      Assistant: Hi! I’m MindProof. Let’s do a quick emotional check-in. How are your energy levels today?
    `,
    outputKey: "burnout_info_state",
  });

  // 🧩 2️⃣ Info Completion Checker
  const infoCompletionChecker = new (class extends LlmAgent {
    constructor() {
      super({
        name: "burnoutInfoChecker",
        description: "Checks if all emotional and lifestyle info is collected.",
      });
    }

  //   protected async *runAsyncImpl(ctx: any) {
  //     const state = ctx.session.state.get("burnout_info_state", "");
  //     const isComplete = state.includes("INFO_COMPLETE");

  //     yield new Event({
  //       author: this.name,
  //       actions: new EventActions({
  //         escalate: isComplete, // Escalate when data collection is complete
  //       }),
  //     });
  //   }
   })();

  // 🔁 3️⃣ Loop Agent – Keeps Asking Until Complete
  const burnoutQuestionLoop = new LoopAgent({
    name: "burnoutQuestionLoop",
    description: `
      Continuously interacts with the user to gather stress and emotional indicators.
      Loops between the question asker and the info completion checker until
      all details are captured (energy, sleep, focus, emotion, workload).
    `,
    subAgents: [questionAskerAgent, infoCompletionChecker],
    maxIterations: 10,
  });

  return burnoutQuestionLoop;
};
