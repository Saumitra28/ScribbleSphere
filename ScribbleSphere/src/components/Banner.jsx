import React from 'react';
import '../pages/Banner.css';

function Banner({ images, speed = 5000 }) {
  return (
    <div className="banner-inner">
      <div className="banner-wrapper">
        {/* Repeat the sections for smooth looping */}
        <section className='gap-8 w-16 h-8' style={{ '--speed': `${speed}ms` }}>
          {images.map(({ id, image }) => (
            <div className="banner-image" key={id}>
              <img src={image} alt={id} className="banner-img" />
            </div>
          ))}
        </section>
        <section style={{ '--speed': `${speed}ms` }}>
          {images.map(({ id, image }) => (
            <div className="banner-image" key={id}>
              <img src={image} alt={id} className="banner-img" />
            </div>
          ))}
        </section>
        <section style={{ '--speed': `${speed}ms` }}>
          {images.map(({ id, image }) => (
            <div className="banner-image" key={id}>
              <img src={image} alt={id} className="banner-img" />
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

export default Banner;
