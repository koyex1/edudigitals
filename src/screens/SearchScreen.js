import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
//import Pagination from '@material-ui/lab/Pagination';
//import Slider from '@material-ui/core/Slider';
import { useDispatch, useSelector } from 'react-redux';
import { searchTutors } from '../actions/searchActions';
import { Link } from 'react-router-dom';
import { Form, Slider, Select, Pagination, Input, Spin, Space } from 'antd';
import { languages, firstToUpper, countryList } from '../data/data';
import img from '../images/dp.jpg'

const { Option } = Select;
const { Search } = Input;


function SearchScreen(props) {
  const parameters = props.location.search.split('&');
  const urlArray = []
  for(let x of parameters){
    urlArray.push(x.split('=')[1])
  }
  console.log(urlArray)
  var initialMin = 0;
  var initialRatingMax = 5;
  var initialChargeMax = 70;
  const lastPage = Number(localStorage.getItem('lastPage'))
  
  const [rating, setRating] = useState((urlArray && urlArray[5] &&  urlArray[5].split(',')) || [initialMin,initialRatingMax]);
  const [language, setLanguage] = useState(urlArray[3]||'');
  const [country, setCountry] = useState(urlArray[4]|| '');
  const [charge, setCharge] = useState((urlArray && urlArray[6] && urlArray[6].split(',')) || [initialMin,initialChargeMax]);
  const [search, setSearch] = useState(urlArray[0]||'');
  const [active, setActive] = useState('true');
  const [currentPage, setCurrentPage] = useState(urlArray[1]||1);
  const [limit, setLimit] = useState(5);
  const dispatch = useDispatch();
  const searchResult = useSelector(state=>state.searchResult)
  const {searchInfo, error} = searchResult;
  const [skilled, setSkilled] = useState();



  
 
  //-------USEEFFECT
  useEffect(() => {
    props.history.push(`/search?search=${search}&page=${currentPage}&limit=${limit}&language=${language}&country=${country}&rating=${rating}&charge=${charge}`)
    dispatch(searchTutors(search, currentPage, limit, language, country, rating, charge))
  },[currentPage])  



//-------ONCHANGE FUNCTIONS
  const handleSearch = ()=>{
    setCurrentPage(1)
    props.history.push(`/search?search=${search}&page=${currentPage}&limit=${limit}&language=${language}&country=${country}&rating=${rating}&charge=${charge}`)
    dispatch(searchTutors(search, currentPage, limit, language, country, rating, charge))
  }
  const handleCharge = (newValue) => {
    setCharge(newValue);
  };

  const handleRating = (newValue) => {
    setRating(newValue);
  };

  const handlePagination = (page, pageSize)=>{
    setCurrentPage(page)
  }




  return (
    <div className="surrounding_body">
    <div className="search_container">
    
     
      <div className="search_inputs">
        <div className="search_box">

<div className="edu_search_input">
        <input
        defaultValue={search}
        type="text"
      placeholder="Find Tutor or Subject..."
      onChange={e=>{setSearch(e.target.value)}}
    />
    <button className="search_option1" onClick={handleSearch}>Search</button>
    <button className="search_option2" onClick={handleSearch}><i class='bx bx-search'></i></button>

    </div>


        </div>
        <div className="search_other_options spacing_left">

        <div className="edu_slider">
        <div className="side_side"><h4>Rating</h4><i class='check_position edu_icon_size bx bxs-star'></i></div>
        <Slider
        onChange={handleRating}
        max = {5}
        range
        defaultValue={[rating[0], rating[1]]}
          marks={{
            0: '0',
            5: '5',
          }}
        />
        </div>
     
        <div className="edu_slider">
        <div className="side_side"><h4>Charge</h4><i class='edu_icon_size bx bx-dollar-circle' ></i></div>

        <Slider
        onChange={handleCharge}
         range 
         defaultValue={charge}
         max={70}
          marks={{
            0: '0',
            70: '70',
          }}
        />
        </div>
      
<div className="search_select">

<select onChange={e=>{setLanguage(e.target.value)}}>
        <option value=''>Select a Language</option>
         {languages.map((language)=>(<option value={language}>{language}</option>) )}
        </select>


      <select onChange={e=>{setCountry(e.target.value)}}>
      <option value=''>Select a Country</option>
         {countryList.map((country)=>(<option value={country}>{country}</option>) )}
        </select>
       </div>    
            
        </div>

      </div>
        {/*
        !search && !language && rating.toString()==[0,5].toString() && charge.toString()==[0,70].toString() && !country &&
        <div className="top_talents">TOP TALENTS</div>
        */ }   
          
      {
      !searchInfo?
           (<div className="edu_search_spinner">
               <Spin size="large"/> Searching...
            </div>)
      :
      searchInfo && searchInfo.user.length==0 ?<div className="no_reviews">No search results</div>
      :
      (<div>
      {searchInfo && searchInfo.user.map( (search) =>(
        <Link  className="link_black" to={`/profile?${search._id}&${search.firstName}&${search.lastName}`} key={search._id}>
      <div  className="search_results">
        <p className="tutor_name">{firstToUpper(search.firstName)} {firstToUpper(search.lastName)}</p>
        <div className="profile_info">
          <img className="search_display_pic"  src={`data:${search.profilePicture.contentType};base64,${Buffer.from(search.profilePicture.data.data).toString('base64')}`}/>
          <div className="space key_details">
          <div className="edu_flex" ><p><strong>Charge:</strong> {search.charge} $/hr <i class='bx bxs-dollar-circle'></i></p> <p style={{marginLeft: '20px'}}>Country: {search.country} <i class='bx bxs-flag-alt'></i></p></div>
          <div className="edu_flex" > <p>Rating: {search.rating} <i className='bx bxs-star' ></i></p> <p style={{marginLeft: '20px'}}>Completed Lessons: {search.tutorials} <i class='bx bxs-book-open'> </i> </p></div>
            <div className="edu_flex"><p>Languages:</p><div className="language">{search.language.split(',').map(
              x=>(
                  <div className="span_block">{x}</div>
              )
            )
            
            }</div></div>
           <div className="edu_flex subjects"><p>Subjects:</p><div className="subjects"> {search.subjects.split(',').map(
              x=>(
                  <div className="span_block">{x}</div>
              )
            )
            
            }</div></div>
            
          </div>
        </div>
        <p className="edu_search_about">{search.about}</p>
      </div>
      </Link>
       ) )}
       <div className="edu_pagination" >
      
      <Pagination 
      current={currentPage} 
      total={searchInfo?searchInfo.total:0} 
      pageSize={5}
      onChange={handlePagination} />
      </div>
       </div>)
       
         
         
}

      
    
      

    </div>
    </div>


  )
}

export default SearchScreen
