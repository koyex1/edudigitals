import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import Slider from '@material-ui/core/Slider';
import { useDispatch, useSelector } from 'react-redux';
import { searchTutors } from '../actions/searchActions';
import { Link } from 'react-router-dom';

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

  function chargeText(value) {
    return `${charge}`;
  }
  function ratingText(value) {
    return `${rating}`;
  }

  var initialMin = 0;
  var initialRatingMax = 5;
  var initialChargeMax = 70;
  
  const [rating, setRating] = useState([initialMin,initialRatingMax]);
  const [language, setLanguage] = useState('');
  const [charge, setCharge] = useState([initialMin,initialChargeMax]);
  const [search, setSearch] = useState('');
  const [active, setActive] = useState('true');
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);

  //dispatch and selectors
  const dispatch = useDispatch();
  const searchResult = useSelector(state=>state.searchResult)
  const {searchInfo, error} = searchResult;
 // console.log(searchInfo);
 console.log("loners")
 console.log(props)
 

  // useEffect(() => {
  //  if(search){
  //   setActive('true')
  //  }
  //  else{
  //   setActive('false');
  //  }
  // }, [search])

  useEffect(() => {
    console.log("useEffect")
    props.history.push(`/search?page=${currentPage}&limit=${limit}&language=${language}&rating=${rating}&charge=${charge}`)
    dispatch(searchTutors(search, currentPage, limit, language, rating, charge))
    console.log("effectEnd")
  },[currentPage,charge,language,limit,props.history,rating, dispatch,search])

  const handleSearch = ()=>{
    console.log("handleSearch")
    setCurrentPage(1);
  }

  const handlePagination = (e)=>{
    console.log("handlePagination")
     setCurrentPage(e.target.innerText)
     
  }


  const handleCharge = (event, newValue) => {
    console.log("handleCharge")
    setCharge(newValue);
  };

  const handleRating = (event, newValue) => {
    setRating(newValue);
    console.log("handleRating")
  };

  const classes = useStyles();



  return (
    <div className="surrounding_body">
    <div className="search_container">
     
      <div className="search_inputs">
        <div className="search_box">

          <input onChange={e=>{setSearch(e.target.value)}} type="text" placeholder="Search for Tutor or Subject.." />
          <button onClick={handleSearch}><i className='bx bx-search'></i></button>
        </div>
        <div className="search_other_options spacing_left">

          <div className="slider_position">
            <label>Rating</label>
            <div className={classes.slider}>
            <Slider
              min={0}
              max={5}
              value={rating}
              onChange={handleRating}
              valueLabelDisplay="auto"
              getAriaValueText={ratingText}
            />
            {/* <Slider range={{ draggableTrack: true }} defaultValue={[20, 50]} /> */}
            </div>
            {/* <label>Language</label>
            <input type="text" /> */}
            </div>
            <div className="slider_position">
            <label>Charge rate</label>
            <div className={classes.slider}>
            <Slider
              min={0}
              max={70}
              value={charge}
              onChange={handleCharge}
              valueLabelDisplay="auto"
              getAriaValueText={chargeText}
            />
            </div>
            </div>
            <div className="slider_position">
            <label>Language</label>
            <input onChange={e=>{setLanguage(e.target.value)}} type="text"/>
          </div>
        </div>

      </div>
      
      {
        !search && !language && (rating == [initialMin, initialRatingMax])
        && (charge == [initialMin, initialChargeMax]) &&
        <div className="tutor_name spacing_left">Top Tutors</div>
        
      }
           

      { searchInfo && searchInfo.user.map( (search) =>(
        <Link to = {`/profile/${search._id}`} key={search._id}>
      <div  className="search_results">
        <p className="tutor_name">{search.firstName} {search.lastName}</p>
        <div className="profile_info">
          <img className="search_display_pic" src=" ../images/dp.jpg" />
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

      
    <div >
      <div className={classes.root }>
        <Pagination 
        onChange={handlePagination} 
       count={searchInfo?searchInfo.end:1}
        variant="outlined"
         shape="rounded" 
         hideNextButton
         hidePrevButton/>
      </div>
      </div>
      

    </div>
    </div>


  )
}

export default SearchScreen
