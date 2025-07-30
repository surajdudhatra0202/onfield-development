import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Header, ListItem } from '@components';
import c from '@style';
import { Strings } from '@constants';
import { Routes } from '../../navigation/route';
import type { NavigationProps } from '@/navigation/navigation';
import { ORDER, ORDER_DETAILS } from '@/utils';
import TabListScreen from '../Shared/List/tabList';
import PdfView from '../Shared/Pdf';

const tabScreens = [
  {
    name: "Pending's\nOrders",
    type: 1,
    apiEndPoint: ORDER,
    dataLabel: 'orders',
  },
  {
    name: 'InProgress\nOrders',
    type: 2,
    apiEndPoint: ORDER,
    dataLabel: 'orders',
  },
  {
    name: 'Completed\nOrders',
    type: 3,
    apiEndPoint: ORDER,
    dataLabel: 'orders',
  },
];

const Order = ({ navigation }: NavigationProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [viewPdf, setViewPdf] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const navToNext = () => navigation.navigate(Routes.AddOrder);
  const openDrawer = () => navigation.openDrawer();

  const pdfviewer = (item: any) => {
    setSelectedOrder(item);
    setViewPdf(true);
  };

  console.log('selected order', selectedOrder);
  
  const renderItem = ({ item, tab }) => (
    <View>
      <ListItem
        srNo={item.order_no}
        label={'Category'}
        value={item.category}
        date={item.l_date}
        onPress={() => navigation.navigate(Routes.OrderDetails, { orderInfo: item })}
        pdfBtn={() => pdfviewer(item)}
      />
    </View>
  );

  return (
    <View style={c.flex1W}>
      <Header onPress={openDrawer} onAdd={navToNext} title={Strings.titleOrderList} />

      <TabListScreen renderItem={renderItem} tabScreens={tabScreens} enableUseFocusEffect={true} />

      <PdfView
        visible={viewPdf}
        params={selectedOrder}
        src={selectedOrder?.pdf}
        onClose={() => {
          setViewPdf(false), setSelectedOrder(null);
        }}
      />
    </View>
  );
};

export default Order;
