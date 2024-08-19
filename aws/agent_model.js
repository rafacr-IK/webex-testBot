// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
require("dotenv").config();
const {
    BedrockAgentRuntimeClient,
    InvokeAgentCommand,
  } = require ('@aws-sdk/client-bedrock-agent-runtime');
  
  /**
   * @typedef {Object} ResponseBody
   * @property {string} completion
   */
  
  /**
   * Invokes a Bedrock agent to run an inference using the input
   * provided in the request body.
   *
   * @param {string} prompt - The prompt that you want the Agent to complete.
   * @param {string} sessionId - An arbitrary identifier for the session.
   */
  exports.invokeBedrockAgent = async function (prompt, sessionId) {
     const client = new BedrockAgentRuntimeClient({
      region: process.env.AWS_REGION,
      credentials: { //User access key from IAM 
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
    
    //AWS bedrock agent keys ID
    const agentId = process.env.AWS_AGENT_ID;
    const agentAliasId = process.env.AWS_AGENT_ALIAS_ID;
  
    const command = new InvokeAgentCommand({
      agentId,
      agentAliasId,
      sessionId,
      inputText: prompt,
    });
  
    try {
      let completion = "";
      const response = await client.send(command);
  
      if (response.completion === undefined) {
        throw new Error("Completion is undefined");
      }
  
      for await (let chunkEvent of response.completion) {
        const chunk = chunkEvent.chunk;
        const decodedResponse = new TextDecoder("utf-8").decode(chunk.bytes);
        completion += decodedResponse;
      }
  
      return  completion ;
    } catch (err) {
      console.error(err);
    }
  };