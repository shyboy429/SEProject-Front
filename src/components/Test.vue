<template>
  <div id="myChart" style="width: 600px; height: 400px;"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'PieChart',
  data() {
    return {
      chart: null,
      paperData: [
        { id: 1, type: '选择题' },
        { id: 2, type: '填空题' },
        { id: 3, type: '选择题' },
        { id: 4, type: '问答题' },
        { id: 5, type: '选择题' },
        { id: 6, type: '填空题' },
        // 更多数据
      ],
    };
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById('myChart'));

      // 计算每种类型的数量
      const typeCounts = this.paperData.reduce((acc, item) => {
        acc[item.type] = (acc[item.type] || 0) + 1;
        return acc;
      }, {});

      // 将计算结果转换为 ECharts 数据格式
      const data = Object.keys(typeCounts).map(type => {
        return { value: typeCounts[type], name: type };
      });

      const option = {
        title: {
          text: '题目类型占比图:',
          left: 'left'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          right: 0,
          top: 'center',
          icon: 'circle',
          selectedMode: 'multiple',
          formatter: (name) => {
            let total = data.reduce((sum, item) => sum + item.value, 0);
            let item = data.find(item => item.name === name);
            let p = (item.value / total * 100).toFixed(2);
            return `${name}  |  ${p}%`;
          }
        },
        series: [
          {
            name: '题目类型占比',
            type: 'pie',
            radius: '60%',
            center: ['25%', '55%'],
            selectedMode: 'single',
            data: data,
            label: {
              show: true,
              formatter: '{b}: {c} ({d}%)'
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };

      this.chart.setOption(option);

      window.addEventListener('resize', () => {
        this.chart.resize();
      });
    }
  },
  beforeDestroy() {
    if (this.chart) {
      window.removeEventListener('resize', this.chart.resize);
      this.chart.dispose();
    }
  }
};
</script>

<style scoped>
#myChart {
  width: 100%;
  height: 100%;
}
</style>
