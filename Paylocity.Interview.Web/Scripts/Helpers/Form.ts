namespace Paylocity.Interview.Web.Scripts.Helpers {

    /**
     * Basic functions for helping with SemanticUI forms
     */
    export class Form {
        private static _states: DropdownItem[];
        private static _countries: DropdownItem[];

        /**
         * Applies all supported countries to a SemanticUI dropdown
         * @param pDropdown
         */
        public static setDropdownStates(pDropdown: $): void {
            const $menu = pDropdown.find('.menu');
            let dropdownMenuHtml = '';

            // Build HTML of the states dropdown
            for (const entry of this.getStates()) {
                dropdownMenuHtml += `<div class="item" data-value="${entry.value}">${entry.name}</div>`;
            }

            $menu.html(dropdownMenuHtml);
            return pDropdown.dropdown();
        }

        /**
         * Applies all supported countries to a SemanticUI dropdown
         * @param pDropdown
         */
        public static setDropdownCountries(pDropdown: $): void {
            const $menu = pDropdown.find('.menu');
            let dropdownMenuHtml = '';

            // Build HTML of country dropdown
            for (const entry of this.getCountries()) {
                dropdownMenuHtml += `<div class="item" data-value="${entry.value}"><i class="${entry.value} flag"></i>${entry.name}</div>`;
            }

            $menu.html(dropdownMenuHtml);
            return pDropdown.dropdown();
        }

        /**
         * Returns an array of all the supported countries with their 2-code ISO value
         */
        private static getCountries(): DropdownItem[] {
            // Build the _countries array if it has not been built yet
            if (!this._countries) {
                this._countries = [];
                this._countries.push(new DropdownItem("af", "Afghanistan"));
                this._countries.push(new DropdownItem("ax", "Aland Islands"));
                this._countries.push(new DropdownItem("al", "Albania"));
                this._countries.push(new DropdownItem("dz", "Algeria"));
                this._countries.push(new DropdownItem("as", "American Samoa"));
                this._countries.push(new DropdownItem("ad", "Andorra"));
                this._countries.push(new DropdownItem("ao", "Angola"));
                this._countries.push(new DropdownItem("ai", "Anguilla"));
                this._countries.push(new DropdownItem("ag", "Antigua"));
                this._countries.push(new DropdownItem("ar", "Argentina"));
                this._countries.push(new DropdownItem("am", "Armenia"));
                this._countries.push(new DropdownItem("aw", "Aruba"));
                this._countries.push(new DropdownItem("au", "Australia"));
                this._countries.push(new DropdownItem("at", "Austria"));
                this._countries.push(new DropdownItem("az", "Azerbaijan"));
                this._countries.push(new DropdownItem("bs", "Bahamas"));
                this._countries.push(new DropdownItem("bh", "Bahrain"));
                this._countries.push(new DropdownItem("bd", "Bangladesh"));
                this._countries.push(new DropdownItem("bb", "Barbados"));
                this._countries.push(new DropdownItem("by", "Belarus"));
                this._countries.push(new DropdownItem("be", "Belgium"));
                this._countries.push(new DropdownItem("bz", "Belize"));
                this._countries.push(new DropdownItem("bj", "Benin"));
                this._countries.push(new DropdownItem("bm", "Bermuda"));
                this._countries.push(new DropdownItem("bt", "Bhutan"));
                this._countries.push(new DropdownItem("bo", "Bolivia"));
                this._countries.push(new DropdownItem("ba", "Bosnia"));
                this._countries.push(new DropdownItem("bw", "Botswana"));
                this._countries.push(new DropdownItem("bv", "Bouvet Island"));
                this._countries.push(new DropdownItem("br", "Brazil"));
                this._countries.push(new DropdownItem("vg", "British Virgin Islands"));
                this._countries.push(new DropdownItem("bn", "Brunei"));
                this._countries.push(new DropdownItem("bg", "Bulgaria"));
                this._countries.push(new DropdownItem("bf", "Burkina Faso"));
                this._countries.push(new DropdownItem("mm", "Burma"));
                this._countries.push(new DropdownItem("bi", "Burundi"));
                this._countries.push(new DropdownItem("tc", "Caicos Islands"));
                this._countries.push(new DropdownItem("kh", "Cambodia"));
                this._countries.push(new DropdownItem("cm", "Cameroon"));
                this._countries.push(new DropdownItem("ca", "Canada"));
                this._countries.push(new DropdownItem("cv", "Cape Verde"));
                this._countries.push(new DropdownItem("ky", "Cayman Islands"));
                this._countries.push(new DropdownItem("cf", "Central African Republic"));
                this._countries.push(new DropdownItem("td", "Chad"));
                this._countries.push(new DropdownItem("cl", "Chile"));
                this._countries.push(new DropdownItem("cn", "China"));
                this._countries.push(new DropdownItem("cx", "Christmas Island"));
                this._countries.push(new DropdownItem("cc", "Cocos Islands"));
                this._countries.push(new DropdownItem("co", "Colombia"));
                this._countries.push(new DropdownItem("km", "Comoros"));
                this._countries.push(new DropdownItem("cg", "Congo Brazzaville"));
                this._countries.push(new DropdownItem("cd", "Congo"));
                this._countries.push(new DropdownItem("ck", "Cook Islands"));
                this._countries.push(new DropdownItem("cr", "Costa Rica"));
                this._countries.push(new DropdownItem("ci", "Cote Divoire"));
                this._countries.push(new DropdownItem("hr", "Croatia"));
                this._countries.push(new DropdownItem("cu", "Cuba"));
                this._countries.push(new DropdownItem("cy", "Cyprus"));
                this._countries.push(new DropdownItem("cz", "Czech Republic"));
                this._countries.push(new DropdownItem("dk", "Denmark"));
                this._countries.push(new DropdownItem("dj", "Djibouti"));
                this._countries.push(new DropdownItem("dm", "Dominica"));
                this._countries.push(new DropdownItem("do", "Dominican Republic"));
                this._countries.push(new DropdownItem("ec", "Ecuador"));
                this._countries.push(new DropdownItem("eg", "Egypt"));
                this._countries.push(new DropdownItem("sv", "El Salvador"));
                this._countries.push(new DropdownItem("gb", "England"));
                this._countries.push(new DropdownItem("gq", "Equatorial Guinea"));
                this._countries.push(new DropdownItem("er", "Eritrea"));
                this._countries.push(new DropdownItem("ee", "Estonia"));
                this._countries.push(new DropdownItem("et", "Ethiopia"));
                this._countries.push(new DropdownItem("eu", "European Union"));
                this._countries.push(new DropdownItem("fk", "Falkland Islands"));
                this._countries.push(new DropdownItem("fo", "Faroe Islands"));
                this._countries.push(new DropdownItem("fj", "Fiji"));
                this._countries.push(new DropdownItem("fi", "Finland"));
                this._countries.push(new DropdownItem("fr", "France"));
                this._countries.push(new DropdownItem("gf", "French Guiana"));
                this._countries.push(new DropdownItem("pf", "French Polynesia"));
                this._countries.push(new DropdownItem("tf", "French Territories"));
                this._countries.push(new DropdownItem("ga", "Gabon"));
                this._countries.push(new DropdownItem("gm", "Gambia"));
                this._countries.push(new DropdownItem("ge", "Georgia"));
                this._countries.push(new DropdownItem("de", "Germany"));
                this._countries.push(new DropdownItem("gh", "Ghana"));
                this._countries.push(new DropdownItem("gi", "Gibraltar"));
                this._countries.push(new DropdownItem("gr", "Greece"));
                this._countries.push(new DropdownItem("gl", "Greenland"));
                this._countries.push(new DropdownItem("gd", "Grenada"));
                this._countries.push(new DropdownItem("gp", "Guadeloupe"));
                this._countries.push(new DropdownItem("gu", "Guam"));
                this._countries.push(new DropdownItem("gt", "Guatemala"));
                this._countries.push(new DropdownItem("gw", "Guinea-Bissau"));
                this._countries.push(new DropdownItem("gn", "Guinea"));
                this._countries.push(new DropdownItem("gy", "Guyana"));
                this._countries.push(new DropdownItem("ht", "Haiti"));
                this._countries.push(new DropdownItem("hm", "Heard Island"));
                this._countries.push(new DropdownItem("hn", "Honduras"));
                this._countries.push(new DropdownItem("hk", "Hong Kong"));
                this._countries.push(new DropdownItem("hu", "Hungary"));
                this._countries.push(new DropdownItem("is", "Iceland"));
                this._countries.push(new DropdownItem("in", "India"));
                this._countries.push(new DropdownItem("io", "Indian Ocean Territory"));
                this._countries.push(new DropdownItem("id", "Indonesia"));
                this._countries.push(new DropdownItem("ir", "Iran"));
                this._countries.push(new DropdownItem("iq", "Iraq"));
                this._countries.push(new DropdownItem("ie", "Ireland"));
                this._countries.push(new DropdownItem("il", "Israel"));
                this._countries.push(new DropdownItem("it", "Italy"));
                this._countries.push(new DropdownItem("jm", "Jamaica"));
                this._countries.push(new DropdownItem("jp", "Japan"));
                this._countries.push(new DropdownItem("jo", "Jordan"));
                this._countries.push(new DropdownItem("kz", "Kazakhstan"));
                this._countries.push(new DropdownItem("ke", "Kenya"));
                this._countries.push(new DropdownItem("ki", "Kiribati"));
                this._countries.push(new DropdownItem("kw", "Kuwait"));
                this._countries.push(new DropdownItem("kg", "Kyrgyzstan"));
                this._countries.push(new DropdownItem("la", "Laos"));
                this._countries.push(new DropdownItem("lv", "Latvia"));
                this._countries.push(new DropdownItem("lb", "Lebanon"));
                this._countries.push(new DropdownItem("ls", "Lesotho"));
                this._countries.push(new DropdownItem("lr", "Liberia"));
                this._countries.push(new DropdownItem("ly", "Libya"));
                this._countries.push(new DropdownItem("li", "Liechtenstein"));
                this._countries.push(new DropdownItem("lt", "Lithuania"));
                this._countries.push(new DropdownItem("lu", "Luxembourg"));
                this._countries.push(new DropdownItem("mo", "Macau"));
                this._countries.push(new DropdownItem("mk", "Macedonia"));
                this._countries.push(new DropdownItem("mg", "Madagascar"));
                this._countries.push(new DropdownItem("mw", "Malawi"));
                this._countries.push(new DropdownItem("my", "Malaysia"));
                this._countries.push(new DropdownItem("mv", "Maldives"));
                this._countries.push(new DropdownItem("ml", "Mali"));
                this._countries.push(new DropdownItem("mt", "Malta"));
                this._countries.push(new DropdownItem("mh", "Marshall Islands"));
                this._countries.push(new DropdownItem("mq", "Martinique"));
                this._countries.push(new DropdownItem("mr", "Mauritania"));
                this._countries.push(new DropdownItem("mu", "Mauritius"));
                this._countries.push(new DropdownItem("yt", "Mayotte"));
                this._countries.push(new DropdownItem("mx", "Mexico"));
                this._countries.push(new DropdownItem("fm", "Micronesia"));
                this._countries.push(new DropdownItem("md", "Moldova"));
                this._countries.push(new DropdownItem("mc", "Monaco"));
                this._countries.push(new DropdownItem("mn", "Mongolia"));
                this._countries.push(new DropdownItem("me", "Montenegro"));
                this._countries.push(new DropdownItem("ms", "Montserrat"));
                this._countries.push(new DropdownItem("ma", "Morocco"));
                this._countries.push(new DropdownItem("mz", "Mozambique"));
                this._countries.push(new DropdownItem("na", "Namibia"));
                this._countries.push(new DropdownItem("nr", "Nauru"));
                this._countries.push(new DropdownItem("np", "Nepal"));
                this._countries.push(new DropdownItem("an", "Netherlands Antilles"));
                this._countries.push(new DropdownItem("nl", "Netherlands"));
                this._countries.push(new DropdownItem("nc", "New Caledonia"));
                this._countries.push(new DropdownItem("pg", "New Guinea"));
                this._countries.push(new DropdownItem("nz", "New Zealand"));
                this._countries.push(new DropdownItem("ni", "Nicaragua"));
                this._countries.push(new DropdownItem("ne", "Niger"));
                this._countries.push(new DropdownItem("ng", "Nigeria"));
                this._countries.push(new DropdownItem("nu", "Niue"));
                this._countries.push(new DropdownItem("nf", "Norfolk Island"));
                this._countries.push(new DropdownItem("kp", "North Korea"));
                this._countries.push(new DropdownItem("mp", "Northern Mariana Islands"));
                this._countries.push(new DropdownItem("no", "Norway"));
                this._countries.push(new DropdownItem("om", "Oman"));
                this._countries.push(new DropdownItem("pk", "Pakistan"));
                this._countries.push(new DropdownItem("pw", "Palau"));
                this._countries.push(new DropdownItem("ps", "Palestine"));
                this._countries.push(new DropdownItem("pa", "Panama"));
                this._countries.push(new DropdownItem("py", "Paraguay"));
                this._countries.push(new DropdownItem("pe", "Peru"));
                this._countries.push(new DropdownItem("ph", "Philippines"));
                this._countries.push(new DropdownItem("pn", "Pitcairn Islands"));
                this._countries.push(new DropdownItem("pl", "Poland"));
                this._countries.push(new DropdownItem("pt", "Portugal"));
                this._countries.push(new DropdownItem("pr", "Puerto Rico"));
                this._countries.push(new DropdownItem("qa", "Qatar"));
                this._countries.push(new DropdownItem("re", "Reunion"));
                this._countries.push(new DropdownItem("ro", "Romania"));
                this._countries.push(new DropdownItem("ru", "Russia"));
                this._countries.push(new DropdownItem("rw", "Rwanda"));
                this._countries.push(new DropdownItem("sh", "Saint Helena"));
                this._countries.push(new DropdownItem("kn", "Saint Kitts and Nevis"));
                this._countries.push(new DropdownItem("lc", "Saint Lucia"));
                this._countries.push(new DropdownItem("pm", "Saint Pierre"));
                this._countries.push(new DropdownItem("vc", "Saint Vincent"));
                this._countries.push(new DropdownItem("ws", "Samoa"));
                this._countries.push(new DropdownItem("sm", "San Marino"));
                this._countries.push(new DropdownItem("gs", "Sandwich Islands"));
                this._countries.push(new DropdownItem("st", "Sao Tome"));
                this._countries.push(new DropdownItem("sa", "Saudi Arabia"));
                this._countries.push(new DropdownItem("sn", "Senegal"));
                this._countries.push(new DropdownItem("cs", "Serbia"));
                this._countries.push(new DropdownItem("rs", "Serbia"));
                this._countries.push(new DropdownItem("sc", "Seychelles"));
                this._countries.push(new DropdownItem("sl", "Sierra Leone"));
                this._countries.push(new DropdownItem("sg", "Singapore"));
                this._countries.push(new DropdownItem("sk", "Slovakia"));
                this._countries.push(new DropdownItem("si", "Slovenia"));
                this._countries.push(new DropdownItem("sb", "Solomon Islands"));
                this._countries.push(new DropdownItem("so", "Somalia"));
                this._countries.push(new DropdownItem("za", "South Africa"));
                this._countries.push(new DropdownItem("kr", "South Korea"));
                this._countries.push(new DropdownItem("es", "Spain"));
                this._countries.push(new DropdownItem("lk", "Sri Lanka"));
                this._countries.push(new DropdownItem("sd", "Sudan"));
                this._countries.push(new DropdownItem("sr", "Suriname"));
                this._countries.push(new DropdownItem("sj", "Svalbard"));
                this._countries.push(new DropdownItem("sz", "Swaziland"));
                this._countries.push(new DropdownItem("se", "Sweden"));
                this._countries.push(new DropdownItem("ch", "Switzerland"));
                this._countries.push(new DropdownItem("sy", "Syria"));
                this._countries.push(new DropdownItem("tw", "Taiwan"));
                this._countries.push(new DropdownItem("tj", "Tajikistan"));
                this._countries.push(new DropdownItem("tz", "Tanzania"));
                this._countries.push(new DropdownItem("th", "Thailand"));
                this._countries.push(new DropdownItem("tl", "Timorleste"));
                this._countries.push(new DropdownItem("tg", "Togo"));
                this._countries.push(new DropdownItem("tk", "Tokelau"));
                this._countries.push(new DropdownItem("to", "Tonga"));
                this._countries.push(new DropdownItem("tt", "Trinidad"));
                this._countries.push(new DropdownItem("tn", "Tunisia"));
                this._countries.push(new DropdownItem("tr", "Turkey"));
                this._countries.push(new DropdownItem("tm", "Turkmenistan"));
                this._countries.push(new DropdownItem("tv", "Tuvalu"));
                this._countries.push(new DropdownItem("ug", "Uganda"));
                this._countries.push(new DropdownItem("ua", "Ukraine"));
                this._countries.push(new DropdownItem("ae", "United Arab Emirates"));
                this._countries.push(new DropdownItem("us", "United States"));
                this._countries.push(new DropdownItem("uy", "Uruguay"));
                this._countries.push(new DropdownItem("um", "Us Minor Islands"));
                this._countries.push(new DropdownItem("vi", "Us Virgin Islands"));
                this._countries.push(new DropdownItem("uz", "Uzbekistan"));
                this._countries.push(new DropdownItem("vu", "Vanuatu"));
                this._countries.push(new DropdownItem("va", "Vatican City"));
                this._countries.push(new DropdownItem("ve", "Venezuela"));
                this._countries.push(new DropdownItem("vn", "Vietnam"));
                this._countries.push(new DropdownItem("wf", "Wallis and Futuna"));
                this._countries.push(new DropdownItem("eh", "Western Sahara"));
                this._countries.push(new DropdownItem("ye", "Yemen"));
                this._countries.push(new DropdownItem("zm", "Zambia"));
                this._countries.push(new DropdownItem("zw", "Zimbabwe"));
            }

            return this._countries;
        }

        /**
         * Returns a list of all the supported US states
         */
        private static getStates(): DropdownItem[] {
            if (!this._states) {
                this._states = [];
                this._states.push(new DropdownItem("AL", "Alabama"));
                this._states.push(new DropdownItem("AK", "Alaska"));
                this._states.push(new DropdownItem("AZ", "Arizona"));
                this._states.push(new DropdownItem("AR", "Arkansas"));
                this._states.push(new DropdownItem("CA", "California"));
                this._states.push(new DropdownItem("CO", "Colorado"));
                this._states.push(new DropdownItem("CT", "Connecticut"));
                this._states.push(new DropdownItem("DE", "Delaware"));
                this._states.push(new DropdownItem("DC", "District Of Columbia"));
                this._states.push(new DropdownItem("FL", "Florida"));
                this._states.push(new DropdownItem("GA", "Georgia"));
                this._states.push(new DropdownItem("HI", "Hawaii"));
                this._states.push(new DropdownItem("ID", "Idaho"));
                this._states.push(new DropdownItem("IL", "Illinois"));
                this._states.push(new DropdownItem("IN", "Indiana"));
                this._states.push(new DropdownItem("IA", "Iowa"));
                this._states.push(new DropdownItem("KS", "Kansas"));
                this._states.push(new DropdownItem("KY", "Kentucky"));
                this._states.push(new DropdownItem("LA", "Louisiana"));
                this._states.push(new DropdownItem("ME", "Maine"));
                this._states.push(new DropdownItem("MD", "Maryland"));
                this._states.push(new DropdownItem("MA", "Massachusetts"));
                this._states.push(new DropdownItem("MI", "Michigan"));
                this._states.push(new DropdownItem("MN", "Minnesota"));
                this._states.push(new DropdownItem("MS", "Mississippi"));
                this._states.push(new DropdownItem("MO", "Missouri"));
                this._states.push(new DropdownItem("MT", "Montana"));
                this._states.push(new DropdownItem("NE", "Nebraska"));
                this._states.push(new DropdownItem("NV", "Nevada"));
                this._states.push(new DropdownItem("NH", "New Hampshire"));
                this._states.push(new DropdownItem("NJ", "New Jersey"));
                this._states.push(new DropdownItem("NM", "New Mexico"));
                this._states.push(new DropdownItem("NY", "New York"));
                this._states.push(new DropdownItem("NC", "North Carolina"));
                this._states.push(new DropdownItem("ND", "North Dakota"));
                this._states.push(new DropdownItem("OH", "Ohio"));
                this._states.push(new DropdownItem("OK", "Oklahoma"));
                this._states.push(new DropdownItem("OR", "Oregon"));
                this._states.push(new DropdownItem("PA", "Pennsylvania"));
                this._states.push(new DropdownItem("RI", "Rhode Island"));
                this._states.push(new DropdownItem("SC", "South Carolina"));
                this._states.push(new DropdownItem("SD", "South Dakota"));
                this._states.push(new DropdownItem("TN", "Tennessee"));
                this._states.push(new DropdownItem("TX", "Texas"));
                this._states.push(new DropdownItem("UT", "Utah"));
                this._states.push(new DropdownItem("VT", "Vermont"));
                this._states.push(new DropdownItem("VA", "Virginia"));
                this._states.push(new DropdownItem("WA", "Washington"));
                this._states.push(new DropdownItem("WV", "West Virginia"));
                this._states.push(new DropdownItem("WI", "Wisconsin"));
                this._states.push(new DropdownItem("WY", "Wyoming"));
            }

            return this._states;
        }
    }

    /**
     * Represents an item in a dropdown
     * Consumed by the Form Helper for populating dropdowns
     */
    class DropdownItem {
        public readonly value: string;
        public readonly name: string;

        public constructor(pCode: string, pName: string) {
            this.name = pName;
            this.value = pCode;
        }
    }
}
