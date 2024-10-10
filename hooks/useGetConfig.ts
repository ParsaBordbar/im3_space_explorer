import { useEffect, useState } from "react";
import { spaceApi } from "../api/base";
import { dataType } from "@/app/types";


const useGetConfigData = (slug: string) => {
    const [ configData, setConfigData ] = useState<dataType>();
    
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