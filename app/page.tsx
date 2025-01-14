import CategoryList from './_components/category-list'
import Header from './_components/header'
import Search from './_components/search-input'
import ProductList from './_components/products-list'
import { Button } from './_components/ui/button'
import { ChevronRightIcon } from 'lucide-react'
import { db } from './_lib/prisma'
import PromoBanner from './_components/pomo-banner'
import RestaurantList from './_components/restaurant-list'

const Home = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
    take: 10,
  })

  return (
    <>
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>

      <div className="px-5 pt-6">
        <CategoryList />
      </div>

      <div className="px-5 pt-6">
        <PromoBanner
          src="/promo-banner01.png"
          alt="Até 30% de deconto em pizza"
        />
      </div>

      <div className="space-y-4 pt-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Produtos Recomendados</h2>
          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
          >
            Ver todos
            <ChevronRightIcon size={16} />
          </Button>
        </div>

        <ProductList products={products} />
      </div>

      <div className="px-5 pt-6">
        <PromoBanner
          src="/promo-banner02.png"
          alt="A partir de R$ 17,90 em lanches"
        />
      </div>

      <div className="space-y-4 py-4">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Restaurantes Recomendados</h2>
          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
          >
            Ver todos
            <ChevronRightIcon size={16} />
          </Button>
        </div>

        <RestaurantList />
      </div>
    </>
  )
}

export default Home
