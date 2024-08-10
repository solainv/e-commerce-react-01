import React, { useState } from 'react';
import CommonSection from "../components/UI/CommonSection"
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col } from 'reactstrap';
import '../styles/Shop.css';
import products from '../assets/data/products';
import ProductsList from '../components/UI/ProductsList';

const Shop = () => {

  const [productsData, setProductsData] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const categories = [...new Set(products.map(item => item.category))];


  const handleFilter = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    filterAndSortProducts(category, sortOrder);
  };

  const handleSort = (e) => {
    const order = e.target.value;
    setSortOrder(order);
    filterAndSortProducts(selectedCategory, order);
  };


  const filterAndSortProducts = (category, order) => {
    // Filtere die Produkte nach der ausgewählten Kategorie
    let filteredProducts = category
      ? products.filter(item => item.category === category)
      : [...products];

    // Sortiere die gefilterten Produkte nach Preis
    if (order) {
      filteredProducts.sort((a, b) => {
        return order === 'ascending' ? a.price - b.price : b.price - a.price;
      });
    }

    // Setze die gefilterten und sortierten Produkte in den Zustand
    setProductsData(filteredProducts);
  };





  const handleSearch = e => {
    const searchTerm = e.target.value
    const searchedProducts = products.filter(item => item.productName.toLowerCase().includes(searchTerm.toLowerCase()))
    setProductsData(searchedProducts);


  }

  return (
    <>
      <Helmet title='Shop' />
      <CommonSection title='Products' />


      <section>
        <Container>
          <Row>
            <Col lg='3' md='6'>
              {/* <div className="filter__widget">
                <select name="" id="" onChange={handleFilter}>
                  <option defaultValue>Filter By Category</option>
                  <option value="sofa">Sofa</option>
                  <option value="mobile">Mobile</option>
                  <option value="chair">Chair</option>
                  <option value="watch">Watch</option>
                  <option value="wireless">Wireless</option>
                </select>
              </div> */}

              <div className="filter__widget">
                <select name="category" id="category" onChange={handleFilter}>
                  <option value="">Filter By Category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

            </Col>
            <Col lg='3' md='6' className='text-end'>
              <div className="filter__widget">
                <select name="sort" id="sort" onChange={handleSort}>
                  <option value="">Sort By Price</option>
                  <option value="ascending">Ascending</option>
                  <option value="descending">Descending</option>
                </select>
              </div>


            </Col>
            <Col lg='6' md='12' >
              <div className="filter__widget">
                <div className="search__box">
                  <input type="text" name="" id="" placeholder='Search...' onChange={handleSearch} />
                  <span>
                    <i className="ri-search-line"></i>
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className='pt-0'>
        <Container>
          <Row>
            {
              productsData.length === 0 ? <h1 className='text-center fs-4'>No Products are found!</h1> : <ProductsList data={productsData} />
            }
          </Row>
        </Container>
      </section>
      <section className='pt-0'>
      </section>
    </>

  );
};

export default Shop;