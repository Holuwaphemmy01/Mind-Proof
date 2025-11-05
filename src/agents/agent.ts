import { AgentBuilder } from "@iqai/adk";
import { env } from "../env";
import { getMindProofPipelineAgent } from "./meta-agent/agent";

/**
 * 🧠 Root Agent Configuration for MindProof
 *
 * This is the main entry point for all Telegram interactions.
 * It listens to incoming user messages and delegates tasks
 * to the MindProofPipelineAgent — which handles:
 *  1️⃣ Asking wellbeing-related questions
 *  2️⃣ Analyzing responses for burnout or stress risk
 *  3️⃣ Providing supportive, AI-generated recommendations
 *
 * The root agent runs on the configured model (from env.LLM_MODEL)
 * and maintains session state for each user.
 *
 * Future extensions:
 *  - Integrate blockchain logging for prediction transparency
 *  - Add personalization and progress tracking
 *
 * @returns A fully constructed root agent instance ready to handle Telegram user interactions.
 */
export const getRootAgent = () => {
  const mindProofAgent = getMindProofPipelineAgent();

  return AgentBuilder.create("root_agent")
    .withDescription(
      "Root agent that coordinates the entire MindProof AI flow — collecting responses, analyzing emotional health, and providing personalized recommendations."
    )
    .withInstruction(
      "Delegate all mental wellbeing, burnout, or emotional health related tasks to the MindProof pipeline sub-agent. Respond to user inputs empathetically and guide them through the process."
    )
    .withModel(env.LLM_MODEL)
    .withSubAgents([mindProofAgent])
    .build();
};
