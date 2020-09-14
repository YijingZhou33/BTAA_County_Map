require([
    "esri/Map",
    "esri/layers/FeatureLayer",
    "esri/views/MapView",
    "esri/widgets/Expand",
    "esri/tasks/support/Query"
], function(Map, FeatureLayer, MapView, Expand, Query) {
    let stateLayerView;

    const statesRender = {
        type: "simple",
        symbol: {
            type: "simple-fill", // autocasts as new SimpleFillSymbol()
            color: "#939598",
            style: "solid",
            outline: {
                // autocasts as new SimpleLineSymbol()
                color: "#f2f2f2",
                width: "1.5px"
            }
        }
    };

    const states = new FeatureLayer({
        portalItem: {
            id: "266d338fbf27436f9cd117c1d5903022"
        },
        renderer: statesRender
    });

    const activeRender = {
        type: "simple",
        symbol: {
            type: "simple-fill", // autocasts as new SimpleFillSymbol()
            color: "#0088ce",
            style: "solid",
            outline: {
                // autocasts as new SimpleLineSymbol()
                color: "#f2f2f2",
                width: "0.8px"
            }
        }
    };

    const active = new FeatureLayer({
        portalItem: {
            id: "442f9f79f0494b5093887bf98acdf15b"
        },
        renderer: activeRender
    });

    // Popup Template
    const template = {
        title: "{BTAA_Count} County, {BTAA_Cou_1}",
        content: [{
            type: "fields",
            fieldInfos: [{
                    fieldName: "Geoportal1",
                    label: "Search Page"
                },
                {
                    fieldName: "Geoporta_1",
                    label: "Alternative Search Page"
                }
            ]
        }]
    };

    active.popupTemplate = template;

    const map = new Map({
        basemap: "gray",
        layers: [states, active]
    });

    const view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-90.86426943538162, 41.45370952725294],
        zoom: 5,
        popup: {
            dockEnabled: true,
            dockOptions: {
                buttonEnabled: false,
                breakpoint: false,
                position: "auto"
            }
        }
    });

    popup = view.popup;

    const statesNode = document.querySelectorAll(`.state-item`);
    const statesElement = document.getElementById("states-filter");

    // click event handler for states choice
    statesElement.addEventListener("click", filterByState);

    // User clicked on different states
    // set an attribute filter on active layer view
    // to display the specific state
    function filterByState(event) {
        const selectedState = event.target.getAttribute("data-state");
        stateLayerView.filter = {
            where: "BTAA_Cou_1 ='" + selectedState + "'"
        };
        // Query for the extent of the selected state
        const query = new Query();
        query.where = "STATE_NAME ='" + selectedState + "'";
        states.queryExtent(query).then(function(results) {
            // go to the extent of the results satisfying the query
            view.goTo(results.extent);
        });
    }

    view.whenLayerView(active).then(function(layerView) {
        stateLayerView = layerView;

        // set up UI items
        statesElement.style.visibility = "visible";
        const statesExpand = new Expand({
            view: view,
            content: statesElement,
            expandIconClass: "esri-icon-filter",
            group: "top-left"
        });

        // clear the filters when user closes the expand widget
        statesExpand.watch("expanded", function() {
            if (!statesExpand.expanded) {
                stateLayerView.filter = null;
                // Set the view's extent to the returned extent of all features
                states.queryExtent().then(function(results) {
                    view.goTo(results.extent);
                });
            }
        });
        view.ui.add(statesExpand, "top-left");
    });

});