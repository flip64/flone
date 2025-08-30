import PropTypes from "prop-types";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Swiper, { SwiperSlide } from "../../components/swiper";
import CategoryThreeSingle from "../../components/category/CategoryThreeSingle.js";

// swiper slider settings
const BASEURL = 'https://backend.bazbia.ir/api/'
const settings = {
  loop: false,
  spaceBetween: 30,
  autoplay: true,
  breakpoints: {
    320: { slidesPerView: 1 },
    576: { slidesPerView: 3 },
    992: { slidesPerView: 4 }
  }
};

const CategoryThreeSlider = ({ spaceTopClass, spaceBottomClass }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`products/categories/`) // اینجا آدرس API خودت رو بذار
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("خطا در گرفتن دسته‌بندی‌ها:", err));
  }, []);

  return (
    <div className={clsx("collections-area", spaceTopClass, spaceBottomClass)}>
      <div className="container">
        <div className="collection-wrap">
          <div className="collection-active">
            {categories.length > 0 && (
              <Swiper options={settings}>
                {categories.map((single, key) => (
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
