import { useState } from "react";
import EventEntry from "./eventEntry";
function EventsList({events, role, setPage, setId}) {
    const [category, setCategory] = useState("");
    const [minDate, setMinDate] = useState("");
    const [maxDate, setMaxDate] = useState("");
    const [location, setLocation] = useState("");
    const [showFree, setShowFree] = useState(false);
    const [minPopularity, setMinPopularity] = useState(0);
    const [maxPopularity, setMaxPopularity] = useState(0);
    const [enableCategory, setEnableCategory] = useState(false);
    const [enableMinDate, setEnableMinDate] = useState(false);
    const [enableMaxDate, setEnableMaxDate] = useState(false);
    const [enableLocation, setEnableLocation] = useState(false);
    const [enableMinPopularity, setEnableMinPopularity] = useState(false);
    const [enableMaxPopularity, setEnableMaxPopularity] = useState(false);

    function handleFilters(id, setterFunc) {
        let item = document.getElementById(id);
        if (item==null) {
            return;
        }
        if (item.getAttribute("type")=="checkbox") {
            console.log(item.checked);
            setterFunc(item.checked);
            return;
        }
        console.log(item.value);        
        setterFunc(item.value);
    }

    function isEarlier(date1, date2) {
        let year1=date1.slice(0, 4);
        let month1=date1.slice(5,7);
        let day1=date1.slice(8,10);
        let year2=date2.slice(0, 4);
        let month2=date2.slice(5,7);
        let day2=date2.slice(8,10);
        //First compare the years
        if (Number(year1)>Number(year2)) {
            return false;
        } else if (Number(year2)>Number(year1)) {
            return true;
        }
        //Compare months
        if (Number(month1)>Number(month2)) {
            return false;
        } else if (Number(month2)>Number(month1)) {
            return true;
        }
        //compare the days
        if (Number(day1)>Number(day2)) {
            return false;
        } else if (Number(day2)>Number(day1)) {
            return true;
        }
        //day, month, and year are the same. Change this if you want the bounds to be inclusive instead of exclusive
        return false;
    }

    function individualFilter(eValName, eVal, enable, limit, minMax) {
        if (!enable) {
            return true;
        }
        switch (eValName) {
            case "date":
                if (minMax=="min") {
                    return isEarlier(limit, eVal);
                } else {
                    return isEarlier(eVal, limit);
                }
                break;
            case "location":
                return (eVal==limit);
                break;
            case "is_paid_event":
                if (limit==true) {
                    return !eVal;
                } else {
                    return true;
                }
                break;
            case "attendees":
                if (minMax=="min") {
                    return limit<eVal;
                } else {
                    return eVal<limit;
                }
                break;
            case "category":
                return (eVal==limit);
                break;
        }
    }

    function filterEvent(e) {
        //go through each filter
        if (!individualFilter("date",e.date,enableMinDate,minDate,"min")) {
            return false;
        }
        if (!individualFilter("date",e.date,enableMaxDate,maxDate,"max")) {
            return false;
        }
        if (!individualFilter("location",e.location,enableLocation,location,"min")) {
            return false;
        }
        if (!individualFilter("is_paid_event",e.is_paid_event,true,showFree,"min")) {
            return false;
        }
        if (!individualFilter("attendees",e.attendees,enableMinPopularity,minPopularity,"min")) {
            return false;
        }
        if (!individualFilter("attendees",e.attendees,enableMaxPopularity,maxPopularity,"max")) {
            return false;
        }
        if (!individualFilter("category", e.category, enableCategory, category, "min")) {
            return false;
        }
        return true;
    }
    //console.log("loading events list");
    //console.log(events);
    if (events==null) {
        return (<p>There are no events in the database</p>);
    }
    let filteredEvents = [];
    for (let i=0;i<events.length;i++) {
        if(filterEvent(events[i])) {
            filteredEvents.push(events[i]);
        }

    }
    filteredEvents.sort(function(a,b) {
        if (a.category==category) {
            return -1;
        } else if (b.category==category) {
            return 1;
        }
        return 0;
    });
    let entries = filteredEvents.map((item) => (
        <li key={item.name}><EventEntry setPage={(page)=>setPage(page)} setId={()=>setId(item.id)} role={role} event={item}></EventEntry></li>)
    );
    return (<>
        <div>
            <div>Category: <select onChange={()=>handleFilters("category", setCategory)} id="category">
                    <option value="MUSIC">music</option>
                    <option value="TECH">tech</option>
                    <option value="SPORTS">sports</option>
                    <option value="SOCIAL">social</option>
                    <option value="CAREER">career</option>
                </select> <input onChange={()=>handleFilters("enableCategory", setEnableCategory)} id="enableCategory" type="checkbox"></input></div>
            <div>Minimum Date: <input onChange={()=>handleFilters("minimumDate", setMinDate)} type="date" id="minimumDate" placeholder="minimum date"></input> <input onChange={()=>handleFilters("enableMinDate", setEnableMinDate)} id="enableMinDate" type="checkbox"></input></div>
            <div>Maximum Date: <input onChange={()=>handleFilters("maximumDate", setMaxDate)} type="date" id="maximumDate" placeholder="maximum date"></input><input onChange={()=>handleFilters("enableMaxDate", setEnableMaxDate)} id="enableMaxDate" type="checkbox"></input></div>
            <div>Location: <input onChange={()=>handleFilters("location", setLocation)} id="location" placeholder="location"></input><input onChange={()=>handleFilters("enableLocation", setEnableLocation)} id="enableLocation" type="checkbox"></input></div>
            <div>Only show free events: <input onChange={()=>handleFilters("isFree", setShowFree)} id="isFree" type="checkbox"></input></div>
            <div>Minimum Popularity: <input onChange={()=>handleFilters("popularityMinimum", setMinPopularity)} id="popularityMinimum" type="number" placeholder="minimum popularity"></input><input onChange={()=>handleFilters("enableMinPopularity", setEnableMinPopularity)} id="enableMinPopularity" type="checkbox"></input></div>
            <div>Maximum Popularity: <input onChange={()=>handleFilters("popularityMaxiumu", setMaxPopularity)} id="popularityMaximum" type="number" placeholder="maximum popularity"></input><input onChange={()=>handleFilters("enableMaxPopularity", setEnableMaxPopularity)} id="enableMaxPopularity" type="checkbox"></input></div>
            <br/>
        </div>
        <ul>{entries}</ul>
    </>);
}

export default EventsList;