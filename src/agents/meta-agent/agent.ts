import { SequentialAgent } from "@iqai/adk";
import { getQuestionFromUserAgent } from "../question-agent/agent";
import { getBurnoutAnalysisAgent } from "../analysis-agent/agent";
import { getRecommendationAgent } from "../recommendation-agent/agent";

export const getMindProofPipelineAgent = () =>
  new SequentialAgent({
    name: "mindProofPipelineAgent",
    description: `
      This pipeline orchestrates the full MindProof conversation flow.
      It starts by asking the user a series of questions to understand
      their energy, emotions, and focus levels, then analyzes responses
      for burnout risk, and finally provides a personalized recommendation.

      Flow:
      1️⃣ QuestionAgent — gathers emotional & lifestyle data.
      2️⃣ AnalysisAgent — interprets responses into a burnout risk level.
      3️⃣ RecommendationAgent — returns an empathetic, actionable insight.
    `,
    subAgents: [
      getQuestionFromUserAgent(),
      getBurnoutAnalysisAgent(),
      getRecommendationAgent(),
    ],
  });
