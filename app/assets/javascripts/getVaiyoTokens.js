$(document).on("turbolinks:load", async function () {
  var controller = $("body").data("controller");
  var action = $("body").data("action");

  if (controller == "users" && action == "getvaiyotokens") {
    const user = $("#mycontainer").data("source");
    getBalance(user.waddress).then((e) => {
      document.getElementById("balance").innerHTML = "Balance: " + e;
    });
  }
});
