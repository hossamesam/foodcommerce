import React from 'react'
import { getProductsByCategory } from '@/server/db/products'
import { db } from '@/lib/prisma'
import Menu from '@/components/menu'
async function MenuPage() {
  // await db.product.createMany({
  //   data: [
  //     {
  //       name: "soes",
  //       basePrice: 250,
  //       image: "https://mr-chew.github.io/images/content/2022/08/database-design.png",
  //       description: "بيزا ايطالي شر قي ميكس",
  //       order: 2,

  //     },
  //   ]
  // })
  const categorites = await getProductsByCategory()
  return (
    <main>
      {categorites.map(categorite => {
        return (
          <section key={categorite.id} className="section-gap">
            <div className='container text-center'>
              <h1 className='text-primary font-bold text-4xl italic mb-6'>
                {categorite.name}
              </h1>
            </div>
            <Menu items={categorite.products} />
          </section>
        )
      }
      )}
    </main>
  )
}

export default MenuPage
