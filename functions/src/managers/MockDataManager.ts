import {CompatibilityInsightComputeData} from "../models/CompatibilityInsightData";
import {ScaleScore} from "../models/ScaleScore";
import {FirestoreManager} from "./FirestoreManager";

export class MockDataManager {
    static conscientiousness = "neo-conscientiousness";
    static extraversion = "neo-extraversion";
    static openness = "neo-openness";
    static agreeableness = "neo-agreeableness";
    static emotionalStability = "neo-emotional-stability";

    static async createMockData() {
        await Promise.all([
            this.createScaleScores(),
            this.createCompatibilityInsightComputeData(),
        ]);
    }

    static async createScaleScores() {
        const aliceScores: ScaleScore[] = [
            {
                scaleSlug: this.conscientiousness,
                score: 0.2,
            },
            {
                scaleSlug: this.extraversion,
                score: 0.1,
            },
            {
                scaleSlug: this.openness,
                score: 0.95,
            },
            {
                scaleSlug: this.agreeableness,
                score: 0.35,
            },
            {
                scaleSlug: this.emotionalStability,
                score: 0.92,
            },
        ];
        const bobScores: ScaleScore[] = [
            {
                scaleSlug: this.conscientiousness,
                score: 0.95,
            },
            {
                scaleSlug: this.extraversion,
                score: 0.87,
            },
            {
                scaleSlug: this.openness,
                score: 0.28,
            },
            {
                scaleSlug: this.agreeableness,
                score: 0.78,
            },
            {
                scaleSlug: this.emotionalStability,
                score: 0.43,
            },
        ];
        const eveScores: ScaleScore[] = [
            {
                scaleSlug: this.conscientiousness,
                score: 0.21,
            },
            {
                scaleSlug: this.extraversion,
                score: 0.38,
            },
            {
                scaleSlug: this.openness,
                score: 0.5,
            },
            {
                scaleSlug: this.agreeableness,
                score: 0.9,
            },
            {
                scaleSlug: this.emotionalStability,
                score: 1,
            },
        ];

        await this.createUserScores("alice", aliceScores);
        await this.createUserScores("bob", bobScores);
        await this.createUserScores("eve", eveScores);
    }

    static async createCompatibilityInsightComputeData() {
        const compatibiliytInsightComputeData: CompatibilityInsightComputeData[] = [
            {
                analysisMarkdownString: "Compatability on Extraversion and Conscientiousness",
                xAxisTraitSlug: this.extraversion,
                xAxisLowLabel: "Low Extraversion",
                xAxisHighLabel: "High Extraversion",
                yAxisTraitSlug: this.conscientiousness,
                yAxisLowLabel: "Low Conscientiousness",
                yAxisHighLabel: "High Conscientiousness",
                q1Label: "LEHC",
                q2Label: "HEHC",
                q3Label: "HELC",
                q4Label: "LELC",
                q1q1AnalysisString: "q1q1 analysis string placeholder",
                q1q2AnalysisString: "q1q2 analysis string placeholder",
                q1q3AnalysisString: "q1q3 analysis string placeholder",
                q1q4AnalysisString: "q1q4 analysis string placeholder",
                q2q2AnalysisString: "q2q2 analysis string placeholder",
                q2q3AnalysisString: "q2q3 analysis string placeholder",
                q2q4AnalysisString: "q2q4 analysis string placeholder",
                q3q3AnalysisString: "q3q3 analysis string placeholder",
                q3q4AnalysisString: "q3q4 analysis string placeholder",
                q4q4AnalysisString: "q4q4 analysis string placeholder",
                isNew: false,
                slug: "compat-insight-conscientiousness-extraversion",
            },
            {
                analysisMarkdownString: "Compatability on Agreeableness and Openness",
                xAxisTraitSlug: this.agreeableness,
                xAxisLowLabel: "Low Agreeableness",
                xAxisHighLabel: "High Agreeableness",
                yAxisTraitSlug: this.openness,
                yAxisLowLabel: "Low Openness",
                yAxisHighLabel: "High Openness",
                q1Label: "LAHO",
                q2Label: "HAHO",
                q3Label: "HALO",
                q4Label: "LALO",
                q1q1AnalysisString: "q1q1 analysis string placeholder",
                q1q2AnalysisString: "q1q2 analysis string placeholder",
                q1q3AnalysisString: "q1q3 analysis string placeholder",
                q1q4AnalysisString: "q1q4 analysis string placeholder",
                q2q2AnalysisString: "q2q2 analysis string placeholder",
                q2q3AnalysisString: "q2q3 analysis string placeholder",
                q2q4AnalysisString: "q2q4 analysis string placeholder",
                q3q3AnalysisString: "q3q3 analysis string placeholder",
                q3q4AnalysisString: "q3q4 analysis string placeholder",
                q4q4AnalysisString: "q4q4 analysis string placeholder",
                isNew: false,
                slug: "compat-insight-agreeableness-openness",
            },
            {
                analysisMarkdownString: "Compatability on Emotional Stability and Extraversion",
                xAxisTraitSlug: this.emotionalStability,
                xAxisLowLabel: "Low Emotional Stability",
                xAxisHighLabel: "High Emotional Stability",
                yAxisTraitSlug: this.extraversion,
                yAxisLowLabel: "Low Extraversion",
                yAxisHighLabel: "High Extraversion",
                q1Label: "LEmoHExtra",
                q2Label: "HEmoHExtra",
                q3Label: "HEmoLExtra",
                q4Label: "LEmoLExtra",
                q1q1AnalysisString: "q1q1 analysis string placeholder",
                q1q2AnalysisString: "q1q2 analysis string placeholder",
                q1q3AnalysisString: "q1q3 analysis string placeholder",
                q1q4AnalysisString: "q1q4 analysis string placeholder",
                q2q2AnalysisString: "q2q2 analysis string placeholder",
                q2q3AnalysisString: "q2q3 analysis string placeholder",
                q2q4AnalysisString: "q2q4 analysis string placeholder",
                q3q3AnalysisString: "q3q3 analysis string placeholder",
                q3q4AnalysisString: "q3q4 analysis string placeholder",
                q4q4AnalysisString: "q4q4 analysis string placeholder",
                isNew: false,
                slug: "compat-insight-emotional-stability-extraversion",
            },
        ];

        await Promise.all(compatibiliytInsightComputeData.map((datum) => {
            const ref = FirestoreManager.getDb().collection("compatibilityInsightComputeData").doc(datum.slug);
            return ref.set(datum);
        }));
    }

    static async createUserScores(uid: string, scaleScores: ScaleScore[]) {
        await FirestoreManager.getDb().doc(`members/${uid}`).set({
            userName: uid,
        });
        await Promise.all(scaleScores.map((score) => {
            const ref = FirestoreManager.getDb().doc(`members/${uid}/scaleScores/${score.scaleSlug}`);
            return ref.set(score);
        }));
    }
}
