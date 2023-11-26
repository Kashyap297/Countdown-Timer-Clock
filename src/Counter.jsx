import React from 'react';
import './counter.css';
import { useState } from 'react';
import { useEffect } from 'react';
// import FontAwesomeIcon from 'react';
// import regular from 'react';
const Counter = () => {
    let [hour, sethour] = useState(0),
        [min, setmin] = useState(0),
        [sec, setsec] = useState(0),
        [isActive, setIsActive] = useState(false),
        [values, setValues] = useState(false)

    let count = 1;
    
    const Clock = (e) => {
        const errors = {}
        let x = e.target
        x.placeholder = ''
        if (x.value > 0) {
            if (x.id === 'hour') {
                sethour(x.value)
            } else if (x.id === 'min') {
                if (x.value > 59) {
                    alert("Max input value is 59 Minutes.")
                } else {
                    setmin(x.value)
                }
            } else if (x.id === 'sec') {
                if (x.value > 59) {
                    alert("Max input value is 59 Seconds.")
                } else {
                    setsec(x.value)
                }
            }
            setValues(true)
        }
        x.value = ''
        return errors.min
    };
    let interval;
    useEffect(() => {
        if (isActive) {
            interval = setInterval(() => {
                if (sec > 0) {
                    setsec(sec -= 1)
                } else if (min > 0) {
                    setmin(min -= 1);
                    setsec(59);
                } else if (hour > 0) {
                    sethour(hour -= 1);
                    setmin(59);
                    setsec(59);
                } else {
                    setIsActive(false)
                    setValues(false)
                    clearInterval(interval);
                    return
                }
                count++
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [hour, min, sec, isActive])

    function Interval() {
        if (values) {
            setIsActive(true)
        } else {
            alert("Enter a value")
        }
    }
    function reset() {
        setIsActive(false)
        setValues(false)
        sethour(0)
        setmin(0)
        setsec(0)
    }

    return (
        <>
            <main className='d-flex justify-content-center align-items-center vh-100 bg-dark'>
                <h1 className='position-absolute font'>Countdown Timer Clock</h1>
                <div className="card shadow-lg col-3 p-5">
                    <div className='straight mt-5'>
                        <div className='clock font'>{hour < 10 ? "0" + hour : hour}:{min < 10 ? "0" + min : min}:{sec < 10 ? "0" + sec : sec}</div>
                        <div className='d-flex justify-content-center col-12 py-5 mt-3'>
                            <input type="number" id="hour" className='col-4 py-2 px-3 mx-1' onFocus={(e) => e.target.placeholder = "Hour"} onBlur={(e) => Clock(e)} disabled={isActive} />
                            <input type="number" id="min" className='col-4 py-2 px-3 mx-1' onFocus={(e) => e.target.placeholder = "Minute"} onBlur={(e) => Clock(e)} disabled={isActive} />
                            <input type="number" id="sec" className='col-4 py-2 px-3 mx-1' onFocus={(e) => e.target.placeholder = "Second"} onBlur={(e) => Clock(e)} disabled={isActive} />
                        </div>
                        <div className='d-flex justify-content-between mb-5 mt-4'>
                            <button className='btn position-relative' onClick={Interval}>
                                <i class="fa-regular fa-circle-play clr"></i>
                                <div className="start position-absolute">
                                    Start
                                </div>
                            </button>
                            <button className="btn position-relative" onClick={() => setIsActive(false)}>
                                <i class="fa-regular fa-circle-stop clr"></i>
                                <div className="start position-absolute">
                                    Stop
                                </div>
                            </button>
                            <button className="btn position-relative" onClick={reset}>
                                <i class="fa-solid fa-rotate-right clr"></i>
                                <div className="start position-absolute">
                                    Reset
                                </div>
                            </button>
                        </div>
                    </div>

                </div>
            </main>
        </>
    )
}

export default Counter
