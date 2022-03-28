import React, { useState, useEffect } from 'react'
import axios from 'axios';

const Form = () => {
    const url = "/info/getinfo";
    const textInputData = React.useRef();
    const [inputData, setInputData] = useState("");
    const [wrongInput, setWrongInput] = useState(false);
    const [info, setInfo] = useState();

    useEffect(() => {
        // console.log(info);
    }, [info, inputData, wrongInput])
    const submitHandler = async (e) => {
        e.preventDefault();
        // console.log(inputData);
        // setIsData(true);

        axios.post(url, {
            plateNumber: inputData
        })
            .then((response) => {
                textInputData.current.value = "";
                console.log(response.data[0]);
                if (response.data[0] == undefined) {
                    setWrongInput(true);
                }
                setInfo(response.data[0]);
                // console.log(info.plateNumber);
            }, (err) => {
                textInputData.current.value = "";
                console.log(err)
                setWrongInput(true);
            });

    }
    return (
        <>
            <div className="form">
                <input type='text' ref={textInputData} placeholder='Enter Number Plate' onChange={event => setInputData(event.target.value)}></input>
                {/* <br></br> */}
                <button type="submit" onClick={submitHandler}>Submit</button>
            </div>
            {info && <div><center style={{ marginTop: "20px", color: "green", fontWeight: "bold" }}>Found</center></div>}
            {info ?
                <div className="info">
                    <table>
                        <tr>
                            <td>Plate Number</td>
                            <td><center>{info.plateNumber}</center></td>
                        </tr>
                        {info.droneNumber && <tr>
                            <td>droneNumber</td>
                            <td><center>{info.droneNumber}</center></td>
                        </tr>}
                        {info.latitude && <tr>
                            <td>Latitude</td>
                            <td><center>{info.latitude}</center></td>
                        </tr>}

                        {info.longitude && <tr>
                            <td>Longitude</td>
                            <td><center>{info.longitude}</center></td>
                        </tr>}

                        {info.location && <tr>
                            <td>Location</td>
                            <td><center>{info.location}</center></td>
                        </tr>}
                    </table>

                </div>
                : wrongInput ? <><center style={{ marginTop: "20px", color: "red", fontWeight: "bold" }}>Nothing found, Try again!!!</center></> : <></>}
        </>
    )
}
export default Form;