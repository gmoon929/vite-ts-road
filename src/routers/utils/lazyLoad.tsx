import { Spin } from 'antd'
import { ReactNode, Suspense } from 'react'
const lazyLoad = (Comp: React.LazyExoticComponent<any>): ReactNode => {
  return (
    <Suspense
      fallback={
        <Spin
          size="large"
          className="flex justify-center items-center h-full"
        />
      }
    >
      <Comp />
    </Suspense>
  );
};
export default lazyLoad