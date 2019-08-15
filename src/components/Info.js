import React from 'react';

const Info = (props) => {

    let classNameCircle
    if(props.temp > 0) {
        classNameCircle = 'circle heat'
    } else if (props.temp < 0) {
        classNameCircle = 'circle cold'
    } else {
        classNameCircle = 'circle'
    }

        return (
            <div>
                <div id="circle" className={classNameCircle}></div>
                <h2>Погода</h2>
                <p>Узнайте погоду сейчас!</p>
            </div>
        );
    }    


export default Info;