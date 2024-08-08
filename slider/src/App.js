import "./App.css";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import SliderData from "./SliderData";

function useWindowSize() {
  const [size, setSize] = useState([window.innerHeight, window.innerWidth]);

  useEffect(() => {
    const handleResize = () => setSize([window.innerHeight, window.innerWidth]);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return size;
}

const array = SliderData.map((x) => {
  return x.image;
});

console.log(array);

function App() {
  const NextArrow = ({ onClick }) => {
    return (
      <div className="arrow next" onClick={onClick}>
        R
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <div className="arrow prev" onClick={onClick}>
        L
      </div>
    );
  };

  const [imageIndex, setImageIndex] = useState(1);

  const [height, width] = useWindowSize();

  const settings = {
    className: "center",
    infinite: true,
    lazyLoad: true,
    slidesToShow: width > 1000 ? 7 : 1,
    centerMode: true,
    centerPadding: "10px",
    autoplay: true,
    autoplaySpeed: 2000,
    beforeChange: (current, next) => {
      console.log(current);
      current == array.length - 2 ? setImageIndex(0) : setImageIndex(next + 1);
    },
  };

  return (
    <div className="App">
      <Slider {...settings}>
        {array.map((img, idx) => {
          return (
            <div className={idx === imageIndex ? "slide activeSlide" : "slide"}>
              <div className="aboveImage">
                <span className="upspan"></span>
                <span className="downspan"></span>
                <img src={img} alt={img} />
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default App;
