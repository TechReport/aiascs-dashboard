import { Button } from 'antd'
import PreviewReport from './Preview'

import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas'



// const { reportsAPI } = require('./reportsApi')


export default function Reports() {

    // const [reports, setReports] = useState({ loading: false, data: [] })


    // async function fetchReports() {
    //     setReports({ loading: true, data: [] })
    //     await reportsAPI.getAll('reports/')
    //         .then(data => {
    //             console.log(data)
    //             setReports({ loading: false, data: [] })
    //         }).catch(error => {
    //             console.log(error)
    //             setReports({ loading: false, data: [] })
    //         })
    // }

    // useEffect(() => {
    //     fetchReports()
    //     return () => {
    //         setReports()
    //     }
    // }, [])

    function printReport() {
        const input = document.getElementById('reportContents');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'JPEG', 0, 0);
                // pdf.output('dataurlnewwindow');
                pdf.save("download.pdf");
            })
            ;
    }

    return (
        <div className='container-fluid mt-4'>
            <div className="row">

                <div className="col-8">
                    {/* <div className="btn btn-info btn-sm" onClick={() => hist.replace('/reports/esddsdafdsadsfaf')}>View</div> */}

                    <div className="card">
                        <div className="card-header py-3 border-0 d-flex justify-content-between">
                            <div>reports</div>
                            <Button className='text-right' onClick={printReport}>export PDF</Button>
                        </div>
                        <PreviewReport />

                        {/* {reports.loading ?
                            <Skeleton active />
                            :
                            <BootstrapTable options={{ onRowClick: (cell) => hist.push(`/report/${cell._id}`, cell) }} trStyle={{ padding: '0px', cursor: 'pointer' }} data={reports.data} pagination search scrollTop='Top' striped hover searchPlaceholder='Search by name, age, address or tags' className='mt-n5 p-0' >
                                <TableHeaderColumn dataField='name' filterFormatted isKey>Names</TableHeaderColumn>
                                <TableHeaderColumn dataField='url'>Link URL</TableHeaderColumn>
                            </BootstrapTable>
                        } */}
                    </div>
                </div>
            </div>

        </div>
    )
}
