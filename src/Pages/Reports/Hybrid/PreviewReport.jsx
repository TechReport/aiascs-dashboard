import React from 'react'
import { Modal, Button } from 'antd';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas'
// import { ConfigurationContext } from './configurations.context';

export default function PreviewReport({ isModalVisible, handleCancel, handleOk, ReportComponent }) {
    // const [loading, setLoading] = useState(false)

    function printReport() {
        const input = document.getElementById('reportContents');
        document.getElementsByClassName('ignore')[0].classList.add('d-none')
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF("p", "mm", "a4");
                pdf.addImage(imgData, 'JPEG', 20, 20);
                // pdf.output('dataurlnewwindow');
                pdf.save("download.pdf");

                // window.open(pdf.output('dataurlnewwindow'));
                document.getElementsByClassName('ignore')[0].classList.remove('d-none')
                // pdf.autoPrint()
                handleOk()
            });
    }

    return (
        <Modal
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            width={'50%'}
            closable={false}
            destroyOnClose
            footer={[
                <Button key="back" onClick={handleCancel}>
                    Return
                </Button>,
                <Button key="submit" type="primary" onClick={printReport}>
                    Export PDF
                </Button>
            ]}>
            <ReportComponent />
        </Modal>
    )
}
