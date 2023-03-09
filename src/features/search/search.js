import { SearchPanel } from "./search.styles"
import { Input } from "../ui/input"
import { H1 } from "../ui/h1";
import { Background } from "../ui/background";
import { useState } from "react";
import { Button } from "../ui/Button";

function Search({setPageSearch, setPageList, setListData, setLoading}) {
    const [search, setSearch] = useState("")

    async function handleSearch(e) {
        e.preventDefault();
        setPageSearch(false);
        setLoading(true);
        const data = await fetch(process.env.REACT_APP_IMDB_SCRAPING_API+`/search?serie=${search}`);
        const res = await data.json();
        setLoading(false);
        setListData(res);
        setPageList(true);
    }

    return (<>
        <Background />
        <SearchPanel>
            <H1 style={{marginTop: '6rem', marginBottom: '3.5rem'}}>Search some TV serie</H1>
            <form onSubmit={handleSearch} style={{display: "flex", width: '40%', marginBottom: '1.2rem', justifyContent: "space-between"}}>
                <Input value={search} onChange={(e) => setSearch(e.target.value)} style={{width: '90%'}} type="text" placeholder="Example: Revenge"></Input>
                <Button type="submit" onClick={handleSearch}><img style={{height: "3rem"}} alt="" src="/search-icon.svg"></img></Button>
            </form>
        </SearchPanel>
    </>)
}

export default Search;