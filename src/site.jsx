import React, {createContext, useContext, useEffect, useMemo, useState} from "react";
import NextLink from "next/link";
import {useRouter} from "next/router";
import {
  Search, Heart, ShoppingBag, UserRound, ChevronDown, MapPin, Phone, Menu, X,
  Truck, Headphones, ShieldCheck, Package, ArrowRight, ArrowLeft, Star, CheckCircle2,
  Mail, Instagram, Facebook, Linkedin, Eye, Plus, Minus, Trash2, ChevronRight, Copy
} from "lucide-react";

const A="/assets/";

function Link({to, ...props}) {
  return <NextLink href={to} {...props}/>;
}

function NavLink({to, children}) {
  const router=useRouter();
  const active=router.asPath.split("?")[0]===to;
  return <NextLink href={to} className={active?"active":""}>{children}</NextLink>;
}

export const PRODUCTS = [
  {id:1,name:"Virgin Coconut Oil",image:"catalog-organic-virgin-coconut-oil.jpeg",category:"Coconut Oils",categories:["Organic Coconut Oils","Premium Collection"],description:"Cold-pressed and unrefined virgin coconut oil. The catalog lists PET and HDPE bottles, glass jars, and bulk packaging, with a shelf life of up to two years.",specifications:["Processing: cold-pressed and unrefined","Packaging: PET/HDPE bottles, glass jars, and bulk","Shelf life: up to 2 years"]},
  {id:2,name:"Coconut Flour",image:"catalog-organic-coconut-flour.jpeg",category:"Coconut Foods",categories:["Coconut Foods"],description:"Coconut flour made from coconut oil cake. The catalog lists retail packs and larger food-service and bulk sizes.",specifications:["Pack sizes: 200g, 375g, 454g, 10kg, and 25kg, plus bulk","Shelf life: 12 months"]},
  {id:3,name:"Coconut Chips",image:"catalog-organic-coconut-chips.jpeg",category:"Coconut Snacks",categories:["Coconut Foods","Healthy Snacks"],description:"Coconut chips available in natural and toasted varieties, as well as chocolate, caramel, and sugar flavours.",specifications:["Varieties: natural and toasted","Flavours: chocolate, caramel, and sugar"]},
  {id:4,name:"Desiccated Coconut",image:"catalog-organic-desiccated-coconut.jpeg",category:"Coconut Foods",categories:["Coconut Foods"],description:"Desiccated coconut from the Sun Rich coconut product range. Contact us for current specifications and available pack sizes."},
  {id:5,name:"Coconut Milk Powder",image:"catalog-organic-coconut-milk-powder.jpeg",category:"Coconut Foods",categories:["Coconut Foods"],description:"Coconut milk powder from the Sun Rich coconut product range. Contact us for current specifications and available pack sizes."},
  {id:6,name:"Coconut Milk",image:"catalog-organic-coconut-milk.jpeg",category:"Coconut Foods",categories:["Coconut Foods","Beverages"],description:"A dairy-free coconut milk used in curries, soups, beverages, sweets, and desserts. The catalog specifies 400ml cans and a 24-month shelf life.",specifications:["Pack size: 400ml can","Shelf life: 24 months"]},
  {id:7,name:"Coconut Cream",image:"catalog-organic-coconut-cream.jpeg",category:"Coconut Foods",categories:["Coconut Foods"],description:"Coconut cream from the Sun Rich coconut product range. Contact us for current specifications and available pack sizes."},
  {id:8,name:"Coconut Sugar",image:"catalog-organic-coconut-sugar.jpeg",category:"Natural Sweeteners",categories:["Natural Sweeteners"],description:"Coconut sugar from the Sun Rich coconut product range. Contact us for current specifications and available pack sizes."},
  {id:9,name:"King Coconut Water",image:"catalog-organic-king-coconut-water.jpeg",category:"Coconut Beverages",categories:["Beverages","Premium Collection"],description:"Water from Sri Lankan King Coconut, a golden-orange variety found only in Sri Lanka. Contact us for current specifications and available pack sizes."},
  {id:10,name:"Creamed Coconut",image:"catalog-organic-creamed-coconut.jpeg",category:"Coconut Foods",categories:["Coconut Foods"],description:"Unsweetened dried coconut meat ground into a semi-solid paste. The catalog lists bulk pails in 10kg and 18kg sizes.",specifications:["Packaging: bulk pails, 10kg and 18kg"]},
  {id:11,name:"Condense Milk",image:"catalog-organic-coconut-condensed-milk.jpeg",category:"Coconut Foods",categories:["Coconut Foods"],description:"Condense Milk from the Sun Rich coconut product range. Contact us for current specifications and available pack sizes."},
  {id:12,name:"King Coconut Oil",image:"catalog-organic-virgin-king-coconut-oil.jpeg",category:"Coconut Oils",categories:["Organic Coconut Oils","Premium Collection"],description:"King coconut oil from the Sun Rich product range, made from the golden-orange King Coconut found only in Sri Lanka. Contact us for current specifications and available pack sizes."},
];

export function getProductSlug(product){
  return product.name.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
}

export function findProductBySlug(slug){
  return PRODUCTS.find(product=>getProductSlug(product)===slug)
    ||PRODUCTS.find(product=>String(product.id)===slug);
}

const PRODUCT_CATEGORIES=["All Products","Organic Coconut Oils","Coconut Foods","Healthy Snacks","Natural Sweeteners","Beverages","Premium Collection"];

const AppContext=createContext(null);
function useApp(){return useContext(AppContext)}

function AppProvider({children}){
  const [cart,setCart]=useState([{...PRODUCTS[0],qty:5},{...PRODUCTS[6],qty:1}]);
  const [wishlist,setWishlist]=useState([11,3,6]);
  const [cartOpen,setCartOpen]=useState(false);
  const [newsletterOpen,setNewsletterOpen]=useState(false);
  const addToCart=(product,qty=1)=>setCart(c=>{
    const found=c.find(x=>x.id===product.id);
    return found?c.map(x=>x.id===product.id?{...x,qty:x.qty+qty}:x):[...c,{...product,qty}];
  });
  const removeFromCart=id=>setCart(c=>c.filter(x=>x.id!==id));
  const setQty=(id,qty)=>setCart(c=>qty<1?c.filter(x=>x.id!==id):c.map(x=>x.id===id?{...x,qty}:x));
  const toggleWishlist=id=>setWishlist(w=>w.includes(id)?w.filter(x=>x!==id):[...w,id]);
  const value=useMemo(()=>({cart,wishlist,addToCart,removeFromCart,setQty,toggleWishlist,cartOpen,openCart:()=>setCartOpen(true),closeCart:()=>setCartOpen(false),newsletterOpen,openNewsletter:()=>setNewsletterOpen(true),closeNewsletter:()=>setNewsletterOpen(false)}),[cart,wishlist,cartOpen,newsletterOpen]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function SiteShell({children}) {
  return <AppProvider><>{children}<SiteOverlays/></></AppProvider>
}

function SiteOverlays() {
  const {newsletterOpen,closeNewsletter}=useApp();
  return <>{newsletterOpen&&<Newsletter close={closeNewsletter}/>}<CartOverlay/><FloatingCart/></>
}

export function Header(){
  const {cart,wishlist,openCart}=useApp();
  const [mobile,setMobile]=useState(false);
  return <header>
    <div className="topbar"><span><MapPin size={13}/> Manufacturer &amp; exporter · Negombo, Sri Lanka</span><span className="locale">Eng <ChevronDown size={11}/>　 LKR <ChevronDown size={11}/></span></div>
    <div className="navwrap">
      <button className="mobile-menu" onClick={()=>setMobile(!mobile)}><Menu/></button>
      <nav className={mobile?"mobile-open":""}>
        <NavLink to="/">Home <ChevronDown size={13}/></NavLink>
        <div className="nav-dropdown"><NavLink to="/products">Products <ChevronDown size={13}/></NavLink><div className="products-menu">{PRODUCT_CATEGORIES.map(x=><Link key={x} role="menuitem" to={x==="All Products"?"/products":`/products?category=${encodeURIComponent(x)}`} onClick={()=>setMobile(false)}>{x}</Link>)}</div></div>
        <NavLink to="/certificates">Certificates</NavLink>
        <NavLink to="/about">About Us</NavLink>
        <NavLink to="/contact">Contact us</NavLink>
      </nav>
      <Link className="logo" to="/" aria-label="Sun Rich home"><img src="/Sun-Rich-Paradise%20logo.png" alt=""/> <span>Sunrich</span></Link>
      <div className="nav-actions">
        <a className="phone" href="tel:+94117090222"><Phone size={22}/> +94 11 709 0222</a>
        <Link to="/products" aria-label="Search products"><Search/></Link>
        <Link to="/wishlist" className="icon-badge"><Heart/><em>{wishlist.length}</em></Link>
        <button onClick={openCart} className="icon-badge"><ShoppingBag/><em>{cart.length}</em></button>
        <Link to="/login"><UserRound/></Link>
      </div>
    </div>
  </header>
}

function Footer(){
  return <footer>
    <div className="footer-top">
      <div><Link className="footer-logo" to="/" aria-label="Sun Rich home"><img src="/Sun-Rich-Paradise%20logo.png" alt=""/> <b>SUN RICH</b></Link><p>Manufacturer, exporter and supplier of premium Sri Lankan coconut products.<br/>Committed to natural, organic and eco-friendly processing for global markets.</p>
        <div className="socials"><span><Linkedin/></span><span><Instagram/></span><span><Facebook/></span></div>
      </div>
      <div><h4>Product Line</h4><Link to="/products">Virgin Coconut Oil</Link><Link to="/products">Coconut Flour</Link><Link to="/products">Coconut Chips</Link><Link to="/products">Desiccated Coconut</Link><Link to="/products">Coconut Milk &amp; Cream</Link></div>
      <div><h4>Company</h4><Link to="/about">Our Story</Link><Link to="/products">Products</Link><Link to="/certificates">Certifications</Link><Link to="/contact">Contact</Link></div>
      <div><h4>Headquarters</h4><p>Negombo, Sri Lanka</p><p><a href="tel:+94117090222">+94 11 709 0222</a></p><p><a href="tel:+94707779787">+94 70 777 9787</a></p><p><a href="mailto:info@sunrich.org">info@sunrich.org</a></p></div>
    </div>
    <div className="footer-bottom"><span>© 2026 Abey Marine (Pvt) Ltd. All rights reserved.</span><span>Privacy Policy　　Terms of Trade　　Cookie Policy</span></div>
  </footer>
}

function Layout({children}){return <><Header/>{children}<Footer/></>}

function ProductCard({p}){
  const {wishlist,toggleWishlist,addToCart}=useApp();
  const wished=wishlist.includes(p.id);
  return <div className={"product-card "+(p.id===13?"selected":"")}>
    {p.tag&&<span className="sale">{p.tag}</span>}
    <Link to={`/products/${getProductSlug(p)}`} className="product-image"><img src={A+p.image} alt={p.name}/></Link>
    <div className="product-quick-actions"><button aria-label={`Save ${p.name} to wishlist`} onClick={()=>toggleWishlist(p.id)}><Heart fill={wished?"currentColor":"none"}/></button><button aria-label={`Quick view ${p.name}`} onClick={()=>window.dispatchEvent(new CustomEvent("sunrich:quickview",{detail:p}))}><Eye/></button></div>
    <div className="product-meta"><Link to={`/products/${getProductSlug(p)}`}><h3>{p.name}</h3></Link><div><b>Price on request</b><button className="mini-cart" title="Add to inquiry" onClick={()=>addToCart(p)}><ShoppingBag size={15}/></button></div><span className="stars">★★★★<span>★</span></span></div>
  </div>
}

export function Home(){
  const {openNewsletter}=useApp();
  return <Layout>
    <section className="hero">
      <img src={A+"hero-basket.jpg"} />
      <div><small>WELCOME TO SUN RICH PARADISE</small><h1>Pure. Natural.<br/>Sri Lankan Coconut Goodness.</h1><p>Manufacturer · Exporter · Supplier</p><p className="muted">Abey Marine (Pvt) Ltd is an eminent and leading manufacturer, exporter and supplier of Sun Rich Paradise Virgin Coconut Oil and other coconut products from Sri Lanka – the Paradise of the Indian Ocean.</p><Link className="btn" to="/products">Shop now <ArrowRight size={16}/></Link></div>
    </section>
    <section className="benefits">
      <Benefit icon={<Truck/>} title="Strategic Location" text="Negombo, Coconut Triangle"/>
      <Benefit icon={<Headphones/>} title="Export Ready" text="Bulk packing & private label"/>
      <Benefit icon={<ShieldCheck/>} title="Certified Quality" text="Organic and eco-friendly sourcing" active/>
      <Benefit icon={<Package/>} title="Reliable Supply" text="Port and airport access for global trade"/>
    </section>
    <section className="trust section">
      <div className="collage"><img src={A+"farmer-1.jpg"}/><img src={A+"farmer-2.jpg"}/></div>
      <div><h2>Trusted Sri Lankan<br/>Coconut Products</h2>
        <p>Natural ingredients from the heart of the coconut triangle.</p><p className="muted">Sun Rich Paradise Virgin Coconut Oil manufacturing facility is advantageously positioned in Negombo, one of the most prominent areas of the coconut triangle, with easy access to coconut plantations, the Colombo Port and the International Airport.</p>
        <p>Committed to quality and sustainability.</p><p className="muted">We produce organic, natural and export-oriented coconut products, including Virgin Coconut Oil, Coconut Flour, Coconut Chips, Coconut Milk, Coconut Cream and related value-added products while supporting responsible agriculture and eco-friendly manufacturing practices.</p>
        <Link className="btn" to="/products">Shop Now <ArrowRight size={16}/></Link>
      </div>
    </section>
    <section className="stats"><div><b>25+</b><span>Years of Excellence</span></div><div><b>500k+</b><span>Happy Customer</span></div><div><b>50+</b><span>Quality Products</span></div><div><b>750k+</b><span>Monthly Orders</span></div></section>
    <section className="section featured"><div className="section-head"><h2>Featured Products</h2><Link to="/products">View All <ArrowRight size={15}/></Link></div><div className="products-grid four">{[PRODUCTS[2],PRODUCTS[0],PRODUCTS[11],PRODUCTS[6]].map(p=><ProductCard p={p} key={p.id}/>)}</div></section>
    <section className="testimonials"><div className="testimonial-heading"><div><small>TESTIMONIAL</small><h2>What Our Customer Says</h2></div><div><button aria-label="Previous reviews">←</button><button aria-label="Next reviews">→</button></div></div><div className="testimonial-grid">{["Robert Fox","Dianne Russell","Eleanor Pena"].map(name=><article key={name}><span className="quote">”</span><p>Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget</p><b>{name}</b><small>Customer</small><span className="stars">★★★★★</span></article>)}</div></section>
    <section className="contact-strip"><div><MapPin/><b>OUR LOCATION</b><span>456 Plantation Way, Colombo 07,<br/>Sri Lanka</span></div><div><Phone/><b>CALL US 24/7</b><span><a href="tel:+94112345678">+94 (11) 234 5678</a></span></div><div className="newsletter-box"><Mail/><b>SUBSCRIBE NEWSLETTER</b><form onSubmit={e=>{e.preventDefault();openNewsletter()}}><input type="email" placeholder="Your email address" required/><button>Subscribe</button></form></div></section>
  </Layout>
}

function Benefit({icon,title,text,active}){return <div className={active?"active":""}><span>{icon}</span><b>{title}</b><small>{text}</small></div>}

export function ProductsPage(){
  const [quick,setQuick]=useState(null);
  const [currentPage,setCurrentPage]=useState(1);
  const router=useRouter();
  const category=typeof router.query.category==="string"?router.query.category:"All Products";
  const setCategory=value=>{
    setCurrentPage(1);
    router.push({pathname:"/products",query:value==="All Products"?{}:{category:value}},undefined,{shallow:true});
  };
  const [sort,setSort]=useState("featured");
  const [query,setQuery]=useState("");
  useEffect(()=>{
    const openQuickView=event=>setQuick(event.detail);
    window.addEventListener("sunrich:quickview",openQuickView);
    return ()=>window.removeEventListener("sunrich:quickview",openQuickView);
  },[]);
  const matchesCategory=p=>category==="All Products"||p.categories.includes(category);
  const visibleProducts=PRODUCTS.filter(p=>matchesCategory(p)&&p.name.toLowerCase().includes(query.trim().toLowerCase())).sort((a,b)=>sort==="name"?a.name.localeCompare(b.name):a.id-b.id);
  const pageSize=15;
  const pageCount=Math.ceil(visibleProducts.length/pageSize);
  const pageProducts=visibleProducts.slice((currentPage-1)*pageSize,currentPage*pageSize);
  const changeSearch=value=>{setQuery(value);setCurrentPage(1)};
  const changeSort=value=>{setSort(value);setCurrentPage(1)};
  const goToPage=page=>setCurrentPage(Math.min(Math.max(page,1),pageCount));
  return <Layout>
    <section className="section catalog-page"><aside className="filter-sidebar"><button className="filter-pill">Filter <Menu size={16}/></button><h3>All Categories <ChevronDown size={16}/></h3>{PRODUCT_CATEGORIES.map(x=><button className={"filter-category "+(category===x?"cat-active":"")} key={x} onClick={()=>setCategory(x)}><i/>{x}<small>({x==="All Products"?PRODUCTS.length:PRODUCTS.filter(p=>p.categories.includes(x)).length})</small></button>)}<hr/><h3>Export Supply <ChevronDown size={16}/></h3><p className="filter-caption">Wholesale and export pricing available on request.</p><hr/><h3>Popular Tag <ChevronDown size={16}/></h3><div className="tag-list">{["Organic","Natural","Sri Lankan","Vegan","Gluten Free","Non GMO","Coconut Based","Export Quality"].map((x,i)=><button className={i===1?"tag-active":""} key={x}>{x}</button>)}</div></aside><main className="catalog-results"><div className="catalog-toolbar"><div className="sort-control"><span>Sort by:</span><select aria-label="Sort products" value={sort} onChange={e=>changeSort(e.target.value)}><option value="featured">Catalog order</option><option value="name">Name: A to Z</option></select></div><form className="catalog-search" onSubmit={e=>e.preventDefault()}><Search size={16}/><input aria-label="Search products" placeholder="Search" value={query} onChange={e=>changeSearch(e.target.value)}/><button>Search</button></form><span className="results-count">{visibleProducts.length} Results Found</span></div>{visibleProducts.length?<><div className="products-grid catalog-grid">{pageProducts.map(p=><ProductCard p={p} key={p.id}/>)}</div>{pageCount>1&&<nav className="pagination" aria-label="Product pages"><button aria-label="Previous page" disabled={currentPage===1} onClick={()=>goToPage(currentPage-1)}>‹</button>{Array.from({length:pageCount},(_,index)=>index+1).map(page=><button key={page} className={currentPage===page?"page-active":""} aria-current={currentPage===page?"page":undefined} onClick={()=>goToPage(page)}>{page}</button>)}<button aria-label="Next page" disabled={currentPage===pageCount} onClick={()=>goToPage(currentPage+1)}>›</button></nav>}</>:<Empty title="No products found" text="Try another search or adjust your filters."/>}</main></section>
    {quick&&<Modal onClose={()=>setQuick(null)}><QuickView p={quick}/></Modal>}
  </Layout>
}

function PageTitle({title,crumb}){return <div className="page-title"><div><Link to="/">Home</Link><ChevronRight size={14}/><span>{crumb}</span></div><h1>{title}</h1></div>}

function QuickView({p}){const {addToCart}=useApp();const [qty,setQty]=useState(1);return <div className="quickview"><img src={A+p.image} alt={p.name}/><div><small>{p.category} · Sri Lanka</small><h2>{p.name}</h2><h3>Price on request</h3><p>{p.description}</p><p className="muted">Ask us to confirm available pack sizes and export pricing.</p><div className="qty"><button aria-label="Decrease quantity" onClick={()=>setQty(q=>Math.max(1,q-1))}><Minus size={15}/></button><span>{qty}</span><button aria-label="Increase quantity" onClick={()=>setQty(q=>q+1)}><Plus size={15}/></button></div><button className="btn" onClick={()=>addToCart(p,qty)}>Add to inquiry <ShoppingBag size={16}/></button></div></div>}

async function copyShareLink(){
  const url=window.location.href;
  if(navigator.clipboard?.writeText){
    await navigator.clipboard.writeText(url);
    return;
  }
  const input=document.createElement("textarea");
  input.value=url;
  input.setAttribute("readonly","");
  input.style.position="fixed";
  input.style.opacity="0";
  document.body.appendChild(input);
  input.select();
  try{
    if(!document.execCommand("copy")) throw new Error("Copy command was not available");
  }finally{
    input.remove();
  }
}

function ShareItem({product}){
  const [message,setMessage]=useState("");
  const shareTo=(platform)=>{
    const url=window.location.href;
    const shareUrl=platform==="facebook"
      ?"https://www.facebook.com/sunrichparadise/"
      :`https://wa.me/?text=${encodeURIComponent(`${product.name} ${url}`)}`;
    window.open(shareUrl,"_blank","noopener,noreferrer");
  };
  const copyLink=async()=>{
    try{
      await copyShareLink();
      setMessage("Link copied.");
      return true;
    }catch{
      setMessage("Could not copy the link. Please copy the page URL from your browser.");
      return false;
    }
  };
  const shareToInstagram=()=>{
    window.open("https://www.instagram.com/","_blank","noopener,noreferrer");
    copyLink().then(copied=>{
      if(copied) setMessage("Link copied. Paste it into Instagram to share.");
    });
  };
  return <span className="share-item">
    <span>Share item:</span>
    <span className="share-item-actions">
      <button type="button" aria-label="Share on Facebook" title="Facebook" onClick={()=>shareTo("facebook")}><Facebook/></button>
      <button type="button" aria-label="Share on WhatsApp" title="WhatsApp" onClick={()=>shareTo("whatsapp")}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.1 3.9A11.8 11.8 0 0 0 12 .5C5.6.5.4 5.7.4 12.1c0 2 .5 3.9 1.5 5.6L.3 23.5l6-1.6a11.7 11.7 0 0 0 5.6 1.4h.1c6.4 0 11.6-5.2 11.6-11.6 0-3.1-1.2-5.9-3.5-7.8ZM12 21.3c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.6.9 1-3.5-.3-.4a9.2 9.2 0 0 1-1.4-4.9A9.7 9.7 0 0 1 12 2.1c2.6 0 5 1 6.8 2.8a9.6 9.6 0 0 1 2.8 6.8c0 5.3-4.3 9.6-9.6 9.6Zm5.3-7.2c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.4.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.1c-.2-.5-.5-.4-.7-.4h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.4 1 2.7 1.1 2.9.1.2 2 3.1 4.9 4.3.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.1-1.3-.1-.1-.3-.2-.6-.4Z"/></svg></button>
      <button type="button" aria-label="Share on Instagram" title="Instagram (copies the link)" onClick={shareToInstagram}><Instagram/></button>
      <button type="button" aria-label="Copy product link" title="Copy link" onClick={copyLink}><Copy/></button>
    </span>
    {message&&<span className="share-item-status" role="status">{message}</span>}
  </span>
}

export function ProductDetail({slug}){
  const p=findProductBySlug(slug)||PRODUCTS[0];
  const {addToCart,toggleWishlist,wishlist}=useApp();
  const [qty,setQty]=useState(1);
  const [tab,setTab]=useState("Descriptions");
  const information=[
    `Product: ${p.name}`,
    "Origin: Sri Lanka",
    ...(p.specifications||[]),
    "Export pricing and further product specifications: available on request",
  ];
  return <Layout>
    <section className="detail-hero">
      <div className="detail-image"><img src={A+p.image} alt={p.name}/></div>
      <div className="detail-summary">
        <h1>{p.name}</h1>
        <div className="detail-rating">{p.category}　·　Sun Rich Paradise product catalog</div>
        <p className="detail-price"><b>Price on request</b></p>
        <div className="detail-share"><span>Origin: Sri Lanka</span><ShareItem product={p}/></div>

        <p className="detail-copy">{p.description}</p>
        <div className="detail-buy">
          <div className="qty"><button aria-label="Decrease quantity" onClick={()=>setQty(q=>Math.max(1,q-1))}><Minus size={14}/></button><span>{qty}</span><button aria-label="Increase quantity" onClick={()=>setQty(q=>q+1)}><Plus size={14}/></button></div>
          <button className="btn" onClick={()=>addToCart(p,qty)}>Add to inquiry <ShoppingBag size={15}/></button>
          <button className="detail-wish" aria-label="Add to wishlist" onClick={()=>toggleWishlist(p.id)}><Heart fill={wishlist.includes(p.id)?"currentColor":"none"}/></button>
        </div>
        <div className="detail-taxonomy"><p><b>Category:</b> {p.category}</p><p><b>Product:</b> {p.name}</p></div>
      </div>
    </section>
    <nav className="detail-tabs" aria-label="Product details">{["Descriptions","Additional Information","Customer Feedback"].map(x=><button className={tab===x?"tab-active":""} key={x} onClick={()=>setTab(x)}>{x}</button>)}</nav>
    <section className="detail-tab-content">
      {tab==="Descriptions"?<div className="product-description"><p>{p.description}</p><p>For current availability, export pricing, samples, or further technical information, please contact the Sun Rich team.</p><Link className="btn" to="/contact">Contact us <ArrowRight size={15}/></Link></div>
        :tab==="Additional Information"?<div className="product-information"><p>Additional Information</p><ul>{information.map(x=><li key={x}>{x}</li>)}</ul></div>
          :<div className="customer-feedback"><h3>Product information and samples</h3><p>Contact us for product references, samples, or export inquiries about {p.name}.</p><Link className="btn" to="/contact">Contact us <ArrowRight size={15}/></Link></div>}
    </section>
    <section className="section related-products"><div className="section-head"><h2>Related　Products</h2><Link to="/products">View All <ArrowRight size={15}/></Link></div><div className="products-grid four">{[PRODUCTS[2],PRODUCTS[0],PRODUCTS[11],PRODUCTS[6]].map(x=><ProductCard p={x} key={x.id}/>)}</div></section>
  </Layout>
}

export function Wishlist(){
  const {wishlist,addToCart,toggleWishlist}=useApp(); const items=PRODUCTS.filter(p=>wishlist.includes(p.id));
  return <Layout><section className="wishlist-page"><h1>My Wishlist</h1>{items.length?<div className="wishlist-table"><table><thead><tr><th>Product</th><th>Price</th><th>Availability</th><th></th></tr></thead><tbody>{items.map(p=><tr key={p.id}><td><div className="table-product"><img src={A+p.image} alt={p.name}/><span>{p.name}</span></div></td><td><b>Price on request</b></td><td><span className="stock-status">Contact for availability</span></td><td><button className="btn wishlist-add" onClick={()=>addToCart(p)}>Add to inquiry</button><button className="wishlist-remove" aria-label={`Remove ${p.name} from wishlist`} onClick={()=>toggleWishlist(p.id)}><X/></button></td></tr>)}</tbody></table><div className="wishlist-share">Share: <b>f</b>　♥　℘　◎</div></div>:<Empty title="Your wishlist is empty" text="Save products here and find them again later."/>}</section></Layout>
}

function CartDrawer({close}){const {cart,removeFromCart}=useApp();return <div className="overlay" onClick={close}><aside className="drawer" onClick={e=>e.stopPropagation()}><div className="drawer-head"><h2>Inquiry List ({cart.length})</h2><button aria-label="Close inquiry list" onClick={close}><X/></button></div><div className="drawer-products">{cart.map(x=><div className="drawer-item" key={x.id}><img src={A+x.image} alt={x.name}/><div><b>{x.name}</b><span>Quantity: {x.qty} · Price on request</span></div><button aria-label={`Remove ${x.name}`} onClick={()=>removeFromCart(x.id)}><X size={18}/></button></div>)}</div><div className="drawer-bottom"><div><span>{cart.length} Product{cart.length===1?"":"s"}</span><b>Quote on request</b></div><Link className="btn wide" to="/billing" onClick={close}>Send Inquiry</Link><Link className="drawer-cart-link" to="/billing" onClick={close}>View inquiry</Link></div></aside></div>}

export function Billing(){
  const {cart}=useApp();
  const [sent,setSent]=useState(false);
  return <Layout><section className="billing-page">
    <form id="quote-form" onSubmit={e=>{e.preventDefault();setSent(true)}}>
      <h1>Contact Information</h1>
      <div className="billing-fields">
        <label>First name<input required placeholder="Your first name" autoComplete="given-name"/></label>
        <label>Last name<input required placeholder="Your last name" autoComplete="family-name"/></label>
        <label>Company Name <small>(optional)</small><input placeholder="Company name" autoComplete="organization"/></label>
        <label className="billing-full">Street Address<input required placeholder="Street address" autoComplete="street-address"/></label>
        <label>Country / Region<select required defaultValue=""><option value="" disabled>Select</option><option>Sri Lanka</option><option>United States</option><option>United Kingdom</option></select></label>
        <label>State / Province<select defaultValue=""><option value="" disabled>Select</option><option>Western Province</option><option>Central Province</option></select></label>
        <label>Email<input required type="email" placeholder="Email Address" autoComplete="email"/></label>
        <label>Phone<input required type="tel" placeholder="Phone number" autoComplete="tel"/></label>
      </div>
      <hr/><h2>Additional Info</h2>
      <label className="billing-notes">Inquiry Notes (Optional)<textarea placeholder="Tell us about your requirements, destination, or preferred packaging."/></label>
    </form>
    <aside className="order-summary">
      <h2>Product Inquiry</h2>
      {cart.length?cart.map(x=><div className="summary-product" key={x.id}><img src={A+x.image} alt=""/><span>{x.name}　×{x.qty}</span><b>Quote on request</b></div>):<p>Your inquiry list is empty.</p>}
      <div className="summary-line summary-total"><span>Pricing:</span><b>Available on request</b></div>
      <p>We will confirm availability, specifications, and export pricing with you.</p>
      <button className="btn wide" type="submit" form="quote-form" disabled={!cart.length}>Send Inquiry</button>
      {sent&&<p className="form-status" role="status">Your inquiry details are ready for our team.</p>}
    </aside>
  </section></Layout>
}

export function Auth({register=false}){const [submitted,setSubmitted]=useState(false);const [showPassword,setShowPassword]=useState(false);return <Layout><section className={`auth-page ${register?"register-page":""}`}><form className="auth-card" onSubmit={e=>{e.preventDefault();setSubmitted(true)}}><h1>{register?"Create Account":"Sign In"}</h1><label className="auth-input"><input type="email" placeholder="Email" required autoComplete="email"/></label><label className="auth-input"><input type={showPassword?"text":"password"} placeholder="Password" required minLength={8} autoComplete={register?"new-password":"current-password"}/><button type="button" aria-label="Show or hide password" onClick={()=>setShowPassword(value=>!value)}><Eye size={19}/></button></label>{register?<><label className="auth-input"><input type={showPassword?"text":"password"} placeholder="Confirm Password" required minLength={8} autoComplete="new-password"/><button type="button" aria-label="Show or hide password" onClick={()=>setShowPassword(value=>!value)}><Eye size={19}/></button></label><label className="terms-check"><input type="checkbox" required/> Accept all terms &amp; Conditions</label><button className="btn wide">{submitted?"Create Account":"Create Account"}</button><p>Already have account <Link to="/login">Login</Link></p></>:<><div className="remember"><label><input type="checkbox"/> Remember me</label><Link to="#">Forget Password</Link></div><button className="btn wide">Login</button><p>Don’t have account? <Link to="/create-account">Register</Link></p></>}{submitted&&<p className="form-status" role="status">Your details are valid. Connect an authentication service to finish.</p>}</form></section></Layout>}

export function Contact(){const [sent,setSent]=useState(false);return <Layout><section className="contact-page"><aside className="contact-info"><div><MapPin/><p>Negombo, Sri Lanka<br/>Coconut Triangle<br/>Export and manufacturing hub</p></div><div><Mail/><p><a href="mailto:info@sunrich.org">info@sunrich.org</a><br/><a href="mailto:exports@sunrich.org">exports@sunrich.org</a></p></div><div><Phone/><p><a href="tel:+94117090222">+94 11 70 90 222</a><br/><a href="tel:+94707779787">+94 70 777 9787</a></p></div></aside><form className="contact-form" onSubmit={e=>{e.preventDefault();setSent(true)}}><h1>Feel free to contact us</h1><p>For any further information about our coconut products, private label solutions, export supply, or bulk inquiries, our team is ready to assist.</p><div className="contact-fields"><input aria-label="Name" placeholder="Enter your name" required autoComplete="name"/><input aria-label="Email address" type="email" placeholder="Enter your email address." required autoComplete="email"/><input className="contact-subject" aria-label="How can we help?" placeholder="How can we help?"/><textarea aria-label="Message" placeholder="Write your message here" required minLength={10}/></div><button className="btn">Send Message</button>{sent&&<p className="form-status" role="status">Thank you! Your message is ready for our team.</p>}</form></section></Layout>}

export function Certificates(){
  return <Layout>
    <main className="certificates-page">
      <section className="certification-hero">
        <small>OUR CERTIFICATIONS</small>
        <h1>Quality You Can Trust</h1>
        <p>Sun Rich Paradise products are manufactured and exported under strict quality, hygiene, and food-safety standards that support organic integrity and customer confidence.</p>
      </section>
      <section className="certification-content">
        <div className="certification-badges-wrap">
          <img src="/certification-badges.png" alt="Sun Rich Paradise certifications including USDA Organic, JAS, FDA and quality compliance badges"/>
        </div>
        <div className="certification-copy">
          <h2>Recognized standards for reliability and authenticity</h2>
          <p>Our coconut product range is developed with a strong focus on verified sourcing, traceable processing and compliance with international quality expectations for export markets.</p>
          <ul>
            <li>Organic sourcing and processing principles</li>
            <li>Food safety and export quality assurance</li>
            <li>Trusted manufacturing standards for global buyers</li>
            <li>Private-label and bulk supply readiness</li>
          </ul>
        </div>
      </section>
    </main>
  </Layout>
}

export function About(){return <><header className="about-header"><Link to="/" className="about-brand"><img src="/Sun-Rich-Paradise%20logo.png" alt=""/> SUN RICH</Link><nav><Link to="/about">About</Link><Link to="/products">Our Products</Link><Link to="/certificates">Certifications</Link><Link to="/contact">Export B2B</Link></nav><div><span>EN</span><Link className="btn" to="/contact">Get a Quote</Link></div></header><main className="about-site"><section className="about-banner"><h1>Connecting Sri Lankan<br/>With The World<span>Nature</span></h1><p>Sun Rich Paradise brings premium organic coconut products from Sri Lanka to global markets with a strong focus on quality, sustainability and trust.</p><Link className="btn" to="/contact">Our Story</Link></section><section className="about-legacy"><img src={A+"farmer-2.jpg"} alt="Sri Lankan farmer at work"/><div className="legacy-copy"><small>OUR LEGACY</small><h2>A Legacy Built on Quality and Trust</h2><p>Abey Marine (Pvt) Ltd is an eminent and a leading manufacturer, exporter and supplier of Sun Rich Paradise Virgin Coconut Oil and other coconut products from Sri Lanka – the Paradise of the Indian Ocean.</p><p>Our manufacturing facility is advantageously positioned in Negombo, one of the most prominent areas of the coconut triangle, with easy access to coconut plantations, the Colombo Port and the International Airport. This strategic location allows us to source premium raw materials and supply export-ready products efficiently.</p><p>At Sun Rich Paradise, we are committed to providing prestigious customers with prominent quality coconut products that are healthy, natural and eco-friendly. In addition to our own brand range, we also offer packing under private label and bulk shipping solutions to help our partners grow.</p><div className="legacy-stats"><span><b>Negombo</b> Coconut Triangle</span><span><b>Bulk</b> Export Supply</span><span><b>Organic</b> &amp; Natural Focus</span></div></div></section><section className="mission-section"><article><h2>Our Vision</h2><p>To become a trusted global ambassador for Sri Lankan coconut products by delivering premium quality, sustainable and naturally sourced food ingredients to markets across the world.</p></article><article><h2>Our Mission</h2><p>To manufacture and market high-quality coconut products that meet international standards while supporting farmers, communities and environmentally responsible production practices.</p></article></section><section className="principles-section"><small>CORE PRINCIPLES</small><h2>The Pillars of Sun Rich</h2><div>{["Quality","Sustainability","Authenticity","Innovation"].map((x,i)=><article key={x}><b>{["✿","◉","♧","⚗"][i]}</b><h3>{x}</h3><p>Maintaining the highest standards and supporting responsible, sustainable Sri Lankan organic production.</p></article>)}</div></section><section className="process-section"><h2>Our Traceable Process</h2><p>From Sri Lankan Farms To Global Markets</p><div>{["Raw Materials","Processing","Quality Testing","Export"].map((x,i)=><article key={x}><b>0{i+1}</b><h3>{x}</h3><p>We source premium coconuts and carefully process every product to preserve natural goodness and export quality.</p></article>)}</div></section><section className="sustainability-section"><div><small>PIONEERING SUSTAINABILITY</small><h2>Building A Greener Future Through Responsible Agriculture</h2><p>At Sun Rich Paradise, sustainability is at the heart of everything we do. We support responsible farming and processing methods that help protect Sri Lanka’s environment while delivering quality coconut products.</p><p><b>Zero-Waste Facility</b><br/>We focus on practical, eco-friendly processing and by-product use to support cleaner operations.</p><p><b>Community Empowerment</b><br/>We work closely with farming communities and partners to build long-term, sustainable trade relationships.</p></div><img src={A+"farmer-1.jpg"} alt="Sustainable Sri Lankan agriculture"/></section></main><Footer/></>}

export function NotFound(){return <Layout><section className="notfound"><img src={A+"404-illustration.png"} alt="404 — page not found"/><h1>Oops! page not found</h1><Link className="btn" to="/">Back to Home</Link></section></Layout>}

function Empty({title,text}){return <div className="empty"><ShoppingBag/><h2>{title}</h2><p>{text}</p><Link className="btn" to="/products">Shop Products</Link></div>}
function Modal({children,onClose}){return <div className="overlay" onClick={onClose}><div className="modal" onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={onClose}><X/></button>{children}</div></div>}
function Newsletter({close}){const [subscribed,setSubscribed]=useState(false);return <Modal onClose={close}><button className="newsletter-close" aria-label="Close newsletter" onClick={close}><X/></button><form className="newsletter-modal" onSubmit={e=>{e.preventDefault();setSubscribed(true)}}><img src={A+"hero-basket.jpg"} alt="Fresh Sri Lankan produce"/><div><h2>Subscribe to Our<br/>Newsletter</h2><p>Stay updated with Sun Rich! Get the latest product updates, healthy food tips, special offers, and exclusive discounts delivered straight to your inbox.</p><label className="newsletter-input"><input type="email" placeholder="Enter your email" aria-label="Your email address" required/><button className="btn">Subscribe</button></label><label className="newsletter-skip"><input type="checkbox"/> Do not show this window</label>{subscribed&&<p className="form-status" role="status">You're on the list for Sun Rich updates.</p>}</div></form></Modal>}

function CartOverlay(){const {cartOpen,closeCart}=useApp(); return cartOpen?<CartDrawer close={closeCart}/>:null}
function FloatingCart(){const {cart,openCart}=useApp(); if(!cart.length)return null; return <button className="floating-cart" onClick={openCart}><ShoppingBag/><span>{cart.reduce((a,x)=>a+x.qty,0)}</span></button>}
