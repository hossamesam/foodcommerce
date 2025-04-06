import React from 'react'
import CartItems from './_components/CartItems'
import CheckoutForm from './_components/CheckoutForm'

function CartPage() {
  return (
    <main>
      <section className='section-gap'>
        <div className=''>
          <h1 >
            cart
          </h1>
          <div className=' grid  px-8  grid-cols-1 lg:grid-cols-2 gap-10'>
            <CartItems />
            <CheckoutForm />
          </div>

        </div>
      </section>

    </main>
  )
}

export default CartPage
