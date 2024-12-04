import { cloneElement } from "react";

export default function SearchPreview({EverythingResult }) {
  return (
    <>
      {EverythingResult.map((e, index) => (
        <div key={index}> {e.personId} 
        {e.titleId}  
        </div>
      ))}
    </>
  );
}