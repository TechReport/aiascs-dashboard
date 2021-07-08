import ProductCompany from './ProductCompany'
import CounterfeitProducts from './CounterfeitProducts'

const reportCategories = [
    {
        index: 0,
        title: 'PRODUCTS',
        descriptions: 'View and generate all Reports on products registered on the sysytem',
        reports: [
            {
                title: 'Company Products Distribution',
                descriptions: 'Generate report on products-company distribution',
                component: ProductCompany,
                configurations: ['duration', 'charts'],
                allowed: ['ROLE_QUALITY_CONTROLLER_ADMIN', 'ROLE_SUPER_ADMIN']
            },
            {
                title: 'Company Products Distribution',
                descriptions: 'Generate report on products-company distribution',
                component: () => ProductCompany({ startAt: 1 }),
                configurations: ['duration', 'charts'],
                allowed: ['ROLE_MANUFACTURING_COMPANY_ADMIN']
            },
            {
                title: 'Counterfeit Products',
                descriptions: 'View and generate all Reports on products registered on the sysytem',
                component: CounterfeitProducts,
                configurations: ['duration', 'charts'],
                allowed: ['ROLE_MANUFACTURING_COMPANY_ADMIN', 'ROLE_SUPER_ADMIN', 'ROLE_QUALITY_CONTROLLER_ADMIN']
            },
        ]
    },
    // {
    //     index: 1,
    //     title: 'COMPANIES',
    //     descriptions: 'View and generate all Reports on products registered on the sysytem',
    //     reports: [
    //         // {
    //         //     title: 'Genuine vs Counterfeit Products',
    //         //     descriptions: 'View and generate all Reports on products registered on the sysytem',
    //         //     component: () => <div>hi there</div>,
    //         //     configurations: ['duration', 'charts']
    //         // },
    //     ]
    // },
    // {
    //     index: 2,
    //     title: 'ON SYSTEM USERS',
    //     descriptions: 'View and generate all Reports on products registered on the sysytem',
    //     reports: [
    //         // {
    //         //     title: 'Genuine vs Counterfeit Products',
    //         //     descriptions: 'View and generate all Reports on products registered on the sysytem',
    //         //     component: () => <div>hi there</div>,
    //         //     configurations: ['duration', 'charts']
    //         // },
    //     ]
    // },
];


export default reportCategories