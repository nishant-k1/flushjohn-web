import { Slide } from 'react-slideshow-image';
import stylesImageSlideShow from '../styles/ImageSlideShow.module.css'

import 'react-slideshow-image/dist/styles.css'

const slideImages = [
  '/assets/sink.svg',
  '/assets/sps_yellow.svg',
  '/assets/sps_blue.svg'
];

const ImageSlideShow = () => {
  return (
    <div className={stylesImageSlideShow.slideContainer}>
      <Slide>
        <div className={stylesImageSlideShow.eachSlide}>
          <div style={{'backgroundImage': `url(${slideImages[0]})`}}>
          </div>
        </div>
        <div className={stylesImageSlideShow.eachSlide}>
          <div style={{'backgroundImage': `url(${slideImages[1]})`}}>
          </div>
        </div>
        <div className={stylesImageSlideShow.eachSlide}>
          <div style={{'backgroundImage': `url(${slideImages[2]})`}}>
          </div>
        </div>
      </Slide>
    </div>
  )
}

export default ImageSlideShow
