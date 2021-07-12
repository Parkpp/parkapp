import { firebase } from './src/firebase/config';

const db = firebase.firestore();
const parkingRef = db.collection('parkingSpots');

export const parkingSpots = async () => {
  let spot = parkingRef.doc();
  await spot.set({
    id: spot.id,
    userId: 'uyUPmfHSBdR73FVXfG2vWQbTkQm2',
    description: "Etty's garage",
    street: '22155 Hillside',
    city: 'Chicago',
    state: 'IL',
    postalCode: 60640,
    imageUrl:
      'https://www.bigjoessealcoating.com/wp-content/uploads/2018/08/residential-sealcoating-495x337.jpg',
    latitude: 41.9839992,
    longitude: -87.6200267
  });

  spot = parkingRef.doc();
  await spot.set({
    id: spot.id,
    userId: 'uyUPmfHSBdR73FVXfG2vWQbTkQm24444444',
    description: "Mildreds's drive way",
    street: '22155 Hillside',
    city: 'Los Angeles',
    state: 'California',
    postalCode: 60640,
    imageUrl:
      'https://www.bigjoessealcoating.com/wp-content/uploads/2018/08/residential-sealcoating-495x337.jpg',
    latitude: 41.9739992,
    longitude: -87.6600267
  });

  spot = parkingRef.doc();
  await spot.set({
    userId: 'uyUPmfHSBdR73FVXfG2vWQbTkQm244444',
    description: "By company's garage",
    street: '33 Gilmer St SE',
    city: 'Atlanta',
    state: 'GA',
    postalCode: 60640,
    imageUrl:
      'https://www.bigjoessealcoating.com/wp-content/uploads/2018/08/residential-sealcoating-495x337.jpg',
    latitude: 41.9719992,
    longitude: -87.6650267
  });

  spot = parkingRef.doc();
  await spot.set({
    id: spot.id,
    userId: 'uyUPmfHSBdR73FVXfG2vWQbTkQm2',
    description: "Etty's backyard",
    street: '5050 N BroadDrive',
    city: 'Chicago',
    state: 'IL',
    postalCode: 60640,
    imageUrl:
      'https://www.bigjoessealcoating.com/wp-content/uploads/2018/08/residential-sealcoating-495x337.jpg',
    latitude: 41.9799992,
    longitude: -87.6900267
  });

  spot = parkingRef.doc();
  await spot.set({
    userId: 'uyUPmfHSBdR73FVXfG2vWQbTkQm233333',
    description: "Mikes's front yard",
    street: '106 Observatory',
    city: 'Ann Arbor',
    state: 'MI',
    postalCode: 60640,
    imageUrl:
      'https://www.bigjoessealcoating.com/wp-content/uploads/2018/08/residential-sealcoating-495x337.jpg',
    latitude: 41.9719992,
    longitude: -87.6610267
  });
};

export const dummyData = [
  {
    city: 'Los Angeles',
    description: 'Test Spot 1',
    imageUrl:
      'https://www.bigjoessealcoating.com/wp-content/uploads/2018/08/residential-sealcoating-495x337.jpg',
    latitude: 34.049114,
    longitude: -118.252324,
    state: 'CA',
    street: '478-418 5th St',
    userId: 'uyUPmfHSBdR73FVXfG2vWQbTkQm2',
    zipcode: 90013
  },
  {
    city: 'Los Angeles',
    description: 'Test Spot 2',
    imageUrl:
      'https://www.bigjoessealcoating.com/wp-content/uploads/2018/08/residential-sealcoating-495x337.jpg',
    latitude: 34.054303,
    longitude: -118.24959,
    state: 'CA',
    street: 'W 2nd St',
    userId: 'uyUPmfHSBdR73FVXfG2vWQbTkQm2',
    zipcode: 90012
  },
  {
    city: 'Los Angeles',
    description: 'Test Spot 3',
    imageUrl:
      'https://www.bigjoessealcoating.com/wp-content/uploads/2018/08/residential-sealcoating-495x337.jpg',
    latitude: 34.052598,
    longitude: 118.243934,
    state: 'CA',
    street: '131-161 W 1st St',
    userId: 'uyUPmfHSBdR73FVXfG2vWQbTkQm2',
    zipcode: 90012
  },
  {
    city: 'Los Angeles',
    description: 'Test Spot 4',
    imageUrl:
      'https://www.bigjoessealcoating.com/wp-content/uploads/2018/08/residential-sealcoating-495x337.jpg',
    latitude: 34.044381,
    longitude: -118.24444,
    state: 'CA',
    street: '366-498 E 5th St',
    userId: 'uyUPmfHSBdR73FVXfG2vWQbTkQm2',
    zipcode: 90013
  },
  {
    city: 'New York City',
    description: 'Test Spot 1',
    imageUrl:
      'https://www.bigjoessealcoating.com/wp-content/uploads/2018/08/residential-sealcoating-495x337.jpg',
    latitude: 40.757749,
    longitude: -73.985096,
    State: 'NY',
    street: '198-116 W 45th St',
    userId: 'uyUPmfHSBdR73FVXfG2vWQbTkQm2',
    zipcode: 10036
  },
  {
    city: 'New York City',
    description: 'Test Spot 2',
    imageUrl:
      'https://www.bigjoessealcoating.com/wp-content/uploads/2018/08/residential-sealcoating-495x337.jpg',
    latitude: 40.756629,
    longitude: -73.98842,
    State: 'NY',
    street: '298-200 W 42nd St',
    userId: 'uyUPmfHSBdR73FVXfG2vWQbTkQm2',
    zipcode: 10036
  },
  {
    city: 'New York City',
    description: 'Test Spot 3',
    imageUrl:
      'https://www.bigjoessealcoating.com/wp-content/uploads/2018/08/residential-sealcoating-495x337.jpg',
    latitude: 40.754646,
    longitude: -73.987941,
    State: 'NY',
    street: '558-540 Fashion Ave',
    userId: 'uyUPmfHSBdR73FVXfG2vWQbTkQm2',
    zipcode: 10018
  },
  {
    city: 'New York City',
    description: 'Test Spot 4',
    imageUrl:
      'https://www.bigjoessealcoating.com/wp-content/uploads/2018/08/residential-sealcoating-495x337.jpg',
    latitude: 40.76078,
    longitude: -73.988459,
    State: 'NY',
    street: '316 W 47th St',
    userId: 'uyUPmfHSBdR73FVXfG2vWQbTkQm2',
    zipcode: 10036
  }
];
