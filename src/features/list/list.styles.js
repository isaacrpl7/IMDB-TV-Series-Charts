import styled from 'styled-components'

export const ListPanel = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #000000cc;
    align-items: center;
`;

export const SeriesList = styled.ul`
    min-height: 5rem;
    max-height: 25rem;
    width: 50%;
    margin-bottom: 3rem;
    border-radius: 7px;
    background-color: #56303014;
    padding: 0;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;

    /* width */
    ::-webkit-scrollbar {
        width: 10px;
        border-radius: 7px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: #000000cc;
        border-radius: 7px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #83404c;
        border-radius: 7px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #83404c;
        border-radius: 7px;
    }
`

export const SeriesItem = styled.li`
    width: 100%;
    height: 5rem;
    min-height: 5rem;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #4e1827;
    border-radius: 7px;
    color: white;
    font-family: Rubik, sans-serif;
    cursor: pointer;
    border-bottom: 1px solid #000000cc;
`;