import React, {useState, useEffect, useContext} from 'react';
import { WrapperContext } from '../../../Context';
import Headline from '../../common/headline/Headline';
import SubHeadline from '../../common/subHeadline/SubHeadline';
import Form from '../../common/form/Form';
import styles from './Packages.module.css';

function Package({ tour }) {
  const wrapper = useContext(WrapperContext);
  const [packageData, setPackageData] = useState({});

  // add error page !!!
  useEffect(() => import(`./packageData/${wrapper.lang}`).then(packages => setPackageData(packages.packages[tour])), [wrapper.lang, tour]);

  return (
    <div className={`${styles.package_wrapper} block_item`}>
      <Headline title={packageData.tourName} />
      <div className={styles.package_img} style={{backgroundImage: `url(/img/packages/${packageData.img})`}}></div>
      {/* <Desc title={packageData.desc && packageData.desc.title} text={packageData.desc && packageData.desc.text} /> */}

      {packageData.desc && packageData.desc.map(desc => {
        return <Desc title={desc.title} text={desc.text} key={desc.title} />
      })}

      {packageData.lists && packageData.lists.map(list => {
        return <List title={list.title} list={list.list} key={list.title} />
      })}

      <Gallery title={packageData.gallery && packageData.gallery.title} images={packageData.gallery && packageData.gallery.images} />
      <SendForm title={packageData.sendForm} tourName={packageData.tourName} />

      {/* <Experience title={packageData.experience} desc={packageData.experienceDesc} />
      <Days title={packageData.dayByDay} desc={packageData.dayByDayDesc} list={packageData.dayByDayList} /> */}
    </div>
  );
}

// function Experience({ title, desc = [] }) {
//   return (
//     <>
//       <div className={styles.experience}>
//         <SubHeadline title={title} />

//         <div className={styles.desc}>
//           {desc.map((desc, index) => {
//             return <p key={`exp_desc-${index}`}>{desc}</p>
//           })}
//         </div>
//       </div>
//     </>
//   );
// }

// function Days({ title, desc, list = [] }) {
//   return (
//     <div className={styles.days}>
//       <SubHeadline title={title} />
//       <div className={styles.desc}>{desc}</div>

//       <ul className={styles.days_list}>
//         {list.map((day, index) => {
//           return <li key={`tour_dat-${index}`}><span className={styles.certain_day}>Day {index + 1}</span> - {day}</li>
//         })}
//       </ul>
//     </div>
//   );
// }




function Desc({ title, text = [] }) {
  return (
    <div className={styles.desc_block}>
      <SubHeadline title={title} />

      <div className={styles.text}>
        {text.map((paragraph, index) => {
          return (
            <p key={`${title}_paragraph-${index}`}>{paragraph}</p>
          );
        })}
      </div>
    </div>
  );
}


function List({ title, list }) {
  return (
    <div className={styles.list_block}>
      <SubHeadline title={title} />

      <ul className={styles.list}>
        {list.map((item, index) => {
          return <ListItem item={item} key={`list_item-${index}`} />
        })}
      </ul>
    </div>
  );
}

function ListItem({ item }) {
  return (
    <li>{item}</li>
  );
}

function Gallery({ title, images = [] }) {
  return (
    <div className={styles.gallery}>
      <SubHeadline title={title} />
      <div className={styles.image_list}>
        {images.map((image, index) => {
          return <div className={styles.image} style={{backgroundImage: `url(/img/packages/gallery/${image})`}} key={`gallery_img-${index}`}></div>
        })}
      </div>
    </div>
  );
}

function SendForm({ title, tourName }) {
  return (
    <div>
      <SubHeadline title={title} />
      <Form tourPackage={tourName} />
    </div>
  );
}

export default Package;