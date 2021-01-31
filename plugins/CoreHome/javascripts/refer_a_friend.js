/*!
 * Matomo - free/libre analytics platform
 *
 * @link http://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later

 * Refer a friend
 *
 * Show a refer a friend banner, when hidden this will appear again in 6 months.
 */
var referralBannerKey = 'refer_a_friend';
var referralBannerHideForMonths = 6;
var referralBannerCssTarget = '.referFooterBanner';
/**
 * Check if localstorage is enabled
 *
 * @returns {boolean}
 */
var localStorageEnabled = function() {
    if (typeof localStorage !== 'undefined') {
        var checkerKey = 'featureEnabled';
        var checkerValue = 'yes';
        try {
            localStorage.setItem(checkerKey, checkerValue);
            if (localStorage.getItem(checkerKey) === checkerValue) {
                localStorage.removeItem(checkerKey);
                return true;
            }
        } catch (e) {
        }
    }
    return false;
};

/**
 * Check if there is local storage with an expiry date in the future.
 *
 * @returns {boolean}
 */
var referralBannerRecentlyHidden = function() {
    var currentDate = new Date().valueOf();
    return localStorage.getItem(referralBannerKey) > currentDate;
};

/**
 * When clicking hide, hide banner and set expiry date in the future
 */
var referralBannerHide = function() {
    var expires = new Date();
    // re-show in 6 months
    expires.setMonth(expires.getMonth() + referralBannerHideForMonths);

    // set expiry
    localStorage.setItem(referralBannerKey, expires.valueOf());

    // hide referral banner
    $(referralBannerCssTarget).addClass("hide");
};

var referralGenerateEmail = function() {
    var $emailContents = $(referralBannerCssTarget).find('.emailContents');
    var to = $emailContents.find('.to').text();
    var subject = $emailContents.find('.subject').text();
    var body = $emailContents.find('.body').text();


    return "mailto:" + to + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
};

var referralClickShareLink = function(){
    setTimeout(function(){
        $(referralBannerCssTarget).find(".defaultMessage").addClass("hide");
        $(referralBannerCssTarget).find(".thankYou").removeClass("hide");
        setTimeout(function(){
            referralBannerHide();
        },1000);
    },1000);
};

$(function(){
    if (localStorageEnabled() && !referralBannerRecentlyHidden()) {
        // show banner
        $(referralBannerCssTarget)
            .removeClass("hide");

        // bind hide button
        $(referralBannerCssTarget)
            .find(".icon-close")
            .click(referralBannerHide);

        var mailtoContent = referralGenerateEmail();

        // bind email option
        $(referralBannerCssTarget)
            .find(".referFriend")
            .attr("href",mailtoContent);

        // bind after click event
        $(referralBannerCssTarget).on("click", ".share-link", referralClickShareLink);
    }
});


