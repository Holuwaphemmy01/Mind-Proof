import { AgentBuilder } from "@iqai/adk";
import { env } from "../env";
import { getMindProofPipelineAgent } from "./meta-agent/agent";

/**
 * Creates and configures the root agent for the telegram bot.
 *
 * This agent is responsible for handling every incoming telegram message received by the sampling handler.
 * It delegates tasks to sub-agents, specifically for telling jokes and providing weather information.
 * The root agent uses the "gemini-2.5-flash" model and maintains session state using a SQLite-backed session service.
 *
 * @returns The fully constructed root agent instance, ready to process and route user requests to the appropriate sub-agent.
 */
export const getRootAgent = () => {
	const mindProofAgent = getMindProofPipelineAgent();

	return AgentBuilder.create("root_agent")
		.withDescription(
			"Root agent that delegates tasks to sub-agents for telling jokes and providing weather information.",
		)
		.withInstruction(
			"Use the joke sub-agent for humor requests and the weather sub-agent for weather-related queries. Route user requests to the appropriate sub-agent.",
		)
		.withModel(env.LLM_MODEL)
		.withSubAgents([mindProofAgent])
		.build();
};
