'use client'
import { useState } from "react"

const USP = () => {
    const [show, setShow] = useState<boolean>(true)
    const sellingPoints: string[]=[
        "Organise your day",
        "Dont forget things",
        "Prioritize"
    ]

    return(
        <div className="bg-green-200 p-4 text-center">
            <button onClick={() => setShow(!show)} className="bg-white border-2 p-4 rounded border-emerald-700 text-green-700">Hide USPs</button>
            
            {show &&
            <ul>
                {sellingPoints.map((item, index) => <li className="text-xl my-2" key={index}>{item}</li>)}
            </ul>
            }
        </div>
    )
}

export default USP