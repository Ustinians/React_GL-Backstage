/**
 * 用来在内存中保存一些数据的工具
 */
import {
    HomeOutlined,
    ShoppingOutlined,
    UnorderedListOutlined,
    ShoppingCartOutlined,
    UserOutlined,
    SmileOutlined,
    AreaChartOutlined,
    BarChartOutlined,
    LineChartOutlined,
    PieChartOutlined
} from '@ant-design/icons';
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    user: {}, // 保存当前登录的user
    // eslint-disable-next-line no-sparse-arrays
    menu: [
        {
            key: "/home",
            title: "首页",
            path: "/home",
            icon: <HomeOutlined />
        },
        {
            key: "/products",
            title: "商品",
            icon: <ShoppingOutlined />,
            path: "/products",
            children: [
                {
                    key: "/products/category",
                    title: "品类管理",
                    path: "/products/category",
                    icon: <UnorderedListOutlined />
                },
                {
                    key: "/products/product",
                    title: "商品管理",
                    path: "/products/product",
                    icon: <ShoppingCartOutlined />
                }
            ]
        },
        {
            key: "/user",
            title: "用户管理",
            path: "/user",
            icon: <UserOutlined />
        },
        {
            key: "/role",
            title: "角色管理",
            path: "/role",
            icon: <SmileOutlined />
        },
        {
            key: "/charts",
            title: "图形图表",
            path: "/charts",
            icon: <AreaChartOutlined />,
            children: [
                {
                    key: "/charts/bar",
                    title: "柱形图",
                    path: "/charts/bar",
                    icon: <BarChartOutlined />
                },
                {
                    key: "/charts/line",
                    title: "折线图",
                    path: "/charts/line",
                    icon: <LineChartOutlined />
                },
                {
                    key: "/charts/pie",
                    title: "扇形图",
                    path: "/charts/pie",
                    icon: <PieChartOutlined />
                }
            ]
        }
    ]
}