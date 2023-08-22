import {CompatibilityInsight} from "../models/CompatibilityInsight";
import * as functions from "firebase-functions";
import {FirestoreManager} from "./FirestoreManager";
import {ScaleScore} from "../models/ScaleScore";

export class CompatibilityInsightManager {
    public static async computeCompatibiliytInsights(
        user1Uid: string,
        user2Uid: string
    ): Promise<CompatibilityInsight[]> {
        functions.logger.info(`Computing compatibility insights between users ${user1Uid} and ${user2Uid}`, {structuredData: true}); // you can log to firebase (for debugging your functions) with this approach

        // here's a snippet to fetch a given user's scores
        const scaleScores = (await FirestoreManager.getDb().collection(`members/${user1Uid}/scaleScores`).get())
            .docs.map((doc) => doc.data() as ScaleScore);

        // TODO: currently stubbed--implement this
        console.log(`retrieved ${scaleScores.length} scores for user1Uid`);
        return [];
    }
}
