import React, {useState, useEffect} from "react";
// import "./SponsorGallery.css";

const BrandSponsors = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const importImages = async () => {
      const images = await importAll(
        require.context(
          "../../../assets/brandLogos",
          false,
          /\.(png|jpe?g|svg)$/
        )
      );
      setImages(images);
    };

    importImages();
  }, []);

  const getNumColumns = () => {
    if (width > 768) {
      return 3;
    } else if (width > 480) {
      return 2;
    } else {
      return 1;
    }
  };

  const numColumns = getNumColumns();

  const renderColumns = () => {
    const columns = [];
    for (let i = 0; i < numColumns; i++) {
      columns.push([]);
    }

    let colIndex = 0;
    for (let i = 0; i < images.length; i++) {
      columns[colIndex].push(images[i]);
      colIndex = (colIndex + 1) % numColumns;
    }

    return columns.map((column, index) => (
      <div className="sponsor-gallery-column" key={index}>
        {column.map((image, index) => (
          <img
            className="sponsor-image"
            src={image.default}
            alt={`Sponsor ${index}`}
            key={index}
          />
        ))}
      </div>
    ));
  };

  return <div className="sponsor-gallery">{renderColumns()}</div>;
};

const importAll = (r) => {
  return r.keys().map(r);
};

export default BrandSponsors;
