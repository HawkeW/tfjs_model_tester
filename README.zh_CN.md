# README.md

- en [English](README.md)
- zh_CN [简体中文](README.zh_CN.md)

# TFJS 模型性能测试工具

一个基于 Web 的应用程序，用于测试和比较 TensorFlow.js 模型的性能。使用 Vue 3 和 Vite 构建，该工具帮助开发者评估不同模型和图像的推理时间、FPS 和其他性能指标。

## 功能特性

- 📊 性能测试
  - 多模型批量测试
  - 预热运行支持
  - 多图像测试
  - 详细性能指标

- 📈 性能指标
  - 推理时间测量
  - FPS 计算
  - 预热时间跟踪
  - 最小/最大推理时间
  - 检测数量统计

- 🖼️ 图像支持
  - 拖拽上传图像
  - 多图像选择
  - 图像预览功能
  - 常见图像格式支持

- 📉 可视化
  - 交互式性能图表
  - 详细结果表格
  - CSV 导出功能
  - 结果对比

## 快速开始

### 环境要求

- Node.js (v20 或更高版本)
- npm 或 yarn

### 安装步骤

1. 克隆仓库
```bash
git clone <repository-url>
cd tfjs_model_tester