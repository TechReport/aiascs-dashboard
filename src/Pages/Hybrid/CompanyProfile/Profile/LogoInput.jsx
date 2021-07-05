import React, { useEffect, useState } from 'react';
import { message, Upload, Modal } from 'antd';
import ImgCrop from 'antd-img-crop';

export default function LogoInput({ companyId, logo }) {
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        if (logo)
            setFileList([
                {
                    uid: '-1',
                    name: 'logo.png',
                    status: 'done',
                    url: logo,
                },
            ])
        // eslint-disable-next-line
    }, [])

    const [previewImage, setPreviewImage] = useState('')
    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewTitle, setPreviewTitle] = useState('')

    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    // const onChange = (data) => {
    //     console.log(data)
    //     setFileList(data);

    // }

    const onPreview = async file => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        // const image = new Image();
        // image.src = src;
        // const imgWindow = window.open(src);
        // imgWindow.document.write(image.outerHTML);
        setPreviewImage(src)
        setPreviewVisible(true)
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
    };

    function beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    const handleCancel = () => setPreviewVisible(false);
    // function handleLogoUpload(e) {
    //     console.log(e)
    // }
    return (
        <>
            <ImgCrop rotate beforeCrop={beforeUpload} >
                <Upload
                    action={`http://localhost:5400/api/v1/qualitycontrollers/updatelogo/${companyId}`}
                    headers={{
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                    }}
                    // customRequest={handleLogoUpload}
                    // defaultFileList={ }
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}
                    onPreview={onPreview}
                    beforeUpload={beforeUpload}
                >
                    {fileList.length < 1 && ' + Upload'}
                </Upload>
            </ImgCrop>
            <Modal
                visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
            >
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </>
    );
};
