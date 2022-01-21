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
            id: "001",
            title: "首页",
            path: "/home",
            icon: <HomeOutlined />
        },
        {
            id: "002",
            title: "商品",
            icon: <ShoppingOutlined />,
            child: [
                {
                    id: "002-001",
                    title: "品类管理",
                    path: "/category",
                    icon: <UnorderedListOutlined />
                },
                {
                    id: "002-002",
                    title: "商品管理",
                    path: "/product",
                    icon: <ShoppingCartOutlined />
                }
            ]
        },
        ,
        {
            id: "003",
            title: "用户管理",
            path: "/user",
            icon: <UserOutlined />
        },
        {
            id: "004",
            title: "角色管理",
            path: "/role",
            icon: <SmileOutlined />
        },
        {
            id: "005",
            title: "图形图表",
            path: "/charts",
            icon: <AreaChartOutlined />,
            child: [
                {
                    id: "005-001",
                    title: "柱形图",
                    path: "/charts/bar",
                    icon: <BarChartOutlined />
                },
                {
                    id: "005-002",
                    title: "折线图",
                    path: "/charts/line",
                    icon: <LineChartOutlined />
                },
                {
                    id: "005-003",
                    title: "扇形图",
                    path: "/charts/pie",
                    icon: <PieChartOutlined />
                }
            ]
        }
    ]
}