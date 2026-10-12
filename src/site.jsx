import React, {createContext, useContext, useMemo, useState} from "react";
import NextLink from "next/link";
import {useRouter} from "next/router";
import {
  Search, Heart, ShoppingBag, UserRound, ChevronDown, MapPin, Phone, Menu, X,
  Truck, Headphones, ShieldCheck, Package, ArrowRight, ArrowLeft, Star, CheckCircle2,
  Mail, Instagram, Facebook, Linkedin, Eye, Plus, Minus, Trash2, ChevronRight
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

const PRODUCTS = [
  {id:1,name:"Organic Virgin Coconut Oil",image:"catalog-organic-virgin-coconut-oil.jpeg",category:"Coconut Products",description:"Cold-pressed, unrefined organic virgin coconut oil for food, beverage, personal-care and food-processing applications. Available in bottles, glass jars and bulk."},
  {id:2,name:"Organic Coconut Milk Powder",image:"catalog-organic-coconut-milk-powder.jpeg",category:"Coconut Products",description:"Made from premium-grade organic coconuts grown in Sri Lanka. Mix into beverages, smoothies, desserts, soups and everyday recipes."},
  {id:3,name:"Organic Coconut Milk",image:"catalog-organic-coconut-milk.jpeg",category:"Coconut Products",description:"Coconut milk is pressed from the white meat of mature coconuts and used in curries, soups, desserts and other dishes."},
  {id:4,name:"Organic Coconut Flour",image:"catalog-organic-coconut-flour.jpeg",category:"Coconut Products",description:"A fiber-enriched flour made from coconut oil cake. A grain-free alternative for baking and cooking."},
  {id:5,name:"Organic Desiccated Coconut",image:"catalog-organic-desiccated-coconut.jpeg",category:"Coconut Products",description:"Shredded, dried and unsweetened mature coconut meat for confectionery, bakery, food service and food processing."},
  {id:6,name:"Organic Creamed Coconut",image:"catalog-organic-creamed-coconut.jpeg",category:"Coconut Products",description:"A concentrated coconut product made by grinding dehydrated fresh coconut meat into a smooth paste."},
  {id:7,name:"Organic Coconut Cream",image:"catalog-organic-coconut-cream.jpeg",category:"Coconut Products",description:"A smooth, creamy extract of fresh mature coconut meat for curries, desserts, beverages, sauces and bakery products."},
  {id:8,name:"Organic Coconut Chips",image:"catalog-organic-coconut-chips.jpeg",category:"Coconut Products",description:"Desiccated coconut chips for snacking or use in granola, baking, desserts and other recipes."},
  {id:9,name:"Organic Coconut Water",image:"official-organic-coconut-water.png",category:"Coconut Products",description:"A refreshing coconut beverage with naturally occurring sugars, vitamins, minerals and amino acids."},
  {id:10,name:"Organic Coconut Sugar",image:"catalog-organic-coconut-sugar.jpeg",category:"Coconut Products",description:"A plant-based sweetener made from the sap of the coconut palm."},
  {id:11,name:"Organic Coconut Condensed Milk",image:"catalog-organic-coconut-condensed-milk.jpeg",category:"Coconut Products",description:"A sweetened, non-dairy coconut alternative for baking, desserts and beverages."},
  {id:12,name:"Organic King Coconut Water",image:"catalog-organic-king-coconut-water.jpeg",category:"Coconut Products",description:"Water from organic King Coconuts, a golden-orange variety native to Sri Lanka. Available in several flavours."},
  {id:13,name:"Organic Virgin King Coconut Oil",image:"catalog-organic-virgin-king-coconut-oil.jpeg",category:"Coconut Products",description:"Virgin oil made from King Coconuts, a distinctive golden-orange variety native to Sri Lanka."},
  {id:14,name:"Organic Dehydrated Products",image:"official-dehydrated-products.png",category:"Dehydrated Products",description:"Unsweetened dried fruit with no added sulfites, preservatives or other additives."},
  {id:15,name:"Sun Rich Paradise Jack Mackerel, 425g",image:"official-jack-mackerel.png",category:"Canned Fish & Tuna",description:"Sri Lankan-made canned jack mackerel sourced from local fishermen and manufactured under SLS standards."},
  {id:16,name:"Shredded Tuna with Sunflower Oil, 185g",image:"official-shredded-tuna.png",category:"Canned Fish & Tuna",description:"Sri Lankan shredded tuna packed in sunflower oil and manufactured under SLS standards."},
];

const PRODUCT_CATEGORIES=["All Products","Coconut Products","Dehydrated Products","Canned Fish & Tuna"];

const AppContext=createContext(null);
function useApp(){return useContext(AppContext)}

function AppProvider({children}){
  const [cart,setCart]=useState([]);
  const [wishlist,setWishlist]=useState([3]);
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

function Header(){
  const {cart,wishlist,openCart}=useApp();
  const [mobile,setMobile]=useState(false);
  return <header>
    <div className="topbar"><span><MapPin size={13}/> Manufacturer &amp; exporter · Negombo, Sri Lanka</span><span>Sun Rich Paradise</span></div>
    <div className="navwrap">
      <button className="mobile-menu" onClick={()=>setMobile(!mobile)}><Menu/></button>
      <Link className="logo" to="/" aria-label="Sun Rich Paradise home"><img className="brand-logo" src="/Sun-Rich-Paradise%20logo.png" alt="Sun Rich Paradise"/></Link>
      <nav className={mobile?"mobile-open":""}>
        <NavLink to="/">Home</NavLink>
        <div className="nav-dropdown"><NavLink to="/products">Products <ChevronDown size={13}/></NavLink><div className="products-menu">{PRODUCT_CATEGORIES.map(x=><Link key={x} role="menuitem" to={x==="All Products"?"/products":`/products?category=${encodeURIComponent(x)}`} onClick={()=>setMobile(false)}>{x}</Link>)}</div></div>
        <NavLink to="/about">Quality</NavLink>
        <NavLink to="/about">About Us</NavLink>
        <NavLink to="/contact">Contact us</NavLink>
      </nav>
      <div className="nav-actions">
        <a className="phone" href="tel:+94117090222"><Phone size={18}/> +94 11 709 0222</a>
        <Link to="/products" aria-label="Search products"><Search/></Link>
        <Link to="/wishlist" className="icon-badge"><Heart/><em>{wishlist.length}</em></Link>
        <button onClick={openCart} className="icon-badge"><ShoppingBag/><em>{cart.reduce((a,x)=>a+x.qty,0)}</em></button>
        <Link to="/login"><UserRound/></Link>
      </div>
    </div>
  </header>
}

function Footer(){
  return <footer>
    <div className="footer-top">
      <div><Link className="footer-logo" to="/" aria-label="Sun Rich Paradise home"><img className="brand-logo" src="/Sun-Rich-Paradise%20logo.png" alt="Sun Rich Paradise"/></Link><p>Organic coconut products from Sri Lanka.<br/>Manufactured and exported by<br/>Abey Marine (Pvt) Ltd.</p>
        <div className="socials"><span><Linkedin/></span><span><Instagram/></span><span><Facebook/></span></div>
      </div>
      <div><h4>Product Line</h4><Link to="/products">Coconut Products</Link><Link to="/products">Dehydrated Products</Link><Link to="/products">Canned Fish &amp; Tuna</Link><a href="https://sunrich.org/wp-content/uploads/2022/02/Sunrich_Product-Catoloug.pdf" target="_blank" rel="noreferrer">Product Catalogue</a></div>
      <div><h4>Company</h4><Link to="/about">About Sun Rich</Link><Link to="/products">Products</Link><Link to="/contact">Private Label &amp; Bulk Orders</Link><a href="https://sunrich.org/" target="_blank" rel="noreferrer">Official Website</a></div>
      <div><h4>Contact</h4><p>Negombo, Sri Lanka</p><p><a href="tel:+94117090222">+94 11 709 0222</a></p><p><a href="tel:+94707779787">+94 70 777 9787</a></p><p><a href="mailto:info@sunrich.org">info@sunrich.org</a></p></div>
    </div>
    <div className="footer-bottom"><span>© 2026 Sun Rich Paradise · Abey Marine (Pvt) Ltd.</span><span>Made in Sri Lanka</span></div>
  </footer>
}

function Layout({children}){return <><Header/>{children}<Footer/></>}

function ProductCard({p}){
  const {wishlist,toggleWishlist,addToCart}=useApp();
  const wished=wishlist.includes(p.id);
  return <div className={"product-card "+(p.id===3?"selected":"")}>
    {p.tag&&<span className="sale">{p.tag}</span>}
    <Link to={`/products/${p.id}`} className="product-image"><img src={A+p.image} alt={p.name}/><button aria-label={`Add ${p.name} to inquiry`} onClick={e=>{e.preventDefault();addToCart(p)}} className="quick-cart"><ShoppingBag/></button><button aria-label={`Save ${p.name} to wishlist`} onClick={e=>{e.preventDefault();toggleWishlist(p.id)}} className="wish"><Heart fill={wished?"currentColor":"none"}/></button></Link>
    <div className="product-meta"><h3>{p.name}</h3><div><b>Price on request</b><span className="mini-cart" title="Add to inquiry" onClick={()=>addToCart(p)}><ShoppingBag size={15}/></span></div><small>Sun Rich Paradise · Sri Lanka</small></div>
  </div>
}

export function Home(){
  const {openNewsletter}=useApp();
  return <Layout>
    <section className="hero">
      <img src={A+"hero-basket.jpg"} />
      <div><small>WELCOME TO SUN RICH PARADISE</small><h1>Sri Lankan coconuts.<br/>Made for the world.</h1><p>Organic coconut products · Export supply · Private label</p><p className="muted">Abey Marine (Pvt) Ltd manufactures and exports coconut products from Negombo, Sri Lanka, with bulk supply and private-label packing for international partners.</p><Link className="btn" to="/products">Explore Products <ArrowRight size={16}/></Link></div>
    </section>
    <section className="benefits">
      <Benefit icon={<ShieldCheck/>} title="Certified Organic" text="Organic coconut product range" active/>
      <Benefit icon={<CheckCircle2/>} title="CDA Approved" text="Factory approved by Sri Lanka's CDA"/>
      <Benefit icon={<Package/>} title="Private Label" text="Packing options for export partners"/>
      <Benefit icon={<Truck/>} title="Bulk Shipping" text="Export supply from Sri Lanka"/>
    </section>
    <section className="trust section">
      <div className="collage"><img src={A+"farmer-1.jpg"}/><img src={A+"farmer-2.jpg"}/></div>
      <div><small>ABOUT SUN RICH PARADISE</small><h2>Coconut products from Sri Lanka's coconut triangle.</h2>
        <p>Manufacturing and export, rooted in Negombo.</p><p className="muted">Abey Marine (Pvt) Ltd produces Sun Rich Paradise virgin coconut oil and a range of coconut products. Its Negombo facility is positioned near coconut plantations, Colombo Port and the international airport.</p>
        <p>Built for international supply.</p><p className="muted">Sun Rich offers private-label packing and bulk shipping alongside its own product range.</p>
        <Link className="btn" to="/about">Our Company <ArrowRight size={16}/></Link>
      </div>
    </section>
    <section className="stats"><div><b>16</b><span>Listed Product Lines</span></div><div><b>CDA</b><span>Approved Factory</span></div><div><b>Negombo</b><span>Sri Lanka</span></div><div><b>Bulk</b><span>And Private-Label Supply</span></div></section>
    <section className="section featured"><div className="section-head"><h2>Featured Products</h2><Link to="/products">View All <ArrowRight size={15}/></Link></div><p className="price-note">Prices are provided on request. Contact Sun Rich for current export and bulk quotations.</p><div className="products-grid four">{PRODUCTS.slice(0,4).map(p=><ProductCard p={p} key={p.id}/>)}</div></section>
    <section className="testimonials"><small>EXPORT SERVICES</small><h2>Supply solutions for your market.</h2><div className="testimonial-grid"><article><span className="quote"><Package/></span><h3>Private-label packing</h3><p>Pack Sun Rich products for your brand and market requirements.</p></article><article><span className="quote"><Truck/></span><h3>Bulk supply</h3><p>Shipping options for international buyers and business partners.</p></article><article><span className="quote"><ShieldCheck/></span><h3>Quality-focused production</h3><p>Organic products and a factory approved by Sri Lanka's Coconut Development Authority.</p></article></div></section>
    <section className="contact-strip"><div><MapPin/><b>OUR LOCATION</b><span>Negombo, Sri Lanka<br/>Near plantations, port and airport</span></div><div><Phone/><b>CONTACT OUR TEAM</b><span><a href="tel:+94117090222">+94 11 709 0222</a><br/><a href="mailto:info@sunrich.org">info@sunrich.org</a></span></div><div className="newsletter-box"><Mail/><b>SUBSCRIBE NEWSLETTER</b><div><input type="email" placeholder="Your email address"/><button onClick={openNewsletter}>Subscribe</button></div></div></section>
  </Layout>
}

function Benefit({icon,title,text,active}){return <div className={active?"active":""}><span>{icon}</span><b>{title}</b><small>{text}</small></div>}

export function ProductsPage(){
  const [quick,setQuick]=useState(null);
  const router=useRouter();
  const category=typeof router.query.category==="string"?router.query.category:"All Products";
  const setCategory=value=>router.push({pathname:"/products",query:value==="All Products"?{}:{category:value}},undefined,{shallow:true});
  const [sort,setSort]=useState("featured");
  const [query,setQuery]=useState("");
  const categories=PRODUCT_CATEGORIES;
  const visibleProducts=PRODUCTS.filter(p=>(category==="All Products"||p.category===category)&&p.name.toLowerCase().includes(query.trim().toLowerCase())).sort((a,b)=>sort==="name"?a.name.localeCompare(b.name):a.id-b.id);
  return <Layout>
    <PageTitle title="Products" crumb="Products"/>
    <section className="section products-layout"><aside><b>Categories</b>{categories.map(x=><button className={category===x?"cat-active":""} key={x} onClick={()=>setCategory(x)}>{x}<ChevronRight size={13}/></button>)}<hr/><b>Export pricing</b><p className="catalog-note">Prices vary by product, pack size and order volume. Request a current quote.</p><Link className="text-link" to="/contact">Contact Sun Rich <ArrowRight size={14}/></Link></aside><main><div className="product-toolbar"><label className="catalog-search"><Search size={16}/><input aria-label="Search products" placeholder="Search products" value={query} onChange={e=>setQuery(e.target.value)}/></label><span>Showing {visibleProducts.length} of {PRODUCTS.length} products</span><select aria-label="Sort products" value={sort} onChange={e=>setSort(e.target.value)}><option value="featured">Sort by: Featured</option><option value="name">Name: A to Z</option></select></div><p className="price-note">For current pricing, pack sizes and export terms, please request a quote.</p>{visibleProducts.length?<div className="products-grid four">{visibleProducts.map(p=><div key={p.id}><ProductCard p={p}/><button className="quick-link" onClick={()=>setQuick(p)}><Eye size={14}/> Quick view</button></div>)}</div>:<Empty title="No products found" text="Try another search or adjust your filters."/>}</main></section>
    {quick&&<Modal onClose={()=>setQuick(null)}><QuickView p={quick}/></Modal>}
  </Layout>
}

function PageTitle({title,crumb}){return <div className="page-title"><div><Link to="/">Home</Link><ChevronRight size={14}/><span>{crumb}</span></div><h1>{title}</h1></div>}

function QuickView({p}){const {addToCart}=useApp();const [qty,setQty]=useState(1);return <div className="quickview"><img src={A+p.image} alt={p.name}/><div><small>{p.category} · Sri Lanka</small><h2>{p.name}</h2><h3>Price on request</h3><p>{p.description}</p><p className="muted">Ask us to confirm available pack sizes and export pricing.</p><div className="qty"><button aria-label="Decrease quantity" onClick={()=>setQty(q=>Math.max(1,q-1))}><Minus size={15}/></button><span>{qty}</span><button aria-label="Increase quantity" onClick={()=>setQty(q=>q+1)}><Plus size={15}/></button></div><button className="btn" onClick={()=>addToCart(p,qty)}>Add to inquiry <ShoppingBag size={16}/></button></div></div>}

export function ProductDetail({id}){
  const p=PRODUCTS.find(x=>x.id===Number(id))||PRODUCTS[2]; const {addToCart}=useApp();const [qty,setQty]=useState(1);const [tab,setTab]=useState("Description");
  return <Layout><PageTitle title="Product Details" crumb={p.name}/><section className="section detail"><div className="detail-image"><img src={A+p.image} alt={p.name}/></div><div><small>{p.category} · Sri Lanka</small><h1>{p.name}</h1><h2>Price on request</h2><p className="muted">{p.description}</p><ul className="check-list"><li><CheckCircle2/>Manufactured in Sri Lanka</li><li><CheckCircle2/>Private-label packing available</li><li><CheckCircle2/>Bulk export enquiries welcome</li></ul><div className="qty-row"><div className="qty"><button aria-label="Decrease quantity" onClick={()=>setQty(q=>Math.max(1,q-1))}><Minus size={15}/></button><span>{qty}</span><button aria-label="Increase quantity" onClick={()=>setQty(q=>q+1)}><Plus size={15}/></button></div><button className="btn" onClick={()=>addToCart(p,qty)}>Add to inquiry <ShoppingBag size={16}/></button></div></div></section><section className="section tabs">{["Description","Additional Information","Feedbacks"].map(x=><button className={tab===x?"tab-active":""} key={x} onClick={()=>setTab(x)}>{x}</button>)}<div><h3>{tab}</h3>{tab==="Description"?<p>{p.description}</p>:tab==="Additional Information"?<p>Product line: {p.category}<br/>Origin: Sri Lanka<br/>Available services: Private-label packing and bulk shipping.</p>:<p>For product feedback, specifications or a quotation, please <Link to="/contact">contact Sun Rich Paradise</Link>.</p>}</div></section><section className="section"><div className="section-head"><h2>Related Products</h2><Link to="/products">View All <ArrowRight size={15}/></Link></div><div className="products-grid four">{PRODUCTS.filter(x=>x.id!==p.id).slice(0,4).map(x=><ProductCard p={x} key={x.id}/>)}</div></section></Layout>
}

export function Wishlist(){
  const {wishlist,cart,addToCart,toggleWishlist}=useApp(); const items=PRODUCTS.filter(p=>wishlist.includes(p.id));
  return <Layout><PageTitle title="My Wishlist" crumb="Wishlist"/><section className="section table-wrap">{items.length?<table><thead><tr><th>Product</th><th>Pricing</th><th>Supply</th><th>Action</th></tr></thead><tbody>{items.map(p=><tr key={p.id}><td><div className="table-product"><img src={A+p.image}/><span>{p.name}</span></div></td><td>Price on request</td><td><span className="in-stock">Export inquiry</span></td><td><button className="btn small" onClick={()=>addToCart(p)}>Add to inquiry</button><button className="remove" onClick={()=>toggleWishlist(p.id)}><Trash2 size={15}/></button></td></tr>)}</tbody></table>:<Empty title="Your wishlist is empty" text="Save products here and find them again later."/>}</section></Layout>
}

function CartDrawer({close}){const {cart,removeFromCart,setQty}=useApp();return <div className="overlay" onClick={close}><aside className="drawer" onClick={e=>e.stopPropagation()}><div className="drawer-head"><h2>Inquiry List</h2><button onClick={close}><X/></button></div>{cart.length?cart.map(x=><div className="drawer-item" key={x.id}><img src={A+x.image} alt=""/><div><b>{x.name}</b><span>Price on request</span><div className="qty"><button aria-label={`Remove one ${x.name}`} onClick={()=>setQty(x.id,x.qty-1)}><Minus size={12}/></button><span>{x.qty}</span><button aria-label={`Add one ${x.name}`} onClick={()=>setQty(x.id,x.qty+1)}><Plus size={12}/></button></div></div><button aria-label={`Remove ${x.name}`} onClick={()=>removeFromCart(x.id)}><Trash2 size={14}/></button></div>):<Empty title="Your inquiry list is empty" text="Add products to request export pricing."/>}<p className="catalog-note">Final pricing depends on product specifications, packaging and order volume.</p><Link className="btn wide" to="/billing" onClick={close}>Request a Quote</Link><Link className="continue" to="/products" onClick={close}>Continue Browsing</Link></aside></div>}

export function Billing(){const {cart}=useApp();const [sent,setSent]=useState(false);return <Layout><PageTitle title="Request a Quote" crumb="Quote Request"/><section className="section checkout"><form id="quote-form" onSubmit={e=>{e.preventDefault();setSent(true)}}><h2>Your Contact Details</h2><div className="form-grid"><label>Full Name<input required autoComplete="name"/></label><label>Company<input autoComplete="organization"/></label><label>Country / Region<input required autoComplete="country-name"/></label><label>Phone<input required type="tel" autoComplete="tel"/></label><label className="full">Business Email<input type="email" required autoComplete="email"/></label><label className="full">Requirements<textarea placeholder="Target quantity, packaging, destination market, and any product specifications" required/></label></div></form><aside className="order-box"><h2>Products for Quote</h2>{cart.length?cart.map(x=><div className="order-row" key={x.id}><span>{x.name}</span><b>Qty {x.qty}</b></div>):<p className="muted">Your inquiry list is empty. Browse the catalog and add products to request a quote.</p>}<button className="btn wide" type="submit" form="quote-form" disabled={!cart.length}>Send Quote Request</button>{sent&&<p className="form-status" role="status">Your quote request is ready. Connect the inquiry form to the sales team to submit it.</p>}</aside></section></Layout>}

export function Auth({register=false}){const [submitted,setSubmitted]=useState(false);return <Layout><PageTitle title={register?"Create Account":"Sign In"} crumb={register?"Create Account":"Login"}/><section className="auth"><form onSubmit={e=>{e.preventDefault();setSubmitted(true)}}>{register?<><h2>Create Account</h2><label>Name<input required autoComplete="name"/></label><label>Email<input type="email" required autoComplete="email"/></label><label>Password<input type="password" required minLength={8} autoComplete="new-password"/></label><label>Confirm Password<input type="password" required minLength={8} autoComplete="new-password"/></label><button className="btn wide">Create Account</button><p>Already have an account? <Link to="/login">Sign in</Link></p></>:<><h2>Sign in</h2><label>Email<input type="email" required autoComplete="email"/></label><label>Password<input type="password" required autoComplete="current-password"/></label><div className="remember"><label><input type="checkbox"/> Remember me</label><Link to="#">Forgot Password?</Link></div><button className="btn wide">Sign in</button><p>Don't have an account? <Link to="/create-account">Create account</Link></p></>}{submitted&&<p className="form-status" role="status">Your details are valid. Connect an authentication service to finish {register?"creating an account":"signing in"}.</p>}</form></section></Layout>}

export function Contact(){const [sent,setSent]=useState(false);return <Layout><PageTitle title="Contact Us" crumb="Contact Us"/><section className="section contact-page"><div className="contact-cards"><div><MapPin/><b>Our Location</b><span>Negombo, Sri Lanka<br/>Coconut triangle</span></div><div><Phone/><b>Office Phone</b><a href="tel:+94117090222">+94 11 709 0222</a><a href="tel:+94707779787">+94 70 777 9787</a></div><div><Mail/><b>Email Us</b><a href="mailto:info@sunrich.org">info@sunrich.org</a></div></div><form className="contact-form" onSubmit={e=>{e.preventDefault();setSent(true)}}><h2>Just Say Hello!</h2><p className="muted">Contact us for product information, private-label packing, bulk orders or export quotations.</p><div className="form-grid"><label>Name<input required autoComplete="name"/></label><label>Email<input type="email" required autoComplete="email"/></label><label>Phone<input type="tel"/></label><label>Subject<input required/></label><label className="full">Message<textarea required minLength={10}/></label></div><button className="btn">Send Message <ArrowRight size={16}/></button>{sent&&<p className="form-status" role="status">Thanks for reaching out. Your message is ready for Sun Rich Paradise.</p>}</form></section></Layout>}

export function About(){return <Layout><PageTitle title="About Sun Rich Paradise" crumb="About Us"/><section className="about-hero"><div><small>ABEY MARINE (PVT) LTD</small><h1>Manufacturing Sri Lankan coconut products for export.</h1><p>Sun Rich Paradise is a coconut-products manufacturer, exporter and supplier based in Negombo, Sri Lanka.</p><Link className="btn" to="/products">Explore Products <ArrowRight size={16}/></Link></div><img src={A+"farmer-2.jpg"}/></section><section className="section about-grid"><div><small>OUR FACILITY</small><h2>At the heart of Sri Lanka's coconut triangle.</h2></div><div><p>The Sun Rich Paradise Virgin Coconut Oil facility is located in Negombo, with access to coconut plantations, Colombo Port and the international airport.</p><p>The company supplies its own branded products and offers private-label packing and bulk shipping for business partners. Its factory is approved by the Coconut Development Authority of Sri Lanka.</p><a className="btn" href="https://sunrich.org/wp-content/uploads/2022/02/Sunrich_Product-Catoloug.pdf" target="_blank" rel="noreferrer">View Product Catalogue <ArrowRight size={16}/></a></div></section><section className="stats"><div><b>16</b><span>Listed Product Lines</span></div><div><b>CDA</b><span>Approved Factory</span></div><div><b>Negombo</b><span>Sri Lanka</span></div><div><b>Bulk</b><span>And Private-Label Supply</span></div></section></Layout>}

export function NotFound(){return <Layout><section className="notfound"><div className="four04">404</div><h1>Oops! Page not found</h1><p>The page you're looking for doesn't exist or has been moved.</p><Link className="btn" to="/">Back to Home</Link></section></Layout>}

function Empty({title,text}){return <div className="empty"><ShoppingBag/><h2>{title}</h2><p>{text}</p><Link className="btn" to="/products">Shop Products</Link></div>}
function Modal({children,onClose}){return <div className="overlay" onClick={onClose}><div className="modal" onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={onClose}><X/></button>{children}</div></div>}
function Newsletter({close}){const [subscribed,setSubscribed]=useState(false);return <Modal onClose={close}><form className="newsletter-modal" onSubmit={e=>{e.preventDefault();setSubscribed(true)}}><img src={A+"hero-basket.jpg"} alt="Fresh Sri Lankan produce"/><div><small>STAY IN THE LOOP</small><h2>Subscribe to Our Newsletter</h2><p>Get product updates, seasonal offers and news from Sun Rich.</p><input type="email" placeholder="Your email address" aria-label="Your email address" required/><button className="btn wide">Subscribe</button>{subscribed&&<p className="form-status" role="status">You're on the list for Sun Rich updates.</p>}</div></form></Modal>}

function CartOverlay(){const {cartOpen,closeCart}=useApp(); return cartOpen?<CartDrawer close={closeCart}/>:null}
function FloatingCart(){const {cart,openCart}=useApp(); if(!cart.length)return null; return <button className="floating-cart" onClick={openCart}><ShoppingBag/><span>{cart.reduce((a,x)=>a+x.qty,0)}</span></button>}
