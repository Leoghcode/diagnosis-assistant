const presOptions ={
  '病A': ['处方A-1', '处方A-2', '处方A-3'],
  '病B': ['处方B-1', '处方B-2'],
  '病C': ['处方C-1', '处方C-2', '处方C-3'],
  '病D': ['处方D-1'],
  '病E': ['处方E-1', '处方E-2']
};
const presDetails = {
  '处方A-1': [
    {medicine: '药A', number: '12g',usage:'一天三次每次2g'},
    {medicine: '药B', number: '6片',usage:'每天1片'},
    {medicine: '药C', number: '2瓶',usage:'一天三次每次20ml'},
    {medicine: '药D', number: '1盒',usage:'一天两次每次1颗'}
  ],
  '处方A-2': [
    {medicine: '药D', number: '2.5g',usage:'一天两次每次0.5g'},
    {medicine: '药B', number: '3片',usage:'每天1片'},
    {medicine: '药C', number: '1瓶',usage:'一天三次每次20ml'}
  ],
  '处方A-3': [
    {medicine: '药A', number: '15g',usage:'一天两次每次0.5g'},
    {medicine: '药C', number: '1瓶',usage:'一天三次每次20ml'}
  ],
  '处方B-1': [
    {medicine: '药A', number: '12g',usage:'一天两次每次0.5g'},
    {medicine: '药B', number: '6片',usage:'每天1片'},
    {medicine: '药C', number: '2瓶',usage:'一天三次每次20ml'},
    {medicine: '药D', number: '1盒',usage:'一天两次每次1颗'}
  ],
  '处方B-2': [
    {medicine: '药D', number: '2.5g',usage:'一天两次每次0.5g'},
    {medicine: '药B', number: '3片',usage:'每天1片'},
    {medicine: '药C', number: '1瓶',usage:'一天三次每次20ml'}
  ],
  '处方C-1': [
    {medicine: '药A', number: '12g',usage:'一天两次每次0.5g'},
    {medicine: '药B', number: '6片',usage:'每天1片'},
    {medicine: '药C', number: '2瓶',usage:'一天三次每次20ml'},
    {medicine: '药D', number: '1盒',usage:'一天两次每次1颗'}
  ],
  '处方C-2': [
    {medicine: '药D', number: '2.5g',usage:'一天两次每次0.5g'},
    {medicine: '药B', number: '3片',usage:'每天1片'},
    {medicine: '药C', number: '1瓶',usage:'一天三次每次20ml'}
  ],
  '处方C-3': [
    {medicine: '药A', number: '15g',usage:'一天两次每次0.5g'},
    {medicine: '药C', number: '1瓶',usage:'一天三次每次20ml'}
  ],
  '处方D-1': [
    {medicine: '药A', number: '12g',usage:'一天两次每次0.5g'},
    {medicine: '药B', number: '6片',usage:'每天1片'},
    {medicine: '药C', number: '2瓶',usage:'一天三次每次20ml'},
    {medicine: '药D', number: '1盒',usage:'一天两次每次1颗'}
  ],
  '处方E-1': [
    {medicine: '药D', number: '2.5g',usage:'一天两次每次0.5g'},
    {medicine: '药B', number: '3片',usage:'每天1片'},
    {medicine: '药C', number: '1瓶',usage:'一天三次每次20ml'}
  ],
  '处方E-2': [
    {medicine: '药A', number: '15g',usage:'一天两次每次0.5g'},
    {medicine: '药C', number: '1瓶',usage:'一天三次每次20ml'}
  ],
};
var presArray=[];
for(let obj in presDetails){
  let o={};
  o['name']=obj;
  o['medicines']=presDetails[obj];
  presArray.push(o);
}
var diseaseArray=[{
  disease:'病A',
  rank:1,
},{
  disease:'病A',
  rank:2,
},{
  disease:'病B',
  rank:3,
},];
export {presOptions,presDetails,presArray,diseaseArray};