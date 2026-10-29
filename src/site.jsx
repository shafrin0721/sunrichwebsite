import React, {createContext, useContext, useEffect, useMemo, useState} from "react";
import NextLink from "next/link";
import {useRouter} from "next/router";
import {
  Search, Heart, ShoppingBag, UserRound, ChevronDown, MapPin, Phone, Menu, X,
  Truck, Headphones, ShieldCheck, Package, ArrowRight, ArrowLeft, Star, CheckCircle2,
  Mail, Facebook, Eye, Plus, Minus, Trash2, ChevronRight, Copy
} from "lucide-react";

const A="/assets/";
const PRODUCT_PRICE=14.99;
const formatPrice=amount=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(amount);

function WhatsAppIcon(){
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.1 3.9A11.8 11.8 0 0 0 12 .5C5.6.5.4 5.7.4 12.1c0 2 .5 3.9 1.5 5.6L.3 23.5l6-1.6a11.7 11.7 0 0 0 5.6 1.4h.1c6.4 0 11.6-5.2 11.6-11.6 0-3.1-1.2-5.9-3.5-7.8ZM12 21.3c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.6.9 1-3.5-.3-.4a9.2 9.2 0 0 1-1.4-4.9A9.7 9.7 0 0 1 12 2.1c2.6 0 5 1 6.8 2.8a9.6 9.6 0 0 1 2.8 6.8c0 5.3-4.3 9.6-9.6 9.6Zm5.3-7.2c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.4.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.1c-.2-.5-.5-.4-.7-.4h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.4 1 2.7 1.1 2.9.1.2 2 3.1 4.9 4.3.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.1-1.3-.1-.1-.3-.2-.6-.4Z"/></svg>;
}

function Link({to, ...props}) {
  return <NextLink href={to} {...props}/>;
}

function NavLink({to, children}) {
  const router=useRouter();
  const active=router.asPath.split("?")[0]===to;
  return <NextLink href={to} className={active?"active":""}>{children}</NextLink>;
}

export const PRODUCTS = [
  {id:1,name:"Virgin Coconut Oil",price:PRODUCT_PRICE,image:"product-original-virgin-coconut-oil.png",category:"Coconut Oils",categories:["Organic Coconut Oils","Premium Collection"],description:"Cold-pressed and unrefined virgin coconut oil. The catalog lists PET and HDPE bottles, glass jars, and bulk packaging, with a shelf life of up to two years.",specifications:["Processing: cold-pressed and unrefined","Packaging: PET/HDPE bottles, glass jars, and bulk","Shelf life: up to 2 years"]},
  {id:2,name:"Coconut Flour",price:PRODUCT_PRICE,image:"product-original-coconut-flour.png",category:"Coconut Foods",categories:["Coconut Foods"],description:"Coconut flour made from coconut oil cake. The catalog lists retail packs and larger food-service and bulk sizes.",specifications:["Pack sizes: 200g, 375g, 454g, 10kg, and 25kg, plus bulk","Shelf life: 12 months"]},
  {id:3,name:"Coconut Chips",price:PRODUCT_PRICE,image:"product-original-coconut-chips.png",category:"Coconut Snacks",categories:["Coconut Foods","Healthy Snacks"],description:"Coconut chips available in natural and toasted varieties, as well as chocolate, caramel, and sugar flavours.",specifications:["Varieties: natural and toasted","Flavours: chocolate, caramel, and sugar"]},
  {id:4,name:"Desiccated Coconut",price:PRODUCT_PRICE,image:"product-original-desiccated-coconut.png",category:"Coconut Foods",categories:["Coconut Foods"],description:"Desiccated coconut from the Sun Rich coconut product range. Contact us for current specifications and available pack sizes."},
  {id:5,name:"Coconut Milk Powder",price:PRODUCT_PRICE,image:"product-original-coconut-milk-powder.png",category:"Coconut Foods",categories:["Coconut Foods"],description:"Coconut milk powder from the Sun Rich coconut product range. Contact us for current specifications and available pack sizes."},
  {id:6,name:"Coconut Milk",price:PRODUCT_PRICE,image:"product-original-coconut-milk.png",category:"Coconut Foods",categories:["Coconut Foods","Beverages"],description:"A dairy-free coconut milk used in curries, soups, beverages, sweets, and desserts. The catalog specifies 400ml cans and a 24-month shelf life.",specifications:["Pack size: 400ml can","Shelf life: 24 months"]},
  {id:7,name:"Coconut Cream",price:PRODUCT_PRICE,image:"product-original-coconut-cream.png",category:"Coconut Foods",categories:["Coconut Foods"],description:"Coconut cream from the Sun Rich coconut product range. Contact us for current specifications and available pack sizes."},
  {id:8,name:"Coconut Sugar",price:PRODUCT_PRICE,image:"product-original-coconut-sugar.png",category:"Natural Sweeteners",categories:["Natural Sweeteners"],description:"Coconut sugar from the Sun Rich coconut product range. Contact us for current specifications and available pack sizes."},
  {id:9,name:"King Coconut Water",price:PRODUCT_PRICE,image:"product-original-king-coconut-water.png",category:"Coconut Beverages",categories:["Beverages","Premium Collection"],description:"Water from Sri Lankan King Coconut, a golden-orange variety found only in Sri Lanka. Contact us for current specifications and available pack sizes."},
  {id:10,name:"Creamed Coconut",price:PRODUCT_PRICE,image:"product-original-creamed-coconut.png",category:"Coconut Foods",categories:["Coconut Foods"],description:"Unsweetened dried coconut meat ground into a semi-solid paste. The catalog lists bulk pails in 10kg and 18kg sizes.",specifications:["Packaging: bulk pails, 10kg and 18kg"]},
  {id:11,name:"Condense Milk",price:PRODUCT_PRICE,image:"product-original-coconut-condensed-milk.png",category:"Coconut Foods",categories:["Coconut Foods"],description:"Condense Milk from the Sun Rich coconut product range. Contact us for current specifications and available pack sizes."},
  {id:12,name:"King Coconut Oil",price:PRODUCT_PRICE,image:"product-original-king-coconut-oil.png",category:"Coconut Oils",categories:["Organic Coconut Oils","Premium Collection"],description:"King coconut oil from the Sun Rich product range, made from the golden-orange King Coconut found only in Sri Lanka. Contact us for current specifications and available pack sizes."},
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
  const [cart,setCart]=useState([]);
  const [cartReady,setCartReady]=useState(false);
  const [cartNotice,setCartNotice]=useState("");
  const [wishlist,setWishlist]=useState([]);
  const [cartOpen,setCartOpen]=useState(false);
  const [newsletterOpen,setNewsletterOpen]=useState(false);
  useEffect(()=>{
    try{
      const saved=window.localStorage.getItem("sunrich:cart");
      if(saved){
        const parsed=JSON.parse(saved);
        if(!Array.isArray(parsed)) throw new Error("Saved cart has an invalid format.");
        const restored=parsed.flatMap(item=>{
          const product=PRODUCTS.find(candidate=>candidate.id===item?.id);
          const qty=Number(item?.qty);
          return product&&Number.isInteger(qty)&&qty>0
            ?[{...product,qty:Math.min(qty,999)}]
            :[];
        });
        setCart(restored);
      }
    }catch{
      setCartNotice("Your saved cart could not be loaded. You can still add products.");
    }finally{
      setCartReady(true);
    }
  },[]);
  useEffect(()=>{
    if(!cartReady)return;
    try{
      window.localStorage.setItem("sunrich:cart",JSON.stringify(cart));
    }catch{
      setCartNotice("Your cart is available for this visit but could not be saved in this browser.");
    }
  },[cart,cartReady]);
  const addToCart=(product,qty=1)=>setCart(c=>{
    const amount=Math.max(1,Math.min(999,Math.floor(Number(qty)||1)));
    const found=c.find(x=>x.id===product.id);
    return found?c.map(x=>x.id===product.id?{...x,qty:Math.min(999,x.qty+amount)}:x):[...c,{...product,qty:amount}];
  });
  const removeFromCart=id=>setCart(c=>c.filter(x=>x.id!==id));
  const setQty=(id,qty)=>setCart(c=>qty<1?c.filter(x=>x.id!==id):c.map(x=>x.id===id?{...x,qty:Math.min(999,Math.floor(qty))}:x));
  const toggleWishlist=id=>setWishlist(w=>w.includes(id)?w.filter(x=>x!==id):[...w,id]);
  const value=useMemo(()=>({cart,cartNotice,wishlist,addToCart,removeFromCart,setQty,toggleWishlist,cartOpen,openCart:()=>setCartOpen(true),closeCart:()=>setCartOpen(false),newsletterOpen,openNewsletter:()=>setNewsletterOpen(true),closeNewsletter:()=>setNewsletterOpen(false)}),[cart,cartNotice,wishlist,cartOpen,newsletterOpen]);
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
  const cartCount=cart.reduce((total,item)=>total+item.qty,0);
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
        <button onClick={openCart} className="icon-badge" aria-label={`Open cart, ${cartCount} item${cartCount===1?"":"s"}`}><ShoppingBag/><em>{cartCount}</em></button>
        <Link to="/login"><UserRound/></Link>
      </div>
    </div>
  </header>
}

function Footer(){
  return <footer>
    <div className="footer-top">
      <div><Link className="footer-logo" to="/" aria-label="Sun Rich home"><img src="/Sun-Rich-Paradise%20logo.png" alt=""/> <b>SUN RICH</b></Link><p>Manufacturer, exporter and supplier of premium Sri Lankan coconut products.<br/>Committed to natural, organic and eco-friendly processing for global markets.</p>
        <div className="socials">
          <a href="https://www.facebook.com/sunrichparadise/" target="_blank" rel="noreferrer" aria-label="Sun Rich on Facebook"><Facebook/></a>
          <a href="https://wa.me/94707779787" target="_blank" rel="noreferrer" aria-label="Contact Sun Rich on WhatsApp"><WhatsAppIcon/></a>
        </div>
      </div>
      <div><h4>Product Line</h4><Link to="/products/virgin-coconut-oil">Virgin Coconut Oil</Link><Link to="/products/coconut-flour">Coconut Flour</Link><Link to="/products/coconut-chips">Coconut Chips</Link><Link to="/products/desiccated-coconut">Desiccated Coconut</Link><Link to="/products/coconut-milk">Coconut Milk</Link><Link to="/products/coconut-cream">Coconut Cream</Link></div>
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
    <div className="product-meta"><Link to={`/products/${getProductSlug(p)}`}><h3>{p.name}</h3></Link><div><b>{formatPrice(p.price)}</b><button className="mini-cart" title="Add to cart" aria-label={`Add ${p.name} to cart`} onClick={()=>addToCart(p)}><ShoppingBag size={15}/></button></div><span className="stars">★★★★<span>★</span></span></div>
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
    <section className="section catalog-page"><aside className="filter-sidebar"><button className="filter-pill">Filter <Menu size={16}/></button><h3>All Categories <ChevronDown size={16}/></h3>{PRODUCT_CATEGORIES.map(x=><button className={"filter-category "+(category===x?"cat-active":"")} key={x} onClick={()=>setCategory(x)}><i/>{x}<small>({x==="All Products"?PRODUCTS.length:PRODUCTS.filter(p=>p.categories.includes(x)).length})</small></button>)}<hr/><h3>Export Supply <ChevronDown size={16}/></h3><p className="filter-caption">Wholesale and export orders welcome.</p><hr/><h3>Popular Tag <ChevronDown size={16}/></h3><div className="tag-list">{["Organic","Natural","Sri Lankan","Vegan","Gluten Free","Non GMO","Coconut Based","Export Quality"].map((x,i)=><button className={i===1?"tag-active":""} key={x}>{x}</button>)}</div></aside><main className="catalog-results"><div className="catalog-toolbar"><div className="sort-control"><span>Sort by:</span><select aria-label="Sort products" value={sort} onChange={e=>changeSort(e.target.value)}><option value="featured">Catalog order</option><option value="name">Name: A to Z</option></select></div><form className="catalog-search" onSubmit={e=>e.preventDefault()}><Search size={16}/><input aria-label="Search products" placeholder="Search" value={query} onChange={e=>changeSearch(e.target.value)}/><button>Search</button></form><span className="results-count">{visibleProducts.length} Results Found</span></div>{visibleProducts.length?<><div className="products-grid catalog-grid">{pageProducts.map(p=><ProductCard p={p} key={p.id}/>)}</div>{pageCount>1&&<nav className="pagination" aria-label="Product pages"><button aria-label="Previous page" disabled={currentPage===1} onClick={()=>goToPage(currentPage-1)}>‹</button>{Array.from({length:pageCount},(_,index)=>index+1).map(page=><button key={page} className={currentPage===page?"page-active":""} aria-current={currentPage===page?"page":undefined} onClick={()=>goToPage(page)}>{page}</button>)}<button aria-label="Next page" disabled={currentPage===pageCount} onClick={()=>goToPage(currentPage+1)}>›</button></nav>}</>:<Empty title="No products found" text="Try another search or adjust your filters."/>}</main></section>
    {quick&&<Modal onClose={()=>setQuick(null)}><QuickView p={quick}/></Modal>}
  </Layout>
}

function PageTitle({title,crumb}){return <div className="page-title"><div><Link to="/">Home</Link><ChevronRight size={14}/><span>{crumb}</span></div><h1>{title}</h1></div>}

function QuickView({p}){const {addToCart}=useApp();const [qty,setQty]=useState(1);return <div className="quickview"><img src={A+p.image} alt={p.name}/><div><small>{p.category} · Sri Lanka</small><h2>{p.name}</h2><h3>{formatPrice(p.price)}</h3><p>{p.description}</p><div className="qty"><button aria-label="Decrease quantity" onClick={()=>setQty(q=>Math.max(1,q-1))}><Minus size={15}/></button><span>{qty}</span><button aria-label="Increase quantity" onClick={()=>setQty(q=>Math.min(999,q+1))}><Plus size={15}/></button></div><button className="btn" onClick={()=>addToCart(p,qty)}>Add to cart <ShoppingBag size={16}/></button></div></div>}

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
  return <span className="share-item">
    <span>Share item:</span>
    <span className="share-item-actions">
      <button type="button" aria-label="Share on Facebook" title="Facebook" onClick={()=>shareTo("facebook")}><Facebook/></button>
      <button type="button" aria-label="Share on WhatsApp" title="WhatsApp" onClick={()=>shareTo("whatsapp")}><WhatsAppIcon/></button>
      <button type="button" aria-label="Copy product link" title="Copy link" onClick={copyLink}><Copy/></button>
    </span>
    {message&&<span className="share-item-status" role="status">{message}</span>}
  </span>
}

function WishlistShare(){
  const [message,setMessage]=useState("");
  const shareTo=(platform)=>{
    const url=window.location.href;
    const shareUrl=platform==="facebook"
      ?`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
      :`https://wa.me/?text=${encodeURIComponent(url)}`;
    window.open(shareUrl,"_blank","noopener,noreferrer");
  };
  const copyLink=async(successMessage="Link copied.")=>{
    try{
      await copyShareLink();
      setMessage(successMessage);
    }catch{
      setMessage("Could not copy the link. Please copy the page URL from your browser.");
    }
  };
  return <div className="wishlist-share">
    <span>Share:</span>
    <span className="share-item-actions">
      <button type="button" aria-label="Share wishlist on Facebook" title="Facebook" onClick={()=>shareTo("facebook")}><Facebook/></button>
      <button type="button" aria-label="Share wishlist on WhatsApp" title="WhatsApp" onClick={()=>shareTo("whatsapp")}><WhatsAppIcon/></button>
      <button type="button" aria-label="Copy wishlist link" title="Copy link" onClick={()=>copyLink()}><Copy/></button>
    </span>
    {message&&<span className="share-item-status" role="status">{message}</span>}
  </div>;
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
        <p className="detail-price"><b>{formatPrice(p.price)}</b></p>
        <div className="detail-share"><span>Origin: Sri Lanka</span><ShareItem product={p}/></div>

        <p className="detail-copy">{p.description}</p>
        <div className="detail-buy">
          <div className="qty"><button aria-label="Decrease quantity" onClick={()=>setQty(q=>Math.max(1,q-1))}><Minus size={14}/></button><span>{qty}</span><button aria-label="Increase quantity" onClick={()=>setQty(q=>q+1)}><Plus size={14}/></button></div>
          <button className="btn" onClick={()=>addToCart(p,qty)}>Add to cart <ShoppingBag size={15}/></button>
          <button className="detail-wish" aria-label="Add to wishlist" onClick={()=>toggleWishlist(p.id)}><Heart fill={wishlist.includes(p.id)?"currentColor":"none"}/></button>
        </div>
        <div className="detail-taxonomy"><p><b>Category:</b> {p.category}</p><p><b>Product:</b> {p.name}</p></div>
      </div>
    </section>
    <nav className="detail-tabs" aria-label="Product details">{["Descriptions","Additional Information","Customer Feedback"].map(x=><button className={tab===x?"tab-active":""} key={x} onClick={()=>setTab(x)}>{x}</button>)}</nav>
    <section className="detail-tab-content">
      {tab==="Descriptions"?<div className="product-description"><p>{p.description}</p><p>For current availability, bulk-order rates, samples, or further technical information, please contact the Sun Rich team.</p><Link className="btn" to="/contact">Contact us <ArrowRight size={15}/></Link></div>
        :tab==="Additional Information"?<div className="product-information"><p>Additional Information</p><ul>{information.map(x=><li key={x}>{x}</li>)}</ul></div>
          :<CustomerFeedback key={p.id} product={p}/>}
    </section>
    <section className="section related-products"><div className="section-head"><h2>Related　Products</h2><Link to="/products">View All <ArrowRight size={15}/></Link></div><div className="products-grid four">{[PRODUCTS[2],PRODUCTS[0],PRODUCTS[11],PRODUCTS[6]].map(x=><ProductCard p={x} key={x.id}/>)}</div></section>
  </Layout>
}

function CustomerFeedback({product}){
  const storageKey=`sunrich:product-reviews:${product.id}`;
  const [reviews,setReviews]=useState([]);
  const [name,setName]=useState("");
  const [rating,setRating]=useState(5);
  const [comment,setComment]=useState("");
  const [status,setStatus]=useState("");
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    try{
      const saved=window.localStorage.getItem(storageKey);
      if(saved){
        const parsed=JSON.parse(saved);
        if(!Array.isArray(parsed)) throw new Error("Saved product reviews have an invalid format.");
        setReviews(parsed.filter(review=>
          review&&typeof review.id==="string"&&typeof review.name==="string"&&
          Number.isInteger(review.rating)&&review.rating>=1&&review.rating<=5&&
          typeof review.comment==="string"&&typeof review.createdAt==="string"&&
          Number.isFinite(Date.parse(review.createdAt))
        ));
      }
    }catch{
      setStatus("Saved reviews could not be loaded. You can still add feedback.");
    }finally{
      setLoading(false);
    }
  },[storageKey]);

  const submitReview=event=>{
    event.preventDefault();
    const review={
      id:globalThis.crypto?.randomUUID?.()||`${Date.now()}-${Math.random()}`,
      name:name.trim(),
      rating,
      comment:comment.trim(),
      createdAt:new Date().toISOString(),
    };
    const updated=[review,...reviews];
    setReviews(updated);
    setName("");
    setRating(5);
    setComment("");
    try{
      window.localStorage.setItem(storageKey,JSON.stringify(updated));
      setStatus("Thank you for your feedback. It is saved in this browser.");
    }catch{
      setStatus("Your feedback was added for this session but could not be saved in this browser.");
    }
  };

  return <div className="customer-feedback">
    <h2>Customer Feedback</h2>
    <p>Share your experience with {product.name}.</p>
    <form className="feedback-form" onSubmit={submitReview}>
      <label>Your name<input value={name} onChange={event=>setName(event.target.value)} required maxLength={80} autoComplete="name"/></label>
      <fieldset className="feedback-rating">
        <legend>Your rating</legend>
        <div>{[1,2,3,4,5].map(value=><button key={value} type="button" aria-label={`${value} star${value===1?"":"s"}`} aria-pressed={rating===value} onClick={()=>setRating(value)}>{value<=rating?"★":"☆"}</button>)}</div>
      </fieldset>
      <label className="feedback-comment">Your feedback<textarea value={comment} onChange={event=>setComment(event.target.value)} required minLength={5} maxLength={2000} rows={4}/></label>
      <button className="btn" type="submit" disabled={loading}>Submit Feedback</button>
      {status&&<p className="form-status" role="status">{status}</p>}
    </form>
    <div className="review-list" aria-live="polite">
      {reviews.map(review=><article key={review.id}>
        <div className="review-heading"><b>{review.name}</b><span>{new Date(review.createdAt).toLocaleDateString()}</span></div>
        <div className="stars" aria-label={`${review.rating} out of 5 stars`}>{"★".repeat(review.rating)}{"☆".repeat(5-review.rating)}</div>
        <p>{review.comment}</p>
      </article>)}
      {!loading&&!reviews.length&&<p className="feedback-empty">No feedback yet. Be the first to share your experience.</p>}
    </div>
    <small className="feedback-storage-note">Feedback is saved in this browser.</small>
  </div>
}

export function Wishlist(){
  const {wishlist,addToCart,toggleWishlist}=useApp(); const items=PRODUCTS.filter(p=>wishlist.includes(p.id));
  return <Layout><section className="wishlist-page"><h1>My Wishlist</h1>{items.length?<div className="wishlist-table"><table><thead><tr><th>Product</th><th>Price</th><th>Availability</th><th></th></tr></thead><tbody>{items.map(p=><tr key={p.id}><td><div className="table-product"><img src={A+p.image} alt={p.name}/><span>{p.name}</span></div></td><td data-label="Price"><b>{formatPrice(p.price)}</b></td><td data-label="Availability"><span className="stock-status">In stock</span></td><td><div className="wishlist-actions"><button className="btn wishlist-add" onClick={()=>addToCart(p)}>Add to cart</button><button className="wishlist-remove" aria-label={`Remove ${p.name} from wishlist`} onClick={()=>toggleWishlist(p.id)}><X/></button></div></td></tr>)}</tbody></table><WishlistShare/></div>:<Empty title="Your wishlist is empty" text="Save products here and find them again later."/>}</section></Layout>
}

function CartDrawer({close}){const {cart,removeFromCart,cartNotice}=useApp();const count=cart.reduce((total,item)=>total+item.qty,0);const subtotal=cart.reduce((total,item)=>total+item.price*item.qty,0);return <div className="overlay" onClick={close}><aside className="drawer" onClick={e=>e.stopPropagation()}><div className="drawer-head"><h2>Your Cart ({count})</h2><button aria-label="Close cart" onClick={close}><X/></button></div><div className="drawer-products">{cart.map(x=><div className="drawer-item" key={x.id}><img src={A+x.image} alt={x.name}/><div><b>{x.name}</b><span>Quantity: {x.qty} · {formatPrice(x.price)} each</span></div><button aria-label={`Remove ${x.name}`} onClick={()=>removeFromCart(x.id)}><X size={18}/></button></div>)}</div>{cartNotice&&<p className="form-status" role="status">{cartNotice}</p>}<div className="drawer-bottom"><div><span>Subtotal</span><b>{formatPrice(subtotal)}</b></div>{cart.length>0&&<Link className="btn wide" to="/billing" onClick={close}>Proceed to checkout</Link>}<Link className="drawer-cart-link" to="/cart" onClick={close}>View cart</Link></div></aside></div>}

export function CartPage(){
  const {cart,removeFromCart,setQty,cartNotice}=useApp();
  const itemCount=cart.reduce((total,item)=>total+item.qty,0);
  const subtotal=cart.reduce((total,item)=>total+item.price*item.qty,0);
  return <Layout><main className="cart-page">
    <div className="cart-page-heading"><div><small>YOUR SHOPPING BAG</small><h1>Shopping Cart</h1></div><Link to="/products">Continue shopping <ArrowRight size={16}/></Link></div>
    {cartNotice&&<p className="form-status" role="status">{cartNotice}</p>}
    {cart.length?<div className="cart-layout">
      <section className="cart-lines" aria-label="Cart items">
        <div className="cart-table-head"><span>Product</span><span>Price</span><span>Quantity</span><span>Subtotal</span></div>
        {cart.map(item=><article className="cart-line" key={item.id}>
          <Link className="cart-product" to={`/products/${getProductSlug(item)}`}><img src={A+item.image} alt={item.name}/><span><b>{item.name}</b><small>{item.category}</small></span></Link>
          <span className="cart-price" data-label="Price">{formatPrice(item.price)}</span>
          <div className="cart-quantity" aria-label={`Quantity for ${item.name}`}><button type="button" aria-label={`Decrease ${item.name} quantity`} disabled={item.qty<=1} onClick={()=>setQty(item.id,item.qty-1)}><Minus size={14}/></button><span>{item.qty}</span><button type="button" aria-label={`Increase ${item.name} quantity`} disabled={item.qty>=999} onClick={()=>setQty(item.id,item.qty+1)}><Plus size={14}/></button></div>
          <span className="cart-subtotal" data-label="Subtotal">{formatPrice(item.price*item.qty)}</span>
          <button className="cart-remove" type="button" aria-label={`Remove ${item.name} from cart`} onClick={()=>removeFromCart(item.id)}><Trash2 size={17}/></button>
        </article>)}
      </section>
      <aside className="cart-summary"><h2>Cart Summary</h2><div className="cart-summary-row"><span>Items ({itemCount})</span><b>{cart.length} product{cart.length===1?"":"s"}</b></div><div className="cart-summary-row"><span>Subtotal</span><b>{formatPrice(subtotal)}</b></div><div className="cart-summary-row"><span>Shipping</span><b>Calculated later</b></div><p>Shipping is confirmed with your order. Payment methods will be added later.</p><Link className="btn wide" to="/billing">Proceed to checkout <ArrowRight size={16}/></Link><small>No payment is collected at this time.</small></aside>
    </div>:<Empty title="Your cart is empty" text="Browse our products and add something you love."/>}
  </main></Layout>
}

export function Billing(){
  const {cart}=useApp();
  const [status,setStatus]=useState("");
  const [shipToDifferentAddress,setShipToDifferentAddress]=useState(false);
  const [paymentMethod,setPaymentMethod]=useState("cod");
  const submitOrder=event=>{
    event.preventDefault();
    const form=event.currentTarget;
    const invalidField=Array.from(form.elements).find(field=>field.willValidate&&!field.checkValidity());
    if(invalidField){
      invalidField.setCustomValidity(invalidField.validity.valueMissing?"Please fill in this field.":"Please enter a valid value.");
      invalidField.reportValidity();
      invalidField.focus();
      return;
    }
    const formData=new FormData(form);
    const customer=Object.fromEntries(formData.entries());
    const products=cart.map(item=>`- ${item.name} × ${item.qty} at ${formatPrice(item.price)} each: ${formatPrice(item.price*item.qty)}`).join("\n");
    const subtotal=cart.reduce((total,item)=>total+item.price*item.qty,0);
    const shippingAddress=shipToDifferentAddress
      ?`${customer.shippingFirstName} ${customer.shippingLastName}, ${customer.shippingAddress} ${customer.shippingAddressLine2||""}, ${customer.shippingCity}, ${customer.shippingState||""}, ${customer.shippingPostalCode||""}, ${customer.shippingCountry}`
      :`${customer.firstName} ${customer.lastName}, ${customer.address} ${customer.addressLine2||""}, ${customer.city}, ${customer.state||""}, ${customer.postalCode||""}, ${customer.country}`;
    const body=[
      "New Sun Rich Paradise order request",
      "",
      "Products:",
      products,
      `Subtotal: ${formatPrice(subtotal)}`,
      "Shipping: To be confirmed",
      `Payment preference: ${customer.paymentPreference}`,
      "",
      "Billing details:",
      `${customer.firstName} ${customer.lastName}`,
      `Company: ${customer.company||"Not provided"}`,
      `Email: ${customer.email}`,
      `Phone: ${customer.phone}`,
      `Billing address: ${customer.firstName} ${customer.lastName}, ${customer.address} ${customer.addressLine2||""}, ${customer.city}, ${customer.state||""}, ${customer.postalCode||""}, ${customer.country}`,
      `Shipping address: ${shippingAddress}`,
      `Order notes: ${customer.notes||"None"}`,
      "",
      "Please confirm shipping cost and final total. This request does not take payment.",
    ].join("\n");
    const subject=`Sun Rich order request (${cart.reduce((total,item)=>total+item.qty,0)} items)`;
    window.location.href=`mailto:exports@sunrich.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("Your email app should open with this order request. Send the email to complete your request; no payment has been made.");
  };
  const itemCount=cart.reduce((total,item)=>total+item.qty,0);
  const subtotal=cart.reduce((total,item)=>total+item.price*item.qty,0);
  return <Layout><main className="checkout-page">
    <div className="checkout-heading"><div><small>SECURE CHECKOUT</small><h1>Checkout</h1></div><Link to="/cart"><ArrowLeft size={16}/> Return to cart</Link></div>
    {!cart.length?<Empty title="Your cart is empty" text="Add products to your cart before checking out."/>:<div className="billing-page">
      <form id="quote-form" noValidate onSubmit={submitOrder} onChange={event=>event.target.setCustomValidity?.("")}>
        <h2>Billing Information</h2>
        <div className="billing-fields">
          <label className="billing-third"><span>First name</span><input name="firstName" required autoComplete="given-name"/></label>
          <label className="billing-third"><span>Last name</span><input name="lastName" required autoComplete="family-name"/></label>
          <label className="billing-third"><span>Company <small>(optional)</small></span><input name="company" autoComplete="organization"/></label>
          <label className="billing-full"><span>Street address</span><input name="address" required autoComplete="address-line1"/></label>
          <label className="billing-full"><span>Apartment, suite, etc. <small>(optional)</small></span><input name="addressLine2" autoComplete="address-line2"/></label>
          <label className="billing-half"><span>Town / City</span><input name="city" required autoComplete="address-level2"/></label>
          <label className="billing-half"><span>State / Province</span><input name="state" required autoComplete="address-level1"/></label>
          <label className="billing-half"><span>Postal code</span><input name="postalCode" required autoComplete="postal-code"/></label>
          <label className="billing-half"><span>Country / Region</span><select name="country" required defaultValue="" autoComplete="country-name"><option value="" disabled>Select a country</option><option>Sri Lanka</option><option>United States</option><option>United Kingdom</option><option>Canada</option><option>Australia</option></select></label>
          <label className="billing-half"><span>Email address</span><input name="email" type="email" required autoComplete="email"/></label>
          <label className="billing-half"><span>Phone number</span><input name="phone" type="tel" required autoComplete="tel"/></label>
        </div>
        <label className="billing-check"><input type="checkbox" checked={shipToDifferentAddress} onChange={event=>setShipToDifferentAddress(event.target.checked)}/> Ship to a different address</label>
        {shipToDifferentAddress&&<section className="shipping-address-fields" aria-label="Shipping address">
          <h2>Shipping Address</h2>
          <div className="billing-fields">
            <label className="billing-third"><span>First name</span><input name="shippingFirstName" required autoComplete="shipping given-name"/></label>
            <label className="billing-third"><span>Last name</span><input name="shippingLastName" required autoComplete="shipping family-name"/></label>
            <label className="billing-third"><span>Company <small>(optional)</small></span><input name="shippingCompany" autoComplete="shipping organization"/></label>
            <label className="billing-full"><span>Street address</span><input name="shippingAddress" required autoComplete="shipping address-line1"/></label>
            <label className="billing-full"><span>Apartment, suite, etc. <small>(optional)</small></span><input name="shippingAddressLine2" autoComplete="shipping address-line2"/></label>
            <label className="billing-half"><span>Town / City</span><input name="shippingCity" required autoComplete="shipping address-level2"/></label>
            <label className="billing-half"><span>State / Province</span><input name="shippingState" required autoComplete="shipping address-level1"/></label>
            <label className="billing-half"><span>Postal code</span><input name="shippingPostalCode" required autoComplete="shipping postal-code"/></label>
            <label className="billing-half"><span>Country / Region</span><select name="shippingCountry" required defaultValue="" autoComplete="shipping country-name"><option value="" disabled>Select a country</option><option>Sri Lanka</option><option>United States</option><option>United Kingdom</option><option>Canada</option><option>Australia</option></select></label>
          </div>
        </section>}
        <hr/><h2>Additional Info</h2>
        <label className="billing-notes">Order notes <small>(optional)</small><textarea name="notes" placeholder="Notes about your order, e.g. special notes for delivery." rows={4}/></label>
      </form>
      <aside className="order-summary">
        <h2>Order Summary</h2>
        {cart.map(item=><div className="summary-product" key={item.id}><img src={A+item.image} alt=""/><span>{item.name} ×{item.qty}</span><b>{formatPrice(item.price*item.qty)}</b></div>)}
        <div className="summary-line"><span>Subtotal</span><b>{formatPrice(subtotal)}</b></div>
        <div className="summary-line"><span>Shipping</span><b>To be confirmed</b></div>
        <div className="summary-line summary-total"><span>Total</span><b>{formatPrice(subtotal)} + shipping</b></div>
        <h3 className="payment-title">Payment Method</h3>
        <label className="payment-choice"><input type="radio" name="paymentPreference" value="Cash on Delivery" form="quote-form" checked={paymentMethod==="cod"} onChange={()=>setPaymentMethod("cod")}/> Cash on Delivery</label>
        <label className="payment-choice"><input type="radio" name="paymentPreference" value="Credit or debit card" form="quote-form" checked={paymentMethod==="card"} onChange={()=>setPaymentMethod("card")}/> Credit or debit card</label>
        <label className="payment-choice"><input type="radio" name="paymentPreference" value="Google Pay" form="quote-form" checked={paymentMethod==="google-pay"} onChange={()=>setPaymentMethod("google-pay")}/> Google Pay</label>
        <label className="payment-choice"><input type="radio" name="paymentPreference" value="Bank transfer" form="quote-form" checked={paymentMethod==="bank-transfer"} onChange={()=>setPaymentMethod("bank-transfer")}/> Bank transfer</label>
        <section className="payment-details" aria-live="polite">
          {paymentMethod==="cod"&&<><b>Cash on Delivery</b><p>Pay when your order is delivered. Delivery availability and any applicable charges will be confirmed with your order.</p></>}
          {paymentMethod==="card"&&<><b>Secure card payment</b><p>Card number, expiry date, and security code entry will appear here after a hosted payment provider is connected. For your security, do not enter card details into this email-based checkout.</p></>}
          {paymentMethod==="google-pay"&&<><b>Google Pay</b><p>Google Pay will be available through a connected payment provider. No payment is taken at this stage.</p></>}
          {paymentMethod==="bank-transfer"&&<><b>Bank transfer instructions</b><p>Bank account details will be provided after the order and shipping total are confirmed.</p></>}
        </section>
        <p>Payment is not processed on this website. The selected method is included with your order request.</p>
        <button className="btn wide" type="submit" form="quote-form">Place Order</button>
        {status&&<p className="form-status" role="status">{status}</p>}
      </aside>
    </div>}
  </main></Layout>
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
