import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useExternalScript } from '../hooks/useExternalScript';
import { ReportsWithScriptLoaded } from '../components/ReportsWithScriptLoaded';
import '../style/App.css';

const Reports = () => {

    const [reportAPI, setReportAPI] = useState(null);

    useEffect(() => {

        const callLearnosityAPI = async () => {
            const response = await fetch('/reports-loader');
            const body = await response.json();

            if (response.status !== 200) {
                throw Error(body.message)
            }
            setReportAPI(JSON.stringify(body));
        }

        callLearnosityAPI()
            .catch(console.error);

    }, [reportAPI]);

    const navigate = useNavigate();

    let authenticated = '';

    if (reportAPI) {
        authenticated = JSON.parse(reportAPI);
    }

    const learnosityScript = '//reports.learnosity.com/?v2022.1.LTS';
    const status = useExternalScript(learnosityScript, authenticated.request);

    return (
        <>
            <div className='results-container'>            
                <h1 className='results-header'>🏆 Your Results 🏆</h1>            
                {status === 'loading' && <p> loading... </p>}
                {status === 'ready' && <ReportsWithScriptLoaded />}
                <button className="btn-try-again" onClick={ () => navigate('/', {replace: true})}> Try Again ? </button>
            </div>
        </>
    )
}

export default Reports;