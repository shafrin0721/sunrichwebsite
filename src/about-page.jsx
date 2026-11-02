import NextLink from "next/link";
import {Image as ImageIcon, Eye, Sprout, Target} from "lucide-react";
import {Footer, Header} from "./site";

const A="/assets/";

export default function AboutPage(){
  return <>
    <Header/>
    <main className="about-site">
      <section className="about-banner">
        <h1>Connecting Sri Lankan<br/>With The World <span>Nature</span></h1>
        <p>Pioneering the export of premium organic produce from the heart of Sri Lanka to global kitchens.</p>
        <NextLink className="btn" href="/contact">Our Story</NextLink>
      </section>
      <section className="about-legacy">
        <img src={A+encodeURIComponent("download (3).jpeg")} alt="Sri Lankan coconut farmers harvesting coconuts"/>
        <div className="legacy-copy">
          <small>OUR LEGACY</small>
          <h2>A Legacy Built on Quality and Trust</h2>
          <p>Sun Rich Paradise, produced by Abey Marine (Pvt) Ltd, is a leading Sri Lankan manufacturer and exporter of premium organic coconut products.</p>
          <p>Located in the heart of Sri Lanka’s coconut-growing region, our facility is strategically positioned to access high-quality coconut plantations while maintaining efficient export operations through major international logistics networks.</p>
          <p>From our signature Organic Virgin Coconut Oil to coconut-based food products, every item is carefully processed to preserve natural flavour, nutrition, and purity. With strong relationships with local farmers, modern manufacturing technology, and internationally recognized certifications, we continue to share the authentic taste of Sri Lanka with customers around the world.</p>
        </div>
      </section>
      <section className="mission-section">
        <article className="vision-card"><span className="mission-icon"><ImageIcon size={20}/></span><Eye className="mission-watermark" size={58}/><h2>Our Vision</h2><p>To become the most trusted global ambassador for Sri Lanka’s organic products by delivering premium quality, sustainable, and naturally sourced food products while promoting environmental responsibility.</p></article>
        <article className="mission-card"><span className="mission-icon"><Sprout size={20}/></span><Target className="mission-watermark" size={58}/><h2>Our Mission</h2><p>To produce and market high-quality natural coconut products that meet international standards while supporting farmers, employees, and communities.</p></article>
      </section>
      <section className="principles-section">
        <small>CORE PRINCIPLES</small>
        <h2>The Pillars of Sun Rich</h2>
        <div>{["Quality","Sustainability","Authenticity","Innovation"].map((item,index)=><article key={item}><b aria-hidden="true">{["✿","◉","♧","⚗"][index]}</b><h3>{item}</h3><p>Maintaining strict quality standards through sourcing, processing, and packaging to deliver exceptional products.</p></article>)}</div>
      </section>
      <section className="process-section">
        <h2>Our Traceable Process</h2>
        <p>From Sri Lankan Farms To Global Markets</p>
        <div>{["Raw Materials","Processing","Quality Testing","Export"].map((item,index)=><article key={item}><b>0{index+1}</b><h3>{item}</h3><p>We source premium coconuts and carefully process every product to preserve natural goodness and export quality.</p></article>)}</div>
      </section>
      <section className="sustainability-section">
        <div>
          <small>PIONEERING SUSTAINABILITY</small>
          <h2>Building A Greener Future Through Responsible Agriculture</h2>
          <p>At Sun Rich Paradise, sustainability is at the heart of everything we do. We support organic farming practices that reduce environmental impact while improving soil health and protecting Sri Lanka’s natural ecosystem.</p>
          <p><b>Zero-Waste Facility</b><br/>We reuse coconut by-products and organic waste to create environmentally friendly solutions such as natural compost.</p>
          <p><b>Community Empowerment</b><br/>We work closely with farming communities by encouraging sustainable agricultural practices and creating long-term partnerships.</p>
        </div>
        <div className="sustainability-gallery">
          <img src={A+encodeURIComponent("download (2).jpeg")} alt="Coconuts growing among palm leaves"/>
          <img src={A+encodeURIComponent("Fresh Coconuts & Island Vibes_ A Sunny Tropical Beach Picnic.jpeg")} alt="Fresh coconuts at a tropical beach picnic"/>
          <img src={A+encodeURIComponent("download (4).jpeg")} alt="Sri Lankan farmers harvesting coconuts among palm trees"/>
          <img src={A+encodeURIComponent("download (3).jpeg")} alt="Fresh coconuts and king coconut served at a tropical beach"/>
        </div>
      </section>
    </main>
    <Footer/>
  </>;
}
