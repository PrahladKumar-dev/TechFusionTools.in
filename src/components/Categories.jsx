import { categoryData } from "../data";
import "./Categories.css";
export default function Categories({onChooseCategory}) {
 return <section className="categories-section section-wrap" id="categories"><div className="section-heading"><div><span className="section-eyebrow">OUR CATEGORIES</span><h2>EXPLORE TOOLS <em>BY CATEGORY</em></h2><p>Find the right tools for soldering, rework, inspection and more.</p></div><a className="small-outline" href="#products">View All Categories <b>→</b></a></div>
 <div className="category-grid">{categoryData.map(item=><button className="category-card" key={item.key} onClick={()=>{onChooseCategory(item.categoryMatch);document.querySelector("#products")?.scrollIntoView({behavior:"smooth"})}}><span className="category-image"><img src={item.image} alt={item.name}/></span><span className="category-info"><span className="category-title"><b>{item.icon}</b>{item.name}</span><span className="category-description">{item.description}</span><span className="category-link">Explore Category&nbsp; →</span></span></button>)}</div>
 </section>
}
