/**
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

$(function(){
    if (localStorageEnabled() && !referralBannerRecentlyHidden()) {
        // show banner
        $(referralBannerCssTarget)
            .removeClass("hide");

        // bind hide button
        $(referralBannerCssTarget)
            .find(".icon-close")
            .click(referralBannerHide);

        // bind email option
        //$(referralBannerCssTarget)
        //    .find('.referFriend');
    }
});


