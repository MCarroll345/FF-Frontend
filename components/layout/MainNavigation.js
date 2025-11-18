import classes from './MainNavigation.module.css'
import Link from 'next/link'
import HamMenu from "../generic/HamMenu"
import Button from "../generic/Button"
import { GiShoppingCart } from 'react-icons/gi'
import { useState } from 'react'

function MainNavigation() {
  let noOfOrders = 50;

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
    <header className={classes.header}>
      {/* Original JSX logic: */}
      {menuPopupJsx}
      {/* Move the show / hide code to the component itself: */}
      {/* Ternary operator alternative: */}
      {popupToggle ? <Button text1="Ternary" text2="operator" maxWidth="100px" onClickHandler={() => toggleMenuHide()} /> : null}
      {/* Another conditional rendering alternative: */}
      {popupToggle && <Button text1="Another JSX" text2="alternative" maxWidth="100px" onClickHandler={() => toggleMenuHide()} />}
      <Button text2={"Show me A"+testTest} maxWidth="70px" onClickHandler={() => toggleMenuHide()} />
      <Button text2="Show me B" maxWidth="70px" hide="" onClickHandler={() => toggleMenuHide()} />
      <Button text2="Show me C" maxWidth="70px" hide=" " onClickHandler={() => toggleMenuHide()} />
      <HamMenu toggleMenuHide={() => toggleMenuHide()} />
      <div className={classes.logo}>Fit Finder</div>
      <nav>
        <ul>
          <li>
            <Link href='/'>All Meetups</Link>
          </li>
          <li>
            <Link href='/new-meetup'>Add New Meetup</Link>
          </li>
        </ul>
      </nav>
      <Button text1="Checkout" maxWidth="100px" onClickHandler={() => checkoutCallback()} icon={<GiShoppingCart />} />
      <Button text2="Orders" maxWidth="70px" onClickHandler={() => ordersCallback(noOfOrders)} />
    </header>
  );
}

export default MainNavigation
