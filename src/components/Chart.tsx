import { LineChart } from 'echarts/charts';
import {
  DataZoomComponent,
  GridComponent,
  LegendComponent,
  MarkAreaComponent,
  MarkLineComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  VisualMapComponent,
  VisualMapPiecewiseComponent,
} from 'echarts/components';
import { ECharts, getInstanceByDom, init, use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { useEffect, useRef } from 'react';

// eslint-disable-next-line react-hooks/rules-of-hooks
use([
  LegendComponent,
  LineChart,
  GridComponent,
  TooltipComponent,
  TitleComponent,
  ToolboxComponent,
  DataZoomComponent,
  CanvasRenderer,
  VisualMapComponent,
  MarkLineComponent,
  VisualMapPiecewiseComponent,
  MarkAreaComponent,
]);

const defaultEchartStyle = {
  width: '100%',
  height: '100%',
};

function ReactECharts({
  option,
  setOptionSettings,
  style,
  className,
  showLoading,
  theme,
  initOpts,
}: any): JSX.Element {
  const chartRef = useRef<HTMLDivElement>(null);

  let chart: ECharts | undefined;

  useEffect(() => {
    if (chartRef.current !== null) {
      chart = init(chartRef.current, theme, initOpts);
    }

    function resizeChart() {
      chart?.resize();
    }

    window.addEventListener('resize', resizeChart);

    return () => {
      chart?.dispose();
      window.removeEventListener('resize', resizeChart);
    };
  }, [chartRef, initOpts]);

  useEffect(() => {
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);

      chart?.setOption(option, { ...setOptionSettings });
    }
  }, [option, setOptionSettings]);

  useEffect(() => {
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);

      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      showLoading ? chart?.showLoading() : chart?.hideLoading();
    }
  }, [showLoading]);

  return (
    <div ref={chartRef} className={`echarts-for-react ${className}`} style={{ ...defaultEchartStyle, ...style }} />
  );
}

export default ReactECharts;