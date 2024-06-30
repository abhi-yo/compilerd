const axios = require("axios");
const { testCases } = require("./data/testJson");
const { describe, expect, it } = require("@jest/globals");

const ENDPOINT = process.env.ENDPOINT || "http://localhost:3000/api/execute/";

describe("Tests", () => {
  for (const testCase of testCases) {
    it(
      testCase.name,
      async () => {
        try {
          const response = await axios.post(ENDPOINT, testCase.reqObject);
          if (typeof response.data.output === "object") {
            expect(response.data.output.score).toBeDefined();
            expect(response.data.output.rationale.positives).toBeDefined();
            expect(response.data.output.rationale.negatives).toBeDefined();
            expect(response.data.output.points).toBeDefined();
          } else {
            expect(response).toHaveProperty(
              "data.output",
              testCase.expectedResponse.val
            );
          }
          expect(response).toHaveProperty(
            "status",
            testCase.expectedResponse.status
          );
          expect(response).toHaveProperty(
            "data.error",
            testCase.expectedResponse.error
          );
        } catch (error) {
          // handle case where request fails
          if (error.response) {
            const response = error.response;
            if (typeof response.data.output === "object") {
              expect(response.data.output.score).toBeDefined();
              expect(response.data.output.rationale.positives).toBeDefined();
              expect(response.data.output.rationale.negatives).toBeDefined();
              expect(response.data.output.points).toBeDefined();
            } else {
              expect(response).toHaveProperty(
                "data.output",
                testCase.expectedResponse.val
              );
            }
            expect(response).toHaveProperty(
              "status",
              testCase.expectedResponse.status
            );
            expect(response).toHaveProperty(
              "data.error",
              testCase.expectedResponse.error
            );
          } else {
            throw error; // rethrow if a different error
          }
        }
      },
      30000
    ); // increased timeout to 30sec
  }
});
