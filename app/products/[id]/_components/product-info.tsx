'use client'

import DiscountBadge from '@/app/_components/discount-badge'
import ProductList from '@/app/_components/products-list'

import { Button } from '@/app/_components/ui/button'
import { Card } from '@/app/_components/ui/card'
import {
  calculateProductTotalPrice,
  formatCurrency,
} from '@/app/_helpers/price'
import { Prisma } from '@prisma/client'
import {
  BikeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TimerIcon,
} from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface ProductInfoProps {
  product: Prisma.ProductGetPayload<{ include: { restaurant: true } }>
  complementaryProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true
    }
  }>[]
}

const ProductInfo = ({ product, complementaryProducts }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1)

  const handleIncreaseQuantityClick = () =>
    setQuantity((currentState) => currentState + 1)

  const handleDecreaseQuantityClick = () =>
    setQuantity((currentState) => {
      if (currentState === 1) return 1
      return currentState - 1
    })

  return (
    <div className="py-5">
      {/* RESTAURANTE */}
      <div className="flex items-center gap-[0.375rem] px-5">
        <div className="relative h-6 w-6">
          <Image
            src={product.restaurant.imageUrl}
            alt={product.restaurant.name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <span className="text-xs text-muted-foreground">
          {product.restaurant.name}
        </span>
      </div>

      {/* NOME DO PRODUTO */}
      <h1 className="font-semibold text-xl mb-3 mt-1 px-5">{product.name}</h1>

      {/* PREÇO DO PRODUTO E QUANTIDADE */}
      <div className="flex justify-between px-5">
        {/* PREÇO COM DESCONTO */}
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-xl">
              {formatCurrency(calculateProductTotalPrice(product))}
            </h2>

            {product.discountPercentage > 0 && (
              <DiscountBadge product={product} />
            )}
          </div>

          {/* PREÇO ORIGINAL */}
          {product.discountPercentage > 0 && (
            <p className="text-muted-foreground text-sm">
              De: {formatCurrency(Number(product.price))}
            </p>
          )}
        </div>
        {/* QUANTIDADE */}
        <div className="flex gap-3 items-center text-center">
          <Button
            size="icon"
            variant="ghost"
            className="border-muted-foreground border border-solid"
            onClick={handleDecreaseQuantityClick}
          >
            <ChevronLeftIcon />
          </Button>
          <span className="w-4">{quantity}</span>
          <Button size="icon" onClick={handleIncreaseQuantityClick}>
            <ChevronRightIcon />
          </Button>
        </div>
      </div>

      {/* DADOS DA ENTREGA */}
      <div className="px-5">
        <Card className="flex justify-around py-3 mt-6 px-5">
          {/* CUSTO */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="text-xs">Entrega</span>
              <BikeIcon size={14} />
            </div>

            {Number(product.restaurant.deliveryFee) > 0 ? (
              <div className="text-xs font-semibold">
                {formatCurrency(Number(product.restaurant.deliveryFee))}
              </div>
            ) : (
              <p className="text-xs font-semibold">Grátis</p>
            )}
          </div>

          {/* TEMPO */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="text-xs">Entrega</span>
              <TimerIcon size={14} />
            </div>

            {Number(product.restaurant.deliveryFee) > 0 ? (
              <div className="text-xs font-semibold">
                {formatCurrency(Number(product.restaurant.deliveryFee))}
              </div>
            ) : (
              <p className="text-xs font-semibold">Grátis</p>
            )}
          </div>
        </Card>
      </div>

      {/* DESCRIÇÃO */}
      <div className="mt-6 py-3 px-5">
        <h3 className="font-semibold">Sobre</h3>
        <p className="text-muted-foreground text-sm">{product.description}</p>
      </div>

      {/* SUCOS */}
      <div className="mt-6 space-y-3 ">
        <h3 className="font-semibold px-5">Sucos</h3>
        <ProductList products={complementaryProducts} />
      </div>
    </div>
  )
}

export default ProductInfo
