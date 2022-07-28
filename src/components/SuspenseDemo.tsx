// 1.动态加载组件
// 2.等待异步数据加载
import React, { Suspense } from 'react';
const Hello = React.lazy(() => import('./Hello'));

const Index = () => {
  return (
    <Suspense fallback={<>loading</>}>
      <Hello />
    </Suspense>
  )
}
export default Index;
