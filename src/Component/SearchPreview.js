import PersonSearchCard from "./PersonSearchCard"

export default function SearchPreview ({children, EverythingResult}){



    return (<> 

    {EverythingResult.map((e, index)=> <>{children}</> 
    )}
    </>);
}