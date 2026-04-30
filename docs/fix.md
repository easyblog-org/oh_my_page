# AI IDE 指令：优化 Hero 区鼠标跟随光晕（日晕）效果，消除卡顿与延迟

## 问题描述
当前 Hero 区域有一个鼠标跟随的光晕（圆形模糊光效），但移动鼠标时光晕无法实时跟随，有明显的滞后感，每次鼠标停止移动后光晕才“滑”过来。原因是更新频率低或未使用硬件加速。

## 优化目标
实现 **60fps 平滑跟随**，光晕实时与鼠标位置同步，无肉眼可见延迟。要求动效流畅、性能友好，不影响其他动画。

## 技术方案

### 核心修改点
1. **使用 `requestAnimationFrame` 驱动位置更新**：确保每一帧都重新定位光晕元素，与屏幕刷新率同步。
2. **使用 `transform: translate3d`**：触发 GPU 合成层，避免重排/重绘。
3. **光晕元素独立 CSS 属性**：`will-change: transform` 提示浏览器优化。
4. **移动端优雅退化**：通过 `(hover: hover)` 媒体查询判断是否启用；移动端不注册事件。

### 实现步骤

#### 第一步：在 Hero 组件中添加光晕元素（若已有则修改）
```tsx
<div 
  ref={glowRef}
  className="pointer-events-none fixed rounded-full"
  style={{
    width: '300px',
    height: '300px',
    background: 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, rgba(59,130,246,0) 70%)',
    filter: 'blur(40px)',
    willChange: 'transform',
    transform: 'translate3d(-1000px, -1000px, 0)', // 初始移出屏幕
  }}
/>

### 第二步：添加鼠标跟随逻辑（使用 RAF）
tsx
const glowRef = useRef<HTMLDivElement>(null);
const mouseX = useRef(-1000);
const mouseY = useRef(-1000);
const rafId = useRef<number>(0);

useEffect(() => {
  // 仅支持鼠标设备（非触摸屏）
  const isHoverSupported = window.matchMedia('(hover: hover)').matches;
  if (!isHoverSupported) return;

  const handleMouseMove = (e: MouseEvent) => {
    mouseX.current = e.clientX;
    mouseY.current = e.clientY;
  };
  window.addEventListener('mousemove', handleMouseMove);

  const updateGlow = () => {
    if (glowRef.current) {
      glowRef.current.style.transform = `translate3d(${mouseX.current - 150}px, ${mouseY.current - 150}px, 0)`;
    }
    rafId.current = requestAnimationFrame(updateGlow);
  };
  updateGlow();

  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
    cancelAnimationFrame(rafId.current);
  };
}, []);

### 第三步：确保光晕不遮挡交互
pointer-events: none 已设置。

### 第四步：性能优化细节
光晕尺寸不宜过大（建议 200-300px）。

使用 filter: blur(40px) 会产生额外性能开销，但现代 GPU 可接受；若仍卡顿可改用 backdrop-filter 或缩小模糊半径。

避免在动画中读取布局属性（如 getBoundingClientRect）。

输出要求
请基于当前 Hero 组件现有代码，仅提供 需替换/新增的 JSX 片段 和 useEffect 逻辑，以及必要的样式调整说明。保持其他功能（打字机、右侧 3D 图形）不变。

预期效果
鼠标在 Hero 区域移动（或全屏移动）时，光晕实时跟随，无任何肉眼可见延迟，交互顺滑如丝。

请输出完整的修改代码。