import { useState } from "react";
import reactLogo from "@/assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter } from "react-router-dom";
import Router from "@/routers";
import { ConfigProvider } from "antd";
import { defaultTheme } from '@/style/theme'
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            // Seed Token，影响范围大
            colorPrimary: defaultTheme.bgColor,
            // borderRadius: 2,

            // 派生变量，影响范围小
            // colorBgContainer: "#f6ffed",
          },
        }}
      >
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ConfigProvider>
    </>
  );
}

export default App;
