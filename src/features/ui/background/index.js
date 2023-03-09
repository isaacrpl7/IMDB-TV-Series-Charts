import styled from 'styled-components'

export const Background = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0; 
    z-index: -1;
    background-color: #83404c;
    background-image: url("/movie.png");

    background-size: 6rem;
    animation-name: background-position;
    animation-duration: 6s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;

    @keyframes background-position {
        from   {background-position-x: 0; background-position-y: 0;}
        to  {background-position-x: 6rem; background-position-y: -6rem;}
    }
`;