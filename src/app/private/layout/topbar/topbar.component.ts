import {Component, OnInit, EventEmitter, Output, Inject, ViewChild, TemplateRef} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {EventService} from '../../../core/services/event.service';

//Logout
import {environment} from '../../../../environments/environment';
import {AuthService} from '../../../core/services/auth/auth.service';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../../core/services/token-storage.service';

// Language
import {CookieService} from 'ngx-cookie-service';
import {LanguageService} from '../../../core/services/language.service';
import {TranslateService} from '@ngx-translate/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
    messages: any
    element: any;
    mode: string | undefined;
    @Output() mobileMenuButtonClicked = new EventEmitter();
    allnotifications: any
    flagvalue: any;
    valueset: any;
    countryName: any;
    cookieValue: any;
    userData: any;
    total = 0;
    cart_length: any = 0;
    totalNotify: number = 0;
    newNotify: number = 0;
    readNotify: number = 0;
    isDropdownOpen = false;
    @ViewChild('removenotification') removenotification !: TemplateRef<any>;
    notifyId: any;

    constructor(@Inject(DOCUMENT) private document: any, private eventService: EventService, public languageService: LanguageService, private modalService: NgbModal,
                public _cookiesService: CookieService, public translate: TranslateService, private authService: AuthService,
                private router: Router, private TokenStorageService: TokenStorageService) {
    }

    ngOnInit(): void {
        this.userData = this.TokenStorageService.getUser();
        this.element = document.documentElement;

        // Cookies wise Language set
        this.cookieValue = this._cookiesService.get('lang');
        const val = this.listLang.filter(x => x.lang === this.cookieValue);
        this.countryName = val.map(element => element.text);
        if (val.length === 0) {
            if (this.flagvalue === undefined) {
                this.valueset = 'assets/images/flags/us.svg';
            }
        } else {
            this.flagvalue = val.map(element => element.flag);
        }

        // Fetch Data
    }

    /**
     * Toggle the menu bar when having mobile screen
     */
    toggleMobileMenu(event: any) {
        document.querySelector('.hamburger-icon')?.classList.toggle('open')
        event.preventDefault();
        this.mobileMenuButtonClicked.emit();
    }

    /**
     * Fullscreen method
     */
    fullscreen() {
        document.body.classList.toggle('fullscreen-enable');
        if (
            !document.fullscreenElement && !this.element.mozFullScreenElement &&
            !this.element.webkitFullscreenElement) {
            if (this.element.requestFullscreen) {
                this.element.requestFullscreen();
            } else if (this.element.mozRequestFullScreen) {
                /* Firefox */
                this.element.mozRequestFullScreen();
            } else if (this.element.webkitRequestFullscreen) {
                /* Chrome, Safari and Opera */
                this.element.webkitRequestFullscreen();
            } else if (this.element.msRequestFullscreen) {
                /* IE/Edge */
                this.element.msRequestFullscreen();
            }
        } else {
            if (this.document.exitFullscreen) {
                this.document.exitFullscreen();
            } else if (this.document.mozCancelFullScreen) {
                /* Firefox */
                this.document.mozCancelFullScreen();
            } else if (this.document.webkitExitFullscreen) {
                /* Chrome, Safari and Opera */
                this.document.webkitExitFullscreen();
            } else if (this.document.msExitFullscreen) {
                /* IE/Edge */
                this.document.msExitFullscreen();
            }
        }
    }

    /**
     * Open modal
     * @param content modal content
     */
    openModal(content: any) {
        // this.submitted = false;
        this.modalService.open(content, {centered: true});
    }

    /**
     * Topbar Light-Dark Mode Change
     */
    changeMode(mode: string) {
        this.mode = mode;
        this.eventService.broadcast('changeMode', mode);

        switch (mode) {
            case 'light':
                document.documentElement.setAttribute('data-bs-theme', "light");
                break;
            case 'dark':
                document.documentElement.setAttribute('data-bs-theme', "dark");
                break;
            default:
                document.documentElement.setAttribute('data-bs-theme', "light");
                break;
        }
    }

    /***
     * Language Listing
     */
    listLang = [
        {text: 'English', flag: 'assets/images/flags/us.svg', lang: 'en'},
        {text: 'Española', flag: 'assets/images/flags/spain.svg', lang: 'es'},
        {text: 'Deutsche', flag: 'assets/images/flags/germany.svg', lang: 'de'},
        {text: 'Italiana', flag: 'assets/images/flags/italy.svg', lang: 'it'},
        {text: 'русский', flag: 'assets/images/flags/russia.svg', lang: 'ru'},
        {text: '中国人', flag: 'assets/images/flags/china.svg', lang: 'ch'},
        {text: 'français', flag: 'assets/images/flags/french.svg', lang: 'fr'},
        {text: 'Arabic', flag: 'assets/images/flags/ar.svg', lang: 'ar'},
    ];

    /***
     * Language Value Set
     */
    setLanguage(text: string, lang: string, flag: string) {
        this.countryName = text;
        this.flagvalue = flag;
        this.cookieValue = lang;
        this.languageService.setLanguage(lang);
    }

    /**
     * Logout the user
     */
    logout() {
        this.authService.logout();
    }

    windowScroll() {
        if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
            (document.getElementById("back-to-top") as HTMLElement).style.display = "block";
            document.getElementById('page-topbar')?.classList.add('topbar-shadow');
        } else {
            (document.getElementById("back-to-top") as HTMLElement).style.display = "none";
            document.getElementById('page-topbar')?.classList.remove('topbar-shadow');
        }
    }

    // Delete Item
    deleteItem(event: any, id: any) {
        var price = event.target.closest('.dropdown-item').querySelector('.item_price').innerHTML;
        var Total_price = this.total - price;
        this.total = Total_price;
        this.cart_length = this.cart_length - 1;
        this.total > 1 ? (document.getElementById("empty-cart") as HTMLElement).style.display = "none" : (document.getElementById("empty-cart") as HTMLElement).style.display = "block";
        document.getElementById('item_' + id)?.remove();
    }

    toggleDropdown(event: Event) {
        event.stopPropagation();
        if (this.isDropdownOpen) {
            this.isDropdownOpen = false;
        } else {
            this.isDropdownOpen = true;
        }
    }

    // Search Topbar
    Search() {
        var searchOptions = document.getElementById("search-close-options") as HTMLAreaElement;
        var dropdown = document.getElementById("search-dropdown") as HTMLAreaElement;
        var input: any, filter: any, ul: any, li: any, a: any | undefined, i: any, txtValue: any;
        input = document.getElementById("search-options") as HTMLAreaElement;
        filter = input.value.toUpperCase();
        var inputLength = filter.length;

        if (inputLength > 0) {
            dropdown.classList.add("show");
            searchOptions.classList.remove("d-none");
            var inputVal = input.value.toUpperCase();
            var notifyItem = document.getElementsByClassName("notify-item");

            Array.from(notifyItem).forEach(function (element: any) {
                var notifiTxt = ''
                if (element.querySelector("h6")) {
                    var spantext = element.getElementsByTagName("span")[0].innerText.toLowerCase()
                    var name = element.querySelector("h6").innerText.toLowerCase()
                    if (name.includes(inputVal)) {
                        notifiTxt = name
                    } else {
                        notifiTxt = spantext
                    }
                } else if (element.getElementsByTagName("span")) {
                    notifiTxt = element.getElementsByTagName("span")[0].innerText.toLowerCase()
                }
                if (notifiTxt)
                    element.style.display = notifiTxt.includes(inputVal) ? "block" : "none";

            });
        } else {
            dropdown.classList.remove("show");
            searchOptions.classList.add("d-none");
        }
    }

    /**
     * Search Close Btn
     */
    closeBtn() {
        var searchOptions = document.getElementById("search-close-options") as HTMLAreaElement;
        var dropdown = document.getElementById("search-dropdown") as HTMLAreaElement;
        var searchInputReponsive = document.getElementById("search-options") as HTMLInputElement;
        dropdown.classList.remove("show");
        searchOptions.classList.add("d-none");
        searchInputReponsive.value = "";
    }
}
