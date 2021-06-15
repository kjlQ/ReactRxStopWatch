export default function BtnComponent({start, stop , resume , reset , wait , flag , setFlag}) {
    let timer;
    let sol = count => count === 2 && wait.next()
    return (
        <>
            <button id={"startBtn"} onClick={()=>flag=0?start.next():resume.next()}>Start</button>
            <button id={"stopBtn"} onClick={()=>stop.next()}>Stop</button>
            <button id={"waitBtn"} onClick={(e)=> {
                clearInterval(timer)
                timer = setTimeout(sol,300,e.detail)
            }} >Wait</button>
            <button id={"resetBtn"} onClick={()=>reset.next()}>Reset</button>
        </>
    )
}
