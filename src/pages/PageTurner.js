import { useState } from 'react';

import List from '../features/list/list';
import Search from '../features/search/search';
import Loading from '../features/ui/loading';
import ChartPage from '../features/chart/chartPage';

function PageTurner() {
    const [pageSearch, setPageSearch] = useState(true);

    const [pageList, setPageList] = useState(false);
    const [listData, setListData] = useState([]);

    const [pageChart, setPageChart] = useState(false);
    const [idToChart, setIdToChart] = useState('');
    const [seriesNameToChart, setSeriesNameToChart] = useState('');

    const [loading, setLoading] = useState(false);


    return (
        <> 
            {loading && <Loading />}
            {pageSearch && <Search 
                setPageSearch={setPageSearch} 
                setPageList={setPageList} 
                setListData={setListData} 
                setLoading={setLoading}
            />}
            {pageList && <List 
                listData={listData} 
                setPageChart={setPageChart} 
                setIdToChart={setIdToChart}
                setSeriesNameToChart={setSeriesNameToChart}
                setPageList={setPageList}
                setLoading={setLoading}
            />}
            {pageChart && <ChartPage chartTitle={`IMDB ranking by episode of ${seriesNameToChart}`} setLoading={setLoading} titleId={idToChart} />}
        </>
    )
}

export default PageTurner;