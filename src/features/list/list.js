import { Background } from "../ui/background";
import { H1 } from "../ui/h1";
import { P } from "../ui/p";
import { ListPanel, SeriesItem } from "./list.styles";
import { SeriesList } from "./list.styles";

function List({listData, setPageChart, setIdToChart, setPageList, setLoading, setSeriesNameToChart}) {

    function titleChart(title_id, title) {
        setIdToChart(title_id)
        setSeriesNameToChart(title)
        setPageList(false)
        setLoading(true)
        setPageChart(true)
    }

    return (
        <>
            <Background />
            <ListPanel>
                <H1>Escolha a série</H1>
                <SeriesList>
                    {listData.map(data => {
                        return (
                            <SeriesItem onClick={() => titleChart(data.title_id, data.title)} key={data.title_id}>
                                <div style={{display: 'flex', flexDirection: 'column', width: '50%'}}>
                                    <h3 style={{margin: 0}}>{data.title}</h3>
                                    <h4 style={{margin: 0}}>ID: {data.title_id}</h4>
                                </div>
                                <div style={{display: 'flex', flexDirection: 'column', width: '50%', color: '#d5b9b9'}}>
                                    {data.description.map(des => {
                                        return(
                                            <P key={des}>{des}</P>
                                        )
                                    })}
                                </div>
                            </SeriesItem>
                        )
                    })}
                </SeriesList>
            </ListPanel>
        </>
    )
}

export default List;