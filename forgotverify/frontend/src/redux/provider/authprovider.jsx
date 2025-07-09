import axios from "axios";
import { useEffect } from "react";
import{useDispatch} from "react-redux"
import { clearauth,initiallogin } from "../slice/authslice";

const Authprovider=({children})=>{
    const dispatch=useDispatch()
    useEffect(() =>{
        async function getverify(){
            try{
                const token=localStorage.getItem('token')
                if(token){
                    const config={
                        headers:{
                            'authorization':token
                        }

                    }
                    const res = await axios.post('http://localhost:5000/api/authverify',{},config)
                    if(res.data.status){
                        dispatch(initiallogin(res.data.data.data))
                    }
                    else{
                        dispatch(clearauth())
                    }
                }
            }
            catch(error){
                console.log(error)
            }
        }
        getverify()
    },[])

    return(
        <>
        {children}
        </>
    )
}
export default Authprovider

