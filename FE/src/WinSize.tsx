import { useCallback, useEffect, useRef, useState } from "react";

// 浏览器长宽显示组件
function WinSize() {
  // 设定浏览器的初始状态，初始值只在第一次 render时使用
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // 创建一个在整个组件生命周期内保持稳定的可变对象，修改 .current 不会触发 re-render
  const resizeRef = useRef(false);// 等价于 resizeRef={current:false}

  // useCallback：创建“稳定函数”，在依赖不变的情况下，每次 re-render不会重新生成函数引用，复用上一次的函数引用
  const onResize = useCallback(()=>{
    // 第一道“闸门”：resizeRef 判断, true的话拦截，false的话放行。
    if(resizeRef.current) return;

    // 放行后先将“闸门”锁上，防止同一帧内多次触发
    resizeRef.current = true;

    // 等到下一帧浏览器绘制前执行，通常大约16ms
    requestAnimationFrame(()=>{
      // 更新浏览器状态
      setSize({
        width : window.innerWidth,
        height : window.innerHeight,
      });
      // 开锁
      resizeRef.current = false;
    });
  },[]);// 这里的[]空集合参数可以避免onResize函数的重新生成。依赖为空 → onResize 永远指向同一个函数实例

  // 组件挂载完毕，commit 阶段结束（React确认DOM已经在页面上）mount后执行
  useEffect(() => {
    // 注册监听
    window.addEventListener('resize', onResize);

    // 组件卸载，unmount后注销监听
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [onResize]); // 这里函数引用作为依赖，onResize稳定不变，所以effect只在 mount 时执行一次

  // 组件返回的DOM
  return <><div>width: {size.width}</div><div>height: {size.height}</div></>;
}

export default WinSize;