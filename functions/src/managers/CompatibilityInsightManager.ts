import {CompatibilityInsight} from "../models/CompatibilityInsight";
import * as functions from "firebase-functions";
import {FirestoreManager} from "./FirestoreManager";
import {ScaleScore} from "../models/ScaleScore";
import {CompatibilityInsightComputeData} from "../models/CompatibilityInsightData";
import { AxisData, TwoByTwoGridData } from "../models/TwoByTwoGridData";

export class CompatibilityInsightManager {
    public static async computeCompatibiliytInsights(
        user1Uid: string,
        user2Uid: string
    ): Promise<CompatibilityInsight[]> {
        functions.logger.info(`Computing compatibility insights between users ${user1Uid} and ${user2Uid}`, {structuredData: true}); // you can log to firebase (for debugging your functions) with this approach

        // here's a snippet to fetch a given user's scores
        const user1ScaleScores = (await FirestoreManager.getDb().collection(`members/${user1Uid}/scaleScores`).get())
            .docs.map((doc) => doc.data() as ScaleScore);
        const user2ScaleScores = (await FirestoreManager.getDb().collection(`members/${user2Uid}/scaleScores`).get())
            .docs.map((doc) => doc.data() as ScaleScore);

        const compatibilityInsightComputeData = (await FirestoreManager.getDb().collection("compatibilityInsightComputeData").get())
            .docs.map((doc) => doc.data() as CompatibilityInsightComputeData);

        // TODO: currently stubbed--implement this
        console.log(`retrieved ${user1ScaleScores.length} scores for user1Uid`);
        console.log(`retrieved ${user2ScaleScores.length} scores for user2Uid`);
        console.log(`retrieved ${compatibilityInsightComputeData.length} compatibility data.`);

        const firstInsightData = compatibilityInsightComputeData[0];

        const xAxisSlug = firstInsightData.xAxisTraitSlug
        const yAxisSlug = firstInsightData.yAxisTraitSlug

        const user1XScore = user1ScaleScores.find((element) => element.scaleSlug == xAxisSlug)?.score;
        const user1YScore = user1ScaleScores.find((element) => element.scaleSlug == yAxisSlug)?.score;
        const user1Quadrant = getQuadrant(user1XScore, user1YScore); 

        const user2XScore = user2ScaleScores.find((element) => element.scaleSlug == xAxisSlug)?.score;
        const user2YScore = user2ScaleScores.find((element) => element.scaleSlug == yAxisSlug)?.score;
        const user2Quadrant = getQuadrant(user2XScore, user2YScore); 

        let testInsight: CompatibilityInsight =  { 
            analysisMarkdownString: getAnalysisMarkdownString(user1Quadrant, user2Quadrant, firstInsightData), 
            frameworkMarkdownString: function() { 
                if (typeof firstInsightData.analysisMarkdownString == `string`) { 
                    return firstInsightData.analysisMarkdownString
                } else { 
                    return ""
                }

            }(),
            gridData: createGridData(user1XScore, user1YScore, user2XScore, user2YScore, firstInsightData)
        };

        return [testInsight];

        function createGridData(user1XScore: number | undefined = 0.5, 
                                user1YScore: number | undefined = 0.5,
                                user2XScore: number | undefined = 0.5, 
                                user2YScore: number | undefined = 0.5, 
                                insightData: CompatibilityInsightComputeData): TwoByTwoGridData { 
            let gridData: TwoByTwoGridData = { 
                xAxis: createAxisData(insightData.xAxisLowLabel, insightData.xAxisHighLabel), 
                yAxis: createAxisData(insightData.yAxisLowLabel, insightData.yAxisHighLabel), 
                quadrantData: [], 
                xAxisUser1Score: user1XScore, 
                yAxisUser1Score: user1YScore, 
                xAxisUser2Score: user2XScore, 
                yAxisUser2Score: user2YScore
            }
            return gridData
        }

        function createAxisData(low: string | null | undefined, high: string | null | undefined): AxisData { 
            let axisData: AxisData = { 
                lowDescriptor: low, 
                highDescriptor: high
            }
            return axisData
        }

        function getAnalysisMarkdownString(user1Quadrant: Quadrant, user2Quadrant: Quadrant, insightData: CompatibilityInsightComputeData): string { 
            // In Swift, you can switch a tuple to cover all cases of both: switch (user1Quadrant, user2Quadrant). I couldn't find a TS equivalent, but I'm sure there is a way to shorten this. 
            switch (user1Quadrant) {
                case Quadrant.q1:
                    switch (user2Quadrant) { 
                        case Quadrant.q1: 
                            return insightData.q1q1AnalysisString
                        case Quadrant.q2:
                            return insightData.q1q2AnalysisString
                        case Quadrant.q3:
                            return insightData.q1q3AnalysisString
                        case Quadrant.q4:
                            return insightData.q1q4AnalysisString
                    }
                case Quadrant.q2:
                    switch (user2Quadrant) { 
                        case Quadrant.q2:
                            return insightData.q2q2AnalysisString
                        case Quadrant.q3:
                            return insightData.q2q3AnalysisString
                        case Quadrant.q4:
                            return insightData.q2q4AnalysisString
                    }
                        
                case Quadrant.q3:
                    switch (user2Quadrant) { 
                        case Quadrant.q3:
                            return insightData.q3q3AnalysisString
                        case Quadrant.q4:
                            return insightData.q3q4AnalysisString
                    }
                    
                case Quadrant.q4:
                    switch (user2Quadrant) { 
                        case Quadrant.q4:
                            return insightData.q4q4AnalysisString
                    }
            }

            return ""; 
        }

        // Given more time I would enforce a valid range between 0 and 1 on these parameters. 
        function getQuadrant(x: number | undefined, y: number | undefined): Quadrant { 
            // In Swift, I would use a guard let { } here. There is probably a more TypeScript-y way to do this check!
            if (x && y) { 
                if (x <= 0.5 && y > 0.5) { 
                    return Quadrant.q1
                } else if (x > 0.5 && y > 0.5) { 
                    return Quadrant.q2
                } else if (x > 0.5 && y <= 0.5) { 
                    return Quadrant.q3
                } else { 
                    return Quadrant.q4
                }
            } else { 
                throw new Error(`Undefined`)
            }
            
        }

        enum Quadrant { 
            q1, 
            q2, 
            q3, 
            q4
        }
    }

    
}


