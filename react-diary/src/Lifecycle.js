import React, {useEffect, useState} from 'react'

const UnmountTest = () => {
    useEffect(()=>{
        console.log("mount!")
    }, [])

    useEffect(()=>{
        // unmount시점에 실행됨
        return () => {
            console.log("unmount!")
            
        }
    },[])

    return <div>
        Unmount testing Component
    </div>
}

const Lifecycle = () => {
    const [visible, setVisible] = useState(false)
    const toggle = () => setVisible(!visible)
    
    return (
        <div style={{padding: 20}}>
            <button onClick={toggle}>On/Off</button>
            {visible && <UnmountTest />}
        </div>
    )
}

export default Lifecycle