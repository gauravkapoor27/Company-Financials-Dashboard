import React from "react";

const DescriptionContainer = ({
  data,
  shortDescription,
  descriptionExpanded,
  setDescriptionExpanded,
}) => {
  return (
    <>
      <section className="description-container">
        {data ? (
          <>
            <h3 className="ticker-sector">
              {data.sector} | {data.industry}
            </h3>
            <h3>
              <a
                className="ticker-website"
                href={data.website}>
                {data.website}
              </a>
            </h3>
            <p className="description-text">
              {descriptionExpanded
                ? data.longBusinessSummary
                : shortDescription.current}
            </p>
          </>
        ) : (
          "Loading Description..."
        )}
        {data && (
          <button
            className="description-button"
            onClick={() => {
              setDescriptionExpanded(!descriptionExpanded);
            }}>
            {descriptionExpanded
              ? "Hide Full Description"
              : "Read Full Description"}
          </button>
        )}
      </section>
    </>
  );
};

export default DescriptionContainer;
