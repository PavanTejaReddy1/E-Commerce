import React, { useContext, useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../context/ShopContext'
import all_product from '../Assets/all_product'

const Navbar = () =>{

    const [menu,setMenu] = useState("shop");
    const {getTotalCartItems}= useContext(ShopContext);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    
    const handleSearchInputChange = (event) =>{
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        if (query === ''){
            setSearchResults([]);
        }else{
        const filteredProducts = all_product.filter(product => product.name.toLowerCase().includes(query)
        );
        setSearchResults(filteredProducts);
        }
    }

    const clearSearch = () => {
        setSearchQuery("");
        setSearchResults([]);
    }

    const handleMenuClick = (menu) =>{
        setMenu(menu);
        clearSearch();
    }

    return (
        <div>
            <div className='navbar'>
                <div className="nav-logo">
                    <img src={logo} alt="" />
                    <p>SHOPPER</p>
                </div>
                <ul className="nav-menu">
                    <li onClick={()=>{handleMenuClick("shop")}}><Link style={{textDecoration: 'none'}} to='/'>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
                    <li onClick={()=>{handleMenuClick("mens")}}><Link style={{textDecoration: 'none'}} to='/mens'>Men</Link>{menu==="mens"?<hr/>:<></>}</li>
                    <li onClick={()=>{handleMenuClick("womens")}}><Link style={{textDecoration: 'none'}} to='/womens'>Women</Link>{menu==="womens"?<hr/>:<></>}</li>
                    <li onClick={()=>{handleMenuClick("kids")}}><Link style={{textDecoration: 'none'}} to='/kids'>Kid</Link>{menu==="kids"?<hr/>:<></>}</li>
                </ul>
                <div className="nav-login-cart">
                    <input className='searchbar' type="text" placeholder='search...' value={searchQuery} onChange={handleSearchInputChange} onClick={clearSearch}/>
                    <Link onClick={()=>{handleMenuClick("login")}} to='/login'><button>Login</button></Link>
                    <Link onClick={()=>{handleMenuClick("cart")}} to='/cart'><img src={cart_icon} alt="" /></Link>
                    <div className="nav-cart-count">{getTotalCartItems()}</div>
                </div>
            </div>
            <div className="nav-small-screen">
                <ul className="nav-small">
                    <li onClick={()=>{handleMenuClick("shop")}}><Link style={{textDecoration: 'none'}} to='/'>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
                    <li onClick={()=>{handleMenuClick("mens")}}><Link style={{textDecoration: 'none'}} to='/mens'>Men</Link>{menu==="mens"?<hr/>:<></>}</li>
                    <li onClick={()=>{handleMenuClick("womens")}}><Link style={{textDecoration: 'none'}} to='/womens'>Women</Link>{menu==="womens"?<hr/>:<></>}</li>
                    <li onClick={()=>{handleMenuClick("kids")}}><Link style={{textDecoration: 'none'}} to='/kids'>Kid</Link>{menu==="kids"?<hr/>:<></>}</li>
                </ul>
            </div>
            <div className='search-results'>
                {searchResults.length === 0 && searchQuery !== '' ? (
                <p className='searchbarresults'>Couldn't find any matching results for '{searchQuery}'</p>
                ) : (
                        searchResults.map(product =>(
                        <div key={product.id}>
                            <Link style={{textDecoration: 'none'}} to={`/product/${product.id}`} onClick={clearSearch}>
                                <img src={product.image} alt="" />
                                <p>{product.name}</p>
                                <div className='item-prices'>
                                    <div className="productdisplay-right-price-new">₹{product.new_price}</div>
                                    <div className="productdisplay-right-price-old">₹{product.old_price}</div>
                                </div>
                            </Link>
                        </div>
                    ))
                )}
            </div>
                   
        </div>
    )
}

export default Navbar;
