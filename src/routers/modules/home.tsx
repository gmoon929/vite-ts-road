import React from "react";
import lazyLoad from "../utils/lazyLoad";
import Layout from "@/layout";

const Home = [
    {
        element: <Layout />,
        children: [
            {
                path: '/page/home',
                element: lazyLoad(React.lazy(()=>import('@/views/home')))
            },
            {
                path: '/page/card',
                element: lazyLoad(React.lazy(()=>import('@/views/card')))
            }
        ]
    }
]
export default Home