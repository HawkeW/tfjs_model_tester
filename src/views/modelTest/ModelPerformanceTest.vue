<template>
  <div class="flex flex-col justify-start space-y-4 p-4 max-w-4xl mx-auto w-full">
    <Card
      class="shadow-lg hover:shadow-2xl transition-all duration-300 rounded-xl overflow-hidden bg-white/50 backdrop-blur-sm border border-gray-100">
      <CardHeader>
        <h1 class="text-lg font-bold">{{ t('modelTest.title') }}</h1>
      </CardHeader>
      <CardContent>
        <Textarea v-model="modelUrls" rows="3"
          class="w-full max-w-2xl mx-auto transition-all duration-300 hover:shadow-md focus:ring-2 focus:ring-primary/20 rounded-lg"
          :placeholder="t('modelTest.enterModelUrls')" @input="handleModelUrlsChange" />
      </CardContent>

      <CardContent class="space-y-6">
        <div
          class="border-2 border-dashed border-gray-200 rounded-xl p-6 hover:border-primary/60 transition-all duration-300 hover:shadow-md bg-gray-50/50 group max-w-2xl mx-auto"
          @dragover.prevent @drop.prevent="handleDrop" :class="{ 'border-primary/60 shadow-md': isDragging }">
          <input type="file" accept="image/*" multiple class="hidden" ref="fileInput" @change="handleImageUpload" />
          <div class="flex flex-col items-center justify-center h-full cursor-pointer space-y-4"
            @click="() => fileInput.click()" @dragenter.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false">
            <LucideUpload class="w-8 h-8 text-primary/70 group-hover:scale-110 transition-transform duration-300" />
            <div class="text-sm text-gray-600 text-center">
              {{ t('modelTest.uploadText') }}
              <span class="text-primary font-medium hover:underline">{{ t('modelTest.uploadClickText') }}</span>
            </div>
          </div>
        </div>

        <div v-if="testImages.length > 0" class="w-full max-w-2xl mx-auto">
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <div v-for="(image, index) in testImages" :key="index"
              class="relative group cursor-pointer rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
              @click="previewImage(image.preview)">
              <img :src="image.preview" class="w-full h-32 object-cover" :alt="image.file.name" />
              <div
                class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span class="text-white text-sm truncate max-w-[90%] px-2">{{ image.file.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardContent>
        <div class="flex flex-col gap-4 items-center justify-center">
          <div class="flex items-center gap-4 w-full max-w-2xl mx-auto">
            <label class="text-sm text-gray-600">{{ t('modelTest.warmupCount') }}:</label>
            <input type="number" v-model="warmupCount" min="1" max="100" :disabled="isLoading"
              class="w-24 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed" />
           </div>
           <div class="flex items-center gap-4 w-full max-w-2xl mx-auto">
            <label class="text-sm text-gray-600">{{ t('modelTest.inferenceCount') }}:</label>
            <input type="number" v-model="testCount" min="1" max="100" :disabled="isLoading"
              class="w-24 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed" />
          </div>
          <div class="flex items-center gap-4 w-full max-w-2xl mx-auto">
            <label class="text-sm text-gray-600">{{ t('modelTest.backend') }}:</label>
            <select v-model="selectedBackend" :disabled="isLoading"
              class="w-32 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
              <option value="webgl">WebGL</option>
              <option value="webgpu">WebGPU</option>
              <option value="wasm">WASM</option>
            </select>
          </div>
          <div class="flex gap-6">
            <Button :disabled="isLoading || !selectedModels.length || !testImages.length"
              class="min-w-[140px] transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg disabled:opacity-50"
              @click="startBatchTest">
              <LucideLoader v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
              {{ t('modelTest.startTest') }}
            </Button>

            <Button variant="outline" :disabled="!hasTestResults"
              class="min-w-[140px] transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md disabled:opacity-50"
              @click="exportResults">
              {{ t('modelTest.exportResults') }}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>

    <div class="bg-white rounded-xl shadow-sm">
      <Tabs v-model="activeTab" class="w-full">
        <TabsList class="grid w-full grid-cols-2 p-1 bg-gray-100/50 rounded-lg">
          <TabsTrigger value="chart"
            class="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md transition-all duration-300">{{
          t('modelTest.performanceChart') }}</TabsTrigger>
          <TabsTrigger value="table"
            class="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md transition-all duration-300">{{
          t('modelTest.detailData') }}</TabsTrigger>
        </TabsList>
        <TabsContent value="chart">
          <div class="mt-6 p-6 bg-gray-50/50 rounded-xl border border-gray-100">
            <div ref="performanceChart" class="h-[500px] w-full"></div>
          </div>
        </TabsContent>
        <TabsContent value="table">
          <div class="border rounded-xl overflow-hidden overflow-x-auto">
            <Table class="min-w-full table-auto">
              <TableHeader>
                <TableRow class="bg-gray-50/70 hover:bg-gray-50/90">
                  <TableHead class="font-semibold">{{ t('modelTest.tableColumns.model') }}</TableHead>
                  <TableHead class="font-semibold">{{ t('modelTest.tableColumns.image') }}</TableHead>
                  <TableHead class="font-semibold">{{ t('modelTest.tableColumns.warmupTime') }}</TableHead>
                  <TableHead class="font-semibold">{{ t('modelTest.tableColumns.inferenceTime') }}</TableHead>
                  <TableHead class="font-semibold">{{ t('modelTest.tableColumns.fps') }}</TableHead>
                  <TableHead class="font-semibold">{{ t('modelTest.tableColumns.actions') }}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="row in testResults" :key="row.modelName + row.imageName"
                  class="hover:bg-gray-50/50 transition-colors duration-200">
                  <TableCell class="font-medium">{{ row.modelName }}</TableCell>
                  <TableCell>{{ row.imageName }}</TableCell>
                  <TableCell>{{ row.warmupTime }}</TableCell>
                  <TableCell>{{ row.inferenceTime }}</TableCell>
                  <TableCell>{{ row.fps }}</TableCell>
                  <TableCell>
                    <Button variant="ghost" class="transition-all duration-300 hover:scale-110 hover:text-primary"
                      @click="viewDetail(row)">
                      {{ t('modelTest.tableColumns.viewDetail') }}
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>

    <Dialog v-model:open="detailVisible">
      <DialogContent class="sm:max-w-[800px] rounded-xl overflow-hidden bg-white/95 shadow-xl border border-gray-100/20">
        <DialogHeader class="border-b pb-4">
          <DialogTitle class="text-xl font-bold">{{ t('modelTest.dialog.title') }}</DialogTitle>
        </DialogHeader>
        <div class="flex flex-col gap-8 pt-4">
          <div class="relative w-full overflow-hidden rounded-xl shadow-lg bg-gray-50/50">
            <img :src="currentDetail?.image" class="max-w-full h-auto" />
            <canvas ref="detailCanvas" class="max-w-full h-auto absolute top-0 left-0"></canvas>
          </div>
          <div class="grid grid-cols-2 gap-6 p-6 border rounded-xl bg-gray-50/30">
            <div class="space-y-2">
              <div class="text-sm font-semibold text-gray-500">{{ t('modelTest.dialog.modelName') }}</div>
              <div class="font-medium">{{ currentDetail?.modelName }}</div>
            </div>
            <div class="space-y-2">
              <div class="text-sm font-semibold text-gray-500">{{ t('modelTest.dialog.backend') }}</div>
              <div class="font-medium">{{ currentDetail?.backend }}</div>
            </div>
            <div class="space-y-2">
              <div class="text-sm font-semibold text-gray-500">{{ t('modelTest.dialog.detectionCount') }}</div>
              <div class="font-medium">{{ currentDetail?.detections }}</div>
            </div>
            <div class="space-y-2">
              <div class="text-sm font-semibold text-gray-500">{{ t('modelTest.warmupCount') }}</div>
              <div class="font-medium">{{ currentDetail?.warmupCount }}</div>
            </div>
            <div class="space-y-2">
              <div class="text-sm font-semibold text-gray-500">{{ t('modelTest.dialog.testCount') }}</div>
              <div class="font-medium">{{ currentDetail?.batchSize }}</div>
            </div>
            <div class="space-y-2">
              <div class="text-sm font-semibold text-gray-500">{{ t('modelTest.dialog.totalCount') }}</div>
              <div class="font-medium">{{ (currentDetail?.batchSize ?? 0) + (currentDetail?.warmupCount ?? 0) }}</div>
            </div>
            <div class="space-y-2">
              <div class="text-sm font-semibold text-gray-500">{{ t('modelTest.dialog.warmupTime') }}</div>
              <div class="font-medium">{{ currentDetail?.warmupTime?.toFixed(0) }}ms</div>
            </div>
            <div class="space-y-2">
              <div class="text-sm font-semibold text-gray-500">{{ t('modelTest.dialog.avgInferenceTime') }}</div>
              <div class="font-medium">{{ currentDetail?.inferenceTime?.toFixed(0) }}ms</div>
            </div>
            <div class="space-y-2">
              <div class="text-sm font-semibold text-gray-500">{{ t('modelTest.dialog.avgFps') }}</div>
              <div class="font-medium">{{ currentDetail?.fps }}</div>
            </div>
            <div class="space-y-2">
              <div class="text-sm font-semibold text-gray-500">{{ t('modelTest.dialog.minInferenceTime') }}</div>
              <div class="font-medium">{{ currentDetail?.minInferenceTime?.toFixed(0) }}ms</div>
            </div>
            <div class="space-y-2">
              <div class="text-sm font-semibold text-gray-500">{{ t('modelTest.dialog.maxInferenceTime') }}</div>
              <div class="font-medium">{{ currentDetail?.maxInferenceTime?.toFixed(0) }}ms</div>
            </div>
            <div class="space-y-2">
              <div class="text-sm font-semibold text-gray-500">{{ t('modelTest.dialog.totalTime') }}</div>
              <div class="font-medium">{{ ((currentDetail?.totalTime ?? 0) / 1000).toFixed(1) }}s</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import { onMounted, ref, watch } from 'vue';
import { LucideUpload, LucideLoader } from 'lucide-vue-next';
import { useVideoDetectStore } from '@/stores/modules/videoDetect/videoDetect';
import { VideoEnhancer } from '@/packages/videoEnhance/videoEnhancer';
import { useLanguage } from '@/hook/useLanguage';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { useToast } from '@/components/ui/toast';
import * as tf from '@tensorflow/tfjs';

const { t } = useLanguage();
const { toast } = useToast();

// 组件状态
const selectedModels = ref<{ name: string; url: string }[]>([]);
const modelUrls = ref<string>('');
const testImages = ref<{ file: File; preview: string; bitmap: ImageBitmap }[]>([]);
const isLoading = ref(false);
const activeTab = ref('chart');
const detailVisible = ref(false);
const currentDetail = ref<any>(null);
const performanceChart = ref<HTMLElement>();
const detailCanvas = ref<HTMLCanvasElement>();
const fileInput = ref<HTMLInputElement>();
const warmupCount = ref<number>(1); // 添加预热次数配置
const selectedBackend = ref<string>('webgl'); // 添加后端选择配置

// 批量测试
const TEST_ITERATIONS = 10;
const testCount = ref(TEST_ITERATIONS)

const videoDetectStore = useVideoDetectStore();
const testResults = ref<any[]>([]);
const hasTestResults = ref(false);

// 处理模型URL输入
const handleModelUrlsChange = (event: Event) => {
  const value = (event.target as HTMLTextAreaElement).value;
  const urls = value.split('\n').filter(url => url.trim()).map(modelUrl => {
    if (modelUrl.includes('.json')) {
      const parts = modelUrl.split('/');
      return parts.slice(0, parts.length - 1).join('/')
    }
    return modelUrl;
  });
  selectedModels.value = urls.map(url => {
    const parts = url.split('/');
    const name = parts[parts.length - 1].split('.')[0];
    return { name, url };
  });
};

// 处理图片上传
const handleImageUpload = (event: Event) => {
  const files = (event.target as HTMLInputElement).files;
  if (!files) return;

  Array.from(files).forEach(file => {
    const reader = new FileReader();

    reader.addEventListener(
      'load',
      async () => {
        const img = new Image();
        img.src = reader.result as string;
        await new Promise((resolve) => {
          img.onload = resolve;
        });

        const bitmap = await createImageBitmap(img);
        testImages.value.push({
          file,
          preview: reader.result as string,
          bitmap,
        });
      },
      false,
    );

    reader.readAsDataURL(file);
  });
};

// 修改批量测试函数
const startBatchTest = async () => {
  if (!selectedModels.value.length || !testImages.value.length) {
    toast({
      variant: "destructive",
      title: t('modelTest.messages.selectModelAndImage'),
    });
    return;
  }

  isLoading.value = true;
  testResults.value = [];

  await videoDetectStore.setBackend(selectedBackend.value)
  
  try {
    for (const currentModel of selectedModels.value) {
      const { name, url: model } = currentModel
      await videoDetectStore.loadModel(model);

      for (const image of testImages.value) {
        const startTime = performance.now();

        // 执行预热测试
        const warmupResults = [];
        for (let i = 0; i < warmupCount.value; i++) {
          const result = await runSingleTest(name, model, image.bitmap, image.file.name);
          warmupResults.push(result);
        }

        // 计算预热平均时间
        const avgWarmupTime = Math.round(
          warmupResults.reduce((sum, r) => sum + r.inferenceTime, 0) / warmupCount.value
        );

        // 执行正式测试
        const batchResults = [];
        for (let i = 0; i < testCount.value; i++) {
          const result = await runSingleTest(name, model, image.bitmap, image.file.name);
          batchResults.push(result);
        }

        const endTime = performance.now();
        const totalTime = endTime - startTime;

        // 计算均值（不包含预热时间）
        const avgResult = {
          modelName: name,
          modelUrl: model,
          imageName: image.file.name,
          warmupTime: avgWarmupTime,
          inferenceTime: Math.round(batchResults.reduce((sum, r) => sum + r.inferenceTime, 0) / testCount.value),
          fps: Math.round(batchResults.reduce((sum, r) => sum + r.fps, 0) / testCount.value),
          detections: batchResults[0].detections,
          batchSize: testCount.value,
          minInferenceTime: Math.min(...batchResults.map((r) => r.inferenceTime)),
          maxInferenceTime: Math.max(...batchResults.map((r) => r.inferenceTime)),
          totalTime: totalTime,
          warmupResults: warmupResults,
          warmupCount: warmupCount.value,
          backend: selectedBackend.value,
        };

        testResults.value.push(avgResult);
      }
    }

    hasTestResults.value = true;
    updateChart();
  } catch (error) {
    toast({
      variant: "destructive",
      title: t('modelTest.messages.testError'),
      description: error.message,
    });
  } finally {
    isLoading.value = false;
  }
};

// 修改导出结果函数
const exportResults = () => {
  const csvContent = testResults.value
    .map(
      (result) =>
        `${result.modelName},${result.imageName},${result.inferenceTime},${result.minInferenceTime},${result.maxInferenceTime},${result.fps},${testCount.value}`,
    )
    .join('\n');

  const headers = [
    t('modelTest.tableColumns.model'),
    t('modelTest.tableColumns.image'),
    t('modelTest.tableColumns.inferenceTime'),
    t('modelTest.tableColumns.minInferenceTime'),
    t('modelTest.tableColumns.maxInferenceTime'),
    t('modelTest.tableColumns.fps'),
    t('modelTest.dialog.testCount')
  ].join(',');

  const blob = new Blob([`${headers}\n${csvContent}`], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `model_performance_${new Date().toISOString()}.csv`;
  a.click();
};

// 单次测试
const runSingleTest = async (modelName: string, modelUrl: string, bitmap: ImageBitmap, imageName: string) => {
  const startTime = performance.now();

  const videoEnhancer = VideoEnhancer.getInstance();
  const detections = await videoEnhancer.model?.detect(bitmap, {});

  const endTime = performance.now();
  const inferenceTime = endTime - startTime;

  return {
    modelName,
    modelUrl,
    imageName,
    inferenceTime,
    fps: Math.round(1000 / inferenceTime),
    detections: (detections?.boxes.length ?? 0) / 4,
  };
};

// 查看详情
const viewDetail = (record: any) => {
  currentDetail.value = record;
  detailVisible.value = true;
};

// 更新图表
const updateChart = () => {
  if (!performanceChart.value) return;

  const chart = echarts.init(performanceChart.value);
  const option = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderColor: '#e5e7eb',
      textStyle: { color: 'black' }
    },
    legend: {
      data: [t('modelTest.tableColumns.inferenceTime'), t('modelTest.tableColumns.fps')],
      textStyle: { color: 'black' }
    },
    xAxis: {
      type: 'category',
      data: testResults.value.map((r) => r.modelName),
      axisLine: { lineStyle: { color: '#e5e7eb' } },
      axisLabel: { color: '#000' },
      nameTextStyle: { color: '#000' }
    },
    yAxis: [
      {
        type: 'value',
        name: t('modelTest.tableColumns.inferenceTime'),
        axisLine: { lineStyle: { color: '#e5e7eb' } },
        axisLabel: { color: '#000' },
        splitLine: { lineStyle: { color: '#f3f4f6' } },
        nameTextStyle: { color: '#000' }
      },
      {
        type: 'value',
        name: t('modelTest.tableColumns.fps'),
        axisLine: { lineStyle: { color: '#e5e7eb' } },
        axisLabel: { color: '#000' },
        splitLine: { lineStyle: { color: '#f3f4f6' } },
        nameTextStyle: { color: '#000' }
      }
    ],
    series: [
      {
        name: t('modelTest.tableColumns.inferenceTime'),
        type: 'bar',
        data: testResults.value.map((r) => r.inferenceTime),
        itemStyle: { color: '#3b82f6' },
        emphasis: {
          itemStyle: { color: '#2563eb' }
        }
      },
      {
        name: t('modelTest.tableColumns.fps'),
        type: 'line',
        yAxisIndex: 1,
        data: testResults.value.map((r) => r.fps),
        lineStyle: { color: '#10b981' },
        itemStyle: { color: '#10b981' },
        emphasis: {
          itemStyle: { color: '#059669' }
        }
      }
    ]
  };
  chart.setOption(option);

  // 监听窗口大小变化
  window.addEventListener('resize', () => {
    chart.resize();
  });

  return chart;
};

// 监听结果变化更新图表
watch([testResults], updateChart);

// 监听标签页切换
watch(activeTab, (newValue) => {
  if (newValue === 'chart') {
    setTimeout(() => {
      updateChart();
    }, 500);
  }
});

onMounted(() => updateChart())

// 在 script setup 部分添加
const previewImage = (imageUrl: string) => {
  const img = new Image();
  img.src = imageUrl;
  const win = window.open('');
  win?.document.write(img.outerHTML);
};
// 在 script setup 中添加
const isDragging = ref(false);

const handleDrop = (event: DragEvent) => {
  isDragging.value = false;
  const files = event.dataTransfer?.files;
  if (!files) return;

  Array.from(files)
    .filter(file => file.type.startsWith('image/'))
    .forEach(file => {
      const reader = new FileReader();
      reader.addEventListener(
        'load',
        async () => {
          const img = new Image();
          img.src = reader.result as string;
          await new Promise((resolve) => {
            img.onload = resolve;
          });

          const bitmap = await createImageBitmap(img);
          testImages.value.push({
            file,
            preview: reader.result as string,
            bitmap,
          });
        },
        false,
      );
      reader.readAsDataURL(file);
    });
};
</script>

<style scoped>
.custom-tabs :deep(.el-tabs__nav-wrap::after) {
  height: 1px;
  background-color: var(--el-border-color-lighter);
}

.custom-tabs :deep(.el-tabs__item) {
  font-size: 1rem;
  padding: 0 2rem;
  height: 48px;
  line-height: 48px;
  transition: all 0.3s;
}

.custom-tabs :deep(.el-tabs__item.is-active) {
  font-weight: 600;
}

.custom-dialog :deep(.el-dialog__header) {
  padding: 1.5rem;
  margin-right: 0;
  border-bottom: 1px solid var(--el-border-color-lighter);
}

.custom-dialog :deep(.el-dialog__body) {
  padding: 1.5rem;
}

.custom-dialog :deep(.el-descriptions__cell) {
  padding: 1rem;
}

.custom-dialog :deep(.el-descriptions__label) {
  font-weight: 600;
  color: var(--el-text-color-regular);
}
</style>
