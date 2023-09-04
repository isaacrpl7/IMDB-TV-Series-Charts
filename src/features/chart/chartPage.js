import { useEffect, useRef, useState } from "react"
import { Background } from "../ui/background";
import Chart from './chart';
import { PageContainer } from "./chart.styles";

function ChartPage({ setLoading, titleId, chartTitle }) {
    
    const [visible, setVisible] = useState(false);
    const [bayes, setBayes] = useState([]);
    const [currentChart, setCurrentChart] = useState('normal');
    const imdbData = useRef([]);

    const bayesianAverage = (product_ratings_count, product_ratings_average, m, C) => {
        return (product_ratings_count*product_ratings_average + m*C) / (product_ratings_count+C)
    }

    const quantile = (sorted, q) => {
        const pos = (sorted.length - 1) * q;
        const base = Math.floor(pos);
        const rest = pos - base;
        if (sorted[base + 1] !== undefined) {
            return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
        } else {
            return sorted[base];
        }
    };

    const bayesianChartData = (data) => {
        let avgRating = 0;
        let C = 0; // Value of confidence number, a threshold for number of votes in order to ratings being more accurate 
        let acc = 0.0;
        data.forEach((episode) => {
            acc += episode.rating;
        });
        avgRating = acc / data.length;
        const votes = data.map((episode) => {
            return episode.total_votes;
        });
        const sortedVotes = votes.sort((a, b) => a - b);
        C = quantile(sortedVotes, .25);
        console.log(C, 'quantile')

        const bayseianData = []
        data.forEach((episode) => {
            const b_avg = bayesianAverage(episode.total_votes, episode.rating, avgRating, C);
            bayseianData.push({...episode, rating: b_avg.toFixed(2)});
        });
        return bayseianData;
    }

    useEffect(() => {
        async function getData() {
            const res = await fetch(`${process.env.REACT_APP_IMDB_SCRAPING_API}/list-episodes/${titleId}`);
            const data = await res.json();
            imdbData.content = data;
            console.log(imdbData.content, 'NORMAL')
            setBayes(bayesianChartData(imdbData.content));

            setLoading(false)
            setVisible(true);
        }
        getData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const changeType = (direction) => { // direction - 0 to left and 1 to right
        if(currentChart === 'normal' && direction === 1) {
            setCurrentChart('bayes');
        } else if(currentChart === 'bayes' && direction === 0) {
            setCurrentChart('normal');
        }
    }

    const ChangeChart = ({type}) => {
        if(type === 'normal') {
            return (
            <PageContainer>
                <Chart imdbData={imdbData.content} chartTitle={chartTitle} titleId={titleId} />
            </PageContainer>)
        } else {
            return (
                <PageContainer>
                    <Chart imdbData={bayes} chartTitle={`${chartTitle} (bayesian average)`} titleId={titleId} />
                </PageContainer>
            )
        }
    }

    return (
        <>
            <Background />
            {visible && 
            <div style={{display: 'flex', justifyContent: 'center', backgroundColor: '#141212'}}>
                <div style={{color: 'white', backgroundColor: '#141212', opacity: 0.9, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '3rem'}}>
                    <img 
                        onClick={() => changeType(0)} 
                        style={{width: '2.5rem', transform: 'rotateY(180deg)', cursor: currentChart === 'bayes' ? 'pointer' : 'not-allowed', opacity: currentChart === 'bayes' ? 1 : 0.2}} 
                        src='./nextpage.png' alt="left">
                    </img>
                </div>
                <ChangeChart type={currentChart} />
                <div style={{color: 'white', backgroundColor: '#141212', opacity: 0.9, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '3rem'}}>
                    <img 
                        onClick={() => changeType(1)} 
                        style={{width: '2.5rem', cursor: currentChart === 'bayes' ? 'not-allowed' : 'pointer', opacity: currentChart === 'bayes' ? 0.2 : 1}} 
                        src='./nextpage.png' 
                        alt="right" >
                    </img>
                </div>
            </div>
            }
        </>
    )
}

export default ChartPage;