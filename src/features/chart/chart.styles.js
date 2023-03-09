import styled from 'styled-components';

export const PageContainer = styled.div`
    overflow-x: scroll;
    background-color: #141212;
    opacity: 0.9;
    /* width */
    ::-webkit-scrollbar {
        height: 10px;
        border-radius: 7px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: #000000cc;
        border-radius: 7px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #fff;
        border-radius: 7px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #fff;
        border-radius: 7px;
    }
`;

export const ChartCentralizedBox = styled.div`
    display: flex;
    position: relative;
    height: 90vh;
    width: calc(90vh * 2);
    margin: auto;
`;

export const ChartContainer = styled.div`
    position: relative;
    height: 90vh;
    width: calc(90vh * 2);
`;