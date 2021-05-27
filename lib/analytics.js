import ReactGA from 'react-ga';

const initGA = (trackingID) => {           
  ReactGA.initialize(process.env.NEXT_PUBLIC_GA_ID)
}

export const PageView = () => {  
  ReactGA.pageview(window.location.pathname + window.location.search)
}

export const Event = (category, action, label) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label
  })
}

export default initGA