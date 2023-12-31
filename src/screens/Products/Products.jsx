import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import allProducts from '../../data/products'
import styles from './Products.style'
import { Header } from '../../components/Index'
import { SearchInput } from '../../components/Index'

const Products = ({category,setProductSelected}) => {
  
  const [arrProducts,setArrProducts] = useState([])
  const [keyword,setKeyword] = useState([])

  useEffect(() => {
    if(category){
      const products = allProducts.filter(
        product => product.category == category
      )
      const productsFiltered = products.filter(
        product => product.title.includes(keyword)
      )
      setArrProducts(productsFiltered)
    }else{
      const productsFiltered = allProducts.filter(
        product => product.title.includes(keyword)
      )
      setArrProducts(productsFiltered)
    }
  }, [category, keyword])
  
  return (
    <View style={styles.container}>
      <Header title={category} />
      <SearchInput onSearch={setKeyword} />
      <View style={styles.listContainer}>
        <FlatList 
          data={arrProducts} 
          renderItem={({item}) => (
            <View>
              <TouchableOpacity onPress={()=> {setProductSelected(item)}}>
                <Text>{item.title}</Text>
              </TouchableOpacity>
            </View>
          )} 
          keyExtractor={item => item.id} />
      </View>
    </View>
  )
}

export default Products