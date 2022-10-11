// ==UserScript==
// @name         Remove Annoying Info
// @namespace    http://github.com/MunoLike/
// @version      0.13
// @description  Remove Annoy Info on twitter
// @author       MunoLike
// @match        https://twitter.com/*
// @icon         none
// @grant        none
// @updateURL    https://github.com/MunoLike/my-userscripts/raw/main/remove_anoying_info.user.js
// ==/UserScript==

let currentURL = "";
let isRewritedHeader = false;

function getAncestorByNumber(element, number) {
    if (number == 0) {
        return element
    } else {
        return getAncestorByNumber(element.parentElement, number - 1)
    }
}

(function () {
    'use strict';

    const observer = new MutationObserver(() => {
        if (currentURL == "") {
            currentURL = location.href;
        } else if (currentURL != location.href) {
            currentURL = location.href;
            isRewritedHeader = false;
        }

        // Delete the texts that show who followed this account.
        let header = document.querySelectorAll('[aria-hidden][role][tabindex="-1"]')[1];
        if (!isRewritedHeader && header != null && header.nextElementSibling != null && header.nextSibling.children.length == 5) {
            header.nextSibling.children[4].remove();
            isRewritedHeader = true;
            console.out("done");
        }

        // Delete the messages that show who retweeted or liked.
        if (document.querySelector('[data-testid="tweet"]') != null) {
            let fav_texts = document.querySelectorAll('[data-testid="socialContext"]');
            fav_texts.forEach(e => {
                getAncestorByNumber(e, 6).remove();
            });
        }

        // Delete reply on a picture modal.
        if (document.querySelector('[aria-labelledby="modal-header"]').children[0].children[1] != null) {
            document.querySelector('[aria-labelledby="modal-header"]').children[0].children[1].remove();
        }
    });
    observer.observe(document.body, { childList: true, subtree: true })
})();