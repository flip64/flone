import PropTypes from "prop-types";
import clsx from "clsx"
import { useEffect, useState } from "react";
import Swiper, { SwiperSlide } from "../../components/swiper";
import CategoryThreeSingle from "../../components/category/CategoryThreeSingle.js";

// swiper slider settings
const settings = {
  loop: false,
  spaceBetween: 30,
  autoplay: true,
  breakpoints: {
    320: {
      slidesPerView: 1
    },
    576: {
      slidesPerView: 3
    },
    992: {
      slidesPerView: 4
    }
  }
};
const BASEURL= "https://backend.bazbia.ir/api/"
const CategoryThreeSlider = ({ spaceTopClass, spaceBottomClass }) => {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    fetch(`${BASEURL}products/categories`)  // آدرس API
      .then((res) => res.json())
      .then((data) => setCategoryData(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  return (
    <div className={clsx("collections-area", spaceTopClass, spaceBottomClass)}>
      <div className="container">
        <div className="collection-wrap">
          <div className="collection-active">
            {categoryData.length > 0 && (
              <Swiper options={settings}>
                {categoryData.map((single, key) => (
                  <SwiperSlide key={key}>
                    <CategoryThreeSingle data={single} />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

CategoryThreeSlider.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default CategoryThreeSlider;
