import * as React from 'react';
import { WebView } from 'react-native-webview';

export default function Pay(props) {
    const { route,navigation } = props
    const {item}=route.params;
    const amount=item.amount;
    const id=item.id;
    return (
        <WebView source={{ uri: 'http://skylineautoservices.co/admin/payments/mine.php?id='+id+'&amount='+amount }} style={{ marginTop: 20 }} />
        )
   
} 
  
   