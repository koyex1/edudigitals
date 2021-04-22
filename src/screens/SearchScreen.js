import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
//import Pagination from '@material-ui/lab/Pagination';
//import Slider from '@material-ui/core/Slider';
import { useDispatch, useSelector } from 'react-redux';
import { searchTutors } from '../actions/searchActions';
import { Link } from 'react-router-dom';
import { Form, Slider, Select, Pagination, Input } from 'antd';
import { languages, firstToUpper } from '../data/data';
import img from '../images/dp.jpg'

const { Option } = Select;
const { Search } = Input;




const useStyles = makeStyles((theme) => ({
  root: {
    
    '& > *': {
      marginTop: theme.spacing(2),
      color: "red",
    },
  },
  slider: {
    width: 100,
  }
}));



function SearchScreen(props) {

  var initialMin = 0;
  var initialRatingMax = 5;
  var initialChargeMax = 70;
  const lastPage = Number(localStorage.getItem('lastPage'))
  
  const [rating, setRating] = useState([initialMin,initialRatingMax]);
  const [language, setLanguage] = useState('');
  const [charge, setCharge] = useState([initialMin,initialChargeMax]);
  const [search, setSearch] = useState('');
  const [active, setActive] = useState('true');
  const [currentPage, setCurrentPage] = useState(lastPage);
  const [limit, setLimit] = useState(5);

  //dispatch and selectors
  const dispatch = useDispatch();
  const searchResult = useSelector(state=>state.searchResult)
  const {searchInfo, error} = searchResult;
 

  useEffect(() => {
    props.history.push(`/search?page=${currentPage}&limit=${limit}&language=${language}&rating=${rating}&charge=${charge}`)
    dispatch(searchTutors(search, currentPage, limit, language, rating, charge))
  },[currentPage,charge,language,limit,props.history,rating, dispatch,search])



  const handleSearch = ()=>{
    setCurrentPage(1);
  }

  // const handlePagination = (e)=>{
  //    setCurrentPage(e.target.innerText)
     
  // }


  const handleCharge = (newValue) => {
    setCharge(newValue);
  
  };

  const handleRating = (newValue) => {
    setRating(newValue);
  };

  const handlePagination = (page, pageSize)=>{
    setCurrentPage(page)
    localStorage.setItem("lastPage", page.toString());
  }

  const classes = useStyles();




  return (
    <div className="surrounding_body">
    <div className="search_container">
    
     
      <div className="search_inputs">
        <div className="search_box">

        <Search
      placeholder="input search text"
      allowClear
      onChange={e=>{setSearch(e.target.value)}}
      enterButton="Search"
      size="large"
      onSearch={handleSearch}
    />


        </div>
        <div className="search_other_options spacing_left">

        <div className="edu_slider">
        <h4>Rating<i class='edu_icon_size bx bxs-star'></i></h4>
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
        <h4>Charge <i class='edu_icon_size bx bx-dollar-circle' ></i></h4>
        <Slider
        onChange={handleCharge}
         range 
         defaultValue={[0, 70]}
         max={70}
          marks={{
            0: '0',
            70: '70',
          }}
        />
        </div>
      

      <Form.Item
        name="select"
        label="Language"
        searchValue
        
      >
        <Select placeholder="Select language"
        style={{ width: 200 }}
        onChange={value=>{setLanguage(value)}}
        
        showSearch
    optionFilterProp="children"
    filterOption={(input, option) =>
      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
        >
          {languages.map((language) => (
          <Option  value={language}>{language}</Option>
          ))}
        </Select>
      </Form.Item>
            
            
        </div>

      </div>
      
      {
        !search && !language && (rating == [initialMin, initialRatingMax])
        && (charge == [initialMin, initialChargeMax]) &&
        <div className="tutor_name spacing_left">Top Tutors</div>
        
      }
           

      { searchInfo && searchInfo.user.map( (search) =>(
        <Link  className="link_black" to={`/profile?${search._id}&${search.firstName}&${search.lastName}`} key={search._id}>
      <div  className="search_results">
        <p className="tutor_name">{firstToUpper(search.firstName)} {firstToUpper(search.lastName)}</p>
        <div className="profile_info">
          <img className="search_display_pic" src={img} />
          <div className="space key_details">
            <p>{search.charge}/hr</p>
            <p>{search.rating} <i className='bx bxs-star' ></i></p>
            <p>{search.subjects}</p>
          </div>
        </div>
        <p className="about">{search.about}</p>
      </div>
      </Link>
       ) )
}

      
    <div className="edu_pagination" >
      
      <Pagination 
      current={currentPage} 
      total={searchInfo?searchInfo.total:0} 
      pageSize={5}
      onChange={handlePagination} />
      </div>
      

    </div>
    </div>


  )
}

export default SearchScreen
