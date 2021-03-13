
import Api from '../../lib/Api';
import __ from 'lodash';
import './index.css';


function ReportList({ reports = [], current, onSelect }) {

    const renderList = () => {
        return (
            <div className="ReportList">
                {reports.map(report => {
                    return (
                        <div className={`report-item ${report._id == current ? "active" : ""}`} onClick={() => { onSelect(report._id) }}>
                            <div className="icon">icon</div>
                            <div className="content">
                                <span>{report.name || "Без имени"}</span>
                                <span>{report.description || "Здесь будет описание"}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        );
    }

    return (
        renderList()
    )
}

export default ReportList;