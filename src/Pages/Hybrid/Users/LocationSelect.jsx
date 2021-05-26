import { Cascader, Select } from 'antd';
import { Option } from 'antd/lib/mentions';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

// import tgd from 'tanzaniageodata'


export default function LocationSelect({ setLocation, locationError }) {
    const [regions, setRegions] = useState(['arusha', 'daressalaam', 'dodoma', 'geita', 'iringa', 'kagera', 'katavi', 'kigoma', 'kilimanjaro', 'lindi', 'manyara', 'mara', 'mbeya', 'morogoro', 'mtwara', 'mwanza', 'njombe', 'pwani', 'rukwa', 'ruvuma', 'shinyanga', 'simiyu', 'singida', 'singida', 'songwe', 'tabora'])
    const [districts, setDistricts] = useState({ loading: false, data: [] })
    const [wards, setWards] = useState({ loading: false, data: [] })

    const [selectedRegion, setSelectedRegion] = useState('')
    const [selectedDistrict, setSelectedDistrict] = useState('')
    const [selectedWard, setSelectedWard] = useState('')


    async function getDistricts(forRegion) {
        setDistricts({ loading: true, data: [] })
        await axios.get(`http://tanzania-locations.herokuapp.com/districts/${forRegion}`)
            .then((data) => {
                setDistricts({ loading: false, data: Object.values(data.data) })
            })
            .catch(error => {
                console.log(error)
            })
    }


    async function getWards(forDistrict) {
        setWards({ loading: true, data: [] })
        await axios.get(`http://tanzania-locations.herokuapp.com/wards/${selectedRegion}/${forDistrict}/`)
            .then((data) => {
                console.log(data)
                setWards({ loading: false, data: Object.values(data.data) })
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <>
            <Select
                showSearch
                className='mb-2'
                // loading={roles.loading}
                placeholder="Search to Select Region"
                onChange={(selRegion) => {
                    setSelectedRegion(selRegion)
                    getDistricts(selRegion)
                }}
                optionFilterProp="children" >
                {regions.map(region => <Option className='' style={{ fontSize: 'small' }} value={region}>{region}</Option>)}
            </Select>
            <Select
                showSearch
                className='mb-2'
                loading={districts.loading}
                placeholder="Search to Select District"
                disabled={!selectedRegion}
                onChange={(selDistrict) => {
                    setSelectedDistrict(selDistrict)
                    getWards(selDistrict)
                }}
                optionFilterProp="children" >
                {districts.data.map(district => <Option className='' style={{ fontSize: 'small' }} value={district}>{district}</Option>)}
            </Select>
            <Select
                showSearch
                className='mb-2'
                loading={wards.loading}
                placeholder="Search to Select"
                onChange={(selWard) => {
                    setSelectedWard(selWard)
                    setLocation({ region: selectedRegion, district: selectedDistrict, ward: selWard })
                }}
                disabled={!selectedDistrict}
                optionFilterProp="children" >
                {wards.data.map(ward => <Option className='' style={{ fontSize: 'small' }} value={ward}>{ward}</Option>)}
            </Select>
            {locationError.status &&
                <span className="text-sm text-danger" style={{ fontSize: 'xxx-small' }}>{locationError.message}</span>
            }
        </>
    )
};
