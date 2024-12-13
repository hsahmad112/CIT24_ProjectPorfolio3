export default function TitleInfo({ title }) {
    return (
      <div className="row" style={{ marginTop: "10px", marginBottom: "10px" }}>
        <div className="col">
          <span style={{ textAlign: "left" }}>
            <h1>
              {title.primaryTitle}
              <p style={{ fontSize: "28px", display: "inline" }}>{title.startYear}</p>
            </h1>
            {title.originalTitle !== title.primaryTitle && (
              <h5 className="less-opacity">{title.originalTitle}</h5>
            )}
            <p style={{ fontSize: "15px" }}>{title.titleType}</p>
            {title.isAdult && <p style={{ fontSize: "15px" }}>is adult</p>}
          </span>
        </div>
      </div>
    );
  }
  