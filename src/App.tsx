import { HashRouter } from "react-router-dom";
import Router from "@/routers";
import { ConfigProvider } from "antd";
import { defaultTheme } from '@/style/theme'
function App() {
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
        <HashRouter>
          <Router />
        </HashRouter>
      </ConfigProvider>
    </>
  );
}

export default App;
