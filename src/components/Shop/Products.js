import ProductItem from './ProductItem';
import classes from './Products.module.css';


const DUMMY_PRODUCTS=[
  {
    id:'p1',
    price:6,
    title:'My first Book',
    description:'The first I wrote'
  },
  {
    id:'p2',
    price:8,
    title:'My Second Book',
    description:'The second book I wrote'
  }
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map(products=>(
           <ProductItem
           key={products.id}
           id={products.id}
           title={products.title}
           price={products.price}
           description={products.description}
         />
        ))}
        
      </ul>
    </section>
  );
};

export default Products;
