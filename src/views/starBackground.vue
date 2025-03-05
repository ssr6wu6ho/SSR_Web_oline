<template>
  <div ref="container" class="w-full h-full"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import * as THREE from 'three'


const props = defineProps<{
  isDark: boolean
}>()

// Three.js相关引用
const container = ref<HTMLDivElement>() // 容器DOM引用
let scene: THREE.Scene                  // Three.js场景对象
let camera: THREE.PerspectiveCamera     // 透视投影相机
let renderer: THREE.WebGLRenderer       // WebGL渲染器

let stars: THREE.Points                 // 星空粒子系统
let rainLines: THREE.Group              // 雨线组对象
let cloudParticles: THREE.Points        // 乌云粒子系统
let animationFrameId: number            // 动画帧ID（用于取消动画）

/**
 * 创建星空粒子系统
 * 实现原理：
 * 1. 使用BufferGeometry高效处理大量顶点数据
 * 2. 随机生成5000个粒子位置（范围-300到300）
 * 3. 使用PointsMaterial创建点材质
 */
// 创建星空
const createStars = () => {
  const geometry = new THREE.BufferGeometry()
  const vertices = []
  
  // 生成随机三维坐标（立方体分布）
  for (let i = 0; i < 5000; i++) {
    vertices.push(
      Math.random() * 600 - 300, // x ∈ [-300, 300)
      Math.random() * 600 - 300, // y ∈ [-300, 300)
      Math.random() * 600 - 300  // z ∈ [-300, 300)
    )
  }

  // 设置几何体顶点属性（使用Float32Array优化内存）
  geometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(vertices, 3) // 3表示每顶点三个分量（x,y,z）
  )

  // 创建点材质（白色，大小1px，允许透明）
  const material = new THREE.PointsMaterial({
    color: 0xffffff,    // 白色
    size: 1,            // 点大小
    transparent: true   // 启用透明
  })

  // 创建粒子系统并加入场景
  stars = new THREE.Points(geometry, material)
  scene.add(stars)
}

// 动画星星
const animateStars = () => {
  if (!stars) return
  stars.rotation.y += 0.0005
}

/**
 * 创建雨天效果（乌云+雨线）
 * 实现组成：
 * 1. 乌云粒子系统（使用大尺寸点模拟）
 * 2. 雨线组（使用线段模拟下落雨滴）
 */
 const createRainEffect = () => {
  // 创建乌云粒子系统
  const cloudGeometry = new THREE.BufferGeometry()
  const cloudVertices = []
  const cloudCount = 200

  // 在顶部区域（y=150附近）生成随机云层位置
  for (let i = 0; i < cloudCount; i++) {
    cloudVertices.push(
      Math.random() * 400 - 200, // x ∈ [-200, 200)
      150 + Math.random() * 20,  // y ∈ [150, 170)
      Math.random() * 400 - 200  // z ∈ [-200, 200)
    )
  }

  cloudGeometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(cloudVertices, 3)
  )

  // 乌云材质设置（深灰色，大尺寸，半透明）
  const cloudMaterial = new THREE.PointsMaterial({
    color: 0x444444,
    size: 15,            // 大尺寸点模拟云朵
    transparent: true,
    opacity: 0.3,
    depthWrite: false    // 禁用深度写入（优化半透明渲染）
  })

  cloudParticles = new THREE.Points(cloudGeometry, cloudMaterial)
  scene.add(cloudParticles)

  // 创建雨线组（包含1000条线段）
  rainLines = new THREE.Group()
  const rainCount = 1000

  for (let i = 0; i < rainCount; i++) {
    // 创建垂直线段几何体（长度15单位）
    const geometry = new THREE.BufferGeometry()
    const vertices = new Float32Array([
      0, 0, 0,   // 起点
      0, -15, 0  // 终点（向下延伸）
    ])

    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))

    // 雨线材质（天蓝色，半透明）
    const material = new THREE.LineBasicMaterial({
      color: 0x6699cc,
      transparent: true,
      opacity: 0.6
    })

    const line = new THREE.Line(geometry, material)
    // 随机初始化雨线位置
    line.position.set(
      Math.random() * 400 - 200,  // x ∈ [-200, 200)
      Math.random() * 300 + 150,  // y ∈ [150, 450)
      Math.random() * 400 - 200   // z ∈ [-200, 200)
    )
    rainLines.add(line)
  }
  scene.add(rainLines)
}

/**
 * 更新雨滴动画
 * 实现逻辑：
 * 1. 乌云粒子水平缓慢波动
 * 2. 雨线下落至底部后重置到顶部
 */
const animateRain = () => {
  if (!rainLines) return

  // 更新乌云粒子水平位置（正弦波动）
  const cloudPositions = cloudParticles.geometry.attributes.position.array as Float32Array
  for (let i = 0; i < cloudPositions.length; i += 3) {
    cloudPositions[i] += Math.sin(Date.now() * 0.001) * 0.02
  }
  cloudParticles.geometry.attributes.position.needsUpdate = true // 标记需要更新

  // 更新雨线位置
  rainLines.children.forEach(line => {
    // 循环逻辑：雨滴到底部后重置到顶部
    if (line.position.y < -150) {
      line.position.y = 150 + Math.random() * 50
      line.position.x = Math.random() * 400 - 200
      line.position.z = Math.random() * 400 - 200
    }
  })
}

// 渲染循环
const animate = () => {
  animationFrameId = requestAnimationFrame(animate)

  if (props.isDark) {
    animateStars()
  } else {
    animateRain()
  }

  renderer.render(scene, camera)
}

// 初始化场景
const initScene = () => {
  if (!container.value) return

  // 创建场景
  scene = new THREE.Scene()

  // 创建相机
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.z = 100

  // 创建渲染器
  renderer = new THREE.WebGLRenderer({ alpha: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  container.value.appendChild(renderer.domElement)



  // 根据主题创建效果
  if (props.isDark) {
    createStars()
  } else {
    createRainEffect()
  }
  // 开始动画
  animate()
}
// 监听主题变化
watch(() => props.isDark, (newValue) => {
  if (!scene) return

  // 清除现有效果
  if (stars) scene.remove(stars)
  if (rainLines) scene.remove(rainLines)
  if (cloudParticles) scene.remove(cloudParticles)

  // 创建新效果
  if (newValue) {
    createStars()
  } else {
    createRainEffect()
  }
})

// 监听窗口大小变化
const handleResize = () => {
  if (!camera || !renderer) return

  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

onMounted(() => {
  initScene()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
  window.removeEventListener('resize', handleResize)
})
</script>