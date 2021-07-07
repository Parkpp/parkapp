import { firebase } from "./src/firebase/config";

const db = firebase.firestore();
const parkingRef = db.collection("parkingSpots");

export const parkingSpots = async () => {
  let spot = parkingRef.doc();
  await spot.set({
    id: spot.id,
    userId: "uyUPmfHSBdR73FVXfG2vWQbTkQm2",
    description: "Etty's garage",
    street: "22155 Hillside",
    city: "Chicago",
    state: "IL",
    zipcode: 60640,
    imageUrl:
      "https://www.bigjoessealcoating.com/wp-content/uploads/2018/08/residential-sealcoating-495x337.jpg",
    latitude: 41.9839992,
    longitude: -87.6200267,
  });

  spot = parkingRef.doc();
  await spot.set({
    id: spot.id,
    userId: "uyUPmfHSBdR73FVXfG2vWQbTkQm24444444",
    description: "Mildreds's drive way",
    street: "22155 Hillside",
    city: "Los Angeles",
    state: "California",
    zipcode: 60640,
    imageUrl:
      "https://www.bigjoessealcoating.com/wp-content/uploads/2018/08/residential-sealcoating-495x337.jpg",
    latitude: 41.9739992,
    longitude: -87.6600267,
  });

  spot = parkingRef.doc();
  await spot.set({
    userId: "uyUPmfHSBdR73FVXfG2vWQbTkQm244444",
    description: "By company's garage",
    street: "33 Gilmer St SE",
    city: "Atlanta",
    state: "GA",
    zipcode: 60640,
    imageUrl:
      "https://www.bigjoessealcoating.com/wp-content/uploads/2018/08/residential-sealcoating-495x337.jpg",
    latitude: 41.9719992,
    longitude: -87.6650267,
  });

  spot = parkingRef.doc();
  await spot.set({
    id: spot.id,
    userId: "uyUPmfHSBdR73FVXfG2vWQbTkQm2",
    description: "Etty's backyard",
    street: "5050 N BroadDrive",
    city: "Chicago",
    state: "IL",
    zipcode: 60640,
    imageUrl:
      "https://www.bigjoessealcoating.com/wp-content/uploads/2018/08/residential-sealcoating-495x337.jpg",
    latitude: 41.9799992,
    longitude: -87.6900267,
  });

  spot = parkingRef.doc();
  await spot.set({
    userId: "uyUPmfHSBdR73FVXfG2vWQbTkQm233333",
    description: "Mikes's front yard",
    street: "106 Observatory",
    city: "Ann Arbor",
    state: "MI",
    zipcode: 60640,
    imageUrl:
      "https://www.bigjoessealcoating.com/wp-content/uploads/2018/08/residential-sealcoating-495x337.jpg",
    latitude: 41.9719992,
    longitude: -87.6610267,
  });
};
