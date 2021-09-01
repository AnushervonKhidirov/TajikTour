import React from 'react';
import { useParams } from 'react-router';
import PackageList from '../components/packagesComponents/packageList/PackageList';
import Package from '../components/packagesComponents/package/Package';

function Packages() {
  const { tour } = useParams()
  return tour ? <Package tour={tour} /> : <PackageList />;
}

export default Packages;