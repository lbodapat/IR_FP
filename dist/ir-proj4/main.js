(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home.component.ts");
/* harmony import */ var _chart_chart_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./chart/chart.component */ "./src/app/chart/chart.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var routes = [
    { path: '', component: _home_home_component__WEBPACK_IMPORTED_MODULE_2__["HomeComponent"] },
    { path: 'visual', component: _chart_chart_component__WEBPACK_IMPORTED_MODULE_3__["ChartComponent"] }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]],
            imports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)
            ]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n<!-- <div style=\"text-align:center\">\n  <h1>\n    Welcome to {{ title }}!\n  </h1>\n  <img width=\"300\" alt=\"Angular Logo\" src=\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==\">\n</div>\n<h2>Here are some links to help you start: </h2>\n<ul>\n  <li>\n    <h2><a target=\"_blank\" rel=\"noopener\" href=\"https://angular.io/tutorial\">Tour of Heroes</a></h2>\n  </li>\n  <li>\n    <h2><a target=\"_blank\" rel=\"noopener\" href=\"https://github.com/angular/angular-cli/wiki\">CLI Documentation</a></h2>\n  </li>\n  <li>\n    <h2><a target=\"_blank\" rel=\"noopener\" href=\"https://blog.angular.io/\">Angular blog</a></h2>\n  </li>\n</ul> -->\n<app-navbar></app-navbar>\n<router-outlet></router-outlet>\n<!-- <app-filter></app-filter> -->\n<!-- \n<div class=\"container\" style=\" transform: scale(0.7);\">\n    <app-line-chart></app-line-chart>\n</div>  -->\n\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'app';
    }
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! .//app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-pagination */ "./node_modules/ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var angular_highcharts__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! angular-highcharts */ "./node_modules/angular-highcharts/fesm5/angular-highcharts.js");
/* harmony import */ var _google_chart_google_chart_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./google-chart/google-chart.module */ "./src/app/google-chart/google-chart.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./navbar/navbar.component */ "./src/app/navbar/navbar.component.ts");
/* harmony import */ var _filter_filter_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./filter/filter.component */ "./src/app/filter/filter.component.ts");
/* harmony import */ var _visual_visual_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./visual/visual.component */ "./src/app/visual/visual.component.ts");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home.component.ts");
/* harmony import */ var _chart_chart_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./chart/chart.component */ "./src/app/chart/chart.component.ts");
/* harmony import */ var _directives_stop_propagation_directive__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./directives/stop-propagation.directive */ "./src/app/directives/stop-propagation.directive.ts");
/* harmony import */ var _services_tweet_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./services/tweet.service */ "./src/app/services/tweet.service.ts");
/* harmony import */ var angular4_word_cloud__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! angular4-word-cloud */ "./node_modules/angular4-word-cloud/angular4-word-cloud.umd.js");
/* harmony import */ var angular4_word_cloud__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(angular4_word_cloud__WEBPACK_IMPORTED_MODULE_18__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_10__["AppComponent"], _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_11__["NavbarComponent"], _filter_filter_component__WEBPACK_IMPORTED_MODULE_12__["FilterComponent"], _visual_visual_component__WEBPACK_IMPORTED_MODULE_13__["VisualComponent"], _home_home_component__WEBPACK_IMPORTED_MODULE_14__["HomeComponent"], _chart_chart_component__WEBPACK_IMPORTED_MODULE_15__["ChartComponent"], _directives_stop_propagation_directive__WEBPACK_IMPORTED_MODULE_16__["StopPropagationDirective"]
            ],
            imports: [
                _google_chart_google_chart_module__WEBPACK_IMPORTED_MODULE_9__["GoogleChartModule"],
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__["BrowserAnimationsModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbModule"].forRoot(),
                angular_highcharts__WEBPACK_IMPORTED_MODULE_8__["ChartModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClientModule"],
                ngx_pagination__WEBPACK_IMPORTED_MODULE_7__["NgxPaginationModule"],
                angular4_word_cloud__WEBPACK_IMPORTED_MODULE_18__["AgWordCloudModule"].forRoot()
            ],
            providers: [_services_tweet_service__WEBPACK_IMPORTED_MODULE_17__["TweetService"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_10__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/chart/chart.component.css":
/*!*******************************************!*\
  !*** ./src/app/chart/chart.component.css ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/chart/chart.component.html":
/*!********************************************!*\
  !*** ./src/app/chart/chart.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div style=\"border: 20px;margin: 50px;\">\r\n<h2>Time series for POI </h2>\r\n<div [chart]=\"chart_poiTweets\"></div>\r\n\r\n<h2>Time series for POI replies </h2>\r\n<div [chart]=\"chart\"></div>\r\n\r\n<div>\r\n    <div class=\"row\">\r\n        <div class=\"col-6\">\r\n            <h1>Language wise distribution of tweets</h1>\r\n            <div [chart]=\"doughnut_lang\"></div>\r\n        </div>\r\n        <div class=\"col-6\">\r\n            <h1>Country wise distribution of tweets</h1>\r\n            <div [chart]=\"doughnut_country\"></div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<h1>POI sentiment distribution</h1>\r\n<div [chart] =\"stackedBarChart\"></div>\r\n\r\n<h1>Hashtags distribution country wise</h1>\r\n\r\n        <!-- <div class=\"row\"> -->\r\n\r\n            <h1>India</h1>\r\n            <!-- <div class=\"col-3\"> -->\r\n            <div [chart]=\"doughnut\"></div>\r\n        </div>\r\n           \r\n            <h1>USA</h1>\r\n            <div class=\"col-3\">\r\n            <!-- <div [chart]=\"doughnut\"></div> </div> -->\r\n           \r\n            <h1>Brazil</h1>\r\n            <div class=\"col-3\">\r\n            <!-- <div [chart]=\"doughnut\"></div> -->\r\n            <!-- </div> -->\r\n            \r\n        </div>\r\n\r\n\r\n<h1>word cloud</h1>\r\n<div AgWordCloud [wordData]=\"wordData\" [options]=\"options\">\r\n\r\n</div>\r\n<!-- <div AgWordCloud [wordData]=\"wordData1\" [options]=\"options\"></div> -->\r\n</div>\r\n\r\n\r\n\r\n<h1>Country wise Sentiment Analysis</h1>\r\n<div class=\"row\">\r\n        <div class=\"col-4\">\r\n            <a [chart]=\"pie_India\"></a>\r\n        </div>\r\n\r\n        <div class=\"col-4\">\r\n            <a [chart]=\"pie_usa\"></a>\r\n        </div>\r\n\r\n        <div class=\"col-4\">\r\n            <a [chart]=\"pie_brazil\"></a>\r\n        </div>\r\n</div>\r\n\r\n\r\n\r\n\r\n   \r\n\r\n\r\n"

/***/ }),

/***/ "./src/app/chart/chart.component.ts":
/*!******************************************!*\
  !*** ./src/app/chart/chart.component.ts ***!
  \******************************************/
/*! exports provided: ChartComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChartComponent", function() { return ChartComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var angular_highcharts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular-highcharts */ "./node_modules/angular-highcharts/fesm5/angular-highcharts.js");
/* harmony import */ var _models_piechart_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../models/piechart.model */ "./src/app/models/piechart.model.ts");
/* harmony import */ var src_app_services_tweet_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/tweet.service */ "./src/app/services/tweet.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _models_filter_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../models/filter.model */ "./src/app/models/filter.model.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ChartComponent = /** @class */ (function () {
    function ChartComponent(tweetService, http) {
        var _this = this;
        this.tweetService = tweetService;
        this.http = http;
        this.prop = new _models_piechart_model__WEBPACK_IMPORTED_MODULE_2__["Prop"]();
        this.obj = new _models_filter_model__WEBPACK_IMPORTED_MODULE_5__["Filter"]();
        this.hashtag = [
            {
                "country": ["india", 20, "brazil", 0, "usa", 10],
                "hashtags": ["indiawithnamo", 30, "kashmirparfinalfight", 1, "100days", 10, "100daysnovikas", 0, "100daysofgovernment", 10, "1010means", 20,
                    "10_\u0939\u092b\u094d\u0924\u0947_10_\u092c\u091c\u0947_10_\u092e\u093f\u0928\u091f", 70, "10baje", 0, "10hafte10baje10minute", 0, "10minutes", 20],
                "status": 0,
                "tweet_lang": ["en", 22, "ar", 0, "bn", 0],
                "verified": ["true", 22, "false", 0]
            }
        ];
        this.test = [
            {
                "country": ["india", 22, "brazil", 0, "usa", 0],
                "hashtags": ["indiawithnamo", 1, "kashmirparfinalfight", 1, "100days", 0, "100daysnovikas", 0, "100daysofgovernment", 0, "1010means", 0,
                    "10_\u0939\u092b\u094d\u0924\u0947_10_\u092c\u091c\u0947_10_\u092e\u093f\u0928\u091f", 0, "10baje", 0, "10hafte10baje10minute", 0, "10minutes", 0],
                "status": 0,
                "tweet_lang": ["en", 22, "ar", 0, "bn", 0],
                "verified": ["true", 22, "false", 0]
            }
        ];
        this.months = ['01-09', '02-09', '03-09', '04-09', '05-09', '06-09', '07-09', '08-09', '09-09', '10-09', '11-09', '12-09', '13-09', '14-09', '15-09'];
        this.countrydata_str = ['India', 'USA', 'Brazil'];
        this.url = './test.json';
        this.xaxis = [];
        this.yaxis = [];
        this.codechart = new angular_highcharts__WEBPACK_IMPORTED_MODULE_1__["Chart"]();
        this.searchText = '';
        this.filterdata_lang = [];
        this.filterdata_country = [];
        this.filterdata_hashtags = [];
        this.donutData = [];
        this.docs = [];
        this.sentimentData = [];
        this.sentimentsInfo = [];
        this.columnChartOptions = new angular_highcharts__WEBPACK_IMPORTED_MODULE_1__["Chart"]({});
        this.chart = new angular_highcharts__WEBPACK_IMPORTED_MODULE_1__["Chart"]({});
        this.chart_poiTweets = new angular_highcharts__WEBPACK_IMPORTED_MODULE_1__["Chart"]({});
        this.pieChartForCountries = new angular_highcharts__WEBPACK_IMPORTED_MODULE_1__["Chart"]({});
        this.pie_India = new angular_highcharts__WEBPACK_IMPORTED_MODULE_1__["Chart"]({});
        this.pie_usa = new angular_highcharts__WEBPACK_IMPORTED_MODULE_1__["Chart"]({});
        this.pie_brazil = new angular_highcharts__WEBPACK_IMPORTED_MODULE_1__["Chart"]({});
        this.options = {};
        this.count = 0;
        // ------------------------------------------------------------------------------------------------------------
        // ------------------------------------------------------------------------------------------------------------
        // columnChartOptions = new Chart( {
        //   chart: {
        //     type: "column",
        //     renderTo: "container"
        //   },
        //   credits: {
        //     enabled: false
        //   },
        //   title: {
        //     text: " Column Title"
        //   },
        //   subtitle: {
        //     text: ""
        //   },
        //   xAxis: {
        //     categories: ["Distribution"]
        //   },
        //   yAxis: {
        //     min: 0,
        //     title: {
        //       text: "Number of tweets"
        //     }
        //   },
        //   legend: {
        //     layout: "vertical",
        //     backgroundColor: "#FFFFFF",
        //     align: "left",
        //     verticalAlign: "top",
        //     x: 50,
        //     y: 70,
        //     floating: true,
        //     shadow: true
        //   },
        //   tooltip: {
        //     formatter: function() {
        //       return "" + this.x + ": " + this.y;
        //     }
        //   },
        //   plotOptions: {
        //     column: {
        //       pointPadding: 0.2,
        //       borderWidth: 0
        //     }
        //   },
        //   series: [
        //     { type:undefined, name: "India",
        //       data: [49.9 ]
        //     },
        //     {
        //       type:undefined,
        //       name: "Brazil",
        //       data: [83]
        //     },
        //     {
        //       type:undefined,
        //       name: "USA",
        //       data: [42]
        //     }
        //   ]
        // });
        this.pieChartOptions = new angular_highcharts__WEBPACK_IMPORTED_MODULE_1__["Chart"]({
            chart: {
                renderTo: "container",
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            credits: {
                enabled: false
            },
            title: {
                text: "Título Pie"
            },
            subtitle: {
                text: "Subtítulo Pie"
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: "pointer",
                    dataLabels: {
                        enabled: true,
                        color: "#000000",
                        connectorColor: "#000000",
                    }
                }
            },
            series: [
                {
                    type: "pie", name: "",
                    data: [
                        { name: 'A', y: 10 },
                        { name: 'D', y: 130 },
                        { name: 'LOL', y: 10 },
                        { name: 'S', y: 10 },
                        { name: 'W', y: 30 },
                        { name: 'W', y: 70 },
                    ]
                }
            ]
        });
        // ------------------------------------------------------------------------------------------------------------
        // DONUT AND PIE Chart
        // ------------------------------------------------------------------------------------------------------------
        this.doughnut = new angular_highcharts__WEBPACK_IMPORTED_MODULE_1__["Chart"]({
            chart: { type: 'pie' },
            title: { text: '' },
            credits: { enabled: false },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    dataLabels: { enabled: false },
                    size: 300,
                    innerSize: '50%',
                    center: ['50%', '40%']
                }
            },
            series: [{
                    type: undefined,
                    innerSize: '50%',
                    data: this.donutData
                }]
        });
        this.doughnut_lang = new angular_highcharts__WEBPACK_IMPORTED_MODULE_1__["Chart"]({
            chart: { type: 'pie' },
            title: { text: '' },
            credits: { enabled: false },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    dataLabels: { enabled: false },
                    size: 300,
                    innerSize: '50%',
                    center: ['50%', '40%']
                }
            },
            series: [{
                    type: undefined,
                    innerSize: '50%',
                    data: this.donutData
                }]
        });
        this.doughnut_country = new angular_highcharts__WEBPACK_IMPORTED_MODULE_1__["Chart"]({
            chart: { type: 'pie' },
            title: { text: '' },
            credits: { enabled: false },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    dataLabels: { enabled: false },
                    size: 300,
                    innerSize: '50%',
                    center: ['50%', '40%']
                }
            },
            series: [{
                    type: undefined,
                    innerSize: '50%',
                    data: this.donutData
                }]
        });
        // ------------------------------------------------------------------------------------------------------------
        this.pie2 = new angular_highcharts__WEBPACK_IMPORTED_MODULE_1__["Chart"]({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: { text: '' },
            tooltip: { pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>' },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        connectorColor: 'silver'
                    }
                }
            },
            series: [{
                    type: undefined,
                    name: 'Share',
                    data: [
                        { name: 'Brazil', y: 99 },
                        { name: 'India', y: 11.84 },
                        { name: 'USA', y: 10 },
                        { name: 'Other', y: 7.4 }
                    ]
                }]
        });
        this.verified = 100;
        this.non_verified = 90;
        this.doughnut_for_verified = new angular_highcharts__WEBPACK_IMPORTED_MODULE_1__["Chart"]({
            chart: {
                renderTo: 'photoUploadChart',
                type: 'pie'
            },
            title: {
                text: 'Donut Chart'
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    dataLabels: {
                        enabled: false
                    },
                    size: 200,
                    innerSize: '50%',
                    center: ['50%', '40%']
                }
            },
            series: [{
                    type: 'pie',
                    name: 'Browser share',
                    innerSize: '50%',
                    data: [
                        ['VERIFIED', this.verified],
                        ['NOT-VERIFIED', this.non_verified],
                        {
                            name: 'Other',
                            y: 200 - this.non_verified - this.verified,
                            dataLabels: {
                                enabled: false
                            }
                        }
                    ]
                }]
        });
        this.stackedBarChart = new angular_highcharts__WEBPACK_IMPORTED_MODULE_1__["Chart"]({
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Stacked bar chart'
            },
            xAxis: {
                categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total fruit consumption'
                }
            },
            legend: {
                reversed: true
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                }
            },
            series: [{
                    type: undefined,
                    name: 'John',
                    data: [5, 3, 4, 7, 2]
                }, {
                    type: undefined,
                    name: 'Jane',
                    data: [2, 2, 3, 2, 1]
                }, {
                    type: undefined,
                    name: 'Joe',
                    data: [3, 4, 4, 2, 5]
                }]
        });
        this.columnDrillDown = new angular_highcharts__WEBPACK_IMPORTED_MODULE_1__["Chart"]({});
        this.tweetService.value$.subscribe(function (obj) {
            _this.homeObj = obj;
            _this.tweetService.postFilterData(_this.homeObj).subscribe(function (tweets) {
                _this.docs = tweets.country;
                _this.donutForHastags();
                _this.donutForLanguage();
                _this.donutForCountries();
                _this.lineChartSentimentalAnalysis_poiReplies();
                _this.lineChartSentimentalAnalysis_poitweets();
                _this.columnChartForCountries();
                //this.pieChartsForCountries();
                _this.setWorldCloud();
                _this.pie_CountriesWiseSentiments();
                setTimeout(function () {
                }, 3000);
            });
        });
        this.donutForHastags();
        this.donutForLanguage();
        this.donutForCountries();
        this.lineChartSentimentalAnalysis_poiReplies();
        this.lineChartSentimentalAnalysis_poitweets();
        this.columnChartForCountries();
        //this.pieChartsForCountries();
        this.setWorldCloud();
        this.pie_CountriesWiseSentiments();
        if (this.searchText) {
            this.obj.query = this.searchText;
        }
    }
    ChartComponent.prototype.ngOnInit = function () {
        var a = [];
        var b = [];
    };
    ChartComponent.prototype.setWorldCloud = function () {
        // this.data = this.tweetService.getData();
        //     let temp =JSON.stringify(this.data);      
        //     this.tweetService.postFilterData(temp).subscribe(tweets=>{
        //       let data_hastags=[];
        //       let data =[];
        //       let res=[];
        //       let  chartData=[];
        //       this.filterdata_hashtags = tweets.hashtags; 
        //       data_hastags =this.filterdata_hashtags;
        //       if(data_hastags && data_hastags.length>0){
        //         data_hastags.forEach(function(d) {
        //          data.push(d);   
        //         });
        //         for (let i = 0; i < this.hashtag[0].hashtags.length; i+=2) {
        //           if(data[i+1]>0){
        //            this.prop = new Prop();
        //            this.prop.name= '#'+data[i];
        //            this.prop.y = data[i+1];
        //            chartData.push(this.prop)
        //           }
        //        }
        //        for(let i=0;i<chartData.length;i++){
        //         res.push({size:chartData[i].y, text:chartData[i].name})
        //         }
        //           //this.wordData = res;
        //         this.wordData= new Array<AgWordCloudData>();
        //         //this.wordData= new agworl;
        this.wordData = [
            { size: 1000, text: 'Sneha' },
            { size: 950, text: 'Angular' },
            { size: 123, text: 'JAva script' },
            { size: 321, text: 'Mansi' },
            { size: 231, text: 'Int' },
            { size: 123, text: 'CkEditor' },
            { size: 346, text: 'Ng Model' },
            { size: 107, text: 'Variable' },
            { size: 436, text: 'Class' },
            { size: 1731, text: 'Ehtesham' },
            { size: 80, text: '@Input' },
            { size: 96, text: '@Output' },
            { size: 531, text: 'EventEmitter' },
            { size: 109, text: 'ANushree' },
            { size: 500, text: 'Directives' },
            { size: 213, text: 'Services' },
            { size: 294, text: 'Component' },
            { size: 472, text: 'NgViewAfterInIt' },
            { size: 297, text: 'NgOnChanges' },
            { size: 456, text: 'NgBind' },
            { size: 123, text: 'NgTest' },
            { size: 376, text: 'Pipes' },
            { size: 93, text: 'Implements' },
            { size: 123, text: 'Assets' },
        ];
        //this.wordData =abc;
        this.options = {
            settings: {
                minFontSize: 10,
                maxFontSize: 100,
            },
            margin: {
                top: 10,
                // right: 10,
                bottom: 10,
                left: 10
            },
            labels: true // false to hide hover labels
        };
        //  }
        // });
        // setTimeout (() => {
        // }, 3000);
    };
    ChartComponent.prototype.pie_CountriesWiseSentiments = function () {
        var _this = this;
        this.data = this.tweetService.getData();
        var temp = JSON.stringify(this.data);
        this.tweetService.getSentimentDetails(temp).subscribe(function (tweets) {
            _this.filterdata_country = tweets.countrydata;
            _this.data = _this.filterdata_country;
            var data = [];
            var res = [];
            var data_pie = [];
            var india = [];
            var usa = [];
            var brazil = [];
            var index_india = -1;
            data_pie = _this.filterdata_country;
            var countries_array = tweets && tweets.countrydata ? Object.keys(tweets.countrydata) : [];
            index_india = countries_array.indexOf("india");
            if (countries_array.indexOf("india") !== -1) {
                india.push({ name: 'POSITIVE', y: data_pie["india"][0].positive });
                india.push({ name: 'NEGATIVE', y: data_pie["india"][0].negative });
                india.push({ name: 'NEUTRAL', y: data_pie["india"][0].neutral });
            }
            else {
                india.push({ name: 'POSITIVE', y: 0 });
                india.push({ name: 'NEGATIVE', y: 0 });
                india.push({ name: 'NEUTRAL', y: 0 });
            }
            //index_usa = countries_array.indexOf("india");
            if (countries_array.indexOf("usa") !== -1) {
                usa.push({ name: 'POSITIVE', y: data_pie["usa"][0].positive });
                usa.push({ name: 'NEGATIVE', y: data_pie["usa"][0].negative });
                usa.push({ name: 'NEUTRAL', y: data_pie["usa"][0].neutral });
            }
            else {
                usa.push({ name: 'POSITIVE', y: 0 });
                usa.push({ name: 'NEGATIVE', y: 0 });
                usa.push({ name: 'NEUTRAL', y: 0 });
            }
            if (countries_array.indexOf("brazil") !== -1) {
                brazil.push({ name: 'POSITIVE', y: data_pie["brazil"][0].positive });
                brazil.push({ name: 'NEGATIVE', y: data_pie["brazil"][0].negative });
                brazil.push({ name: 'NEUTRAL', y: data_pie["brazil"][0].neutral });
            }
            else {
                brazil.push({ name: 'POSITIVE', y: 0 });
                brazil.push({ name: 'NEGATIVE', y: 0 });
                brazil.push({ name: 'NEUTRAL', y: 0 });
            }
            _this.pie_India = new angular_highcharts__WEBPACK_IMPORTED_MODULE_1__["Chart"]({
                chart: {
                    renderTo: "container",
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                credits: { enabled: false },
                title: { text: "India" },
                subtitle: { text: "" },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        size: 100,
                        cursor: "pointer",
                        dataLabels: {
                            enabled: true, color: "#000000", connectorColor: "#000000",
                        }
                    }
                },
                colors: ['#3ED27D', '#010B05', '#1C83CD'],
                series: [
                    {
                        type: "pie", name: "",
                        data: india
                    }
                ]
            });
            _this.pie_usa = new angular_highcharts__WEBPACK_IMPORTED_MODULE_1__["Chart"]({
                chart: {
                    renderTo: "container",
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                credits: { enabled: false },
                title: { text: "USA" },
                subtitle: { text: "" },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: "pointer",
                        size: 100,
                        dataLabels: {
                            enabled: true, color: "#000000", connectorColor: "#000000",
                        }
                    }
                },
                colors: ['#3ED27D', '#010B05', '#1C83CD'],
                series: [
                    {
                        type: "pie", name: "",
                        data: usa
                    }
                ]
            });
            _this.pie_brazil = new angular_highcharts__WEBPACK_IMPORTED_MODULE_1__["Chart"]({
                chart: {
                    renderTo: "container",
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                credits: { enabled: false },
                title: { text: "Brazil" },
                subtitle: { text: "" },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        size: 100,
                        cursor: "pointer",
                        dataLabels: {
                            enabled: true, color: "#000000", connectorColor: "#000000",
                        }
                    }
                },
                colors: ['#3ED27D', '#010B05', '#1C83CD'],
                series: [
                    {
                        type: "pie", name: "",
                        data: brazil
                    }
                ]
            });
        });
        setTimeout(function () {
            console.log("Hello from setTimeout");
        }, 3000);
    };
    // pieChartsForCountries(){
    //   this.data = this.tweetService.getData();
    //   let temp =JSON.stringify(this.data);
    //   this.tweetService.postFilterData(temp).subscribe(tweets=>{        
    //     this.filterdata_country = tweets.country;        
    //     this.data =this.filterdata_country;      
    //     let data =[];
    //     let res=[];    
    //     let data_pie=[];
    //     data_pie= this.filterdata_country;  
    //     if(data_pie && data_pie.length>0){
    //        this.data.forEach(function(d) {
    //         data.push(d);   
    //        });
    //        for (let i = 0; i < this.data.length; i+=2) {
    //         res.push({name:this.data[i],y:this.data[i+1]})
    //       }  
    //     }
    //       this.pieChartForCountries = new Chart( {
    //         chart: {
    //           renderTo: "container",
    //           plotBackgroundColor: null,
    //           plotBorderWidth: null,
    //           plotShadow: false
    //         },
    //         credits: {  enabled: false  },
    //         title: {    text: "Country wise distribution" },
    //         subtitle: { text: "Country wise distribution" },
    //         plotOptions: {
    //           pie: {
    //             allowPointSelect: true,
    //             cursor: "pointer",
    //             dataLabels: {
    //               enabled: true, color: "#000000", connectorColor: "#000000",          
    //             }
    //           }
    //         },
    //         series: [
    //           {
    //             type: "pie", name: "",
    //             data: res
    //           }
    //         ]
    //       });
    //     });
    //     setTimeout (() => {
    //       console.log("Hello from setTimeout");
    //     }, 3000);
    // }
    ChartComponent.prototype.columnChartForCountries = function () {
        var _this = this;
        this.data = this.tweetService.getData();
        var temp = JSON.stringify(this.data);
        this.tweetService.postFilterData(temp).subscribe(function (tweets) {
            _this.filterdata_country = tweets.country;
            _this.data = _this.filterdata_country;
            var data = [];
            var res = [];
            var chartData = [];
            var prop;
            var result = [];
            var data_country = [];
            data_country = _this.filterdata_country;
            if (data_country && data_country.length > 0) {
                _this.data.forEach(function (d) {
                    data.push(d);
                });
                for (var i = 0; i < _this.data.length; i += 2) {
                    res.push({ name: _this.data[i], y: [_this.data[i + 1]] });
                }
            }
            _this.columnChartOptions = new angular_highcharts__WEBPACK_IMPORTED_MODULE_1__["Chart"]({
                chart: {
                    type: "column",
                    renderTo: "container"
                },
                credits: { enabled: false },
                title: { text: " Column Title" },
                subtitle: { text: "" },
                xAxis: { categories: ["Distribution of Tweets"] },
                yAxis: { min: 0, title: { text: "Number of tweets" } },
                legend: {
                    layout: "vertical",
                    backgroundColor: "#FFFFFF",
                    align: "left",
                    verticalAlign: "top",
                    x: 50,
                    y: 70,
                    floating: true,
                    shadow: true
                },
                tooltip: {},
                plotOptions: {
                    column: {
                        pointPadding: 0.2, borderWidth: 0
                    }
                },
                series: res
            });
        });
        setTimeout(function () {
            console.log("Hello from setTimeout");
        }, 3000);
    };
    ChartComponent.prototype.lineChartSentimentalAnalysis_poitweets = function () {
        var _this = this;
        this.data = this.tweetService.getData();
        var temp = JSON.stringify(this.data);
        this.tweetService.getpoiTweetsUrl(temp).subscribe(function (tweets) {
            _this.sentimentData = tweets.data;
            _this.count = tweets && tweets.data ? Object.keys(tweets.data).length : 0;
            var res = [];
            var data_neutral = [];
            var data_negative = [];
            var data_positive = [];
            var months_str = [];
            var month_array = tweets && tweets.data ? Object.keys(tweets.data) : [];
            for (var i = 0; i < _this.months.length; i++) {
                if ((month_array.indexOf(_this.months[i])) !== -1) {
                    var monthData = _this.sentimentData[_this.months[i]];
                    data_neutral.push(monthData[0].neutral);
                    data_negative.push(monthData[0].negative);
                    data_positive.push(monthData[0].positive);
                }
                else {
                    if (_this.count > 0) {
                        data_neutral.push(0);
                        data_negative.push(0);
                        data_positive.push(0);
                    }
                }
                for (var i_1 = 0; i_1 < _this.months.length; i_1++) {
                    months_str.push(_this.months[i_1] + '-2019');
                }
            }
            res.push({ name: 'NEUTRAL', data: data_neutral, type: "line" });
            res.push({ name: 'NEGATIVE', data: data_negative, type: "line" });
            res.push({ name: 'POSITIVE', data: data_positive, type: "line" });
            _this.sentimentsInfo = res;
            _this.chart_poiTweets = new angular_highcharts__WEBPACK_IMPORTED_MODULE_1__["Chart"]({
                chart: { type: 'line' },
                title: { text: 'TIME SERIES OF TWEETS' },
                credits: { enabled: false },
                xAxis: { categories: months_str },
                series: _this.sentimentsInfo
            });
        });
        setTimeout(function () {
            console.log("Hello from setTimeout");
        }, 3000);
    };
    ChartComponent.prototype.lineChartSentimentalAnalysis_poiReplies = function () {
        var _this = this;
        this.data = this.tweetService.getData();
        var temp = JSON.stringify(this.data);
        this.tweetService.getSentimentDetails(temp).subscribe(function (tweets) {
            _this.sentimentData = tweets.monthdata;
            _this.count = tweets && tweets.monthdata ? Object.keys(tweets.monthdata).length : 0;
            var res = [];
            var data_neutral = [];
            var data_negative = [];
            var data_positive = [];
            var months_str = [];
            var month_array = tweets && tweets.monthdata ? Object.keys(tweets.monthdata) : [];
            for (var i = 0; i < _this.months.length; i++) {
                if ((month_array.indexOf(_this.months[i])) !== -1) {
                    var monthData = _this.sentimentData[_this.months[i]];
                    data_neutral.push(monthData[0].neutral);
                    data_negative.push(monthData[0].negative);
                    data_positive.push(monthData[0].positive);
                }
                else {
                    if (_this.count > 0) {
                        data_neutral.push(0);
                        data_negative.push(0);
                        data_positive.push(0);
                    }
                }
                for (var i_2 = 0; i_2 < _this.months.length; i_2++) {
                    months_str.push(_this.months[i_2] + '-2019');
                }
            }
            res.push({ name: 'NEUTRAL', data: data_neutral, type: "line" });
            res.push({ name: 'NEGATIVE', data: data_negative, type: "line" });
            res.push({ name: 'POSITIVE', data: data_positive, type: "line" });
            _this.sentimentsInfo = res;
            _this.chart = new angular_highcharts__WEBPACK_IMPORTED_MODULE_1__["Chart"]({
                chart: { type: 'line' },
                title: { text: 'TIME SERIES OF REPLIES TO POI TWEETS' },
                credits: { enabled: false },
                xAxis: { categories: months_str },
                series: _this.sentimentsInfo
            });
        });
        setTimeout(function () {
            //console.log("Hello from setTimeout");
        }, 3000);
    };
    ChartComponent.prototype.donutForHastags = function () {
        var _this = this;
        this.data = this.tweetService.getData();
        var temp = JSON.stringify(this.data);
        this.tweetService.postFilterData(temp).subscribe(function (tweets) {
            //console.log(tweets);
            var data_hastags = [];
            var data = [];
            var res = [];
            var chartData = [];
            var prop;
            var result = [];
            _this.filterdata_hashtags = tweets.hashtags;
            _this.filterdata_country = tweets.country;
            _this.filterdata_lang = tweets.tweet_lang;
            data_hastags = _this.filterdata_hashtags;
            if (data_hastags && data_hastags.length > 0) {
                data_hastags.forEach(function (d) {
                    data.push(d);
                });
            }
            for (var i = 0; i < _this.hashtag[0].hashtags.length; i += 2) {
                if (data[i + 1] > 0) {
                    _this.prop = new _models_piechart_model__WEBPACK_IMPORTED_MODULE_2__["Prop"]();
                    _this.prop.name = '#' + data[i];
                    _this.prop.y = data[i + 1];
                    chartData.push(_this.prop);
                }
            }
            for (var i = 0; i < chartData.length; i++) {
                res.push({ name: chartData[i].name, y: chartData[i].y, dataLabels: { enabled: true } });
            }
            _this.donutData = res;
            _this.doughnut = new angular_highcharts__WEBPACK_IMPORTED_MODULE_1__["Chart"]({
                chart: { type: 'pie' },
                title: { text: '' },
                credits: { enabled: false },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        dataLabels: { enabled: false },
                        size: 150,
                        innerSize: '40%',
                        center: ['50%', '40%']
                    }
                },
                series: [{
                        type: undefined,
                        innerSize: '50%',
                        data: _this.donutData
                    }]
            });
        });
        setTimeout(function () { }, 3000);
    };
    ChartComponent.prototype.donutForLanguage = function () {
        var _this = this;
        this.data = this.tweetService.getData();
        var temp = JSON.stringify(this.data);
        this.tweetService.postFilterData(temp).subscribe(function (tweets) {
            _this.filterdata_hashtags = tweets.hashtags;
            _this.filterdata_country = tweets.country;
            _this.filterdata_lang = tweets.tweet_lang;
            _this.data = _this.filterdata_lang;
            var data = [];
            var res = [];
            var chartData = [];
            var prop;
            var result = [];
            var data_lang = [];
            data_lang = _this.filterdata_lang;
            if (data_lang && data_lang.length > 0) {
                _this.data.forEach(function (d) {
                    data.push(d);
                });
            }
            for (var i = 0; i < _this.hashtag[0].hashtags.length; i += 2) {
                if (data[i + 1] > 0) {
                    _this.prop = new _models_piechart_model__WEBPACK_IMPORTED_MODULE_2__["Prop"]();
                    _this.prop.name = data[i];
                    _this.prop.y = data[i + 1];
                    chartData.push(_this.prop);
                }
            }
            for (var i = 0; i < chartData.length; i++) {
                res.push({ name: chartData[i].name, y: chartData[i].y, dataLabels: { enabled: true } });
            }
            //return res;
            _this.donutData = res;
            _this.doughnut_lang = new angular_highcharts__WEBPACK_IMPORTED_MODULE_1__["Chart"]({
                chart: { type: 'pie' },
                title: { text: 'lang' },
                credits: { enabled: false },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        dataLabels: { enabled: false },
                        size: 300,
                        innerSize: '50%',
                        center: ['50%', '40%']
                    }
                },
                series: [{
                        type: undefined,
                        innerSize: '50%',
                        data: _this.donutData
                    }]
            });
        });
        setTimeout(function () {
            console.log("Hello from setTimeout");
        }, 3000);
    };
    ChartComponent.prototype.donutForCountries = function () {
        var _this = this;
        this.data = this.tweetService.getData();
        var temp = JSON.stringify(this.data);
        this.tweetService.postFilterData(temp).subscribe(function (tweets) {
            _this.filterdata_hashtags = tweets.hashtags;
            _this.filterdata_country = tweets.country;
            _this.filterdata_lang = tweets.tweet_lang;
            _this.data = _this.filterdata_country;
            var data = [];
            var res = [];
            var chartData = [];
            var prop;
            var result = [];
            var data_c = _this.filterdata_country;
            if (data_c && data_c.length > 0) {
                _this.data.forEach(function (d) {
                    data.push(d);
                });
            }
            for (var i = 0; i < _this.hashtag[0].hashtags.length; i += 2) {
                if (data[i + 1] > 0) {
                    _this.prop = new _models_piechart_model__WEBPACK_IMPORTED_MODULE_2__["Prop"]();
                    _this.prop.name = data[i];
                    _this.prop.y = data[i + 1];
                    chartData.push(_this.prop);
                }
            }
            for (var i = 0; i < chartData.length; i++) {
                res.push({ name: chartData[i].name, y: chartData[i].y, dataLabels: { enabled: true } });
            }
            //return res;
            _this.donutData = res;
            _this.doughnut_country = new angular_highcharts__WEBPACK_IMPORTED_MODULE_1__["Chart"]({
                chart: { type: 'pie' },
                title: { text: '' },
                credits: { enabled: false },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        dataLabels: { enabled: false },
                        size: 300,
                        innerSize: '50%',
                        center: ['50%', '40%']
                    }
                },
                series: [{
                        type: undefined,
                        innerSize: '50%',
                        data: _this.donutData
                    }]
            });
        });
        setTimeout(function () { }, 3000);
    };
    // ------------------------------------------------------------------------------------------------------------
    //      Line chart
    // ------------------------------------------------------------------------------------------------------------
    ChartComponent.prototype.getXData = function () {
        this.data = this.test;
        var xaxis = [];
        this.data.forEach(function (d) { xaxis.push(d.xaxis); });
        return xaxis[0];
    };
    ChartComponent.prototype.getYData = function () {
        this.data = this.test;
        this.xaxis = [];
        var yaxis = [];
        this.data.forEach(function (d) { yaxis.push(d.yaxis); });
        return yaxis[0];
    };
    ChartComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-chart',
            template: __webpack_require__(/*! ./chart.component.html */ "./src/app/chart/chart.component.html"),
            styles: [__webpack_require__(/*! ./chart.component.css */ "./src/app/chart/chart.component.css")]
        }),
        __metadata("design:paramtypes", [src_app_services_tweet_service__WEBPACK_IMPORTED_MODULE_3__["TweetService"], _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"]])
    ], ChartComponent);
    return ChartComponent;
}());



/***/ }),

/***/ "./src/app/directives/stop-propagation.directive.ts":
/*!**********************************************************!*\
  !*** ./src/app/directives/stop-propagation.directive.ts ***!
  \**********************************************************/
/*! exports provided: StopPropagationDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StopPropagationDirective", function() { return StopPropagationDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var StopPropagationDirective = /** @class */ (function () {
    function StopPropagationDirective(renderer, element) {
        this.renderer = renderer;
        this.element = element;
        this.stopPropEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    StopPropagationDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.unsubscribe = this.renderer.listen(this.element.nativeElement, "click", function (event) {
            event.stopPropagation();
            _this.stopPropEvent.emit(event);
        });
    };
    StopPropagationDirective.prototype.ngOnDestroy = function () {
        this.unsubscribe();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])("click.stop"),
        __metadata("design:type", Object)
    ], StopPropagationDirective.prototype, "stopPropEvent", void 0);
    StopPropagationDirective = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
            selector: '[click.stop]'
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]])
    ], StopPropagationDirective);
    return StopPropagationDirective;
}());



/***/ }),

/***/ "./src/app/filter/filter.component.css":
/*!*********************************************!*\
  !*** ./src/app/filter/filter.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/* ng-sidebar-container{\r\n    height: 100%;\r\n}\r\nng-sidebar,ng-sidebar-content{\r\n    padding:16px;\r\n}\r\nng-sidebar{\r\n    background-color:black;\r\n    width: 50px;\r\n} */\r\n.sidenav {\r\n    height: 100%;\r\n    width: 0;\r\n    position: fixed;\r\n    z-index: 1;\r\n    top: 0;\r\n    right: 0;\r\n    background-color:darkblue;\r\n    overflow-x: hidden;\r\n    -webkit-transition: 0.5s;\r\n    transition: 0.5s;\r\n    padding-top: 60px;\r\n  }\r\n.sidenav a {\r\n    padding: 8px 8px 8px 32px;\r\n    text-decoration: none;\r\n    font-size: 25px;\r\n    color: white;\r\n    display: block;\r\n    -webkit-transition: 0.3s;\r\n    transition: 0.3s;\r\n  }\r\n.sidenav a:hover {\r\n    color: #f1f1f1;\r\n  }\r\n.sidenav .closebtn {\r\n    position: absolute;\r\n    top: 0;\r\n    right: 25px;\r\n    font-size: 36px;\r\n    margin-left: 50px;\r\n  }\r\n@media screen and (max-height: 450px) {\r\n    .sidenav {padding-top: 15px;}\r\n    .sidenav a {font-size: 18px;}\r\n  }"

/***/ }),

/***/ "./src/app/filter/filter.component.html":
/*!**********************************************!*\
  !*** ./src/app/filter/filter.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- <ng-sidebar-container>\r\n \r\n    <ng-sidebar [(opened)]=\"_opened\">\r\n        <p>Sidebar contents</p>\r\n    </ng-sidebar>\r\n\r\n    <div ng-sidebar-content>\r\n        <button (click)=\"_toggleSidebar()\">Toggle sidebar</button>\r\n    </div>\r\n\r\n</ng-sidebar-container> -->\r\n<div id=\"mySidenav\" class=\"sidenav\">\r\n    <a href=\"javascript:void(0)\" class=\"closebtn\" (click)=\"closeNav()\">&times;</a>\r\n    <a href=\"#\">About</a>\r\n    <a href=\"#\">Services</a>\r\n    <a href=\"#\">Clients</a>\r\n    <a href=\"#\">Contact</a>\r\n</div>\r\n\r\n<span style=\"font-size:30px;cursor:pointer\" tooltip=\"Open Filter Panel\" (click)=\"openNav()\">&#9776; open</span>"

/***/ }),

/***/ "./src/app/filter/filter.component.ts":
/*!********************************************!*\
  !*** ./src/app/filter/filter.component.ts ***!
  \********************************************/
/*! exports provided: FilterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilterComponent", function() { return FilterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var FilterComponent = /** @class */ (function () {
    function FilterComponent() {
    }
    // private _opened: boolean = false;    
    // private _toggleSidebar() {
    //     this._opened = !this._opened;
    FilterComponent.prototype.openNav = function () {
        document.getElementById("mySidenav").style.width = "250px";
    };
    FilterComponent.prototype.closeNav = function () {
        document.getElementById("mySidenav").style.width = "0";
    };
    FilterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-filter',
            template: __webpack_require__(/*! ./filter.component.html */ "./src/app/filter/filter.component.html"),
            styles: [__webpack_require__(/*! ./filter.component.css */ "./src/app/filter/filter.component.css")]
        })
    ], FilterComponent);
    return FilterComponent;
}());



/***/ }),

/***/ "./src/app/google-chart/google-chart.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/google-chart/google-chart.module.ts ***!
  \*****************************************************/
/*! exports provided: GoogleChartModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GoogleChartModule", function() { return GoogleChartModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _service_service_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./service/service.module */ "./src/app/google-chart/service/service.module.ts");
/* harmony import */ var _world_map_world_map_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./world-map/world-map.component */ "./src/app/google-chart/world-map/world-map.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var GoogleChartModule = /** @class */ (function () {
    function GoogleChartModule() {
    }
    GoogleChartModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _service_service_module__WEBPACK_IMPORTED_MODULE_2__["ServiceModule"]
            ],
            declarations: [_world_map_world_map_component__WEBPACK_IMPORTED_MODULE_3__["WorldMapComponent"]],
            exports: [_world_map_world_map_component__WEBPACK_IMPORTED_MODULE_3__["WorldMapComponent"]],
            providers: []
        })
    ], GoogleChartModule);
    return GoogleChartModule;
}());



/***/ }),

/***/ "./src/app/google-chart/service/google-chart.service.ts":
/*!**************************************************************!*\
  !*** ./src/app/google-chart/service/google-chart.service.ts ***!
  \**************************************************************/
/*! exports provided: GoogleChartService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GoogleChartService", function() { return GoogleChartService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./service.module */ "./src/app/google-chart/service/service.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var GoogleChartService = /** @class */ (function () {
    function GoogleChartService() {
        this.google = google;
    }
    GoogleChartService.prototype.getGoogle = function () {
        return this.google;
    };
    GoogleChartService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: _service_module__WEBPACK_IMPORTED_MODULE_1__["ServiceModule"]
        }),
        __metadata("design:paramtypes", [])
    ], GoogleChartService);
    return GoogleChartService;
}());



/***/ }),

/***/ "./src/app/google-chart/service/service.module.ts":
/*!********************************************************!*\
  !*** ./src/app/google-chart/service/service.module.ts ***!
  \********************************************************/
/*! exports provided: ServiceModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServiceModule", function() { return ServiceModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var ServiceModule = /** @class */ (function () {
    function ServiceModule() {
    }
    ServiceModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]
            ],
            declarations: []
        })
    ], ServiceModule);
    return ServiceModule;
}());



/***/ }),

/***/ "./src/app/google-chart/world-map/world-map.component.css":
/*!****************************************************************!*\
  !*** ./src/app/google-chart/world-map/world-map.component.css ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/google-chart/world-map/world-map.component.html":
/*!*****************************************************************!*\
  !*** ./src/app/google-chart/world-map/world-map.component.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div  id=\"divLineChart1\">\n\n</div>\n\n<div  id=\"divLineChart\">\n\n</div>"

/***/ }),

/***/ "./src/app/google-chart/world-map/world-map.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/google-chart/world-map/world-map.component.ts ***!
  \***************************************************************/
/*! exports provided: WorldMapComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorldMapComponent", function() { return WorldMapComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_google_chart_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../service/google-chart.service */ "./src/app/google-chart/service/google-chart.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var WorldMapComponent = /** @class */ (function () {
    function WorldMapComponent(gChartService) {
        this.gChartService = gChartService;
        this.google = this.gChartService.getGoogle();
        this.google.charts.load('current', { 'packages': ['geochart'] });
        this.google.charts.setOnLoadCallback(this.drawRegionsMap.bind(this));
    }
    WorldMapComponent.prototype.drawRegionsMap = function () {
        var data = this.google.visualization.arrayToDataTable([
            ['Country', 'Popularity'],
            ['Germany', 200],
            ['United States', 300],
            ['Brazil', 400],
            ['Canada', 500],
            ['France', 600],
            ['India', 700]
        ]);
        var options = { colorAxis: { colors: ['196F3D'] }, }, displayMode;
        var chart = new this.google.visualization.GeoChart(document.getElementById('divLineChart'));
        chart.draw(data, options);
    };
    WorldMapComponent.prototype.ngOnInit = function () {
    };
    WorldMapComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-world-map',
            template: __webpack_require__(/*! ./world-map.component.html */ "./src/app/google-chart/world-map/world-map.component.html"),
            styles: [__webpack_require__(/*! ./world-map.component.css */ "./src/app/google-chart/world-map/world-map.component.css")]
        }),
        __metadata("design:paramtypes", [_service_google_chart_service__WEBPACK_IMPORTED_MODULE_1__["GoogleChartService"]])
    ], WorldMapComponent);
    return WorldMapComponent;
}());



/***/ }),

/***/ "./src/app/home/home.component.css":
/*!*****************************************!*\
  !*** ./src/app/home/home.component.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "li:hover{\r\n    background-color:beige;\r\n    cursor: pointer;\r\n}"

/***/ }),

/***/ "./src/app/home/home.component.html":
/*!******************************************!*\
  !*** ./src/app/home/home.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div style=\"margin-left:50px;\" class=\"mb-5\">\n    <h2 style=\"margin-left:100px\" *ngIf=\"tweets.length && !filterOpen\">Search Results</h2>\n    <h2 style=\"margin-left:250px\" *ngIf=\"tweets.length && filterOpen\">Search Results</h2>\n  <ul class=\"list-unstyled\">\n      <!-- (click) = \"onTweetClick(tweet.screen_name,tweet.id)\" -->\n    <ng-container *ngIf=\"!filterOpen\">\n    <li class=\"card card-body mb-4\" (click) = \"onTweetClick(tweet.screen_name,tweet.id)\" *ngFor=\"let tweet of tweets | paginate: { itemsPerPage: 10, currentPage: p }\" style=\"margin-right:100px;margin-left:100px\">\n      <div class=\"row\">\n        <div class=\"col-md-1\">\n          <img class=\"img-fluid\" [src]=\"tweet.profileimage\" alt=\"\" style=\"height:100px\">\n        </div>\n        <div class=\"col-md-11\">\n            <h3>{{tweet.username}}\n              <i *ngIf=\"tweet.verified\" class=\"fa fa-check-circle\" style=\"color:rgba(29,161,242,1.00); margin-left:10px\"></i>\n              <span style=\"position: absolute;right:10px;font-size:17.5px\">\n                <i class=\"fa fa-circle\" [ngStyle]=\"sentimentStyle(tweet.sentiment)\" ></i>\n                {{tweet.sentiment}}\n              </span>\n            </h3>\n            <ul class=\"list-unstyled\">\n              <li>@{{tweet.screen_name}}</li>\n              <li>Tweet:{{tweet.tweet_text}}</li>            \n              <li>Country:{{tweet.country}}</li>\n              <li>\n                <span style=\"margin-right:10px\"><i class=\"fa fa-calendar\" style=\"margin-right:10px\"></i>{{tweet.created_at}}</span>\n                <span style=\"margin-right:10px\"><i class=\"fa fa-heart\" style=\"margin-right:2px;\"></i>{{tweet.favorite_count}}</span>\n                <span><i class=\"fa fa-retweet\" style=\"margin-right:2px\"></i>{{tweet.retweet_count}}</span>\n                <!-- background-color:#66CCFF;border:none;color:white; -->\n                <span><button (click.stop)=\"onNews(content,tweet.poi_name,tweet.created_at)\" class=\"btn btn-outline-primary\" style=\"position: absolute;right:10px;cursor: pointer;height:40px\">Related News Articles</button></span>\n              </li>      \n            </ul>\n        </div>\n      </div>      \n    </li>\n    </ng-container>\n\n    <ng-container *ngIf=\"filterOpen\">\n        <li class=\"card card-body mb-4\" (click) = \"onTweetClick(tweet.screen_name,tweet.id)\" *ngFor=\"let tweet of tweets | paginate: { itemsPerPage: 10, currentPage: p }\" style=\"margin-right:100px;margin-left:250px\">\n          <div class=\"row\">\n            <div class=\"col-md-1\">\n              <img class=\"img-fluid\" [src]=\"tweet.profileimage\" alt=\"\" style=\"height:100px\">\n            </div>\n            <div class=\"col-md-11\">\n                <h3>{{tweet.username}}\n                  <i *ngIf=\"tweet.verified\" class=\"fa fa-check-circle\" style=\"color:rgba(29,161,242,1.00); margin-left:10px\"></i>\n                  <span style=\"position: absolute;right:10px;font-size:17.5px\">\n                    <i class=\"fa fa-circle\" [ngStyle]=\"sentimentStyle(tweet.sentiment)\" ></i>\n                    {{tweet.sentiment}}\n                  </span>\n                </h3>\n                <ul class=\"list-unstyled\">\n                  <li>@{{tweet.screen_name}}</li>\n                  <li>Tweet:{{tweet.tweet_text}}</li>            \n                  <li>Country:{{tweet.country}}</li>\n                  <li>\n                    <span style=\"margin-right:10px\"><i class=\"fa fa-calendar\" style=\"margin-right:10px\"></i>{{tweet.created_at}}</span>\n                    <span style=\"margin-right:10px\"><i class=\"fa fa-heart\" style=\"margin-right:2px;\"></i>{{tweet.favorite_count}}</span>\n                    <span><i class=\"fa fa-retweet\" style=\"margin-right:2px\"></i>{{tweet.retweet_count}}</span>\n                    <!-- background-color:#66CCFF;border:none;color:white; -->\n                    <span><button (click.stop)=\"onNews(content,tweet.poi_name,tweet.created_at)\" class=\"btn btn-outline-primary\" style=\"position: absolute;right:10px;cursor: pointer;height:40px\">Related News Articles</button></span>\n                  </li>      \n                </ul>\n            </div>\n          </div>      \n        </li>\n        </ng-container>\n\n  </ul>\n  </div>\n  \n  <pagination-controls class=\"d-flex justify-content-center\"(pageChange)=\"p = $event\" ></pagination-controls>\n  \n  <ng-template #content let-d=\"dismiss\">\n      <div class=\"modal-header\">\n          <h4 class=\"modal-title\">Modal title</h4>\n          <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"d('Cross click')\">\n          <span aria-hidden=\"true\">&times;</span>\n          </button>\n      </div>\n      <div class=\"modal-body\">\n          <p>One fine body&hellip;</p>\n      </div>\n      <div class=\"modal-footer\">\n          <button type=\"button\" class=\"btn btn-light\" (click)=\"d('Close click')\">Close</button>\n      </div>\n  </ng-template>"

/***/ }),

/***/ "./src/app/home/home.component.ts":
/*!****************************************!*\
  !*** ./src/app/home/home.component.ts ***!
  \****************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_models_tweet_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/models/tweet.model */ "./src/app/models/tweet.model.ts");
/* harmony import */ var src_app_services_tweet_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/tweet.service */ "./src/app/services/tweet.service.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomeComponent = /** @class */ (function () {
    function HomeComponent(tweetService, modalService) {
        var _this = this;
        this.tweetService = tweetService;
        this.modalService = modalService;
        this.tweets = [];
        //tweet:Tweet;
        this.docs = [];
        this.p = 1;
        this.filterOpen = false;
        this.options = {
            centered: false,
            //size: 'lg',
            keyboard: false,
        };
        this.poiNames = [{ key: 'Barkha Dutt', value: 'BDUTT' },
            { key: 'Rajdeep Sardesai', value: 'sardesairajdeep' },
            { key: 'Sachin Pilot', value: 'SachinPilot' },
            { key: 'Narendra Modi', value: 'narendramodi' },
            { key: 'Piyush Goyal', value: 'PiyushGoyal' },
            { key: 'Bernie Sanders', value: 'BernieSanders' },
            { key: 'Cory Booker', value: 'CoryBooker' },
            { key: 'Kamala Harris', value: 'KamalaHarris' },
            { key: 'Ted Lieu', value: 'tedlieu' },
            { key: 'Elizabeth Warren', value: 'ewarren' },
            { key: 'Carlos Bolsonaro', value: 'CarlosBolsonaro' },
            { key: 'Jair Bolsonaro', value: 'jairbolsonaro' },
            { key: 'Lula', value: 'LulaOficial' },
            { key: 'Dilma Rousseff', value: 'dilmabr' },
            { key: 'Gleisi Hoffmann', value: 'gleisi' }
        ];
        this.tweetService.value$.subscribe(function (obj) {
            _this.homeObj = obj;
            _this.tweetService.postData(_this.homeObj).subscribe(function (tweets) {
                _this.docs = tweets.docs;
                console.log(_this.docs);
                setTimeout(_this.loadData(_this.docs), 3000);
            });
        });
        this.tweetService.filterOpen$.subscribe(function (status) {
            _this.filterOpen = status;
            console.log(_this.filterOpen);
        });
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent.prototype.loadData = function (docs) {
        this.tweets = [];
        var tweet = new src_app_models_tweet_model__WEBPACK_IMPORTED_MODULE_1__["Tweet"]();
        for (var i = 0; i < docs.length; i++) {
            var tweet_1 = new src_app_models_tweet_model__WEBPACK_IMPORTED_MODULE_1__["Tweet"]();
            tweet_1.country = docs[i].country[0];
            tweet_1.created_at = docs[i].created_at[0],
                tweet_1.favorite_count = docs[i].favorite_count[0],
                tweet_1.followers = docs[i].followers[0],
                tweet_1.id = docs[i].id,
                tweet_1.poi_name = docs[i].poi_name[0],
                tweet_1.profileimage = docs[i].profileimage[0],
                tweet_1.retweet_count = docs[i].retweet_count[0],
                tweet_1.screen_name = docs[i].screenname[0],
                tweet_1.sentiment = docs[i].sentiment[0],
                tweet_1.topic = docs[i].topic,
                tweet_1.tweet_lang = docs[i].tweet_lang[0],
                tweet_1.tweet_text = docs[i].tweet_text[0],
                tweet_1.username = docs[i].username[0],
                tweet_1.verified = docs[i].verified[0];
            this.tweets.push(tweet_1);
        }
        console.log(this.tweets);
    };
    HomeComponent.prototype.onTweetClick = function (screenname, id) {
        var url = "https://twitter.com/" + screenname + "/status/" + id;
        window.open(url, "_blank");
    };
    HomeComponent.prototype.sentimentStyle = function (sentiment) {
        if (sentiment == 'Neutral') {
            return { "color": "lightblue" };
        }
        else if (sentiment == 'Positive') {
            return { "color": "green" };
        }
        else if (sentiment == 'Negative') {
            return { "color": "red" };
        }
    };
    HomeComponent.prototype.onNews = function (content, screenname, tweet_date) {
        // let dateString = '1968-11-16T00:00:00' 
        var newDate = new Date(tweet_date);
        for (var i = 0; i < this.poiNames.length; i++) {
            if (this.poiNames[i].value == screenname) {
                console.log(this.poiNames[i].key, tweet_date, '2019-09-07');
                this.tweetService.getNewsData(this.poiNames[i].key, tweet_date, '2019-09-07').subscribe(function (data) {
                    console.log(data);
                });
                break;
            }
        }
        this.modalService.open(content, this.options);
    };
    HomeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! ./home.component.html */ "./src/app/home/home.component.html"),
            styles: [__webpack_require__(/*! ./home.component.css */ "./src/app/home/home.component.css")]
        }),
        __metadata("design:paramtypes", [src_app_services_tweet_service__WEBPACK_IMPORTED_MODULE_2__["TweetService"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__["NgbModal"]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/models/filter.model.ts":
/*!****************************************!*\
  !*** ./src/app/models/filter.model.ts ***!
  \****************************************/
/*! exports provided: Filter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Filter", function() { return Filter; });
var Filter = /** @class */ (function () {
    function Filter() {
        // public name: string[];
        // public isEnglish: boolean;
        // public to_model:to_model;
        // public from_model:to_model;
        // public isHindi: boolean;
        // public isPortuguese: boolean;
        // //Top 5 Topics  For India
        // public isIndia: boolean;
        // public HappyBirthdayModi: string;
        // public BJP: string;
        // public Congress: string;
        // public Railway: string;
        // public Kashmir: string;
        // //Top 5 Topics For USA
        // public isUSA: boolean;
        // public Healthcare: string;
        // public Guncontrol: string;
        // public Climatechange: string;
        // public Electioncampaign: string;
        // public BlackJustice: string;
        // //Top 5 Topics For Brazil
        // public isBrazil: boolean;
        // public Education: string;
        // public Presidentialcandidate: string;
        // public Crime: string;
        // public JusticeforLula: string;
        // public Democracy: string;
        // //Sentiments
        // public isPositive: string;
        // public isNegative: string;
        // public isNeutral: string;
        this.languages = [];
        this.countries = [];
        this.IndiaTopics = [];
        this.USATopics = [];
        this.BrazilTopics = [];
        this.sentiments = [];
        this.hashtags = [];
        this.POIUsername = [];
        this.query = '';
        this.topics = [];
    }
    return Filter;
}());



/***/ }),

/***/ "./src/app/models/piechart.model.ts":
/*!******************************************!*\
  !*** ./src/app/models/piechart.model.ts ***!
  \******************************************/
/*! exports provided: Prop */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Prop", function() { return Prop; });
var Prop = /** @class */ (function () {
    function Prop() {
    }
    return Prop;
}());



/***/ }),

/***/ "./src/app/models/tweet.model.ts":
/*!***************************************!*\
  !*** ./src/app/models/tweet.model.ts ***!
  \***************************************/
/*! exports provided: Tweet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tweet", function() { return Tweet; });
var Tweet = /** @class */ (function () {
    function Tweet() {
    }
    return Tweet;
}());



/***/ }),

/***/ "./src/app/navbar/navbar.component.css":
/*!*********************************************!*\
  !*** ./src/app/navbar/navbar.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".sidenav {\r\n  height: 100%;\r\n  width: 0;\r\n  position: fixed;\r\n  z-index: 1;\r\n  top: 0;\r\n  left: 0;\r\n  background-color:white;\r\n  overflow-x: hidden;\r\n  -webkit-transition: 0.5s;\r\n  transition: 0.5s;\r\n  padding-top: 60px;\r\n}\r\n\r\n.sidenav a,li {\r\n  padding: 8px 8px 8px 32px;\r\n  text-decoration: none;\r\n  font-size: 20px;\r\n  color: black;\r\n  display: block;\r\n  -webkit-transition: 0.3s;\r\n  transition: 0.3s;\r\n}\r\n\r\n.sidenav a:hover,li:hover {\r\n  color: blue;\r\n}\r\n\r\n.sidenav .closebtn {\r\n  position: absolute;\r\n  top: 0;\r\n  right: 25px;\r\n  font-size: 36px;\r\n  margin-left: 50px;\r\n}\r\n\r\n@media screen and (max-height: 450px) {\r\n  .sidenav {padding-top: 15px;}\r\n  .sidenav a {font-size: 18px;}\r\n}\r\n\r\np-calendar{\r\n    background-color: white;\r\n    padding: 8px 8px 8px 32px;\r\n}\r\n\r\n.topnav {\r\n  overflow: hidden;\r\n  background-color: #e9e9e9;\r\n}\r\n\r\n.topnav a {\r\n  float: left;\r\n  display: block;\r\n  color: black;\r\n  text-align: center;\r\n  padding: 14px 16px;\r\n  text-decoration: none;\r\n  font-size: 17px;\r\n}\r\n\r\n.topnav a:hover {\r\n  background-color: #ddd;\r\n  color: black;\r\n}\r\n\r\n.topnav a.active {\r\n  background-color: #2196F3;\r\n  color: white;\r\n}\r\n\r\nsearch-container {\r\n  float: right;\r\n}\r\n\r\ninput[type=text] {\r\n  padding: 6px;\r\n  margin-top: 8px;\r\n  font-size: 17px;\r\n  width : 60%;\r\n  /* border: none; */    \r\n  text-align: left;\r\n  margin-left: 300px;\r\n  height: 40px;\r\n}\r\n\r\nsearch-container button {\r\n  float: right;\r\n  padding: 6px 10px;\r\n  margin-top: 8px;\r\n  margin-right: 16px;\r\n  background: #ddd;\r\n  font-size: 17px;\r\n  border: none;\r\n  cursor: pointer;\r\n}\r\n\r\nsearch-container button:hover {\r\n  background: #ccc;\r\n}\r\n\r\n@media screen and (max-width: 600px) {\r\n  .topnav .search-container {\r\n    float: none;\r\n  }\r\n  topnav input[type=text], .topnav .search-container button {\r\n    float: none;\r\n    display: block;\r\n    text-align: left;\r\n    width: 100%;\r\n    margin: 0;\r\n    padding: 14px;\r\n  }\r\n  input[type=text] {\r\n    border: 1px solid #ccc;  \r\n  }\r\n}"

/***/ }),

/***/ "./src/app/navbar/navbar.component.html":
/*!**********************************************!*\
  !*** ./src/app/navbar/navbar.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-expand navbar-dark bg-primary mb-4 navbar-fixed-top\">\r\n  <div class=\"container\">\r\n      <!-- <a routerLink='/' class=\"navbar-brand\">Angular App</a> -->\r\n      <div>\r\n        <ul class='navbar-nav ml-auto'>\r\n          <li class=\"nav-item\">\r\n              <a class=\"nav-link\" (click)=\"openNav()\" style=\"cursor:pointer;position:absolute;left:40px\"><i class=\"fa fa-filter fa-lg\"></i></a>\r\n          </li>\r\n          <li class=\"nav-item\" [routerLinkActive] = \"['active']\" [routerLinkActiveOptions] = \"{exact: true}\" style=\"position:relative;left:200px\">\r\n              <a routerLink='/' class=\"nav-link\"><b>Home</b></a>\r\n            </li>\r\n          <li class=\"nav-item\" [routerLinkActive] = \"['active']\" [routerLinkActiveOptions] = \"{exact: true}\" style=\"position:relative;left:300px\">\r\n            <a routerLink='/visual' class=\"nav-link\"><b>Visual</b></a>\r\n          </li>\r\n          \r\n        </ul>\r\n      </div>\r\n  </div>\r\n</nav>\r\n<div class=\"search-container mb-3\">\r\n  <form action=\"/action_page.php\">\r\n    <input type=\"text\" placeholder=\"Search..\" name=\"search\" [(ngModel)]=\"searchText\">\r\n    <button type=\"submit\" style=\"height: 40px;width: 40px;\" (click)=\"onSearch()\"><i class=\"fa fa-search\"></i></button>\r\n  </form>\r\n</div>\r\n\r\n\r\n<div id=\"mySidenav\" class=\"sidenav\">\r\n  <a href=\"javascript:void(0)\" class=\"closebtn\" (click)=\"closeNav()\">&times;</a>\r\n  <br/><br/>\r\n  <button type=\"button\" class=\"btn btn-primary\" (click)=\"onSubmit();\" style=\"margin-left: 20px; width: 90px;\">Apply</button>\r\n  <button type=\"button\" class=\"btn btn-primary\" (click)=\"Initialize();\" style=\"margin-right: 00px; width: 90px;\r\n  background-color: #C0C0C0;\" >Reset</button>\r\n  <div>\r\n    <a><button (click)=\"showLanguages = !showLanguages\" style=\"font-size: 0.75rem;margin-right:5px\"><i [ngClass]=\"showLanguages ? 'fa fa-minus fa-xs':'fa fa-plus'\"></i></button>Language</a>\r\n      <ul class=\"list-unstyled\" *ngIf = \"showLanguages\">\r\n        <li style=\"font-size:15px;margin-left:10px\" *ngFor=\"let language of languages\"><input type=\"checkbox\"  (change)=\"onLanguageSelect($event)\" name ={{language.value}}> {{language.key}}</li>\r\n        \r\n        \r\n      </ul>\r\n  </div>\r\n  <br/>\r\n  <div>\r\n    <a><button (click)=\"showCountries = !showCountries\" style=\"font-size: 0.75rem;margin-right:5px\"><i [ngClass]=\"showCountries ? 'fa fa-minus fa-xs':'fa fa-plus'\"></i></button>Country</a>\r\n      <ul class=\"list-unstyled\" *ngIf = \"showCountries\">\r\n        <li style=\"font-size:17px;margin-left:10px\"><input type=\"checkbox\" [(ngModel)]=\"selectedUS\" (change)=\"onCheckOfAllUSTopics($event)\" name=\"onCheckOfAllUSTopics\"> United States<button (click)=\"showTopicsUS = !showTopicsUS\" style=\"font-size: 0.5rem;margin-left:5px\"><i [ngClass]=\"showTopicsUS ? 'fa fa-minus fa-xs':'fa fa-plus'\"></i></button></li>\r\n          <ul class=\"list-unstyled\" *ngIf = \"showTopicsUS\">\r\n            <li *ngFor=\"let topic of topics.US\" style=\"font-size:15px;margin-left:20px\"><input type=\"checkbox\"  [checked]=\"selectedUS\" (change)=\"onCheckUS($event)\" name={{topic}}>{{topic}}</li>\r\n          </ul>\r\n        <li style=\"font-size:17px;margin-left:10px\"><input type=\"checkbox\" [(ngModel)]=\"selectedIndia\" (change)=\"onCheckOfAllIndiaTopics($event)\" name=\"onCheckOfAllIndiaTopics\"> India<button (click)=\"showTopicsIndia = !showTopicsIndia\" style=\"font-size: 0.5rem;margin-left:5px\"><i [ngClass]=\"showTopicsIndia ? 'fa fa-minus fa-xs':'fa fa-plus'\"></i></button></li>\r\n        <ul class=\"list-unstyled\" *ngIf = \"showTopicsIndia\">\r\n          <li *ngFor=\"let topic of topics.India\" style=\"font-size:15px;margin-left:20px\"><input type=\"checkbox\" [checked]=\"selectedIndia\" (change)=\"onCheckIndia($event)\" name={{topic}}>{{topic}}</li>\r\n        </ul>\r\n        <li style=\"font-size:17px;margin-left:10px\"><input type=\"checkbox\" [(ngModel)] = \"selectedBrazil\" (change)=\"onCheckOfAllBrazilTopics($event)\" name=\"onCheckOfAllBrazilTopics\"> Brazil<button (click)=\"showTopicsBrazil = !showTopicsBrazil\" style=\"font-size: 0.5rem;margin-left:5px\"><i [ngClass]=\"showTopicsBrazil ? 'fa fa-minus fa-xs':'fa fa-plus'\"></i></button></li>\r\n        <ul class=\"list-unstyled\" *ngIf = \"showTopicsBrazil\">\r\n          <li *ngFor=\"let topic of topics.Brazil\" style=\"font-size:15px;margin-left:20px\"><input type=\"checkbox\" [checked]=\"selectedBrazil\" (change)=\"onCheckBrazil($event)\" name={{topic}}>{{topic}}</li>\r\n        </ul>\r\n      </ul>\r\n  </div><br/>\r\n  <a><button (click)=\"showPois= !showPois\" style=\"font-size: 0.75rem;margin-right:5px\"><i [ngClass]=\"showPois ? 'fa fa-minus fa-xs':'fa fa-plus'\"></i></button>POI Name</a>\r\n  <ul class=\"list-unstyled\" *ngIf = \"showPois\">\r\n    <li *ngFor=\"let poi of poiNames\" style=\"font-size:15px;margin-left:20px\"><input type=\"checkbox\" (change)=\"onPoiName($event)\" name ={{poi.value}} >{{poi.key}}</li>\r\n  </ul>\r\n    <br/>\r\n  <div>\r\n    <a><button (click)=\"showSentiments = !showSentiments\" style=\"font-size: 0.75rem;margin-right:5px\"><i [ngClass]=\"showSentiments ? 'fa fa-minus fa-xs':'fa fa-plus'\"></i></button>Sentiment</a>\r\n      <ul class=\"list-unstyled\" *ngIf = \"showSentiments\">\r\n          <li style=\"font-size:15px;margin-left:10px\" *ngFor=\"let Sentiment of sentiments\"><input type=\"checkbox\" (change)=\"onSentimentSelect($event)\" name ={{Sentiment.value}}> {{Sentiment.key}}</li>\r\n       \r\n      </ul>\r\n    </div><br/>\r\n    <a><button (click)=\"showHashtags = !showHashtags\" style=\"font-size: 0.75rem;margin-right:5px\"><i [ngClass]=\"showHashtags ? 'fa fa-minus fa-xs':'fa fa-plus'\"></i></button>Hashtags</a>\r\n\r\n  <a style=\"font-size:15px\">From Date</a>\r\n  <form class=\"form-inline\">\r\n      <div class=\"form-group\">\r\n        <div class=\"input-group\" style=\"padding-left:25px\">\r\n          <input class=\"form-control\" placeholder=\"yyyy-mm-dd\"\r\n                 name=\"fdp\" [(ngModel)]=\"model.from_model\" ngbDatepicker #d1=\"ngbDatepicker\" style=\"width:150px\">\r\n          <div class=\"input-group-append\">\r\n            <button class=\"btn btn-outline-secondary calendar\" (click)=\"d1.toggle()\" type=\"button\"><i class=\"fa fa-calendar\"></i></button>              \r\n          </div>\r\n        </div>\r\n      </div>\r\n    </form> \r\n  <a style=\"font-size:15px\">To Date</a>\r\n  <form class=\"form-inline\">\r\n    <div class=\"form-group\">\r\n      <div class=\"input-group\" style=\"padding-left:25px\">\r\n        <input class=\"form-control\" placeholder=\"yyyy-mm-dd\"\r\n                name=\"tdp\" [(ngModel)]=\"model.to_model\" ngbDatepicker #d=\"ngbDatepicker\" style=\"width:150px\">\r\n        <div class=\"input-group-append\">\r\n          <button class=\"btn btn-outline-secondary calendar\" (click)=\"d.toggle()\" type=\"button\"><i class=\"fa fa-calendar\"></i></button>              \r\n        </div>\r\n      </div>\r\n    </div>\r\n  </form>\r\n \r\n</div>\r\n\r\n\r\n\r\n<!-- \r\n<form (ngSubmit)=\"onSubmit(ngModel)\" >\r\n<div id=\"mySidenav\" class=\"sidenav\">\r\n    <a href=\"javascript:void(0)\" class=\"closebtn\" (click)=\"closeNav()\">&times;</a>\r\n    <a>Language</a>\r\n    <a  style=\"font-size:15px\"><input type=\"checkbox\" [(ngModel)]=\"model.isEnglish\" name =\"isEnglish\"> English<br></a>\r\n    <a  style=\"font-size:15px\"><input type=\"checkbox\" [(ngModel)]=\"model.isHindi\" name=\"isHindi\" > Hindi<br></a>\r\n    <a  style=\"font-size:15px\"><input type=\"checkbox\" [(ngModel)]=\"model.isPortuguese\" name =\"isPortuguese\"> Portuguese<br></a>\r\n    \r\n    <a>Country</a>\r\n    <a  style=\"font-size:15px\"><input type=\"checkbox\" [(ngModel)]=\"model.isUSA\" name=\"isUSA\"> United States<br></a>\r\n    <a  style=\"font-size:15px\"><input type=\"checkbox\" [(ngModel)]=\"model.isIndia\" name=\"isIndia\"> India<br></a>\r\n    <a  style=\"font-size:15px\"><input type=\"checkbox\" [(ngModel)]=\"model.isBrazil\" name=\"isBrazil\"> Brazil<br></a>\r\n    <a>Verified</a>\r\n    <a  style=\"font-size:15px\"><input type=\"checkbox\"  [(ngModel)]=\"model.isVerified\" name=\"isVerified\"> Yes<br></a>\r\n    <a  style=\"font-size:15px\"><input type=\"checkbox\"  [(ngModel)]=\"model.isNotVerified\" name=\"isNotVerified\"> No<br></a>\r\n    <a>Topics</a>\r\n    <a style=\"font-size:15px\">From Date</a>\r\n    <form class=\"form-inline\">\r\n        <div class=\"form-group\">\r\n          <div class=\"input-group\" style=\"padding-left:25px\">\r\n            <input class=\"form-control\" placeholder=\"yyyy-mm-dd\"\r\n                   name=\"fdp\" [(ngModel)]=\"model.from_model\" ngbDatepicker #d1=\"ngbDatepicker\" style=\"width:150px\">\r\n            <div class=\"input-group-append\">\r\n              <button class=\"btn btn-outline-secondary calendar\" (click)=\"d1.toggle()\" type=\"button\"><i class=\"fa fa-calendar\"></i></button>              \r\n            </div>\r\n          </div>\r\n        </div>\r\n      </form> \r\n    <a style=\"font-size:15px\">To Date</a>\r\n    <form class=\"form-inline\">\r\n        <div class=\"form-group\">\r\n          <div class=\"input-group\" style=\"padding-left:25px\">\r\n            <input class=\"form-control\" placeholder=\"yyyy-mm-dd\"\r\n                   name=\"tdp\" [(ngModel)]=\"model.to_model\" ngbDatepicker #d=\"ngbDatepicker\" style=\"width:150px\">\r\n            <div class=\"input-group-append\">\r\n              <button class=\"btn btn-outline-secondary calendar\" (click)=\"d.toggle()\" type=\"button\"><i class=\"fa fa-calendar\"></i></button>              \r\n            </div>\r\n          </div>\r\n        </div>\r\n      </form>\r\n      \r\n<button type=\"button\" class=\"btn btn-primary\" (click)=\"onSubmit();\" >Apply</button>\r\n</div>\r\n</form> -->\r\n"

/***/ }),

/***/ "./src/app/navbar/navbar.component.ts":
/*!********************************************!*\
  !*** ./src/app/navbar/navbar.component.ts ***!
  \********************************************/
/*! exports provided: NavbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavbarComponent", function() { return NavbarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _models_filter_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/filter.model */ "./src/app/models/filter.model.ts");
/* harmony import */ var src_app_services_tweet_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/tweet.service */ "./src/app/services/tweet.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(tweetService, http, router) {
        this.tweetService = tweetService;
        this.http = http;
        this.router = router;
        this.model = new _models_filter_model__WEBPACK_IMPORTED_MODULE_1__["Filter"]();
        this.country = [];
        this.lang = [];
        this.obj = new _models_filter_model__WEBPACK_IMPORTED_MODULE_1__["Filter"]();
        this.selectedUSTopics = [];
        this.selectedBrazilTopics = [];
        this.selectedIndiaTopics = [];
        this.searchText = '';
        this.filter_open = false;
        this.showLanguages = false;
        this.showCountries = false;
        this.showTopicsUS = false;
        this.showTopicsIndia = false;
        this.showTopicsBrazil = false;
        this.showSentiments = false;
        this.showHashtags = false;
        this.selectedUS = false;
        this.selectedIndia = false;
        this.selectedBrazil = false;
        this.selectedLang = false;
        this.showPois = false;
        this.languages = [{ key: 'English', value: 'en' },
            { key: 'Hindi', value: 'hi' }, { key: 'Portuguese', value: 'pt' }];
        this.topics = {
            India: ['Happy Birthday Modi', 'BJP', 'Congress', 'Railway', 'Kashmir'],
            US: ['Health care', 'Gun control', 'Climate change', 'Election campaign', 'Black Justice'],
            Brazil: ['Education', 'Presidential candidate', 'Crime', 'Justice for Lula', 'Democracy']
        };
        this.sentiments = [
            { key: 'Positive', value: 'Positive' },
            { key: 'Negative', value: 'Negative' },
            { key: 'Neutral', value: 'Neutral' }
        ];
        this.poiNames = [{ key: 'Barkha Dutt', value: 'BDUTT' },
            { key: 'Rajdeep Sardesai', value: 'sardesairajdeep' },
            { key: 'Sachin Pilot', value: 'SachinPilot' },
            { key: 'Narendra Modi', value: 'narendramodi' },
            { key: 'Piyush Goyal', value: 'PiyushGoyal' },
            { key: 'Bernie Sanders', value: 'BernieSanders' },
            { key: 'Cory Booker', value: 'CoryBooker' },
            { key: 'Kamala Harris', value: 'KamalaHarris' },
            { key: 'Ted Lieu', value: 'tedlieu' },
            { key: 'Elizabeth Warren', value: 'ewarren' },
            { key: 'Carlos Bolsonaro', value: 'CarlosBolsonaro' },
            { key: 'Jair Bolsonaro', value: 'jairbolsonaro' },
            { key: 'Lula', value: 'LulaOficial' },
            { key: 'Dilma Rousseff', value: 'dilmabr' },
            { key: 'Gleisi Hoffmann', value: 'gleisi' }
        ];
    }
    NavbarComponent.prototype.ngOnInit = function () {
    };
    NavbarComponent.prototype.openNav = function () {
        console.log('a');
        if (this.filter_open == false) {
            document.getElementById("mySidenav").style.width = "250px";
            this.filter_open = true;
        }
        else {
            document.getElementById("mySidenav").style.width = "0";
            this.filter_open = false;
        }
        this.tweetService.setFilterStatus(true);
    };
    NavbarComponent.prototype.closeNav = function () {
        document.getElementById("mySidenav").style.width = "0";
        this.filter_open = false;
        this.tweetService.setFilterStatus(false);
    };
    NavbarComponent.prototype.Initialize = function () {
        this.selectedUS = false;
        this.selectedIndia = false;
        this.selectedBrazil = false;
        this.selectedLang = false;
    };
    NavbarComponent.prototype.onSearch = function () {
        if (this.searchText) {
            this.obj.query = this.searchText;
        }
        var temp = JSON.stringify(this.obj);
        this.tweetService.setHomeData(this.obj);
        this.tweetService.postData(temp).subscribe(function (a) { return console.log(a); });
        this.tweetService.setData(this.obj);
    };
    //Form Submit
    NavbarComponent.prototype.onSubmit = function () {
        if (this.searchText) {
            this.obj.query = this.searchText;
        }
        var temp = JSON.stringify(this.obj);
        this.tweetService.setHomeData(this.obj);
        this.tweetService.postData(temp).subscribe(function (a) { return console.log(a); });
        this.tweetService.setData(this.obj);
    };
    NavbarComponent.prototype.onLanguageSelect = function (event) {
        if (this.obj.languages && this.obj.languages.length >= 0) {
            if (this.obj.languages.indexOf(event.target.name) == -1) {
                this.obj.languages.push(event.target.name);
            }
            else {
                this.obj.languages.splice(this.obj.languages.indexOf(event.target.name), 1);
            }
        }
    };
    //For individual US Topic
    NavbarComponent.prototype.onCheckUS = function (event) {
        var index;
        if (this.obj.USATopics && this.obj.countries && this.obj.countries.length >= 0 && this.obj.USATopics.length >= 0) {
            index = this.obj.USATopics.indexOf(event.target.name);
        }
        if (index == -1) {
            if (!this.obj.countries.includes("USA")) {
                this.obj.countries.push('USA');
            }
            this.obj.USATopics.push(event.target.name);
        }
        else {
            this.obj.USATopics.splice(index, 1);
        }
    };
    NavbarComponent.prototype.onCheckBrazil = function (event) {
        var index;
        var index_US;
        if (this.obj.BrazilTopics && this.obj.countries && this.obj.countries.length >= 0 && this.obj.BrazilTopics.length >= 0) {
            index = this.obj.BrazilTopics.indexOf(event.target.name);
        }
        if (index == -1) {
            if (!this.obj.countries.includes("Brazil")) {
                this.obj.countries.push('Brazil');
            }
            this.obj.BrazilTopics.push(event.target.name);
        }
        else {
            this.obj.BrazilTopics.splice(index, 1);
        }
    };
    NavbarComponent.prototype.onCheckIndia = function (event) {
        var index;
        if (this.obj.IndiaTopics && this.obj.countries && this.obj.countries.length >= 0 && this.obj.IndiaTopics.length >= 0) {
            index = this.obj.IndiaTopics.indexOf(event.target.name);
        }
        if (index == -1) {
            if (!this.obj.countries.includes("India")) {
                this.obj.countries.push('India');
            }
            this.obj.IndiaTopics.push(event.target.name);
        }
        else {
            this.obj.IndiaTopics.splice(index, 1);
        }
    };
    NavbarComponent.prototype.onCheckOfAllUSTopics = function (event) {
        if (this.obj.USATopics == this.topics.US) {
            this.obj.USATopics = [];
            var index = this.obj.countries.indexOf("USA");
            this.obj.countries.splice(index, 1);
        }
        else {
            this.obj.USATopics = this.topics.US;
            this.obj.countries.push('USA');
        }
    };
    NavbarComponent.prototype.onCheckOfAllBrazilTopics = function (event) {
        if (this.obj.BrazilTopics == this.topics.Brazil) {
            this.obj.BrazilTopics = [];
            var index = this.obj.countries.indexOf("Brazil");
            this.obj.countries.splice(index, 1);
        }
        else {
            this.obj.BrazilTopics = this.topics.US;
            this.obj.countries.push('Brazil');
        }
    };
    NavbarComponent.prototype.onCheckOfAllIndiaTopics = function (event) {
        if (this.obj.IndiaTopics == this.topics.India) {
            this.obj.IndiaTopics = [];
            var index = this.obj.countries.indexOf("India");
            this.obj.countries.splice(index, 1);
        }
        else {
            this.obj.IndiaTopics = this.topics.US;
            this.obj.countries.push('India');
        }
    };
    //For Individual POI
    NavbarComponent.prototype.onPoiName = function (event) {
        var index;
        if (this.obj.POIUsername && this.obj.POIUsername.length >= 0) {
            index = this.obj.POIUsername.indexOf(event.target.name);
        }
        if (index == -1) {
            this.obj.POIUsername.push(event.target.name);
        }
        else {
            this.obj.POIUsername.splice(index, 1);
        }
    };
    //For Sentiments
    NavbarComponent.prototype.onSentimentSelect = function (event) {
        if (this.obj.sentiments && this.obj.sentiments.length >= 0) {
            if (this.obj.sentiments.indexOf(event.target.name) == -1) {
                this.obj.sentiments.push(event.target.name);
            }
            else {
                this.obj.sentiments.splice(this.obj.sentiments.indexOf(event.target.name), 1);
            }
        }
    };
    NavbarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-navbar',
            template: __webpack_require__(/*! ./navbar.component.html */ "./src/app/navbar/navbar.component.html"),
            styles: [__webpack_require__(/*! ./navbar.component.css */ "./src/app/navbar/navbar.component.css")]
        }),
        __metadata("design:paramtypes", [src_app_services_tweet_service__WEBPACK_IMPORTED_MODULE_2__["TweetService"], _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
    ], NavbarComponent);
    return NavbarComponent;
}());



/***/ }),

/***/ "./src/app/services/tweet.service.ts":
/*!*******************************************!*\
  !*** ./src/app/services/tweet.service.ts ***!
  \*******************************************/
/*! exports provided: TweetService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TweetService", function() { return TweetService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs_add_operator_map__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/add/operator/map */ "./node_modules/rxjs-compat/_esm5/add/operator/map.js");
/* harmony import */ var rxjs_add_operator_catch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/add/operator/catch */ "./node_modules/rxjs-compat/_esm5/add/operator/catch.js");
/* harmony import */ var rxjs_Subject__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/Subject */ "./node_modules/rxjs-compat/_esm5/Subject.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var urlSearchParams = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["URLSearchParams"]();
var httpOptions = {
    headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'true'
    })
};
var head = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"];
var TweetService = /** @class */ (function () {
    function TweetService(http) {
        this.http = http;
        this.url = './assets/json/tweets.json';
        this.searchurl = 'http://127.0.0.1:5000/getDetails/';
        this.filterurl = 'http://127.0.0.1:5000/getFilterDetails/';
        this.news_url = " https://gnews.io/api/v3/search";
        this.SentimentDetailsurl = 'http://127.0.0.1:5000/getSentimentDetails/';
        this.poiRepliesUrl = 'http://127.0.0.1:5000/getSentimentDetails/';
        this.poiTweetsUrl = 'http://127.0.0.1:5000/getverifiedSentimentDetails/';
        this.val = undefined;
        this.value = new rxjs_Subject__WEBPACK_IMPORTED_MODULE_5__["Subject"]();
        this.value$ = this.value.asObservable();
        this.filterOpen = new rxjs_Subject__WEBPACK_IMPORTED_MODULE_5__["Subject"]();
        this.filterOpen$ = this.filterOpen.asObservable();
    }
    TweetService.prototype.getTweets = function () {
        return this.http.get(this.url);
    };
    TweetService.prototype.postData = function (data) {
        return this.http.post(this.searchurl, data, httpOptions);
    };
    TweetService.prototype.postFilterData = function (data) {
        return this.http.post(this.filterurl, data, httpOptions);
    };
    TweetService.prototype.getNewsData = function (poiname, mindate, maxdate) {
        var obj = { 'q': poiname, 'mindate': mindate };
        return this.http.post(this.news_url, obj, httpOptions);
    };
    TweetService.prototype.addComment = function (body) {
        var bodyString = JSON.stringify(body); // Stringify payload
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        var options = httpOptions.headers; // Create a request option
        console.log(bodyString);
        this.http.post("http://127.0.0.1:5000/", bodyString).subscribe(function (res) {
            console.log("1");
            return res;
        });
        return;
    };
    TweetService.prototype.setData = function (val) {
        this.val = val;
    };
    TweetService.prototype.getData = function () {
        return this.val;
    };
    TweetService.prototype.setFilterStatus = function (val) {
        this.filterOpen.next(val);
    };
    TweetService.prototype.setHomeData = function (val) {
        this.value.next(val);
    };
    TweetService.prototype.getSentimentDetails = function (data) {
        return this.http.post(this.SentimentDetailsurl, data, httpOptions);
    };
    TweetService.prototype.getpoiRepliesUrl = function (data) {
        return this.http.post(this.poiRepliesUrl, data, httpOptions);
    };
    TweetService.prototype.getpoiTweetsUrl = function (data) {
        return this.http.post(this.poiTweetsUrl, data, httpOptions);
    };
    TweetService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], TweetService);
    return TweetService;
}());



/***/ }),

/***/ "./src/app/visual/visual.component.css":
/*!*********************************************!*\
  !*** ./src/app/visual/visual.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/visual/visual.component.html":
/*!**********************************************!*\
  !*** ./src/app/visual/visual.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  visual works!\n</p>\n"

/***/ }),

/***/ "./src/app/visual/visual.component.ts":
/*!********************************************!*\
  !*** ./src/app/visual/visual.component.ts ***!
  \********************************************/
/*! exports provided: VisualComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VisualComponent", function() { return VisualComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var VisualComponent = /** @class */ (function () {
    function VisualComponent() {
    }
    VisualComponent.prototype.ngOnInit = function () {
    };
    VisualComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-visual',
            template: __webpack_require__(/*! ./visual.component.html */ "./src/app/visual/visual.component.html"),
            styles: [__webpack_require__(/*! ./visual.component.css */ "./src/app/visual/visual.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], VisualComponent);
    return VisualComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\Sneha\angular2basics\ProjectIR\ProjectIR\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map