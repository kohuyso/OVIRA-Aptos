'use client';
import Highcharts from 'highcharts';
import { useMemo } from 'react';
import useHighchartsDefaultConfig from './useHighchartsDefaultConfig';

export default function useDonutChartConfig(extraOptions: Highcharts.Options, deps: unknown[] = []) {
    const defaultConfig = useHighchartsDefaultConfig();

    return useMemo(() => {
        return Highcharts.merge(
            defaultConfig,
            {
                chart: {
                    type: 'pie',
                    options3d: {
                        enabled: true,
                        alpha: 45,
                    },
                },
                plotOptions: {
                    pie: {
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false,
                        },
                        innerSize: '82%',
                        depth: 45,
                        borderWidth: 2,
                        borderColor: 'inherit',
                    },
                },
                xAxis: {
                    crosshair: {
                        width: 15,
                        snap: false,
                        color: 'transparent',
                        dashStyle: 'Solid',
                    },
                },
                legend: {
                    enabled: true,
                    layout: 'horizontal',
                    align: 'right',
                    verticalAlign: 'top',
                    itemMarginTop: 0,
                    itemMarginBottom: 10,
                },
                tooltip: {
                    shared: true,
                },
            } as Highcharts.Options,
            extraOptions
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultConfig, ...deps]);
}
