export default function TitleSearchCard ({title}){

    return (
        <div>
            <p>
                Title: {title.titleId}
            </p>
            <p>
                Primary title: {title.primaryTitle}
            </p>
             <p>
                Url: {title.url}
            </p>
        </div>
   
    );
}