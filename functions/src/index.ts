import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import {CompatibilityInsightManager} from "./managers/CompatibilityInsightManager";
import {MockDataManager} from "./managers/MockDataManager";

admin.initializeApp();

export const testFunction = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", {structuredData: true}); // you can log to firebase (for debugging your functions) with this approach
    response.send({
        "hello": "world",
        "dimensionalTest": true,
    });
});

export const fetchCompatibilityInsights = functions.https.onRequest(async (request, response) => {
    const compatibilityInsights = await CompatibilityInsightManager.computeCompatibiliytInsights(request.body.user1Uid, request.body.user2Uid);
    response.send(compatibilityInsights);
});

export const populateInitialDB = functions.https.onRequest(async (request, response) => {
    await MockDataManager.createMockData();
    response.send("OK");
});
