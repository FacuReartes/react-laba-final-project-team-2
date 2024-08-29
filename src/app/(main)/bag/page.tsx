"use client"
import Product from "@/components/bag/Product";
import Summary from "@/components/bag/Summary";
import { Box, Divider, List, ListItem, Typography } from "@mui/material";
import { useState } from "react";

interface IProduct {
  id: number
  imageUrl: string,
  name: string,
  price: string,
  genre: "Men's Shoes" | "Women's Shoes",
}

const mockData: IProduct[] = [
  { id: 1, imageUrl: '/bag-mock/shoe-1.svg', name: 'Nike Air Max 270', price: '$160', genre: "Women's Shoes" },
  { id: 2, imageUrl: '/bag-mock/shoe-2.svg', name: 'Nike Air Max 90', price: '$140', genre: "Men's Shoes" },
  { id: 3, imageUrl: '/bag-mock/shoe-3.svg', name: "Nike Air Force 1 '07 SE", price: '$110', genre: "Women's Shoes" },
]

export default function Page() {

  const [ shoeList, setShoeList ] = useState<IProduct[]>(mockData)

  const renderList = shoeList.map((x: IProduct, index: number) => {

    const isLast = index === shoeList.length - 1

    return (
      <ListItem key={x.id} sx={{ p: 0, display: 'list-item' }}>
        <Product imageUrl={x.imageUrl} name={x.name} price={x.price} genre={x.genre}/>
        {!isLast && <Divider sx={{ display: { xs: 'none', md: 'block' }}}/>}
      </ListItem>
    )
  })

  return (
    <Box sx={{ pt: { xs: '0px', md: '50px' }, px: { xs: '0px', md: '20px', lg: '50px' , xl: '196px' }, display: 'flex', flexDirection: { xs: 'column', md: 'row' }}}>
      
      <Box sx={{ flexGrow: 1 }}>
        <Typography sx={{ fontWeight: 500, lineHeight: { xs: '35.19px', md: '52.79px' }, fontSize: { xs: '30px', md: '45px' }, my: { xs: '12px', md: '0px' }, ml: { xs: '20px', sm: '125px', md: '0px' }}}>Chart</Typography>
        <List sx={{ p: 0, overflowY: { xs: 'hidden', md: 'auto' } , maxHeight: { xs: 'none', md: '650px' }, pr: { xs: '0px', md: '20px' }}}>
          {renderList}
        </List>
      </Box>

      <Summary/>
      
    </Box>
  )
}