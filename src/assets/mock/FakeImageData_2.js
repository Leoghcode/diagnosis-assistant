import skin_1 from '../logo.png'
import skin_2 from '../skin/skin_2.jpg'
import skin_3 from '../skin/skin_3.jpg'
import skin_4 from '../skin/skin_4.jpg'
const images = [
  {image: skin_1, name: 'skin_1.jpg', result: '皮肤病A', level: '轻微', advice: '自行买皮肤药'},
  {image: skin_2, name: 'skin_2.jpg', result: '皮肤病B', level: '中度', advice: '就医，买药'},
  {image: skin_3, name: 'skin_3.jpg', result: '皮肤病C', level: '严重', advice: '立即就医'},
  {image: skin_4, name: 'skin_4.jpg', result: '皮肤病D', level: '紧急', advice: '立即就医'}
];
const img_g1 = images.slice(0, 1);
const img_g2 = images.slice(1, 3);
const img_g3 = images.slice(0, 2);
export {img_g1, img_g2, img_g3};