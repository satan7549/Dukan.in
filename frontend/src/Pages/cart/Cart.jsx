import { Box, Button, Checkbox, Divider, Flex, Grid, Heading,Image,   Text } from '@chakra-ui/react'

import React, { useEffect, useState } from 'react'
import SimpleSliders6 from '../../components/HomePage/HomeComp/Slider6'

import SimpleSliders2 from '../../components/HomePage/HomeComp/Slider1'
import SimpleSliders from '../../components/HomePage/HomeComp/Slider3'
import axios from 'axios'
import Navbar from '../../components/Navbar/Navbar'
import Footer1 from '../../components/Footer/Footer1'
import {Link} from "react-router-dom"

const dat=[
 
  
    {
      "_id": "639f497f97b38063c0ba259b",
      "image": "https://www.jcrew.com/s7-img-facade/BC454_BL7286?fmt=jpeg&qlt=90,0&resMode=sharp&op_usm=.1,0,0,0&crop=0,0,0,0&wid=540&hei=540",
      "title": "Kids' short in towel terry",
      "description": "Perfect for warm-weather getaways (or any day), these shorts are made from cozy terry cloth that feels like your softest beach towel. The best part? We made a matching hoodie!",
      "discount": "EXTRA 30% OFF SALE STYLES + EXTRA 15% OFF YOUR PURCHASE WITH CODE SHOPNOW",
      "price": 39.5,
      "discounted_price": 31.99,
      "type": "clothing",
      "category": "kids"
    },
] 
const Cart = () => {
const [qty,setqty]=useState(1)
const [data,setdata]=useState(dat)
const [total,settotal]=useState(0)
const increase=async(id)=>{
  try {
    await axios.patch(`http://localhost:8090/cart/incQty/${id}`,{
      headers:{
        Authorization:JSON.parse(localStorage.getItem("token"))
      },
      body:1,
    })
    
    
  } catch (error) {
    console.log(error)
    
  }

 }
 const decrease =async(id)=>{
  try {
    await axios.patch(`https://smoggy-woolens-lamb.cyclic.app/cart/decQty/${id}`,{
      headers:{
        Authorization:JSON.parse(localStorage.getItem("token"))
      }

    })
  } catch (error) {
    console.log(error)
  }

 }
   
  const deleteProduct=async(id)=>{


  }
  async function getdata(){
    await axios.get(`https://smoggy-woolens-lamb.cyclic.app/cart/get`,{
      headers:{
        Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))
      }
    }).then(res=>{
      console.log(res)
      settotal(res.totalPrice)
      setdata(res.data.cartItems)}
      )
  

  }
   
  useEffect(()=>{
    getdata()
  },[])

  return (
    <div style={{backgroundColor:"#eaeded"}}>
      <Navbar/>

<Flex justify={'space-between'} gap="10px" p="20px"  flexDirection={["column","row","row"]}>
<Box boxShadow={"md"} flex="8"bg="#ffffff" height={"fit-content"} p={"10px"}>
<Heading as='h4'  textAlign={"left"} fontWeight="hairline" size='lg'>
    Shopping Cart
  </Heading>
<Flex mt={"10px"}  justify={'space-between'} p="0px 30px"><Box>items</Box><Box>price</Box></Flex>
<Divider orientation='horizontal' />
{data.length>0?<Grid >
    
    {data.map((el)=>{
    return <Box p={"10px"} key={el.product._id}>
      
    <Flex  >
<Flex flex="8" gap="20px" flexDirection={["column","column","row"]} >
<Box >
    <Image src={el.imgUrl} alt="/" width={["150px","150px","200px"]}/>
</Box>
<Box  textAlign={"left"} >
<Heading as='h4' fontWeight="medium" size='md'>
    {el.product.title}   {/* change to title */}
  </Heading>
  <Text>In stock</Text>
  <Text m={"10px 0px"}>
Eligible for FREE Shipping</Text>
<Image src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px._CB485936079_.png" alt="/"></Image>
<Flex mt={"15px"} >
<Box>
<Button onClick={decrease}>-</Button>{el.product.quantity} <Button onClick={increase}>+</Button>
</Box>
<Box ml={"20px"}><Button size={"sm"} onClick={()=>deleteProduct(el.product._id)}>Delete</Button></Box>
    
</Flex>
</Box>

</Flex>

<Box flex="1">
    <Heading size={"md"}>
    ₹{el.price}
    </Heading>
    <Text fontSize={"12px"} color="blue.600">Save 5 % more with Subscribe & Save
In stock</Text>


</Box>


    </Flex>


    <Divider orientation='horizontal' mt={"10px"} />
</Box>



    })}

</Grid>:<Heading size={"md"} textAlign="left" m="20px 0px">Add something to proceed</Heading>

}






</Box>

<Box  boxShadow={"Base"}   flex={"2"}   ml="10px">
  <Box bg="#ffffff" p={"10px"}>
  <Text fontSize={"12px"} color="blue.600">Your order is eligible for FREE Delivery. Select this option at checkout. Detailsk</Text>
  <Heading as='h5'm="10px 0px" fontWeight="hairline" size='md'>
   Subtotal ({data.length}items): ₹{total}
  </Heading>
  <Flex justify={"center"} mb="10px"><Checkbox></Checkbox>This order contains a gift </Flex>
  <Button><Link to="/payment">Proceed to Buy</Link></Button>
 



  </Box>
  <Box mt={"20px"} bg="#ffffff">
  {data.map((el)=>{
    return <Box p={"10px"} key={el.id}>
      
    <Flex gap={"7px"} flexDirection={["column","column","column","column","row"]}>

<Box flex={"4"}>
    <Image src={el.imgUrl} alt="/" width={"100%"}/>
</Box>
<Box  textAlign={"left"} flex="6" >
<Heading as='h4' fontWeight="medium" size='sm' overflow={"hidden"}>
    {el.name}   {/* change to title */}
  </Heading>
 

    <Text size={"sm"}>
    ₹{el.price}
    </Text>
   <Button size={"xsm"} p="2px 5px" fontSize="13px">See all buying option</Button>


</Box>


    </Flex>


   
</Box>



    })}

  </Box>

</Box>

</Flex>
<Box p={"0px 40px"} bg="#ffffff">
<SimpleSliders6/>
</Box >
<Box p={"0px 40px"} bg="#ffffff">
<SimpleSliders2/>
</Box >
<Box p={"0px 40px"} bg="#ffffff">
<SimpleSliders/>
</Box >


<Footer1/>


    </div>
  )
}

export default Cart