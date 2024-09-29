import { useEffect, useState } from "react";
import { spaceApi } from "../api/base";


const useGetConfigData = () => {
    const [ configData, setConfigData ] = useState<any>();
    
    useEffect(() => {
        fetchConfigData();
    }, [])
    
    const fetchConfigData = async () => {
        try {
            const response = await spaceApi.get(`/rooms/getUiConfig`);
            setConfigData(response.data);
            console.log("This is Response from Hook, ", response);
         } catch (error) {
             console.log(error);
         }
    }
    return configData;
}

export default useGetConfigData;