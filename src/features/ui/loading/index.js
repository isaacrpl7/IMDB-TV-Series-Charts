import { Background } from "../background";

function Loading() {
    return(
        <>
            <Background />
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{margin: 'auto', background: 'rgba(255, 255, 255, 0)', display: 'block'}} width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                <circle cx="50" cy="50" fill="none" stroke="#000000" strokeWidth="10" r="24" strokeDasharray="113.09733552923255 39.69911184307752">
                    <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="0.5s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                </circle>
            </svg>
        </>
    )
}
export default Loading;