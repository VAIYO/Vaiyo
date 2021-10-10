////////////////////////////////////////////////////////
//sidebar
////////////////////////////////////////////////////////

var drawer = async function () {
  /**
   * Element.closest() polyfill
   * https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill
   */
  if (!Element.prototype.closest) {
    if (!Element.prototype.matches) {
      Element.prototype.matches =
        Element.prototype.msMatchesSelector ||
        Element.prototype.webkitMatchesSelector;
    }
    Element.prototype.closest = function (s) {
      var el = this;
      var ancestor = this;
      if (!document.documentElement.contains(el)) return null;
      do {
        if (ancestor.matches(s)) return ancestor;
        ancestor = ancestor.parentElement;
      } while (ancestor !== null);
      return null;
    };
    
  const LockContract = new web3.eth.Contract(LockContractABI, lockvaiyoaddress);
  LockContract.methods.read(_waddress).call().then((data) => {
    console.log(data);
    const vaiyoAmount = new BigNumber(data[2]);
    var restTime = new BigNumber(data[3]);
    restTime = restTime.div(60).div(60).div(24);
    const checkTime = data[4];
    if(checkTime == true) { //unlocked      
      document.getElementById("v-unlocked").innerHTML =
        parseFloat(vaiyoAmount.div(1e18)).toFixed(2) + "VAIYO";
      document.getElementById("v-unlocked-amount").innerHTML =
        "$" + parseFloat(vaiyoAmount.div(1e18).multipliedBy(bigVAIYOPrice)).toFixed(2);
      document.getElementById("v-total").innerHTML =
        parseFloat(vaiyoAmount.div(1e18)).toFixed(2) + "VAIYO";
      document.getElementById("v-total-amount").innerHTML =
        "$" + parseFloat(vaiyoAmount.div(1e18).multipliedBy(bigVAIYOPrice)).toFixed(2);
      document.getElementById("resttime").innerHTML = 
        "";
      document.getElementById("claim").innerHTML = 
        "claim";
    } else { //locked
      document.getElementById("v-locked").innerHTML =
        parseFloat(vaiyoAmount.div(1e18)).toFixed(2) + "VAIYO";
      document.getElementById("v-locked-amount").innerHTML =
        "$" + parseFloat(vaiyoAmount.div(1e18).multipliedBy(bigVAIYOPrice)).toFixed(2);
      document.getElementById("v-total").innerHTML =
        parseFloat(vaiyoAmount.div(1e18)).toFixed(2) + "VAIYO";
      document.getElementById("v-total-amount").innerHTML =
        "$" + parseFloat(vaiyoAmount.div(1e18).multipliedBy(bigVAIYOPrice)).toFixed(2);
      document.getElementById("resttime").innerHTML = 
        "\(" + parseFloat(restTime).toFixed(0) + "days\)";
      document.getElementById("claim").innerHTML = 
        "";
    }
  }

  // Trap Focus
  // https://hiddedevries.nl/en/blog/2017-01-29-using-javascript-to-trap-focus-in-an-element
  //
  async function trapFocus(element) {
    connectNetwork()
      .then(async (data) => {
        displaySideBarValues();
        var focusableEls = element.querySelectorAll(
          'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
        );
        var firstFocusableEl = focusableEls[0];
        var lastFocusableEl = focusableEls[focusableEls.length - 1];
        var KEYCODE_TAB = 9;

        element.addEventListener("keydown", function (e) {
          var isTabPressed = e.key === "Tab" || e.keyCode === KEYCODE_TAB;

          if (!isTabPressed) {
            return;
          }

          if (e.shiftKey) {
            /* shift + tab */ if (document.activeElement === firstFocusableEl) {
              lastFocusableEl.focus();
              e.preventDefault();
            }
          } /* tab */ else {
            if (document.activeElement === lastFocusableEl) {
              firstFocusableEl.focus();
              e.preventDefault();
            }
          }
        });
        document
          .getElementById("w-address-tooltip")
          .addEventListener("click", function () {
            var copyText = document.getElementById("wallet-address");
            navigator.clipboard.writeText("copyText.value");

            var tooltip = document.getElementById("myTooltip");
            tooltip.innerHTML = "Copied";
          });

        document
          .getElementById("claim")
          .addEventListener("click", function () {
            claimVaiyoTokens();
          });

        document
          .getElementById("w-address-tooltip")
          .addEventListener("mouseout", function () {
            var tooltip = document.getElementById("myTooltip");
            tooltip.innerHTML = "Copy";
          });
        document
          .getElementById("w-menu-refresh")
          .addEventListener("click", async function () {
            displaySideBarValues();
          });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  //
  // Settings
  //
  

  // Keydown Handler, handle Escape button
  var keydownHandler = function (event) {
    if (event.key === "Escape" || event.keyCode === 27) {
      // Find all possible drawers
      var drawers = document.querySelectorAll(settings.selectorTarget),
        i;

      // Find active drawers and close them when escape is clicked
      for (i = 0; i < drawers.length; ++i) {
        if (drawers[i].classList.contains(settings.activeClass)) {
          closeDrawer(drawers[i]);
        }
      }
    }
  };

  //
  // Inits & Event Listeners
  //
  document.addEventListener("click", clickHandler, false);
  document.addEventListener("keydown", keydownHandler, false);
};

drawer();


//////////////////////////////////////////
//SideBar
//////////////////////////////////////////

async function displaySideBarValues() {
  const _waddress = getCurrentAddress();
  const _wtype = getCurrentWalletType();
  var dotAddress = _waddress;
  dotAddress =
    dotAddress.substring(0, 4) +
    "..." +
    dotAddress.substring(dotAddress.length - 4, dotAddress.length);
  document.getElementById("w-address").innerHTML = dotAddress;

  const busdBalance = await getBalance(_waddress, "BUSD");
  const bnbBalance = await getBalance(_waddress, "BNB");
  const bnbPrice = await getBNBPrice();
  let busdPrice = await getBUSDPrice();


  let bnbBal = new BigNumber(bnbBalance);
  bnbBal = bnbBal.multipliedBy(1e18);
  var busdBal = new BigNumber(busdBalance);
  busdBal = busdBal.multipliedBy(1e18);
  let bigBnbPrice = new BigNumber(bnbPrice[1]);
  bigBnbPrice = bigBnbPrice.dividedBy(1e8);
  let bigBusdPrice = new BigNumber(busdPrice[1]);
  bigBusdPrice = bigBusdPrice.dividedBy(1e8);
  let bigVAIYOPrice = new BigNumber("12");
  bigVAIYOPrice = bigVAIYOPrice.multipliedBy(bigBusdPrice).dividedBy(1e2);

  const usdAmountForBNB = bnbBal.multipliedBy(bigBnbPrice); 
  const usdAmountForBUSD = busdBal.multipliedBy(bigBusdPrice);

  const usdTotalAmount = usdAmountForBNB.plus(usdAmountForBUSD);

  document.getElementById("w-busd-balance").innerHTML =
    parseFloat(busdBalance).toFixed(2);
  document.getElementById("w-busd-amount").innerHTML =
    "$" + parseFloat(usdAmountForBUSD.div(1e18)).toFixed(2);
  document.getElementById("w-bnb-balance").innerHTML =
    parseFloat(bnbBalance).toFixed(2);
  document.getElementById("w-bnb-amount").innerHTML =
    "$" + parseFloat(usdAmountForBNB.div(1e18)).toFixed(2);
  document.getElementById("w-amount").innerHTML =
    "$" + parseFloat(usdTotalAmount.div(1e18)).toFixed(2);

  });
}

async function claimVaiyoTokens() {
  const LockContract = new web3.eth.Contract(LockContractABI, lockvaiyoaddress);
}


function showIndacoinModalForVAIYO() {
  post("/u/:user_uid/addvaiyotokens/", {}, "GET");
}

function showIndacoinModalForBNBORBUSD() {  
  post("/u/:user_uid/addvaiyotokens/", {}, "GET");
}

function gotoSwapVAIYO() {
  post("/u/:user_uid/swapvaiyotokens/", {}, "GET");
}
