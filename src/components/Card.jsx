import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  bookDetail,
  addFavorite,
  addReaded,
  addReading,
  deleteFavorite,
  deleteReading,
  deleteReaded,
  getUser,
} from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import CardDetail from "./CardDetail.jsx";
import caretIcon from "../icons/caretIcon.svg";
import favoriteIcon from "../icons/favoriteIcon.svg";
import favoriteFillIcon from "../icons/favoriteFillIcon.svg";
import readedIcon from "../icons/readedIcon.svg";
import readedIconFill from "../icons/readedIconFill.svg";
import reviewIcon from "../icons/reviewIcon.svg";
import CardMenu from "./CardMenu.css";
import {
  CardImg,
  UlCard,
  ButtonSelectCard,
  ButtonOptionsCard,
  MenuConteiner,
  ImgContainer,
  MenuTrigger,
  DropDownMenu,
} from "../styles/Card";

export default function Card({ id, cover, modal, setModal }) {
  const [open, setOpen] = useState(false);
  const [favorite,setFavorite]=useState(false)
  const [readed,setReaded]=useState(false)
  const [reading,setReading]=useState(false)
  const { isAuthenticated, user, isLoading } = useAuth0();
  
  // useEffect(() => {
    
  //     const { email, nickname } = user;

  //     const userDb = {
  //       email,
  //       nickname,
  //     };

  //     dispatch(getUser(userDb));
  //   }, [dispatch, isAuthenticated]);

  function handleClick(e) {
    e.preventDefault(e);
    setModal(true);
    dispatch(bookDetail(id));
  }

  const dispatch = useDispatch();
  const book = useSelector((state) => state.detail);
  const currentUser = useSelector((state) => state.user);
  console.log("STATEUSER",currentUser)
  const userId={id:currentUser && currentUser.id};
  userId && console.log("USERID",userId)


  function handleFavorite(id, userId) {
    // e.preventDefault();
    // console.log("e.target.value",e.target.value)
    console.log("Entré a favorite:", id);
    if(!favorite){
      setFavorite(!favorite)
      console.log("FAV+",favorite)
      dispatch(addFavorite(id,userId));
      
    }
    if(favorite){
      setFavorite(!favorite)
      console.log("FAV-",favorite)
      dispatch(deleteFavorite(id,userId));
      
    }
    
  }
  
  function handleReaded(id, userId) {
    
    // console.log("e.target.value",e.target.value)
    console.log("Entré a readed:", id);
    if(!readed){
      setReaded(!readed)
      console.log("READ+",readed)
      dispatch(addReaded(id, userId));
      
    }
    if(readed){
      setReaded(!readed)
      console.log("READ-",readed)
      dispatch(deleteReaded(id,userId));
      
    }
    
  }

  return (
    <>
      <CardDetail book={book} modal={modal} setModal={setModal} />
      <ImgContainer>
        <CardImg
          src={cover}
          alt="img not found"
          onClick={(id) => {
            handleClick(id);
          }}
        />

        <MenuConteiner>
          <MenuTrigger
            onClick={() => {setOpen(!open);}}>
            <img src={caretIcon} />
          </MenuTrigger>
          <DropDownMenu
            className={`dropdown-menu ${open ? "active" : "inactive"}`}
          >
            <UlCard>
              <DropdownItem icon={reviewIcon} value={id} role="button" />
              <DropdownItem icon={!readed?readedIcon:readedIconFill} value={id} handle={e=>{handleReaded(id)}} role="button"/>
              <DropdownItem icon={!favorite ? favoriteIcon:favoriteFillIcon} value={id} handle={e=>{handleFavorite(id)}} role="button"/>
            </UlCard>
          </DropDownMenu>
        </MenuConteiner>
      </ImgContainer>
      {/* onpointerleave={()=>{setOpen(!open)}} */}
    </>
  );
}

function DropdownItem(props) {
  return (
    <li>
      <img src={props.icon} alt="n" role="button" onClick={props.handle} value={props.id}/>
    </li>
  );
}
