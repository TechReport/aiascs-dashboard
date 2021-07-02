import ProductCompany from './ProductCompany'


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
                configurations: ['duration', 'charts']
            },
            {
                title: 'Genuine vs Counterfeit Products',
                descriptions: 'View and generate all Reports on products registered on the sysytem',
                component: () => <div>hi there</div>,
                configurations: ['duration', 'location']
            },
        ]
    },
    {
        index: 1,
        title: 'COMPANIES',
        descriptions: 'View and generate all Reports on products registered on the sysytem',
        reports: [
            // {
            //     title: 'Genuine vs Counterfeit Products',
            //     descriptions: 'View and generate all Reports on products registered on the sysytem',
            //     component: () => <div>hi there</div>,
            //     configurations: ['duration', 'charts']
            // },
        ]
    },
    {
        index: 2,
        title: 'ON SYSTEM USERS',
        descriptions: 'View and generate all Reports on products registered on the sysytem',
        reports: [
            // {
            //     title: 'Genuine vs Counterfeit Products',
            //     descriptions: 'View and generate all Reports on products registered on the sysytem',
            //     component: () => <div>hi there</div>,
            //     configurations: ['duration', 'charts']
            // },
        ]
    },
];


export default reportCategories