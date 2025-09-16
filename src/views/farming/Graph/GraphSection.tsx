'use client';
import { Card, CardContent } from 'shadcn/card';
import TabCustom from 'src/components/customs/TabCustom';
import { useMemo, useState } from 'react';
import { cn } from 'src/lib/utils';
import useAreaChartConfig from 'src/hooks/useHighCharts/useAreaChartConfig';
import { compactNumber, formatNumber, formatUTCTimestamp, highchartDateFormat } from 'src/utils/format';
import Highcharts, { SeriesOptionsType } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import useQueryApy from 'src/hooks/useQueryFarming/useQueryApy';
import useQueryTvl from 'src/hooks/useQueryFarming/useQueryTvl';
import useQueryApyChart from 'src/hooks/useQueryFarming/useQueryApyChart';
import useQueryTvlChart from 'src/hooks/useQueryFarming/useQueryTvlChart';
import StatusCheckQuery from 'src/components/status/StatusCheckQuery';

export interface TRange {
    id: number;
    title: string;
    value: string;
}

const rangeConfigs: Array<TRange> = [
    {
        id: 0,
        title: '1D',
        value: '1',
    },
    {
        id: 1,
        title: '7D',
        value: '7',
    },
    {
        id: 2,
        title: '1M',
        value: '30',
    },
    {
        id: 3,
        title: '3M',
        value: '90',
    },
];

export default function GraphSection() {
    const [range, setRange] = useState(rangeConfigs[1]);
    const [chart, setChart] = useState('apy');

    const days = Number(range.value);

    const { data: apy, status: apyStatus } = useQueryApy();
    const { data: tvl, status: tvlStatus } = useQueryTvl();
    const { data: apyChart, status: apyChartStatus } = useQueryApyChart(days);
    const { data: tvlChart, status: tvlChartStatus } = useQueryTvlChart(days);

    const apySeriesData = useMemo(() => (apyChart || []).map(([ts, val]) => [new Date(ts).getTime(), val] as [number, number]), [apyChart]);
    const tvlSeriesData = useMemo(() => (tvlChart || []).map(([ts, val]) => [new Date(ts).getTime(), val] as [number, number]), [tvlChart]);

    const chartData = useMemo(() => {
        if (chart === 'apy') {
            return {
                name: 'apy',
                data: apySeriesData,
            };
        }
        return {
            name: 'tvl',
            data: tvlSeriesData,
        };
    }, [apySeriesData, tvlSeriesData, chart]);

    const options = useAreaChartConfig(
        {
            chart: {
                height: 295,
            },
            title: {
                text: '',
            },
            xAxis: {
                type: 'datetime',
                crosshair: false,
                labels: {
                    formatter: function () {
                        // const date = new Date(this.value);
                        // const day = date.getDate();
                        // const month = Highcharts.dateFormat('%b', Number(this.value));

                        // if (day === 1) return `<p style="color: #B5B8B8; font-size:14px;">${month}</p>`;
                        // return `<p style="color: #B5B8B8; font-size:14px;">${day.toString()}</p>`;

                        return `<p style="color: #8D8D8D; font-size:12px;">${formatUTCTimestamp(this.value as number, range)}</p>`;
                    },
                },
            },
            yAxis: {
                opposite: false,
                title: {
                    text: undefined,
                },
                min: 0,
                crosshair: false,
                gridLineColor: '#393939',
                gridLineDashStyle: 'Dash',
                gridLineWidth: 1,
                labels: {
                    formatter() {
                        const value = Number(this.value);
                        return `<p style="color: #8D8D8D; font-size:12px;">${chart === 'apy' ? formatNumber(value) + '%' : '$' + compactNumber(value)}</p>`;
                    },
                },
            },
            legend: {
                enabled: false,
            },
            tooltip: {
                shared: false,
                enabled: true,
                backgroundColor: '#292929',
                borderRadius: 8,
                useHTML: true,
                formatter: function () {
                    return `<div>
                    <p style="color: #8D8D8D; font-size: 12px;font-weight: 500; ">${highchartDateFormat(this.x as number)}</p>
                    ${
                        chart === 'apy'
                            ? `<p style="color: #8D8D8D; font-size: 12px;font-weight: 500;">APY: ${formatNumber(this.y as number, { fractionDigits: 2, suffix: '%' })}</p>`
                            : `<p style="color: #8D8D8D; font-size: 12px;font-weight: 500;">TVL: ${formatNumber(this.y as number, { fractionDigits: 2, prefix: '$' })}</p>`
                    }
                    </div>`;
                },
            },
            plotOptions: {
                area: {
                    lineWidth: 2,
                    fillColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, 'rgba(138, 63, 252, 0.4)'],
                            [1, 'rgba(138, 63, 252, 0)'],
                        ],
                    },
                    lineColor: '#8A3FFC',
                    marker: {
                        enabled: false,
                    },
                    shadow: false,
                    states: {
                        hover: {
                            lineWidth: 2,
                        },
                    },
                },
            },
            series: [chartData] as unknown as SeriesOptionsType[],
        },
        [chartData]
    );

    return (
        <Card style={{ paddingTop: '0px' }}>
            <CardContent>
                <div className="flex items-center justify-between">
                    <div className="flex items-end">
                        <button
                            type="button"
                            onClick={() => setChart('apy')}
                            className={cn('text-left p-4 transition-colors', chart === 'apy' ? 'text-foreground border-t border-[var(--button-primary,#8A3FFC)]' : 'text-muted-foreground')}
                            style={chart === 'apy' ? { background: 'linear-gradient(180.5deg, rgba(138, 63, 252, 0.2) 0.43%, rgba(138, 63, 252, 0) 94.75%)' } : undefined}
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-sm mb-1">APY</span>
                            </div>
                            <div className={cn('text-2xl font-bold', chart === 'apy' ? 'text-foreground' : 'text-muted-foreground')}>
                                {apyStatus === 'success' ? `${formatNumber(apy)}%` : <span className="text-muted-foreground">--</span>}
                            </div>
                        </button>
                        <button
                            type="button"
                            onClick={() => setChart('tvl')}
                            className={cn('text-left p-4 transition-colors', chart === 'tvl' ? 'text-foreground border-t border-[var(--button-primary,#8A3FFC)]' : 'text-muted-foreground')}
                            style={chart === 'tvl' ? { background: 'linear-gradient(180.5deg, rgba(138, 63, 252, 0.2) 0.43%, rgba(138, 63, 252, 0) 94.75%)' } : undefined}
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-sm mb-1">TVL</span>
                            </div>
                            <div className={cn('text-2xl font-bold', chart === 'tvl' ? 'text-foreground' : 'text-muted-foreground')}>
                                {tvlStatus === 'success' ? `$${compactNumber(tvl || 0)}` : <span className="text-muted-foreground">--</span>}
                            </div>
                        </button>
                    </div>
                    <div className="w-72">
                        <TabCustom
                            height={32}
                            defaultValue="7"
                            value={range.value}
                            onValueChange={(value) => setRange(rangeConfigs.find((config) => config.value === value)!)}
                            tabs={rangeConfigs.map((config) => ({ label: config.title, value: config.value, content: <></> }))}
                        />
                    </div>
                </div>
                <div className="mt-4" style={{ height: '295px' }}>
                    {chart === 'apy' ? (
                        apyChartStatus === 'success' ? (
                            <HighchartsReact key={`chart-${chart}-${days}`} highcharts={Highcharts} options={options} />
                        ) : (
                            <StatusCheckQuery status={apyChartStatus} />
                        )
                    ) : tvlChartStatus === 'success' ? (
                        <HighchartsReact key={`chart-${chart}-${days}`} highcharts={Highcharts} options={options} />
                    ) : (
                        <StatusCheckQuery status={tvlChartStatus} />
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
