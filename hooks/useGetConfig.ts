import { useEffect, useState } from "react";
import { spaceApi } from "../api/base";


const useGetConfigData = (slug: string) => {
    const [ configData, setConfigData ] = useState<any>();
    
    useEffect(() => {
        fetchConfigData(slug);
    }, [])
    
    const fetchConfigData = async (slug: string) => {
        try {
            const response = await spaceApi.get(slug);
            setConfigData(response.data);
            console.log("This is Response from Hook, ", response);
         } catch (error) {
             console.log(error);
         }
    }
    return configData;
}

export default useGetConfigData;