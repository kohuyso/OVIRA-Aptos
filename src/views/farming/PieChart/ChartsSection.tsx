'use client';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { Card, CardContent, CardTitle } from 'shadcn/card';
import useDonutChartConfig from 'src/hooks/useHighCharts/useDonutChartConfig';
import { chartColors } from 'src/hooks/useHighCharts/useHighchartsDefaultConfig';
import type { PoolAllocation } from 'src/lib/api';
import { useMemo } from 'react';
import useQueryAllocations from 'src/hooks/useQueryFarming/useQueryAllocations';
import StatusCheckQuery from 'src/components/status/StatusCheckQuery';
import { formatNumber } from 'src/utils/format';

export default function ChartsSection() {
    const { data: allocations, status: allocationsStatus } = useQueryAllocations();

    const processedAllocations: PoolAllocation[] = useMemo(() => {
        const items = allocations || [];
        if (items.length <= 2) return items;
        const sorted = [...items].sort((a, b) => b.weight_pct - a.weight_pct);
        const topTwo = sorted.slice(0, 2);
        const otherTotal = sorted.slice(2).reduce((sum, cur) => sum + (cur.weight_pct || 0), 0);
        return [...topTwo, { pool_name: 'Other', weight_pct: otherTotal }];
    }, [allocations]);

    const chartData = processedAllocations.map((item) => ({
        name: item.pool_name,
        y: item.weight_pct,
    }));

    const options = useDonutChartConfig(
        {
            chart: {
                height: 300,
                type: 'pie',
            },
            colors: ['#8A3FFC', '#BE95FF', '#E8DAFF'].concat(chartColors),
            title: {
                text: '',
            },
            plotOptions: {
                pie: {
                    // borderRadius: 6,
                    // borderWidth: 4,
                    center: ['50%', '50%'],
                    innerSize: '40%',
                    borderColor: '#161616',
                    dataLabels: {
                        enabled: false,
                    },
                },
            },
            tooltip: {
                enabled: true,
                backgroundColor: '#262626',
                borderRadius: 8,
                useHTML: true,
                formatter: function () {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const data = this as any;
                    return `<div>
                                <span style="color: #8D8D8D;font-size: 12px;">${data.point.name}: </span>
                                <span style="color: #F4F4F4;font-weight: 700;font-size: 12px;">${formatNumber(this.y as number, { fractionDigits: 2, suffix: '%' })}</span>
                            </div>`;
                },
            },
            legend: {
                enabled: true,
                layout: 'vertical',
                align: 'center', // căn giữa
                verticalAlign: 'bottom', // nằm dưới chart
                symbolWidth: 8,
                symbolHeight: 8,
                useHTML: true,
                labelFormatter: function () {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const data = this as any;
                    return `
                     <div style="font-family: 'Inter Tight', 'Inter Tight Fallback'; display: flex; align-items: center; justify-content: space-between; width: 200px;">
                            <div style="display: flex; align-items: center; gap: 4px;">
                                <span style="color: #8D8D8D; font-size: 12px;"> 
                                    ${data.options.name}
                                </span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 4px;">
                                <span style="color: #F4F4F4; font-size: 12px;"> 
                                    ${formatNumber(data.options.y as number, { fractionDigits: 2, suffix: '%' })}
                                </span>
                            </div>
                    </div>
                    `;
                },
            },
            series: [
                {
                    states: {
                        inactive: {
                            opacity: 0.2,
                            enabled: true,
                        },
                    },
                    name: '',
                    type: 'pie',
                    data: chartData,
                    showInLegend: true,
                },
            ],
        },
        [chartData]
    );
    return (
        <Card>
            <CardContent>
                <CardTitle className=" mb-4 text-base">Assets Allocation</CardTitle>
                <div style={{ height: '300px' }}>
                    {allocationsStatus == 'success' ? <HighchartsReact highcharts={Highcharts} options={options} /> : <StatusCheckQuery status={allocationsStatus} />}
                </div>
            </CardContent>
        </Card>
    );
}
