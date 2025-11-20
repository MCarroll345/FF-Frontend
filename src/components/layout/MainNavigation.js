import classes from './MainNavigation.module.css'
import Link from 'next/link'
import HamMenu from "../generic/HamMenu"
import Button from "../generic/Button"
import { GiShoppingCart } from 'react-icons/gi'
import { useEffect, useState } from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

function MainNavigation() {
  let noOfOrders = 50;
  const classes = useStyles();
  const [data, setState] = useState({outcome:[]})

  const url = "a987cff4fe3c54429bbe8b6a235e5920-1153867447.eu-west-1.elb.amazonaws.com:8000/shirts"

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        url,
      );
      setState(result.data);
    };

    fetchData();
  }, []);

  let [popupToggle, setPopupToggle] = useState(false)

  function ordersCallback(aNumber) {
    alert("You clicked the button, and passed: " + aNumber)
  }

  function checkoutCallback() {
    alert("You clicked the checkout button")
  }

  let menuPopupJsx

  function toggleMenuHide() {
    if (popupToggle == true) {
      setPopupToggle(false)
    } else {
      setPopupToggle(true)
    }
  }

  if (popupToggle == true) {
    menuPopupJsx = <Button text1="The Menu" maxWidth="100px" onClickHandler={() => toggleMenuHide()} />

  } else {
    menuPopupJsx = undefined
  }
  let testTest = 0;
 // setInterval(() => {testTest++; console.log(testTest)}, 1000);

  return (
    <body>
      <header className={classes.header}>
        <HamMenu toggleMenuHide={() => toggleMenuHide()} />
        <div className={classes.logo}>Fit Finder</div>
        <Button text1="Checkout" maxWidth="100px" onClickHandler={() => checkoutCallback()} icon={<GiShoppingCart />} />
        <Button text2="Orders" maxWidth="70px" onClickHandler={() => ordersCallback(noOfOrders)} />
      </header>
      {popupToggle && <Sidebar>
        <Menu>
          <SubMenu label="Charts">
            <MenuItem> Pie charts </MenuItem>
            <MenuItem> Line charts </MenuItem>
          </SubMenu>
            <MenuItem> Documentation </MenuItem>
            <MenuItem> Calendar </MenuItem>
        </Menu>
      </Sidebar>}
    </body>
  );
}

export default MainNavigation
