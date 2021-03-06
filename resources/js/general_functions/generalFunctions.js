import {notifyUnauthorizedAction} from "./notifiers";
import moment from "moment";

export let logout = () => location.assign(document.location.origin + '/logout');
export let refreshToDashboard = () => location.assign(document.location.origin + '/dashboard');
export let measuresInputUrl = (unique='', url='') => `http://${window.location.hostname}/measures/input?unique=${unique}${url}`;
export let refreshPage = () => location.reload(true);
export let notifyUnauthorizedActionAndLogout = () => {
    notifyUnauthorizedAction();
    setTimeout(()=>logout(), 1500);
    throw new Error("Error or suspicious action detected");
};
export let findUserStations = (user, stations) => stations.filter(station => station.user_id === user.id);
export let findUserCollections = (stations, collections) => {
    let foundCollections = [];
    stations.forEach(station => {
        let collectionsFoundPerStation = collections.filter(collection => collection.station_id === station.id);
        if(collectionsFoundPerStation.length){
            foundCollections = [...foundCollections, ...collectionsFoundPerStation]
        }
    })
    return foundCollections
};
export let findUserFromStation = (users, station) => users.find(user => user.id === station.user_id);
export let findStationFromStationId = (id, stations) => stations.find(station => station.id === id);
export let findStationAndIfExistsAndReturnName = (id, stations) => findStationFromStationId(id, stations) ? findStationFromStationId(id, stations).name : '';
export let findCategoryNameFromId = (checkedCategories, allCategories) => {
    return checkedCategories.map(checkedCategoryId => allCategories.find(category => category.id === checkedCategoryId).name)
};
export let convertCategoryNamesToStr = (categoryNames=[]) => categoryNames.map(category => `&${category}=τιμή`).join('');
export let regexFindGreek = data => data.match(/[Α-Ωα-ωίϊΐόάέύϋΰήώΆΈΊΌΎΏΉ]+/);
export let findStationsWithCollections = (stations=[], collections=[]) => {
    let acceptedStations = [];
    stations.forEach(station => {
        let colls = collections.filter(collection => collection.station_id === station.id);
        if (colls.length) acceptedStations.push(station)
    });
    return acceptedStations;
};
export let findCollectionsFromStation = (station, collections) => collections.filter(collection => collection.station_id === station.id);
export let findCollectionsFromStationId = (id, collections) => collections.filter(collection => collection.station_id === id);
export let filter = (stations, collections, profile, sortBy, search) => {
    if(search !== ''){
        return stations.filter(station => station.name.toLowerCase().startsWith(search.toLowerCase()))
    } else {
        switch(sortBy){
            case 'all':
                return stations;
            case 'own':
                return stations.filter(station => station.user_id === profile.id);
            case 'active':
                return stations.filter(station => station.is_active);
            case 'inactive':
                return stations.filter(station => !station.is_active);
            case 'most':
                let spreadStations = [...stations];
                return spreadStations.sort((a, b) => findCollectionsFromStation(b, collections).length - findCollectionsFromStation(a, collections).length)
            default:
                return stations;
        }
    }
};
export let filterSearchCategoriesOnGraphs = (categories, search) => {
    if(search !== ''){
        return categories.filter(category => category.name.toLowerCase().startsWith(search.toLowerCase()))
    } else {
        return categories;
    }
};
export let figureIfAndReturnMyStation = (myStations, station) => myStations.find(myStation => myStation.id === station.id);
export let filterOnUsers = (stationsWithCollections, myStations, profile, sortBy, search) => {
    if(search !== ''){
        return stationsWithCollections.filter(station => station.name.toLowerCase().startsWith(search.toLowerCase()));
    } else {
        switch(sortBy){
            case 'all':
                return stationsWithCollections;
            case 'own':
                return stationsWithCollections.filter(station => figureIfAndReturnMyStation(myStations, station));
            case 'active':
                return stationsWithCollections.filter(station => !figureIfAndReturnMyStation(myStations, station) ||
                    figureIfAndReturnMyStation(myStations, station) && figureIfAndReturnMyStation(myStations, station).is_active);
            case 'inactive':
                return stationsWithCollections.filter(station => figureIfAndReturnMyStation(myStations, station) && !figureIfAndReturnMyStation(myStations, station).is_active);
            case 'most':
                let spreadStationsWithCollections = [...stationsWithCollections];
                return spreadStationsWithCollections.sort((a, b)=> b.collections.length - a.collections.length);
            default:
                return stationsWithCollections;
        }
    }
};
export let findCategory = (id, categories) => categories.find(category => category.id === id);
export let returnCategoryNamesWithSymbolArrayFromMeasures = (measures, categories) => measures.map(measure => `${findCategory(measure.cat_id, categories).name} (${findCategory(measure.cat_id, categories).symbol})`);
export let filterDate = (collections, start, end) => {
    if (!start || !end) return collections;
    return collections.filter(collection => moment(collection.created_at).format("YYYY-MM-DD") >= start.format("YYYY-MM-DD")
        && moment(collection.created_at).format("YYYY-MM-DD") <= end.format("YYYY-MM-DD"))
}
export let filterDateOnStationsWithMeasures = (stationsWithMeasures, start, end) => {
    if(!start || !end) return stationsWithMeasures;
    return stationsWithMeasures.map(data => {

        let filteredMeasures = data.measures.filter(measure => moment.unix(measure.created_at_tmstp).format("YYYY-MM-DD") >= start.format("YYYY-MM-DD")
            && moment.unix(measure.created_at_tmstp).format("YYYY-MM-DD") <= end.format("YYYY-MM-DD"))

        return {...data, measures: filteredMeasures}
    })
};
export let returnCategoriesArrayFromCategoriesIdsArray = (selectedCategories, categories) => {
    return selectedCategories.map(data => {
       let category = findCategory(data.category_id, categories);
       return {...category, stations: data.stations_ids}
    });
}
export let checkUpdatesOnUserStations = (stations, myStations) => {
    if(!myStations.length) return stations;
    return stations.map(station => (findStationFromStationId(station.id, myStations) && findStationFromStationId(station.id, myStations).name !== station.name) ?
        {...station, name: findStationFromStationId(station.id, myStations).name}
        :
        station
    )
};
export let findIfUserIsAdmin = (id, users) => users.find(user => user.id === id).role_id === 1;
export let findIfStationHasCollections = (id, collections) => !!collections.filter(collection => collection.station_id === id).length;
export let examineValue = val => Number.isInteger(parseFloat(val)) ? parseInt(val) : Number(parseFloat(val).toFixed(3));



//****SLIDER SETTINGS
export let loadSliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 5000,
    autoplay: true,
    fade: true,
    pauseOnFocus: true
};
