
import Api from './lib/Api';
import { useEffect, useState } from 'react';
import ReportList from './components/ReportList';
import ReportEdit from './components/ReportEdit';
import './MainContainer.css';

function MainPage() {

    const [current, setCurrent] = useState(null);

    const [reports, setReports] = useState([]);

    useEffect(() => {
        reloadReports()
    }, [])

    const reloadReports = async () => {
        let reports = await Api.getReports();
        // console.log('reports', reports)
        setReports(reports);
    }

    const onSelectChange = (key) => {
        setCurrent(key);
    }

    const getCurrent = () => {
        return reports.find(r => { return r._id == current });
    }

    return <div className="MainContainer">
        <ReportList reports={[...reports]} current={current} onSelect={onSelectChange} />
        {current && <ReportEdit report={getCurrent()}/>}
    </div>
}

export default MainPage;