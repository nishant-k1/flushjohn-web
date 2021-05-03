import {productData} from '../components/TextData'
import productStyles from '../styles/Products.module.css'
import {NextSeo} from 'next-seo'

const SEO = {
  title: 'Rent A Porta - Products | Portable Toilet Rental Near Me | Rent Hand Washing Stations'
}

const products = () => {
  return (
    <>
      <NextSeo {...SEO}/>
      <div className={`${productStyles.section} ${productStyles.section4Section}`}>
      <div className={productStyles.container}>
        <div className={productStyles.section4}>
            <div>
              <img src="/assets/sps_yellow.svg" alt="product_pic" />
              <h5>{productData.h1}</h5>
              <p>{productData.p1}</p>
            </div>
            <div>
              <img src="/assets/sps_blue.svg" alt="product_pic" />
              <h5>{productData.h2}</h5>
              <p>{productData.p2}</p>
            </div>
            <div>
              <img src="/assets/ada_blue.svg" alt="product_pic" />
              <h5>{productData.h3}</h5>
              <p>{productData.p3}</p>
            </div>
            <div>
              <img src="/assets/flushable.svg" alt="product_pic" />
              <h5>{productData.h4}</h5>
              <p>{productData.p4}</p>
            </div>
            <div>
              <img src="/assets/sink.svg" alt="product_pic" />
              <h5>{productData.h5}</h5>
              <p>{productData.p5}</p>
            </div>
            <div>
              <img src="/assets/VIP-Flush-1.svg" alt="product_pic" />
              <h5>{productData.h6}</h5>
              <p>{productData.p6}</p>
            </div>
        </div>
        </div>
      </div>
    </>
  )
}

export default products
