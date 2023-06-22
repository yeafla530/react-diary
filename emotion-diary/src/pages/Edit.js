import {useNavigate, useParams } from "react-router-dom"

const Edit = () => {

    const navigate = useNavigate()
    const {id} = useParams();
    

    return (
        <div>
           <h2>Edit</h2>
        </div>
    )
}

export default Edit