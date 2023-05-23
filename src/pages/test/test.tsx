import React, {useState } from 'react';
import { Cascader,Cell,Button } from '@antmjs/vantui'
import { View } from "@tarojs/components";
import { cityOptions } from  '@/utils/common'

export default () => {
  const [isVisible, setIsVisible] = useState(false)
  const [value1, setValue1] = useState([])
  const [options, setoptions] = useState(cityOptions)
  const change1 = (value, path) => {
    console.log('onChange', value, path)
    setValue1(value)
  }
  const onPathChange = (value, path) => {
    console.log('onPathChange', value, path)
  }

  return (
    <>
      <Cell
        title='选择地址'
        value={value1 ? value1.join('-') : '请选择地址'}
        onClick={() => {
          console.log(options)
          setIsVisible(true)
        }}
      ></Cell>
      <View>
         <Button type='default'>默认按钮</Button>
         <Button type='primary'>主要按钮</Button>
         <Button type='info'>信息按钮</Button>
         <Button type='warning'>警告按钮</Button>
         <Button type='danger'>危险按钮</Button>
      </View>
      <Cascader
        visible={isVisible}
        value={value1}
        title='地址选择'
        options={options}
        closeable
        onClose={() => {
          setIsVisible(false)
        }}
        onChange={change1}
        onPathChange={onPathChange}
      />
    </>
  )
};