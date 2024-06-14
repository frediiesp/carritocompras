import { useState } from "react"
import { db } from "./data/db"
import Header from "./components/Header"
import Guitar from "./components/Guitar"

function App() {
    const maxItems = 5
    // State
    const [data, setData] = useState(db)
    const [cart, setCart] = useState([])

    // Functions
    function addToCart(item) {
        const itemExist = cart.findIndex((guitar) => guitar.id === item.id)
        if (itemExist >= 0) {
            if (cart[itemExist].quantity >= maxItems) return
            // Codigo para no mutar el Array
            const updateCart = [...cart]
            updateCart[itemExist].quantity++
            setCart(updateCart)
        } else {
            item.quantity = 1
            setCart([...cart, item]) // Para no mutar
        }
    }

    function removeFromCart(item) {
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== item))
    }

    function decreaseQuantity(itemId) {
        const updateCart = cart.map(item => {
            if (item.id === itemId && item.quantity > 1) {
                return {
                   ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
        })
        setCart(updateCart)
    }

    function increaseQuantity(itemId) {
        const updateCart = cart.map(item => {
            if (item.id === itemId && item.quantity < maxItems) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })
        setCart(updateCart)
    }

    function clearCart() {
        setCart([])
    }

    return (
        <>
        <Header
            cart={cart}
            removeFromCart={removeFromCart}
            decreaseQuantity={decreaseQuantity}
            increaseQuantity={increaseQuantity}
            clearCart={clearCart}
        />
        <main className="container-xl mt-5">
            <h2 className="text-center">Nuestra Colección</h2>
            <div className="row mt-5">
                {data.map((guitar) => (
                    <Guitar
                        key={guitar.id}
                        guitar={guitar}
                        addToCart={addToCart}
                    />
                ))}
            </div>
        </main>

        <footer className="bg-dark mt-5 py-5">
            <div className="container-xl">
                <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
            </div>
        </footer>
        </>
    )
}

export default App
