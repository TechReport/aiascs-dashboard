import { Cascader } from 'antd';
import React from 'react'

import tgd from 'tanzaniageodata'


export default function LocationSelect() {
    const opts = tgd.allWards()
    console.log(opts)

    // const optionLists = [
    //     {
    //         value: 'zhejiang',
    //         label: 'Zhejiang',
    //         isLeaf: false,
    //     },
    //     {
    //         value: 'jiangsu',
    //         label: 'Jiangsu',
    //         isLeaf: false,
    //     },
    // ];

    const [options, setOptions] = React.useState([{ value: 'kilimanjaro', label:'klm' }]);


    const onChange = (value, selectedOptions) => {
        console.log(value, selectedOptions);
    };

    const loadData = selectedOptions => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;

        // load options lazily
        setTimeout(() => {
            targetOption.loading = false;
            targetOption.children = [
                {
                    label: `${targetOption.label} Dynamic 1`,
                    value: 'dynamic1',
                },
                {
                    label: `${targetOption.label} Dynamic 2`,
                    value: 'dynamic2',
                },
            ];
            setOptions([...options]);
        }, 1000);
    };

    return <Cascader options={options} loadData={loadData} onChange={onChange} changeOnSelect />;
};
