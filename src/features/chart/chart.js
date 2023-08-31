import { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    LineController
} from 'chart.js';
import { Bar } from "react-chartjs-2";
import annotationPlugin from 'chartjs-plugin-annotation';
import { ChartCentralizedBox, ChartContainer } from "./chart.styles";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    annotationPlugin,
    {
        id: 'customCanvasBackgroundColor',
        beforeDraw: (chart, args, options) => {
            const {ctx} = chart;
            ctx.save();
            ctx.globalCompositeOperation = 'destination-over';
            ctx.fillStyle = options.color || '#99ffff';
            ctx.fillRect(0, 0, chart.width, chart.height);
            ctx.restore();
        }
    },
    PointElement,
    LineElement,
    LineController
);

function Chart({ chartTitle, imdbData }) {
    const [labels, setLabels] = useState();
    const [backgroundColors, setBackgroundColors] = useState();
    const [imdbScores, setImdbScores] = useState([]);
    const [minRating, setMinRating] = useState(100);
    const [seasonsLabels, setSeasonsLabels] = useState({});
    const [averageSeasonsRatings, setAverageSeasonsRatings] = useState([]);
    const [, setDisplayHeight] = useState(100);
    const [, setDisplayWidth] = useState(100);
    const imdbData = useRef([]);
    const [visible, setVisible] = useState(false);

    let options = {
        scales: {
            y: {
                min: minRating,
                grid: {
                    color: '#291f1f'
                },
                ticks: {
                    color: '#fff'
                },
                border: {
                    color: '#fff'
                }
            },
            x: {
                grid: {
                    color: '#291f1f'
                },
                ticks: {
                    color: '#fff'
                },
                border: {
                    color: '#fff'
                }
            }
        },
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    // This more specific font property overrides the global property
                    font: {
                        family: 'Rubik',
                    },
                    color: 'white'
                }
            },
            title: {
                display: true,
                text: chartTitle,
                color: 'white',
                font: {
                    family: 'Rubik',
                    weight: 500,
                    size: 18
                }
            },
            annotation: {
                annotations: {
                    ...seasonsLabels
                },
            },
            customCanvasBackgroundColor: {
                color: '#141212',
            },
            tooltip: {
                callbacks: {
                    title: function(context) {
                        const episode_and_season = context[0].label.matchAll(/E(\d+)S(\d+)/g)
                        const e_s = [...episode_and_season][0]
                        const episode_n = parseInt(e_s[1])
                        const season_n = parseInt(e_s[2])
                        const ep = imdbData.find(episode => episode.ep_number === episode_n && episode.season === season_n)
                        return `${context[0].label} - ${ep.name}`
                    },
                    label: function(context) {
                        let label = context.dataset.label || '';

                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += context.parsed.y;
                        }
                        const index = context.dataIndex;
                        const votes = imdbData[index].total_votes;
                        if(context.datasetIndex === 0) {
                            return `${label} (${votes} votes)`;
                        } else {
                            return label;
                        }
                    }
                }
            }
        },
    };
    
    let data = {
        labels,
        datasets: [
            {
                label: 'IMDB score',
                data: imdbScores,
                backgroundColor: backgroundColors,
                borderRadius: 5,
                order: 1
            },
            {
                label: 'Season average score',
                data: averageSeasonsRatings,
                type: 'line',
                borderColor: '#f7c6c6',
                pointStyle: false,
                lineTension: 0.2,
                borderWidth: 4,
                stepped: true,
                borderDash: [5, 3],
                order: 0
            }
        ],
    };

    useEffect(() => {
        let bc_color_options = [[131, 64, 76, 1], [110, 10, 27, 1]]
        let bar_color = bc_color_options[0];
        const x_labels = [];
        const bk_colors = [];
        const scores = [];
        let min_rating = 10.0;
        let season_labels = {}
        let last_index = 0
        let average_seasons_ratings = []
        let season_ratings = []
        setDisplayHeight(window.innerHeight)
        setDisplayWidth(window.innerWidth)
        
        imdbData.forEach(episode => {
            // Calculate the min rating
            if(episode.rating < min_rating) {
                min_rating = episode.rating;
            }
        });
        min_rating = parseFloat(min_rating);
        
        imdbData.forEach((episode, index, ep_list) => {
            season_ratings.push(parseFloat(episode.rating))

            // Checking change of season
            if(index > 0) {
                const lastEpisode = (index+1 === ep_list.length);
                const seasonChanged = (ep_list[index].season > ep_list[index-1].season);
                // On season change
                if(seasonChanged || lastEpisode) {
                    // Calculate average rating of the season
                    if(seasonChanged) {
                        const firstEpisodeWarding = season_ratings.pop();
                        let season_avg = season_ratings.reduce((acc, curr) => acc + curr, 0) / season_ratings.length
                        for(let i = 0; i < season_ratings.length;i++) {
                            average_seasons_ratings.push(season_avg.toFixed(2));
                        }
                        season_ratings = [firstEpisodeWarding]
                    } else if(lastEpisode){
                        let season_avg = season_ratings.reduce((acc, curr) => acc + curr, 0) / season_ratings.length
                        for(let i = 0; i < season_ratings.length;i++) {
                            average_seasons_ratings.push(season_avg.toFixed(2));
                        }
                        season_ratings = []
                    }

                    // Change color by season
                    if(seasonChanged) {
                        bar_color = bar_color === bc_color_options[0] ? bar_color = bc_color_options[1] : bar_color = bc_color_options[0];
                    }
                    
                    // Configure label by season
                    let label_position = (index+last_index)/2
                    if(lastEpisode) { // In this case, index must be added +1 because of how the calculation is made (when season changes, the index is +1)
                        label_position = ((index + 1)+last_index)/2
                    }
                    season_labels = {
                        ...season_labels,
                        [`label${lastEpisode ? ep_list[index].season : ep_list[index].season-1}`]: {
                            type: 'label',
                            xValue: label_position - 0.5,
                            yValue: min_rating <= 1 ? 1 : min_rating - 0.3,
                            backgroundColor: 'rgba(0,0,0,1)',
                            content: ep_list.length > 200 ? [`S${lastEpisode ? ep_list[index].season : ep_list[index].season-1}`] : [`Season ${lastEpisode ? ep_list[index].season : ep_list[index].season-1}`],
                            color: 'white',
                            font: {
                                size: ep_list.length > 200 ? 9 : (ep_list.length > 100 ? 12 : 18),
                                family: 'Rubik',
                            }
                        }
                    }
                    last_index = index;
                }
            }
            
            x_labels.push(`E${episode.ep_number}S${episode.season}`);
            scores.push(episode.rating);
            bk_colors.push(`rgba(${bar_color[0]}, ${bar_color[1]}, ${bar_color[2]}, ${bar_color[3]})`);
        })
        // margin of 0.5 to scale of ratings
        setSeasonsLabels(season_labels);
        setMinRating(min_rating >= 0.5 ? min_rating - 0.5 : min_rating);
        console.log(min_rating,'minrating')
        setLabels(x_labels);
        setBackgroundColors(bk_colors);
        setImdbScores(scores);
        setAverageSeasonsRatings(average_seasons_ratings);

        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <ChartCentralizedBox>
                <ChartContainer>
                    <Bar data={data} options={options} style={{borderRadius: '1rem'}} />
                </ChartContainer>
            </ChartCentralizedBox>
        </>
    )
}

export default Chart;