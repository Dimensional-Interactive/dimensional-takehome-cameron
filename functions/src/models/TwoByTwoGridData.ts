export interface TwoByTwoGridData {
    xAxis: AxisData;
    yAxis: AxisData;
    quadrantData: (string | null)[];
    xAxisUser1Score: number;
    yAxisUser1Score: number;
    xAxisUser2Score: number;
    yAxisUser2Score: number;
}

export interface AxisData {
    lowDescriptor?: string | null | undefined;
    highDescriptor?: string | null | undefined;
}
