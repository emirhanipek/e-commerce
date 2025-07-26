import { useEffect } from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { useDispatch, useSelector } from "react-redux"
import { addToOrder, deleteCartItem, getCart } from "../../store/shopSlice";
import './cart.css';
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';

export default function Cart() {
    const userId = localStorage.getItem('userId');
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.shop.cart);
    const navigate = useNavigate();

    var total = 0;
    cartItems.map(item => {
        total = total + (item.price * item.quantity)
    })

    const orderBtnOnClick = () => {
        console.log(userId);
        dispatch(addToOrder({userId:userId}));
        navigate('/order');
    }

    const deleteBtnOnClick = (productId) => {
        dispatch(deleteCartItem({ productId, userId }));
    }

    useEffect(() => {
        dispatch(getCart(userId));
    }, [])
    return (
        <div className="container-table">
            <Helmet>
                <title>Alışveriş Sepeti | Sergio Ferrari</title>
                <meta name="description" content="Sergio Ferrari alışveriş sepetiniz. Seçtiğiniz deri cüzdan ve diğer ürünleri görüntüleyin, düzenleyin ve siparişinizi tamamlayın." />
                <meta name="robots" content="noindex, follow" />
            </Helmet>
            <h1 className="text-3xl font-bold mb-6 text-center">Your Shopping Cart</h1>
            {cartItems.length > 0 ?
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cartItems.map(item => {
                                    return (
                                        <tr key={item.productId}>
                                            <td><img src={`${process.env.REACT_APP_API_URL}${item.imgUrl}`} alt={item.name} /></td>
                                            <td>{item.name}</td>
                                            <td>${item.price.toFixed(2)}</td>
                                            <td>{item.quantity}</td>
                                            <td><button className="btn-delete" onClick={() => { deleteBtnOnClick(item.productId) }}><DeleteOutlineIcon /></button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '1rem', 
                        backgroundColor: '#f9fafb',
                        borderBottomLeftRadius: '8px',
                        borderBottomRightRadius: '8px',
                        borderTop: '2px solid #e5e7eb',
                        fontWeight: 'bold'
                    }}>
                        <span>Total Items: {cartItems.length}</span>
                        <span style={{ fontSize: '1.25rem', color: '#000000' }}>Total: ${total.toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                        <button className="btn-shop" onClick={() => { orderBtnOnClick() }}>
                            <ShoppingCartCheckoutIcon style={{ marginRight: '0.5rem' }} />
                            Complete Checkout
                        </button>
                    </div>
                </>
                : <div style={{
                    textAlign: 'center',
                    padding: '3rem',
                    backgroundColor: '#f9fafb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Your cart is empty</h2>
                    <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Looks like you haven't added any products to your cart yet.</p>
                    <button className="btn-shop" onClick={() => navigate('/products')}>
                        Continue Shopping
                    </button>
                </div>
            }
        </div>
    )
}
