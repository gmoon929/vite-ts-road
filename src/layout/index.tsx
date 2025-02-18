import LayoutMenu from "./components/Menu"
import { Outlet } from "react-router-dom"

const Layout = ()=>{
    return (
        <div>
            <LayoutMenu>
                <Outlet></Outlet>
            </LayoutMenu>
        </div>
    )
}
export default Layout