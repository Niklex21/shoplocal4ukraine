import { BusinessContainer, BusinessCard, BusinessTabs, BusinessMap } from '@component/business'
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Link from "next/link";
import { getPublishedRecords } from "../../api/business";

// temporary business object to test
type test_obj = {Name: string, Description: string, Address: string, Image: string, Category: string, Affiliation: string}
type test_array = {id: string, fields: test_obj}
let test_array: test_array[] = [
  {
    id: "1",
    fields:{
    Name: "Bavovna Speciality But Name Is Too Long Let's See how it does", 
    Description: "A lovely family-owned restaurant serving Crimean Tatar dishes with lovely interior design.", 
    Address: "Jamaica Plains, MA", 
    Image: "https://preview.redd.it/l67f6w4t70l81.png?width=960&crop=smart&auto=webp&s=c48dcea7dd34bb1d23b9afc8278179eb17f32fde", 
    Category: "Dining", Affiliation: "Ukraine Owned"
  }},
  {
    id: "2",
    fields:{
    Name: "Cocktail Molotov", 
    Description: "Urban bar with eletric Eastern European music and vodka speciality drinks.", 
    Address: "Cambridge, MA", 
    Image: "https://i.redd.it/2twmfqabaqg91.jpg", 
    Category: "Life Style", Affiliation: "Ukraine Supporters"
  }},
]

const ListView = ({businesses}: any) => {
  return (
      <BusinessContainer>
        {
            businesses.map(
            ({ id, fields } : { id: string, fields: Object }) => (
               
                // <Link key={ id } href={ `/business/${id}` }>
                <Link key={ id } href={ `google.com` }>

                    <BusinessCard fields={ fields }/>
                </Link>
              
            ))
        }
      </BusinessContainer>
  )
}

const MapView = ({businesses}: any) => {
  return (
      <BusinessMap businesses={businesses}/>
  )
}


const Home: NextPage = () => {
  let businesses = test_array // TEST DATA IS OBTAINED HERE
  return (
    <div className="min-h-screen w-screen">
      <BusinessTabs views={[<ListView businesses={businesses}/>, <MapView businesses={businesses}/>]}/>
    </div>
  )
}

export default Home

