import React from 'react';
import Destination from '../components/homeComponents/destination/Destination';
import Events from '../components/homeComponents/events/Events';
import Achievements from '../components/homeComponents/achievements/Achievements';
import TourClasses from '../components/homeComponents/tourClasses/TourClasses';

function Home() {
  return (
    <>
      <Destination />
      <Events />
      <Achievements />
      <TourClasses />
    </>
  );
}

export default Home;