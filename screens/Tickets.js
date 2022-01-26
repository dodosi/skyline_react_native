import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import Ticket from '../components/Ticket';

function Tickets(props) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { route,navigation } = props
  const {item}=route.params;
  const source=item.source;
  const destination=item.destination;
  const date=item.date;
  //alert(date);

  useEffect(() => {
   /// let link="https://odotravel.com/api/tickets.php?source=musanze&destination=nyabugogo&date=2020-11-07";
    let link="https://odotravel.com/api/tickets.php";
  
    fetch(link,{
        method: 'POST',
        headers: new Headers({
                   'Content-Type': 'application/x-www-form-urlencoded',
          }),
        body: "source="+source+"&destination="+destination+"&date="+date // <-- Post parameters
      })
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <ActivityIndicator  size="large" color="#00ff00" /> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
           // <Text>{item.title}, {item.releaseYear}</Text>
            <Ticket 
            id={item.id} 
            agency={item.agency} 
            journey={item.journey}
            price={item.price} 
            service_fee={item.service_fee} 
            date={item.date} 
            time={item.time} 
            ticket_number={item.ticket_number} 
            
            />
          )}
        />
      )}
    </View>
  );
}
export default Tickets;