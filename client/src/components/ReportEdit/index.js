
import { useEffect, useState } from 'react';
import Api from '../../lib/Api';
import __ from 'lodash';
import './index.css';

function ReportEdit({ report }) {

    const [edited, setEdited] = useState([]);

    // useEffect(() => {
    //     reloadReports()
    // }, [])

    // const renderList = () => {
    //     return (
    //         <div className="ReportList">
    //             {reports.map(report => {
    //                 return (
    //                 <div className="report-item">
    //                     <div className="icon">icon</div>
    //                     <div className="content">
    //                         <span>{report.name || "Без имени"}</span>
    //                         <span>{report.description || "Здесь будет описание"}</span>
    //                     </div>
    //                 </div>
    //                 )
    //             })}
    //         </div>
    //     );
    // }

    const { name = "", description = "", template = {} } = report;
    const { model = "", fields = [] } = template;

    return (
        <div className="ReportEdit">
            <div>{name}</div>
            <div>{description}</div>
            <div>{model}</div>
            <div>Custom query</div>
            <div>
                {
                    fields.map(field => {
                        return (
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <div style={{ width: 100 }}>{field.name}</div>
                                <div>{field.value}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ReportEdit;