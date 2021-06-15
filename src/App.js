import React , {useState,useCallback} from 'react'
import {BtnComp,DisComp} from "../../reactrxjsstopwatch/src/Components/index"
import {Subject} from "rxjs";
import "./App.css"
export default function App() {
    const [time , setTime] = useState({h:0,m:0,s:0})
    const [int,setInt] = useState()
    const [flag,setFlag] = useState(0)
    const starterDisplay = {h:0,m:0,s:0}
    let updateH = time.h,updateM = time.m,updateS = time.s
    const run = useCallback( ()=>{
        if (updateM === 59 && updateS === 59) {
            updateH++
            updateM = 0
            updateS = -1
        }
        else if (updateS === 59) {
            updateM++
            updateS=-1
        }
        updateS++
        return setTime({h:updateH,m:updateM,s:updateS})
    },[updateS,updateM,updateH])
    const start$=new Subject()
        .subscribe(()=>{
            setInt(setInterval(run , 1000))
            setFlag(1)
        })
    const resume$=new Subject()
        .subscribe(()=>{
            setInt(setInterval(run , 1000))
            setFlag(1)
        })
    const stop$=new Subject()
        .subscribe(()=>{
            clearInterval(int)
            setTime(starterDisplay)
            setFlag(0)
        })
    const wait$=new Subject()
        .subscribe(()=>{
            clearInterval(int)
        })
    /* reset не получился */
    const reset$=new Subject()
        .subscribe(()=>{
            clearInterval(int)
            setTime(starterDisplay)
            setInt(setInterval(run , 1000))
            setFlag(1)
        })
    return(
        <>
            <div className="down">
                <div className="main">
                    <DisComp time={time} />
                    <BtnComp start={start$} stop={stop$} resume={resume$} reset = {reset$} wait={wait$} flag = {flag} setFlag={setFlag}/>
                </div>
            </div>
        </>
    )
}