<template>
  <div style="width:50%;height:300px" ref="chart"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive, watch } from 'vue';
import * as Echarts from 'echarts'

const props = defineProps<{
  exist_list: Array<any>
}>()

const state = reactive({
  echarts_data: [] as Array<any>,
  myChart: null as any
})

const options = ref({
  title: {
    text: '状态',
  },
  tooltip: {},
  series: [
    {
      name: "AdoServer",
      type: 'pie',
      selectedMode: 'single',
      selectedOffset: 30,
      clockwise: true,
      label: {
        fontSize: 18,
      },
      labelLine: {
        lineStyle: {
          color: '#666666'
        }
      },
      data: state.echarts_data,
      itemStyle: {
        opacity: 0.7,
        borderWidth: 3,
        borderColor: '#666666'
      }
    }
  ]
})
watch(props, function () {
  const val = [{ value: 0, name: "未开启" }, { value: 0, name: "开启" }]
  props.exist_list.forEach(el => {
    if (el.data.alive) {
      val[1].value++
    } else {
      val[0].value++
    }
  })
  state.echarts_data = val
  options.value.series[0].data = val

  state.myChart = Echarts.init(chart.value)
  state.myChart.setOption(options.value)
})

const chart = ref<HTMLDivElement>({} as HTMLDivElement)

onMounted(() => {
  state.myChart = Echarts.init(chart.value)
  state.myChart.setOption(options.value)
})


</script>

<style scoped>

</style>