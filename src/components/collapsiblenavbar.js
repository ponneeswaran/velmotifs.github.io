import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import {Link} from 'react-scroll';

let activeSelection = null;

const menuSections = [
  { id: "1", title: "Home", page:"home", val:"1" },
  { id: "2", title: "Gallery", page:"gallery", val:"2" },
  { id: "3", title: "About", page:"about", val:"3" }
];

const CollapsibleNavbar = () => { 
  const [isSticky, setIsSticky] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);
  
  const handleScroll = () => {
    const sections = document.querySelectorAll(".section");

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
        let sect = menuSections.find(item => item.page===section.id);
        activeSelection = sect.id;
      }
    });

    if (window.scrollY > 30) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
    if(activeSelection){
      const menuItem = document.querySelectorAll(".nav-link");

      menuItem.forEach((item) => {
        if(item.classList.contains('active')){
          item.classList.remove('active');
        }
      });

      const element = document.getElementById(activeSelection);
      element.classList.add('active');
    }
  };

  useEffect(() => {
    setIsLargeScreen(window.innerWidth >= 768);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if(isSticky || !isLargeScreen){
    return (<MenuBarScroll isSticky = {isSticky}/>);
  }else{
    return (<MenuBarCenter isSticky = {isSticky}/>);
  }
};

const MenuBarScroll = (props) => {
  return (
    <Navbar
      bg={props.isSticky ? 'dark' : 'dark'}
      variant="dark"
      expand="lg"
      className={`sticky-top ${props.isSticky ? 'shadow-sm' : ''}`}
      style={{ position: props.isSticky ? 'fixed' : 'sticky', top: 0, width: '100%' }}
    >
      <Container>
        <Navbar.Brand href="#home">Vel Motifs</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {menuSections.map((menuItem)=>{
              return <MenuList key={menuItem.id} label={menuItem.title} page={menuItem.page} offset={-50} val={menuItem.val}/>
            })}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const MenuBarCenter = (props) => {
  return (
    <Navbar
      bg={props.isSticky ? 'dark' : 'dark'}
      variant="dark"
      expand="lg" 
      className={`sticky-top ${props.isSticky ? 'shadow-sm' : ''}`}
      style={{ position: props.isSticky ? 'fixed' : 'sticky', top: 0, width: '100%' }}
    >
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className='justify-content-center'>
          <Nav className="w-50 d-flex justify-content-between">
            {menuSections.map((menuItem)=>{
              return <MenuList key={menuItem.id} label={menuItem.title} page={menuItem.page} offset={-110} val={menuItem.val}/>
            })}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const MenuList = (props) => {
  return (    
    <Nav.Link as={Link}
        to={props.page}
        smooth={true}
        duration={300}
        offset={props.offset} // Adjust the offset for the navbar height
        activeClass="active"
        onClick={menuClick}
        id={props.val}
      >
        {props.label}
    </Nav.Link>
  );
};

const menuClick = (event) => {
  activeSelection = event.target.id;
};
export default CollapsibleNavbar;
