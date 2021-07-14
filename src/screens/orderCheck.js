//Background check for data base order table. Code imported in each component and is run when component renders or refreshes
import { or } from 'react-native-reanimated';
import { parkingSpots } from '../../parkingSeed';
import { firebase } from '../firebase/config';


const timeInSeconds = (time) => {
    let hourInSec = Number(time.slice(0, 2)) * 60 * 60;
    let minInSec = Number(time.slice(3, 5)) * 60;

    return hourInSec + minInSec;
  };

export const ordersCheck = () => {

   let today = new Date()
    let currentTimeInSec = Number(today.getHours())* 60*60 + Number(today.getMinutes())*60;

    const db = firebase.firestore();
    const ordersRef = db.collection("orders").get();

    ordersRef.forEach((doc) =>{

        let order = doc.data()
        
        startTimeInSec = timeInSeconds(order.startTime)

        if (currentTimeInSec<startTimeInSec + order.duration) return

        parkingSpotsRef = db.collection("parkingSpots").doc(order.parkingSpotId).get()





    })

}