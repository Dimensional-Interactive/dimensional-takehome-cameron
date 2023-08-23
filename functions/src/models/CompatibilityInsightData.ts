export interface CompatibilityInsightComputeData {
    analysisMarkdownString: string | null | undefined
    xAxisTraitSlug: string;
    xAxisLowLabel?: string | null | undefined;
    xAxisHighLabel?: string | null | undefined;
    yAxisTraitSlug: string;
    yAxisLowLabel?: string | null | undefined;
    yAxisHighLabel?: string | null | undefined;
    q1Label?: string | null | undefined;
    q2Label?: string | null | undefined;
    q3Label?: string | null | undefined;
    q4Label?: string | null | undefined;
    q1q1AnalysisString: string
    q1q2AnalysisString: string
    q1q3AnalysisString: string
    q1q4AnalysisString: string
    q2q2AnalysisString: string
    q2q3AnalysisString: string
    q2q4AnalysisString: string
    q3q3AnalysisString: string
    q3q4AnalysisString: string
    q4q4AnalysisString: string
    isNew: false
    slug: string
}
